const YOUTUBE_PLAYLIST_ID = 'https://music.youtube.com/playlist?list=PLfcdDdq8aLR0&si=6Ys5o2e9_bCFoP2i';

const playlistsButton = document.getElementById('playlistsButton');
const songsButton = document.getElementById('songsButton');
const installButton = document.getElementById('installButton');
const playlistPopover = document.getElementById('playlistPopover');
const songsPopover = document.getElementById('songsPopover');
const playlistList = document.getElementById('playlistList');
const songsList = document.getElementById('songsList');
const trackTitle = document.getElementById('trackTitle');
const trackSubtitle = document.getElementById('trackSubtitle');
const trackThumbnail = document.getElementById('trackThumbnail');
const playPauseButton = document.getElementById('playPauseButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const elapsedTime = document.getElementById('elapsedTime');
const durationTime = document.getElementById('durationTime');
const volumeControl = document.getElementById('volumeControl');

const HEALTH_CHECK_MS = 2000;
const STUCK_CUED_MS = 10000;
const STUCK_BUFFERING_MS = 20000;
const STUCK_PLAYING_MS = 15000;
const NAV_LOCK_MS = 700;
const SKIP_DELAY_MS = 800;
const NAV_VERIFY_MS = 2500;
const MAX_SKIPS_PER_VIDEO = 2;
const LOAD_GRACE_MS = 12000;
const PLAYLIST_LOAD_RETRY_MS = 4000;
const MAX_PLAYLIST_LOAD_ATTEMPTS = 5;

let deferredInstallPrompt = null;
let installListenerAttached = false;
let player;
let playerInitializing = false;
let playerReadyHandled = false;
let progressInterval;
let listenersAttached = false;
let healthCheckInterval = null;
let skipRecoveryTimer = null;
let errorRecoveryTimer = null;
let navigationLockTimer = null;
let navVerifyTimer = null;
let playerReadyFallbackTimer = null;
let playlistLoadRetryTimer = null;

let navigationLocked = false;
let navigationVersion = 0;
let consecutiveErrors = 0;
let skipAttemptsOnCurrentVideo = 0;
let recoverySessionSkipped = new Set();

let trackedVideoKey = null;
let trackedVideoId = null;
let trackedPlaylistIndex = -1;
let stuckStateSince = null;
let lastProgressTime = null;
let lastProgressAt = 0;
let userPaused = false;
let playlistReady = false;
let loadStartedAt = 0;
let expectPlayback = false;
let playlistLoadAttempts = 0;

function parsePlaylistId(value) {
  if (!value) return '';
  const url = value.trim();
  const listMatch = url.match(/[?&]list=([A-Za-z0-9_-]+)/);
  if (listMatch) return listMatch[1];
  if (/^[A-Za-z0-9_-]{10,}$/.test(url)) return url;
  return '';
}

function clearTimer(timerRef) {
  if (timerRef) {
    clearTimeout(timerRef);
  }
  return null;
}

function clearSkipRecoveryTimer() {
  skipRecoveryTimer = clearTimer(skipRecoveryTimer);
}

function clearErrorRecoveryTimer() {
  errorRecoveryTimer = clearTimer(errorRecoveryTimer);
}

function clearNavVerifyTimer() {
  navVerifyTimer = clearTimer(navVerifyTimer);
}

function clearPlayerReadyFallbackTimer() {
  playerReadyFallbackTimer = clearTimer(playerReadyFallbackTimer);
}

function clearPlaylistLoadRetryTimer() {
  playlistLoadRetryTimer = clearTimer(playlistLoadRetryTimer);
}

function resetStuckTracking() {
  stuckStateSince = null;
  lastProgressTime = null;
  lastProgressAt = 0;
}

function getVideoKey(meta) {
  if (meta.videoId) return `video:${meta.videoId}`;
  if (meta.index >= 0) return `index:${meta.index}`;
  return '';
}

/**
 * Resets stuck tracking when progress is known to be advancing.
 * Called from runHealthCheck when we detect time is moving.
 */
function markProgressAdvancing() {
  stuckStateSince = null;
  lastProgressTime = null;
  lastProgressAt = 0;
}

function resetVideoTracking(videoId, playlistIndex) {
  const nextKey = videoId ? `video:${videoId}` : playlistIndex >= 0 ? `index:${playlistIndex}` : '';
  if (nextKey && nextKey !== trackedVideoKey) {
    trackedVideoKey = nextKey;
    trackedVideoId = videoId || '';
    skipAttemptsOnCurrentVideo = 0;
    resetStuckTracking();
    console.log(`[Nostalgia] Now tracking ${nextKey} at index ${playlistIndex}`);
  }
  if (playlistIndex >= 0) {
    trackedPlaylistIndex = playlistIndex;
  }
}

function getVolumeControlLevel() {
  const level = Number(volumeControl.value);
  if (!Number.isFinite(level)) return 50;
  return Math.min(100, Math.max(0, level));
}

function syncVolumeToControl() {
  if (player && typeof player.setVolume === 'function') {
    player.setVolume(getVolumeControlLevel());
  }
}

function getPlaylistSnapshot() {
  if (!player || typeof player.getPlaylist !== 'function') {
    return { ids: [], index: -1 };
  }
  const ids = player.getPlaylist() || [];
  const index = typeof player.getPlaylistIndex === 'function' ? player.getPlaylistIndex() : -1;
  return { ids, index };
}

function getCurrentVideoMeta() {
  if (!player || typeof player.getVideoData !== 'function') {
    return { videoId: '', title: '', duration: 0, currentTime: 0, state: -1, index: -1 };
  }
  const videoData = player.getVideoData() || {};
  const duration = typeof player.getDuration === 'function' ? player.getDuration() : 0;
  const currentTime = typeof player.getCurrentTime === 'function' ? player.getCurrentTime() : 0;
  const state = typeof player.getPlayerState === 'function' ? player.getPlayerState() : -1;
  const index = typeof player.getPlaylistIndex === 'function' ? player.getPlaylistIndex() : -1;
  return {
    videoId: videoData.video_id || '',
    title: videoData.title || '',
    duration,
    currentTime,
    state,
    index,
  };
}

function hasWeakVideoMetadata(meta) {
  return !meta.duration || meta.duration <= 0 || !meta.title || meta.title === 'Unknown video';
}

function markPlaylistReady() {
  const { ids } = getPlaylistSnapshot();
  const meta = getCurrentVideoMeta();
  if (ids.length > 0 || meta.videoId) {
    playlistReady = true;
  }
  return playlistReady;
}

function isWithinLoadGrace() {
  return loadStartedAt > 0 && Date.now() - loadStartedAt < LOAD_GRACE_MS;
}

function canRunRecoveryChecks() {
  markPlaylistReady();
  return playlistReady && !isWithinLoadGrace();
}

function lockNavigation() {
  navigationLocked = true;
  navigationLockTimer = clearTimer(navigationLockTimer);
  navigationLockTimer = setTimeout(() => {
    navigationLocked = false;
    navigationLockTimer = null;
  }, NAV_LOCK_MS);
}

function withNavigation(action) {
  if (!player || navigationLocked) return false;
  lockNavigation();
  clearSkipRecoveryTimer();
  clearNavVerifyTimer();
  resetStuckTracking();
  navigationVersion += 1;
  expectPlayback = true;
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
  action();
  return true;
}

function createYouTubePlayer() {
  if (player || playerInitializing) return;
  // Safety check: YT API should always be available here, but log if not
  if (typeof YT === 'undefined') {
    console.error('[Nostalgia] YouTube IFrame API is not loaded. Check network connectivity.');
    showPlayerError('YouTube API failed to load. Please refresh the page.');
    return;
  }
  playerInitializing = true;
  console.log('[Nostalgia] YouTube IFrame API ready, creating player...');
  player = new YT.Player('player', {
    height: '1',
    width: '1',
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      iv_load_policy: 3,
      disablekb: 1,
      playsinline: 1,
      mute: 0,
      fs: 0,
      origin: window.location.origin,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
      onError: onPlayerError,
    },
  });

  clearPlayerReadyFallbackTimer();
  playerReadyFallbackTimer = setTimeout(() => {
    playerReadyFallbackTimer = null;
    if (
      !playerReadyHandled &&
      player &&
      typeof player.getPlayerState === 'function' &&
      typeof player.loadPlaylist === 'function'
    ) {
      console.warn('[Nostalgia] YouTube onReady was missed; continuing with callable player.');
      onPlayerReady();
    }
  }, 3000);
}

