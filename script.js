const YOUTUBE_PLAYLIST_ID = 'https://music.youtube.com/playlist?list=PLfcdDdq8aLR0&si=6Ys5o2e9_bCFoP2i';
const YOUTUBE_PLAYLIST_FALLBACK_ID = 'PLfcdDdq8aLR0';
const YOUTUBE_PLAYLIST_FALLBACK_VIDEO_IDS = [
  'jQXGbT839f0',
  'UNJKp605eyA',
  'oAMsaTCrK5c',
  'QDcmC3lwAAw',
  'ga7XhN00BNU',
  '0QtQmLeuqjw',
  '5NzQgJVwFGA',
  'LS647DyRDE4',
  'LOM1JpCkfdc',
  '4eO14TOr1Fw',
  'Wofv6tVg7cM',
  'TJz6rRoMqnM',
  'mEEsjJjB40Q',
  'JFplRVx-M1I',
  '0Ur6PJhqJ9A',
  'jxzrBaHsL88',
  'KT0-Rf9ykIY',
  'x7q7hDs-OWY',
  'trafQj2lJzE',
  'PlQ4ojWNu6c',
  'RmvpyuRaAmg',
  'x8G2GqNkiEY',
  'A7pJUB_88mw',
  'AujzRnJIDCs',
  'xcDJ4PEiy8Q',
  'msCFFPc48Ig',
  'pw7jG9Xaf08',
  'D9xW-K8DiPM',
  '1IOOX6uU1IU',
  'MtGnn6qMTGQ',
  'AVTZvboyR_M',
  '_2CPr2G0NPo',
  'jCcOFk_Lou8',
  'TfN906USOt8',
  '6h5DtYsIHWU',
  'd3UmN-0-3Rg',
  'jymJETc3V8c',
  '8tMzpwMa4xk',
  'FJV2C-O7IPU',
  '7LL0gr94GJA',
  'PFulYCqdXnQ',
  'tf8NV-tUXXY',
  'eaxigNna8hk',
  '2iIcCoEXBN0',
  'aeDKMVB3zuA',
  'fk-GVUEOOfU',
  'W6hRXrwqsxA',
  'PkL38ClCfdQ',
  'qlv3fk8xvfI',
  'uykVxooNL70',
  'moRXlROyIWA',
  'SuAe2lziMqI',
  '1oo1cEUlN9o',
  'p580FsZClv0',
  'wpj2qkaE7YQ',
  'QFoMcZI9vRg',
  'S6RbjC1sUXU',
  'fndUvbC-MCQ',
];
const YOUTUBE_PLAYLIST_FALLBACK_TRACK_INFO = {
  jQXGbT839f0: {
    title: 'Vicky aur Vetal Intro Theme Opening Song HD',
    author: 'Back to 2000s',
  },
  UNJKp605eyA: {
    title: 'Mr Bean The Animated Series Theme Song (From "Mr Bean The Animated Series")',
    author: 'Geek Music - Topic',
  },
  oAMsaTCrK5c: {
    title: 'Doraemon title song hindi',
    author: 'Siddhanta Gadanayak',
  },
  QDcmC3lwAAw: {
    title: 'Doraemon movie steel troops sad song {sabse phele hai pyar} in hindi',
    author: 'All tech of anime',
  },
  ga7XhN00BNU: {
    title: 'Shin Chan Theme Song in HINDI | #hungama #youtube',
    author: 'Introverted_Kid',
  },
  '0QtQmLeuqjw': {
    title: 'Ninja Hattori Classic Outro - Lyrical Video | LyricalLyfe',
    author: 'LyricalLyfe Toons',
  },
  '5NzQgJVwFGA': {
    title: 'Hatim title song - YouTube',
    author: 'shaan production',
  },
  LS647DyRDE4: {
    title: 'Har Kisi Me Hai Nobita (Lyrics) - Doraemon',
    author: 'Anime CoolFire',
  },
  LOM1JpCkfdc: {
    title: 'Door Na Ho Jaaye..Sad Version OST By Pamela Jain',
    author: 'Melodious Background Music',
  },
  '4eO14TOr1Fw': {
    title: 'Yeh Hai Mohabbatein Title Song (Lyrics) | Star Plus | serial',
    author: 'A2Z Lyrics',
  },
  Wofv6tVg7cM: {
    title: 'Miley jab hum tum title song full || T.V serial song||',
    author: 'Vandu Shetty',
  },
  TJz6rRoMqnM: {
    title: 'Baati Hum',
    author: 'Riaz Miya - Topic',
  },
  mEEsjJjB40Q: {
    title: 'Kiteretsu opening theme song in Hindi [HD]',
    author: 'Back to 2000s',
  },
  'JFplRVx-M1I': {
    title: 'Ben 10 - Theme song lyrics [Hindi]',
    author: 'excitingworld05',
  },
  '0Ur6PJhqJ9A': {
    title: 'Pokemon Hindi Theme Song - Lyrical Video | LyricalLyfe',
    author: 'LyricalLyfe Toons',
  },
  jxzrBaHsL88: {
    title: 'Perman Theme Opening || Lyrics Video (Hindi)',
    author: 'excitingworld05',
  },
  'KT0-Rf9ykIY': {
    title: 'Gali Gali Sim Sim Old Theme song in hindi / old childhood songs / Cartoon Worlds',
    author: 'Cartoon Worlds',
  },
  'x7q7hDs-OWY': {
    title: 'shaka laka boom boom Title song - Shakalaka Boom Boom',
    author: 'Kutrala saral',
  },
  trafQj2lJzE: {
    title: 'Jungle Jungle Baat Chali Hai HD | The The Jungle Book Hindi | Mowgli Story | Opening Song |',
    author: 'Down The Memory Lane',
  },
  PlQ4ojWNu6c: {
    title: 'Tom & Jerry',
    author: 'Cartoon Theme Players - Topic',
  },
  RmvpyuRaAmg: {
    title: 'Honey Bunny Song | Paul Shah | Prakriti Shrestha | Nitin Chand',
    author: 'Ur Style Network',
  },
  x8G2GqNkiEY: {
    title: 'Ninja Hattori Opening Song In Hindi',
    author: 'Kaur Jessica',
  },
  A7pJUB_88mw: {
    title: 'Watch Hagemaru Opening Theme Song in Hindi Remastered HD 2K NOW',
    author: 'Lauda Singh',
  },
  AujzRnJIDCs: {
    title: 'Phineas And Ferb Theme Song (V1) (Hindi, V1)',
    author: 'MAX TV Channel',
  },
  xcDJ4PEiy8Q: {
    title: 'Kochikame Opening Song | Wah! Dekhta hai Kya? [In Hindi](1080P_HD)Toon Zaraow',
    author: 'Toon Zaraow',
  },
  msCFFPc48Ig: {
    title: 'Best of luck Nikki Title Theme Song HD',
    author: 'Back to 2000s',
  },
  pw7jG9Xaf08: {
    title: 'Ultra B (Theme) Song Hindi Cutest cartoon',
    author: 'Abhishek Thakur',
  },
  'D9xW-K8DiPM': {
    title: 'Keymon ache ( Title Track) | Cartoons Songs | Ranen Adhikary | RBM RECORD',
    author: 'RBM Record [RMG] - 10M Views - 4 hours ago',
  },
  '1IOOX6uU1IU': {
    title: "Vikram Aur Betaal Title Intro Song | 80's Old Doordarshan TV serial | Arun Govil, Sajjan | 720p",
    author: 'Sadabahar Gaane & Other Collections',
  },
  MtGnn6qMTGQ: {
    title: 'Saath Nibhana Saathiya Title song | Alka Yagnik | Devoleena Bhattacharya | Serial songs',
    author: 'NM Melodies',
  },
  AVTZvboyR_M: {
    title: 'Jadoo Ye Kya Chal Gaya | Ye Rishta Kya Kahlata Hai | Akshara | Serial song | Alka Yagnik | Hina Khan',
    author: 'NM Melodies',
  },
  _2CPr2G0NPo: {
    title: 'Main Hoon Ghatothkach - Child',
    author: 'Nadeem Shravan - Topic',
  },
  jCcOFk_Lou8: {
    title: 'Bob the Builder Theme Song in Hindi | HD',
    author: 'old hindi cartoons',
  },
  TfN906USOt8: {
    title: 'Phineas and Ferb - Theme Song in Hindi [HQ]',
    author: 'TheClubCartoon',
  },
  '6h5DtYsIHWU': {
    title: 'Jake and The Never Land Pirates | Title Song | Hindi | Disney Junior India',
    author: 'Disney Junior India',
  },
  'd3UmN-0-3Rg': {
    title: 'Hero   Bhakti hi Shakti Hai Hindi Opening',
    author: 'Indian Anime Channel',
  },
  jymJETc3V8c: {
    title: 'GreenGoldKids - Chhota Bheem Title Song',
    author: 'Green Gold Kids',
  },
  '8tMzpwMa4xk': {
    title: 'Courage The Cowardly Dog - Hindi OP + ED',
    author: "Ash 'Tyson' Yagami",
  },
  'FJV2C-O7IPU': {
    title: 'Kid VS. Kat Theme Song',
    author: 'annie',
  },
  '7LL0gr94GJA': {
    title: 'Dragon Tales Intro Hindi | Dragon Tales Hindi Opening | Dragon Tales Theme Song Hindi | Dragon Tales',
    author: "Back To 90's",
  },
  PFulYCqdXnQ: {
    title: 'Popeye The Sailor Man Intro Theme Song',
    author: "Back To 90's",
  },
  'tf8NV-tUXXY': {
    title: 'Oggy and the Cockroaches - ALL OPENINGS 1998 - 2018',
    author: 'OGGY',
  },
  eaxigNna8hk: {
    title: 'Power Rangers S.P.D. Opening Hindi',
    author: "Back To 90's",
  },
  '2iIcCoEXBN0': {
    title: 'Title song "the suite life karan & kabir"',
    author: 'Rishabh Yadav',
  },
  aeDKMVB3zuA: {
    title: 'Spongebob Squarepants Theme Song - Hindi',
    author: 'CartoonTv India',
  },
  'fk-GVUEOOfU': {
    title: 'Art Attack intro hindi /Disney Channel/Cartoon Worlds',
    author: 'Cartoon Worlds',
  },
  W6hRXrwqsxA: {
    title: "Takeshi's Castle - Challenge's Theme",
    author: 'JGAdventureZone',
  },
  PkL38ClCfdQ: {
    title: "Krishna||Cartoon network title song||Sri Krishna Janmashtami||90's",
    author: 'Nostalgia Vault',
  },
  qlv3fk8xvfI: {
    title: 'Horrid Henry - Intro (Hindi, Series 1-4)',
    author: 'ABTube27',
  },
  uykVxooNL70: {
    title: 'Amul Milk -  Aage Badta Hai India',
    author: 'Zee TV',
  },
  moRXlROyIWA: {
    title: 'Fevicol Ads- Sofa 60 years | Fevicol New Ad | Classic Ad | Indian Ads Company',
    author: 'Indian Ads Company',
  },
  SuAe2lziMqI: {
    title: 'The Airtel Music',
    author: 'Xavier Raj A',
  },
  '1oo1cEUlN9o': {
    title: 'Fevicol Presents 1959 A Love Story',
    author: 'Shemaroo Bengali',
  },
  p580FsZClv0: {
    title: 'Center fruit final 45 sec.mov',
    author: 'Abhishek Singh',
  },
  wpj2qkaE7YQ: {
    title: 'Washing Powder Nirma - Historic ad - Edit 1',
    author: 'Kailash Surendranath',
  },
  QFoMcZI9vRg: {
    title: "Vicco Turmeric Skin Cream: 24 Carat Beauty... the nature's way",
    author: 'Vicco Labs',
  },
  S6RbjC1sUXU: {
    title: 'TMKOC - RELAXING BGM',
    author: 'Bhushan K',
  },
  'fndUvbC-MCQ': {
    title: 'Nani Teri Morni | Nani Teri Morni Ko Mor Le Gaye | Zappy Toon Rhymes',
    author: 'Zappy Toon Rhymes',
  },
};

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
const volumeIcon = document.querySelector('.volume-icon');
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
const PLAYER_READY_FALLBACK_MS = 1000;
const MAX_PLAYER_READY_FALLBACK_ATTEMPTS = 30;

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
let playlistReadyRendered = false;
let activePlaylistId = '';
let playerReadyFallbackAttempts = 0;
let fallbackPlaylistIndex = 0;
let playerMuted = false;
let previousVolumeLevel = 50;