function onYouTubeIframeAPIReady() {
  createYouTubePlayer();
}

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installButton.disabled = false;
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  installButton.textContent = 'App Installed';
  installButton.disabled = true;
});

if (window.YT && window.YT.Player) {
  window.setTimeout(createYouTubePlayer, 0);
}

function onPlayerReady() {
  if (playerReadyHandled) return;
  playerReadyHandled = true;
  playerInitializing = false;
  clearPlayerReadyFallbackTimer();
  setInitialPlayerState();

  if (!listenersAttached) {
    volumeControl.addEventListener('input', handleVolumeChange);
    if (progressBar) progressBar.addEventListener('click', handleProgressClick);
    playPauseButton.addEventListener('click', togglePlayPause);
    prevButton.addEventListener('click', playPrevious);
    nextButton.addEventListener('click', playNext);
    playlistsButton.addEventListener('click', togglePlaylistPopover);
    songsButton.addEventListener('click', toggleSongsPopover);
    listenersAttached = true;
  }

  loadPlaylist();
  syncVolumeToControl();
  startHealthMonitor();
}

function handleProgressClick(event) {
  if (!player || typeof player.getDuration !== 'function' || typeof player.seekTo !== 'function') return;
  const rect = progressBar.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const width = rect.width;
  const duration = player.getDuration();
  if (width > 0 && duration > 0) {
    const targetTime = (clickX / width) * duration;
    player.seekTo(targetTime, true);
    resetStuckTracking();
  }
}

function setInitialPlayerState() {
  trackTitle.textContent = 'Loading playlist...';
  trackSubtitle.textContent = 'Please provide a valid YouTube playlist ID.';
  elapsedTime.textContent = '0:00';
  durationTime.textContent = '0:00';
  progressFill.style.width = '0%';
  playPauseButton.disabled = false;
  prevButton.disabled = false;
  nextButton.disabled = false;
  volumeControl.disabled = false;
}

function loadPlaylist() {
  const playlistId = parsePlaylistId(YOUTUBE_PLAYLIST_ID);
  if (!playlistId || playlistId === 'PASTE_MY_PLAYLIST_ID_HERE') {
    showPlayerError('Please set YOUTUBE_PLAYLIST_ID to a valid playlist ID.');
    return;
  }

  recoverySessionSkipped.clear();
  consecutiveErrors = 0;
  resetStuckTracking();
  trackedVideoId = null;
  trackedVideoKey = null;
  trackedPlaylistIndex = -1;
  playlistReady = false;
  expectPlayback = false;
  loadStartedAt = Date.now();
  navigationVersion += 1;
  playlistLoadAttempts = 0;
  clearPlaylistLoadRetryTimer();

  attemptPlaylistLoad(playlistId);
}

function attemptPlaylistLoad(playlistId) {
  if (!player || typeof player.loadPlaylist !== 'function') return;

  playlistLoadAttempts += 1;

  player.loadPlaylist({
    list: playlistId,
    listType: 'playlist',
    index: 0,
    suggestedQuality: 'large',
  });

  playlistLoadRetryTimer = setTimeout(() => {
    playlistLoadRetryTimer = null;
    if (markPlaylistReady()) return;

    if (playlistLoadAttempts < MAX_PLAYLIST_LOAD_ATTEMPTS) {
      console.warn(`[Nostalgia] Playlist not ready; retrying load (${playlistLoadAttempts + 1}/${MAX_PLAYLIST_LOAD_ATTEMPTS}).`);
      attemptPlaylistLoad(playlistId);
      return;
    }

    showPlayerError('Unable to load playlist from YouTube.');
  }, PLAYLIST_LOAD_RETRY_MS);
}

function showPlayerError(message) {
  clearErrorRecoveryTimer();

  trackTitle.textContent = 'Unable to load';
  trackSubtitle.textContent = message;
  trackThumbnail.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/%3E';

  playPauseButton.disabled = false;
  prevButton.disabled = false;
  nextButton.disabled = false;
  volumeControl.disabled = false;

  console.warn(`[Nostalgia] Player error: ${message}`);
}

function markSuccessfulPlayback() {
  consecutiveErrors = 0;
  recoverySessionSkipped.clear();
  skipAttemptsOnCurrentVideo = 0;
  clearSkipRecoveryTimer();
}