function parsePlaylistId(value) {
  if (!value) return '';
  const playlistValue = value.trim();

  try {
    const parsedUrl = new URL(playlistValue);
    const listParam = parsedUrl.searchParams.get('list');
    if (listParam && /^[A-Za-z0-9_-]{10,}$/.test(listParam)) return listParam;
  } catch {
    // Fall through to raw ID handling for non-URL values.
  }

  const listMatch = playlistValue.match(/[?&]list=([A-Za-z0-9_-]+)/);
  if (listMatch) return listMatch[1];
  if (/^[A-Za-z0-9_-]{10,}$/.test(playlistValue)) return playlistValue;
  return '';
}

function getPlaylistLoadConfig(playlistId) {
  if (playlistId === YOUTUBE_PLAYLIST_FALLBACK_ID) {
    return { list: YOUTUBE_PLAYLIST_FALLBACK_VIDEO_IDS.slice() };
  }

  return { list: playlistId, listType: 'playlist' };
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

function schedulePlayerReadyFallback() {
  clearPlayerReadyFallbackTimer();
  playerReadyFallbackTimer = setTimeout(() => {
    playerReadyFallbackTimer = null;
    if (playerReadyHandled) return;

    if (
      player &&
      typeof player.getPlayerState === 'function' &&
      typeof player.loadPlaylist === 'function'
    ) {
      console.warn('[Nostalgia] YouTube onReady was missed; continuing with callable player.');
      onPlayerReady();
      return;
    }

    playerReadyFallbackAttempts += 1;
    if (playerReadyFallbackAttempts < MAX_PLAYER_READY_FALLBACK_ATTEMPTS) {
      schedulePlayerReadyFallback();
    }
  }, PLAYER_READY_FALLBACK_MS);
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

function getFallbackTrackInfo(videoId) {
  return YOUTUBE_PLAYLIST_FALLBACK_TRACK_INFO[videoId] || {};
}

function getTrackTitle(videoId, titleMap = new Map()) {
  const mappedTitle = titleMap.get(videoId);
  if (mappedTitle) return mappedTitle;

  const fallbackTrackInfo = getFallbackTrackInfo(videoId);
  return fallbackTrackInfo.title || 'Unknown track';
}

function syncVolumeToControl() {
  if (player && typeof player.setVolume === 'function') {
    player.setVolume(getVolumeControlLevel());
  }
  updateVolumeIcon();
}

function updateVolumeIcon() {
  if (!volumeIcon) return;
  const isMuted = playerMuted || getVolumeControlLevel() === 0;
  volumeIcon.textContent = isMuted ? '🔇' : '🔊';
  volumeIcon.setAttribute('aria-label', isMuted ? 'Unmute' : 'Mute');
  volumeIcon.setAttribute('title', isMuted ? 'Unmute' : 'Mute');
}

function toggleMute(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (!player) return;

  const currentLevel = getVolumeControlLevel();
  if (!playerMuted && currentLevel > 0) {
    previousVolumeLevel = currentLevel;
  }

  playerMuted = !playerMuted;
  if (playerMuted) {
    if (typeof player.mute === 'function') player.mute();
  } else {
    const restoredLevel = previousVolumeLevel > 0 ? previousVolumeLevel : 50;
    if (typeof player.unMute === 'function') player.unMute();
    if (typeof player.setVolume === 'function') player.setVolume(restoredLevel);
    volumeControl.value = restoredLevel;
  }

  updateVolumeIcon();
}

function getPlaylistSnapshot() {
  if (!player || typeof player.getPlaylist !== 'function') {
    return { ids: [], index: -1 };
  }
  let ids = player.getPlaylist() || [];
  let index = typeof player.getPlaylistIndex === 'function' ? player.getPlaylistIndex() : -1;
  if (!ids.length && activePlaylistId === YOUTUBE_PLAYLIST_FALLBACK_ID) {
    ids = YOUTUBE_PLAYLIST_FALLBACK_VIDEO_IDS;
    index = fallbackPlaylistIndex;
  } else if (activePlaylistId === YOUTUBE_PLAYLIST_FALLBACK_ID) {
    index = fallbackPlaylistIndex;
  }
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
    const wasReady = playlistReady;
    playlistReady = true;
    if (!wasReady || !playlistReadyRendered) {
      playlistReadyRendered = true;
      clearPlaylistLoadRetryTimer();
      updateTrackInfo();
      updateProgress();
    }
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
  playerReadyFallbackAttempts = 0;
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

  schedulePlayerReadyFallback();
}

function isUsingFallbackPlaylist() {
  return activePlaylistId === YOUTUBE_PLAYLIST_FALLBACK_ID;
}

function normalizePlaylistIndex(index, playlistLength) {
  if (!playlistLength) return -1;
  return ((index % playlistLength) + playlistLength) % playlistLength;
}

function playFallbackVideoAtIndex(index) {
  const { ids } = getPlaylistSnapshot();
  const nextIndex = normalizePlaylistIndex(index, ids.length);
  if (nextIndex < 0 || typeof player.loadVideoById !== 'function') return false;

  fallbackPlaylistIndex = nextIndex;
  resetStuckTracking();
  updateTrackInfo();
  player.loadVideoById(ids[nextIndex]);
  return true;
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
    if (volumeIcon) {
      volumeIcon.setAttribute('role', 'button');
      volumeIcon.setAttribute('tabindex', '0');
      volumeIcon.addEventListener('click', toggleMute);
      volumeIcon.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          toggleMute(event);
        }
      });
      updateVolumeIcon();
    }
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
  trackSubtitle.textContent = 'Preparing your playlist...';
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
  playlistReadyRendered = false;
  expectPlayback = false;
  fallbackPlaylistIndex = 0;
  loadStartedAt = Date.now();
  activePlaylistId = playlistId;
  navigationVersion += 1;
  playlistLoadAttempts = 0;
  clearPlaylistLoadRetryTimer();

  attemptPlaylistLoad(playlistId);
}