function scheduleAutoSkip(reason, options = {}) {
  const { force = false } = options;
  if (skipRecoveryTimer || navigationLocked) return;
  if (!force && !canRunRecoveryChecks()) return;

  const meta = getCurrentVideoMeta();
  if (!meta.videoId && meta.index < 0) return;
  const videoKey = getVideoKey(meta);
  if (!videoKey) return;

  skipAttemptsOnCurrentVideo += 1;
  if (skipAttemptsOnCurrentVideo > MAX_SKIPS_PER_VIDEO) {
    console.warn(`[Nostalgia] Max skip attempts reached for ${videoKey}`);
  }

  const { ids } = getPlaylistSnapshot();
  recoverySessionSkipped.add(videoKey);
  if (ids.length > 0 && recoverySessionSkipped.size >= ids.length) {
    showPlayerError('No playable videos found in this playlist.');
    return;
  }

  console.warn(`[Nostalgia] Scheduling auto-skip: ${reason}`);
  showPlayerError('Unable to play this track. Skipping...');

  const scheduledVersion = navigationVersion;
  skipRecoveryTimer = setTimeout(() => {
    skipRecoveryTimer = null;
    if (scheduledVersion !== navigationVersion) return;
    performAutoSkip(reason);
  }, SKIP_DELAY_MS);
}

function performAutoSkip(reason) {
  if (!player) return;

  const before = getCurrentVideoMeta();
  const { ids, index: beforeIndex } = getPlaylistSnapshot();
  consecutiveErrors += 1;

  console.warn(`[Nostalgia] Auto-skipping (${reason}) video=${before.videoId || 'unknown'} index=${beforeIndex}`);

  resetStuckTracking();
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }

  lockNavigation();
  navigationVersion += 1;
  const skipVersion = navigationVersion;

  if (typeof player.nextVideo === 'function') {
    player.nextVideo();
  }

  clearNavVerifyTimer();
  navVerifyTimer = setTimeout(() => {
    navVerifyTimer = null;
    if (skipVersion !== navigationVersion) return;
    verifyNavigation(before.videoId, beforeIndex, ids);
  }, NAV_VERIFY_MS);
}

function verifyNavigation(previousVideoId, previousIndex, playlistIds) {
  const meta = getCurrentVideoMeta();
  const sameVideo = previousVideoId && meta.videoId === previousVideoId;
  const sameIndex = meta.index >= 0 && meta.index === previousIndex;

  if (!sameVideo && !sameIndex) {
    resetVideoTracking(meta.videoId, meta.index);
    return;
  }

  if (!playlistIds.length) return;

  const targetIndex = previousIndex >= 0 ? (previousIndex + 1) % playlistIds.length : 0;
  if (targetIndex === previousIndex) return;

  console.warn(`[Nostalgia] Navigation did not advance; forcing playVideoAt(${targetIndex})`);
  lockNavigation();
  navigationVersion += 1;
  resetStuckTracking();
  if (typeof player.playVideoAt === 'function') {
    player.playVideoAt(targetIndex);
  }
}

function onPlayerError(event) {
  const errorCode = event.data;
  console.warn(`[Nostalgia] YouTube Player Error ${errorCode}`);

  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }

  showPlayerError(`Unable to play video (Error ${errorCode}). Skipping...`);
  scheduleAutoSkip(`error ${errorCode}`, { force: true });
}

function startHealthMonitor() {
  if (healthCheckInterval) return;

  healthCheckInterval = window.setInterval(runHealthCheck, HEALTH_CHECK_MS);
}

function runHealthCheck() {
  if (!player || typeof player.getPlayerState !== 'function' || navigationLocked || skipRecoveryTimer) {
    return;
  }
  if (!canRunRecoveryChecks()) return;

  const meta = getCurrentVideoMeta();
  if (meta.videoId || meta.index >= 0) {
    resetVideoTracking(meta.videoId, meta.index);
  }

  if (meta.state === YT.PlayerState.PAUSED && userPaused) {
    resetStuckTracking();
    return;
  }

  const now = Date.now();

  // --- BUFFERING: check BEFORE video-end, because a stuck video may report
  // BUFFERING while also sitting at the end of its duration ---
  if (meta.state === YT.PlayerState.BUFFERING) {
    if (lastProgressTime === null) {
      lastProgressTime = meta.currentTime;
      lastProgressAt = now;
    } else if (meta.currentTime > lastProgressTime + 0.05) {
      markProgressAdvancing();
      return;
    }

    if (!stuckStateSince) stuckStateSince = now;
    if (now - stuckStateSince >= STUCK_BUFFERING_MS) {
      scheduleAutoSkip('buffering timeout');
    }
    return;
  }

  // --- PLAYING ---
  if (meta.state === YT.PlayerState.PLAYING) {
    // Video has reached its natural end — normal behavior, don't skip
    if (meta.duration > 0 && meta.currentTime >= meta.duration - 0.5) {
      markProgressAdvancing();
      return;
    }

    if (lastProgressTime === null) {
      lastProgressTime = meta.currentTime;
      lastProgressAt = now;
      return;
    }

    if (meta.currentTime > lastProgressTime + 0.05) {
      markProgressAdvancing();
      return;
    }

    // Time hasn't advanced for STUCK_PLAYING_MS — video is genuinely frozen
    if (now - lastProgressAt >= STUCK_PLAYING_MS) {
      scheduleAutoSkip('frozen playback');
    }
    return;
  }

  // --- UNSTARTED / CUED: video is loading but hasn't started playing ---
  if (meta.state === YT.PlayerState.UNSTARTED || meta.state === YT.PlayerState.CUED) {
    if (!expectPlayback) return;

    if (!stuckStateSince) stuckStateSince = now;

    const elapsed = now - stuckStateSince;
    const weakMeta = hasWeakVideoMetadata(meta);
    if (elapsed >= STUCK_CUED_MS && (weakMeta || elapsed >= STUCK_CUED_MS + 5000)) {
      scheduleAutoSkip('stuck loading');
    }
    return;
  }

  // Any other state (e.g. unknown) — reset tracking to be safe
  markProgressAdvancing();
}

function togglePlaylistPopover() {
  playlistPopover.classList.toggle('hidden');
  songsPopover.classList.add('hidden');
  if (!playlistPopover.classList.contains('hidden')) {
    renderPlaylistItems();
  }
}

function toggleSongsPopover() {
  songsPopover.classList.toggle('hidden');
  playlistPopover.classList.add('hidden');
  if (!songsPopover.classList.contains('hidden')) {
    renderSongsItems();
  }
}

function promptInstallApp() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then(() => {
      deferredInstallPrompt = null;
    });
    return;
  }

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  if (isStandalone) return;

  window.alert('To add Nostalgia Box to your home screen, use your browser menu and choose "Install app" or "Add to Home Screen".');
}

function renderPlaylistItems() {
  const playlistId = parsePlaylistId(YOUTUBE_PLAYLIST_ID);
  if (!playlistId) {
    playlistList.textContent = 'No playlist configured.';
    return;
  }
  playlistList.innerHTML = `
    <div class="popover-item">Playlist ID</div>
    <div class="popover-value">${playlistId}</div>
  `;
}

function renderSongsItems() {
  const { ids } = getPlaylistSnapshot();
  if (!ids.length) {
    songsList.textContent = 'No songs available.';
    return;
  }

  // Build a map of videoId -> title from the player's current metadata
  const titleMap = new Map();
  try {
    const playlistData = player.getPlaylist();
    if (Array.isArray(playlistData)) {
      playlistData.forEach((item) => {
        if (item && typeof item === 'object') {
          const vid = item.video_id || item.videoId;
          const ttl = item.title || item.title_text;
          if (vid) titleMap.set(vid, ttl || 'Unknown track');
        }
      });
    }
  } catch (e) {
    console.warn('[Nostalgia] Could not read playlist titles from player:', e);
  }

  // Fallback: if titleMap is empty, use video IDs as labels
  const hasTitles = titleMap.size > 0;

  songsList.innerHTML = ids
    .map((videoId, idx) => {
      const title = hasTitles ? (titleMap.get(videoId) || videoId) : videoId;
      const thumbnail = `https://img.youtube.com/vi/${videoId}/default.jpg`;
      return `
        <button class="popover-song" type="button" data-index="${idx}" data-video-id="${videoId}">
          <img class="popover-song-thumb" src="${thumbnail}" alt="" loading="lazy" />
          <span class="popover-song-title">${title}</span>
        </button>`;
    })
    .join('');

  songsList.querySelectorAll('.popover-song').forEach((button) => {
    button.addEventListener('click', (event) => {
      const idx = Number(event.currentTarget.dataset.index);
      console.log(`[Nostalgia] User clicked song index ${idx}`);
      playVideoAtIndex(idx);
      songsPopover.classList.add('hidden');
    });
  });
}