function attemptPlaylistLoad(playlistId) {
  if (!player || typeof player.loadPlaylist !== 'function') return;

  playlistLoadAttempts += 1;

  const playlistLoadConfig = getPlaylistLoadConfig(playlistId);
  let loadedFromFallback = false;
  if (Array.isArray(playlistLoadConfig.list)) {
    player.loadPlaylist(playlistLoadConfig.list, 0, 0, 'large');
    fallbackPlaylistIndex = 0;
    loadedFromFallback = markPlaylistReady();
  } else {
    player.loadPlaylist({
      ...playlistLoadConfig,
      index: 0,
      suggestedQuality: 'large',
    });
  }

  if (loadedFromFallback) return;

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
  if (skipRecoveryTimer || (navigationLocked && !force)) return;
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

  if (isUsingFallbackPlaylist() && playFallbackVideoAtIndex(beforeIndex + 1)) {
    clearNavVerifyTimer();
    navVerifyTimer = setTimeout(() => {
      navVerifyTimer = null;
      if (skipVersion !== navigationVersion) return;
      verifyNavigation(before.videoId, beforeIndex, ids);
    }, NAV_VERIFY_MS);
    return;
  }

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
  if (isUsingFallbackPlaylist() && playFallbackVideoAtIndex(targetIndex)) {
    return;
  }
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

  songsList.innerHTML = ids
    .map((videoId, idx) => {
      const title = getTrackTitle(videoId, titleMap);
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
    if (isUsingFallbackPlaylist() && playFallbackVideoAtIndex(index)) {
      return;
    }
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
  const videoData = player.getVideoData() || {};
  const { ids, index } = getPlaylistSnapshot();
  const fallbackIndex = index >= 0 && index < ids.length ? index : 0;
  const fallbackVideoId = ids.length > 0 ? ids[fallbackIndex] : '';
  const playerVideoId = videoData.video_id || '';
  const videoId = isUsingFallbackPlaylist() && fallbackVideoId ? fallbackVideoId : playerVideoId;
  const fallbackTrackInfo = getFallbackTrackInfo(videoId);
  const canUsePlayerMetadata = !playerVideoId || playerVideoId === videoId;
  const title = (canUsePlayerMetadata && videoData.title) || fallbackTrackInfo.title || 'Playing from YouTube playlist';
  const author = (canUsePlayerMetadata && videoData.author) || fallbackTrackInfo.author || 'YouTube playlist';
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
    if (isUsingFallbackPlaylist() && !getCurrentVideoMeta().videoId && playFallbackVideoAtIndex(getPlaylistSnapshot().index)) {
      return;
    }
    player.playVideo();
  }
}

function playPrevious() {
  withNavigation(() => {
    if (isUsingFallbackPlaylist() && playFallbackVideoAtIndex(getPlaylistSnapshot().index - 1)) {
      return;
    }
    if (typeof player.previousVideo === 'function') {
      player.previousVideo();
    }
  });
}

function playNext() {
  withNavigation(() => {
    if (isUsingFallbackPlaylist() && playFallbackVideoAtIndex(getPlaylistSnapshot().index + 1)) {
      return;
    }
    if (typeof player.nextVideo === 'function') {
      player.nextVideo();
    }
  });
}

function handleVolumeChange(event) {
  volumeControl.value = event.target.value;
  const level = getVolumeControlLevel();
  if (level > 0) {
    previousVolumeLevel = level;
    playerMuted = false;
    if (player && typeof player.unMute === 'function') player.unMute();
  } else {
    playerMuted = true;
    if (player && typeof player.mute === 'function') player.mute();
  }
  if (player && typeof player.setVolume === 'function') {
    player.setVolume(level);
  }
  updateVolumeIcon();
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