function playVideoAtIndex(index) {
  withNavigation(() => {
    if (typeof player.playVideoAt === 'function') {
      player.playVideoAt(index);
    }
  });
}

function onPlayerStateChange(event) {
  const state = event.data;

  if (state === YT.PlayerState.PLAYING) {
    userPaused = false;
    expectPlayback = true;
    markSuccessfulPlayback();
    markPlaylistReady();
    clearPlaylistLoadRetryTimer();
    syncVolumeToControl();
  } else if (state === YT.PlayerState.PAUSED) {
    userPaused = true;
  } else if (state === YT.PlayerState.CUED) {
    userPaused = false;
    if (markPlaylistReady()) clearPlaylistLoadRetryTimer();
    syncVolumeToControl();
  } else if (state === YT.PlayerState.BUFFERING) {
    expectPlayback = true;
    syncVolumeToControl();
  }

  const meta = getCurrentVideoMeta();
  if (meta.videoId || meta.index >= 0) {
    resetVideoTracking(meta.videoId, meta.index);
  }

  if (state === YT.PlayerState.PLAYING || state === YT.PlayerState.BUFFERING || state === YT.PlayerState.CUED) {
    playPauseButton.innerHTML = '<span>&#10074;&#10074;</span>';
    if (!progressInterval) {
      progressInterval = window.setInterval(updateProgress, 500);
    }
    updateTrackInfo();
  } else if (state === YT.PlayerState.PAUSED || state === YT.PlayerState.UNSTARTED) {
    playPauseButton.innerHTML = '<span>&#9658;</span>';
    playPauseButton.disabled = false;
    prevButton.disabled = false;
    nextButton.disabled = false;
    updateTrackInfo();
  } else if (state === YT.PlayerState.ENDED) {
    playPauseButton.innerHTML = '<span>&#9658;</span>';
    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
    }
    playNext();
  }
}

function updateTrackInfo() {
  if (!player || typeof player.getVideoData !== 'function') return;
  const videoData = player.getVideoData();
  const videoId = videoData.video_id;
  const title = videoData.title || 'Playing from YouTube playlist';
  const author = videoData.author || 'YouTube playlist';
  trackTitle.textContent = title;
  trackSubtitle.textContent = author;
  if (videoId) {
    trackThumbnail.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    const youtubeLink = document.getElementById('youtubeLink');
    if (youtubeLink) {
      youtubeLink.href = `https://www.youtube.com/watch?v=${videoId}`;
    }
  }
  if (!songsPopover.classList.contains('hidden')) {
    renderSongsItems();
  }
}

function updateProgress() {
  if (!player || typeof player.getDuration !== 'function') return;
  const duration = player.getDuration();
  const currentTime = player.getCurrentTime();
  if (!duration || duration <= 0) {
    elapsedTime.textContent = '0:00';
    durationTime.textContent = '0:00';
    progressFill.style.width = '0%';
    return;
  }
  const percent = Math.min(100, Math.max(0, (currentTime / duration) * 100));
  progressFill.style.width = `${percent}%`;
  elapsedTime.textContent = formatTime(currentTime);
  durationTime.textContent = formatTime(duration);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
}

function togglePlayPause() {
  if (!player || typeof player.getPlayerState !== 'function') return;
  const state = player.getPlayerState();
  if (state === YT.PlayerState.PLAYING) {
    userPaused = true;
    expectPlayback = false;
    player.pauseVideo();
  } else {
    userPaused = false;
    expectPlayback = true;
    resetStuckTracking();
    player.playVideo();
  }
}

function playPrevious() {
  withNavigation(() => {
    if (typeof player.previousVideo === 'function') {
      player.previousVideo();
    }
  });
}

function playNext() {
  withNavigation(() => {
    if (typeof player.nextVideo === 'function') {
      player.nextVideo();
    }
  });
}

function handleVolumeChange(event) {
  volumeControl.value = event.target.value;
  const level = getVolumeControlLevel();
  if (player && typeof player.setVolume === 'function') {
    player.setVolume(level);
  }
}

function logDimensions() {
  const brand = document.querySelector('.brand');
  const subtitle = document.querySelector('.subtitle');
  const playerCard = document.querySelector('.player-card');
  const navButton = document.querySelector('.nav-button');
  
  if (brand && subtitle && playerCard && navButton) {
    const brandRect = brand.getBoundingClientRect();
    const subtitleRect = subtitle.getBoundingClientRect();
    const playerRect = playerCard.getBoundingClientRect();
    const navRect = navButton.getBoundingClientRect();
    
    const brandStyle = window.getComputedStyle(brand);
    const playerStyle = window.getComputedStyle(playerCard);
    const bodyStyle = window.getComputedStyle(document.body);
    
    console.log('[Nostalgia Dimensions]', {
      viewport: { innerWidth: window.innerWidth, innerHeight: window.innerHeight },
      document: { clientWidth: document.documentElement.clientWidth, clientHeight: document.documentElement.clientHeight },
      brand: { width: brandRect.width, height: brandRect.height, fontSize: brandStyle.fontSize },
      subtitle: { width: subtitleRect.width, height: subtitleRect.height, fontSize: window.getComputedStyle(subtitle).fontSize },
      player: { width: playerRect.width, height: playerRect.height, computedWidth: playerStyle.width, computedHeight: playerStyle.height },
      navButton: { width: navRect.width, height: navRect.height, fontSize: window.getComputedStyle(navButton).fontSize },
      body: { fontSize: bodyStyle.fontSize },
      timestamp: Date.now()
    });
  }
}

function updateStatusWidget() {
  const statusTime = document.getElementById('statusTime');
  const statusDate = document.getElementById('statusDate');
  
  if (!statusTime || !statusDate) return;
  
  // Use IST timezone (Asia/Kolkata)
  const now = new Date();
  const istOptions = { timeZone: 'Asia/Kolkata' };
  
  // Format time: 12:21 pm using IST
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    ...istOptions,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  const timeParts = timeFormatter.formatToParts(now);
  const hour = timeParts.find(p => p.type === 'hour')?.value || '12';
  const minute = timeParts.find(p => p.type === 'minute')?.value || '00';
  const dayPeriod = timeParts.find(p => p.type === 'dayPeriod')?.value?.toLowerCase() || 'am';
  
  statusTime.textContent = `${hour}:${minute} ${dayPeriod}`;
  
  // Format date: THURSDAY, 20 AUGUST · IST using IST
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    ...istOptions,
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
  
  const dateParts = dateFormatter.formatToParts(now);
  const weekday = dateParts.find(p => p.type === 'weekday')?.value?.toUpperCase() || '';
  const day = dateParts.find(p => p.type === 'day')?.value || '';
  const month = dateParts.find(p => p.type === 'month')?.value?.toUpperCase() || '';
  
  statusDate.textContent = `${weekday}, ${day} ${month} · IST`;
}

window.addEventListener('DOMContentLoaded', () => {
  console.log('[Nostalgia] DOMContentLoaded');
  if (!installListenerAttached) {
    installButton.addEventListener('click', promptInstallApp);
    installListenerAttached = true;
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch((error) => {
      console.warn('[Nostalgia] Service worker registration failed:', error);
    });
  }
  updateStatusWidget();
  setTimeout(logDimensions, 100);
});

window.addEventListener('load', () => {
  console.log('[Nostalgia] Window load');
  logDimensions();
  updateStatusWidget();
  setInterval(updateStatusWidget, 60000);
});

window.addEventListener('beforeunload', () => {
  if (progressInterval) clearInterval(progressInterval);
  if (healthCheckInterval) clearInterval(healthCheckInterval);
  clearSkipRecoveryTimer();
  clearErrorRecoveryTimer();
  clearNavVerifyTimer();
  clearPlayerReadyFallbackTimer();
  clearPlaylistLoadRetryTimer();
  navigationLockTimer = clearTimer(navigationLockTimer);
});

window.__nostalgiaTest = {
  getPlaylist: () => getPlaylistSnapshot(),
  getMeta: () => getCurrentVideoMeta(),
  playAt: (index) => playVideoAtIndex(index),
  clickNext: () => playNext(),
  clickPlay: () => togglePlayPause(),
  isReady: () => playlistReady,
};
