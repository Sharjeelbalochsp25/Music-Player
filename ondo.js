'use strict';

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const wrap = (value, count) => ((value % count) + count) % count;
const relative = (value, count) => wrap(value + count / 2, count) - count / 2;
const formatTime = seconds => Math.floor(seconds / 60) + ':' + String(Math.floor(seconds % 60)).padStart(2, '0');
const pad = number => String(number).padStart(2, '0');
const easing = 'cubic-bezier(.2,.8,.2,1)';
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const images = (url, label = '') => `<img src="${url}" alt="${escapeHtml(label)}" draggable="false">`;
const icons = {
  play:'<path d="m9 5 11 7-11 7z" fill="currentColor" stroke="none"/>',
  pause:'<path d="M9 5v14m6-14v14" stroke-width="3"/>',
  previous:'<path d="M5 5v14m14-14L8 12l11 7z" fill="currentColor"/>',
  next:'<path d="M19 5v14M5 5l11 7-11 7z" fill="currentColor"/>',
  left:'<path d="M21 12H3m7-7-7 7 7 7"/>',
  right:'<path d="M3 12h18m-7-7 7 7-7 7"/>',
  menu:'<path d="M3 8h18M8 16h13"/>',
  search:'<circle cx="10.5" cy="10.5" r="5.8"/><path d="m15 15 5 5"/>',
  heart:'<path d="M20.8 8.5c0 4-8.8 9.9-8.8 9.9S3.2 12.5 3.2 8.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8.8 1.5Z"/>',
  shuffle:'<path d="M3 6h2c5 0 7 12 12 12h4m-4-4 4 4-4 4M3 18h2c2 0 4-3 5-5m3-4c1-2 2-3 4-3h4m-4-4 4 4-4 4"/>',
  repeat:'<path d="M5 12V8a2 2 0 0 1 2-2h13m-4-4 4 4-4 4m3 2v4a2 2 0 0 1-2 2H4m4-4-4 4 4 4"/>',
  repeatOne:'<path d="M5 12V8a2 2 0 0 1 2-2h13m-4-4 4 4-4 4m3 2v4a2 2 0 0 1-2 2H4m4-4-4 4 4 4m3-11 2-1v4"/>',
  volume:'<path d="M3 9h4l5-4v14l-5-4H3zm12 0a4 4 0 0 1 0 6m2-9a8 8 0 0 1 0 12"/>',
  mute:'<path d="M3 9h4l5-4v14l-5-4H3zm12 0 6 6m0-6-6 6"/>',
  expand:'<path d="M5 9V5h4m6 0h4v4m0 6v4h-4m-6 0H5v-4"/>'
};
const icon = name => `<svg class="${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
const eq = '<span class="equalizer" aria-hidden="true"><i></i><i></i><i></i></span>';
const setIcon = (button, name) => {
  if (button.dataset.icon !== name || !button.firstElementChild) {
    button.dataset.icon = name;
    button.innerHTML = icon(name);
  }
};

const archiveCatalog = mainCatalog.length ? mainCatalog : albums;
const initialQueue = archiveCatalog.flatMap(album => album.tracks);
const initialAlbum = archiveCatalog[0];
const firstYear = Math.min(1998, ...archiveCatalog.map(album => album.year));
const lastYear = Math.max(2026, ...archiveCatalog.map(album => album.year));
const yearSpan = lastYear - firstYear;
const savedKey = 'ondo-saved-v1';
let initialSaved;
try { initialSaved = JSON.parse(localStorage.getItem(savedKey)); } catch { /* storage may be unavailable */ }
const saved = new Set(Array.isArray(initialSaved) ? initialSaved.filter(item => typeof item === 'string') : []);
const state = {
  category: genres[0], collection: archiveCatalog, album: initialAlbum, position: 0, target: 0,
  drag: null, wheel: null,
  archiveQueue:initialQueue, queue:initialQueue, index:0, elapsed:0, playing:false, pending:false, volume:.65, lastVolume:.65,
  shuffle:false, shuffleHistory:[], repeat:0, saved, views:[], query:'', playbackRequest:0
};
const track = () => state.queue[state.index];
const stage = $('#stage');
const recordContainer = $('#records');
const caption = $('#caption');
const sheet = $('#sheet');
const content = $('#sheet-content');
const marker = $('#year-marker');
const audio = new ArchiveAudio();
let records = [];
let dimensions;
let renderArchive = true;
let frame = 0;
let lastFrame = 0;
let previousFocus;
let sheetAnimation;
let originAlbum = null;
let suppressClickUntil = 0;
let statusTimer;

function animate(node, keyframes, options) {
  if (motion.matches || !node.animate) return null;
  return node.animate(keyframes, { easing, ...options });
}

function makeRecords() {
  recordContainer.innerHTML = state.collection.map((album, virtual) => {
    const control = `type="button" tabindex="-1" data-action="record" aria-label="${escapeHtml(album.title)} by ${escapeHtml(album.artist)}"`;
    return `<div class="record" data-record="${virtual}" data-album="${album.id}" aria-hidden="true" style="--spine:${album.palette[0]};--spine-ink:${album.palette[1]}">
      <button class="spine" ${control} aria-hidden="true"><span>${escapeHtml(album.title)} · ${escapeHtml(album.artist)}</span><b>${pad(album.index+1)}</b></button>
      <button class="front" ${control}></button>
      <button class="reverse" ${control} aria-hidden="true"></button></div>`;
  }).join('');
  records = [...recordContainer.children].map(node => ({ node, front:node.querySelector('.front'), visible:false }));
  measureArchive();
}

function measureArchive() {
  const height = records[0]?.node.offsetHeight || 220;
  const perspective = 1400;
  const falloff = height * 1.3;
  const integral = [0];
  const rate = u => 2 / (1 + (u / falloff) ** 1.6);
  for (let u = 2; u <= height * 4 + 2; u += 2) {
    integral.push(integral.at(-1) + rate(u - 2) + rate(u));
  }
  dimensions = { height, perspective, falloff, integral, width:stage.clientWidth };
  renderArchive = true;
  requestFrame();
}

function paintArchive() {
  const { height, perspective, falloff, integral, width } = dimensions;
  const mobile = width < 768;
  const spacing = height * .13;
  const opening = height * (.94 - .095 + 1.4 * .035);
  const centered = wrap(Math.round(state.target), records.length);
  const limit = state.collection.length === 1 ? .55 : mobile ? 7.5 : 11.5;
  for (const [virtual, record] of records.entries()) {
    const r = relative(virtual - state.position, records.length);
    const distance = Math.abs(r);
    const visible = distance < limit;
    if (visible !== record.visible) {
      record.visible = visible;
      record.node.style.visibility = visible ? 'visible' : 'hidden';
      record.node.setAttribute('aria-hidden', String(!visible));
      if (visible && !record.front.firstChild) {
        const artwork = images(state.collection[virtual].art.replace('600x600bb','300x300bb'));
        record.front.innerHTML = artwork;
        record.node.querySelector('.reverse').innerHTML = artwork;
      }
      if (!visible) record.front.tabIndex = -1;
    }
    if (!visible) continue;
    record.front.tabIndex = virtual === centered ? 0 : -1;
    const centerBlend = Math.max(0, 1 - distance);
    const open = centerBlend * centerBlend * (3 - 2 * centerBlend);
    const arc = distance < 1 ? (r + Math.sin(Math.PI * r) / Math.PI) / 2 : Math.sign(r) / 2;
    const u = r * spacing + opening * arc;
    const magnitude = Math.abs(u);
    const scale = 1 / (1 + (magnitude / falloff) ** 1.6);
    const k = 1 / scale;
    const index = Math.floor(magnitude / 2);
    const screenX = integral[index] + (integral[index + 1] - integral[index]) * (magnitude / 2 - index);
    const x = Math.sign(u) * screenX * k * (mobile ? .75 : 1);
    const y = (height * .21 * (1 - scale) + open * height * .012) * k;
    const z = perspective * (1 - k) + open * height * .1;
    const rotateY = (90 + Math.sign(u) * Math.min(1, magnitude / falloff) * 26) * (1 - open);
    record.node.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,${z.toFixed(2)}px) rotateY(${rotateY.toFixed(2)}deg)`;
    record.node.style.zIndex = String(80 - Math.round(distance * 5));
    record.node.style.setProperty('--spine-shade', Math.min(.6, open * .55 + (1 - scale) * .32).toFixed(3));
    record.node.style.setProperty('--cover-shade', ((1 - open) * .82).toFixed(3));
  }
  const position = Math.floor(state.position);
  const size = state.collection.length;
  const from = state.collection[wrap(position, size)].year;
  const to = state.collection[wrap(position + 1, size)].year;
  const blend = state.position - position;
  const year = to < from ? (blend < .5 ? from : to) : from + (to - from) * blend;
  marker.style.left = (year - firstYear) / yearSpan * 100 + '%';
}

function paintCaption(direction = 1) {
  const album = state.album;
  const lines = [
    ['h1', 'caption-title', escapeHtml(album.title)],
    ['div', 'caption-artist', artistLink(album)],
    ['div', 'caption-subtitle', `<span lang="ja">${album.japanese}</span>`],
    ['div', 'caption-meta', `${album.year} — ${album.genre}`]
  ];
  if (!caption.children.length) {
    caption.innerHTML = '<div class="caption-mask"></div>'.repeat(3) + '<i class="caption-divider"></i><div class="caption-mask"></div>';
  }
  [...caption.querySelectorAll('.caption-mask')].forEach((mask,index) => {
    const [tag, className, body] = lines[index];
    const old = mask.lastElementChild;
    const next = document.createElement(tag);
    next.className = className;
    next.innerHTML = body;
    for (const child of [...mask.children]) if (child !== old) child.remove();
    mask.append(next);
    const options = { duration:620, delay:index * 26, fill:'both' };
    if (old) {
      old.getAnimations().forEach(animation => animation.cancel());
      old.inert = true;
      const out = animate(old,[{ transform:'translateY(0)' },{ transform:`translateY(${-direction * 105}%)` }],options);
      if (out) out.onfinish = () => old.remove(); else old.remove();
    }
    animate(next,[{ transform:`translateY(${direction * 105}%)` },{ transform:'translateY(0)' }],options);
  });
  $('#archive-count').textContent = `${pad(state.collection.indexOf(album) + 1)} / ${pad(state.collection.length)}`;
  const single = state.collection.length < 2;
  $('[data-action="previous-album"]').disabled = single;
  $('[data-action="next-album"]').disabled = single;
}

function selectPosition(next, play = true) {
  const previous = state.target;
  state.target = Math.round(next);
  const album = state.collection[wrap(state.target, state.collection.length)];
  if (album !== state.album) {
    state.album = album;
    paintCaption(Math.sign(state.target - previous) || 1);
    if (play) setQueue(state.archiveQueue, state.archiveQueue.indexOf(album.tracks[0]));
  }
  renderArchive = true;
  requestFrame();
}

function selectAlbum(album, play = true) {
  const index = state.collection.indexOf(album);
  if (index === -1) return;
  const base = Math.round(state.target);
  selectPosition(base + relative(index - base, state.collection.length), play);
}

function changeCategory(category) {
  if (category === state.category) return;
  state.category = category;
  state.collection = category === genres[0] ? archiveCatalog : archiveCatalog.filter(album => album.category === category);
  if (!state.collection.length) state.collection = albums.filter(album => album.category === category);
  const current = state.collection.includes(state.album) ? state.album : state.collection[0];
  state.position = state.collection.length + state.collection.indexOf(current) - (motion.matches ? 0 : .24);
  state.target = Math.round(state.position);
  const changed = current !== state.album;
  state.album = current;
  const wasArchiveQueue = state.queue === state.archiveQueue;
  state.archiveQueue = state.collection.flatMap(album => album.tracks);
  clearTimeout(state.wheel);
  state.wheel = null;
  makeRecords();
  paintCaption();
  if (changed) {
    setQueue(state.archiveQueue, state.archiveQueue.indexOf(current.tracks[0]));
  } else if (wasArchiveQueue && state.archiveQueue.includes(track())) {
    state.index = state.archiveQueue.indexOf(track());
    state.queue = state.archiveQueue;
    state.shuffleHistory = [];
  }
  updatePlaybackControls();
  $$('#genres button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.id === category)));
  animate(recordContainer,[{ clipPath:'inset(0 44% 0 44%)' },{ clipPath:'inset(0)' }],{ duration:540 });
}

function requestFrame() {
  if (!frame && !document.hidden) frame = requestAnimationFrame(updateFrame);
}

function updateFrame(timestamp) {
  frame = 0;
  const dt = lastFrame ? Math.min(.05, (timestamp - lastFrame) / 1000) : 1 / 60;
  lastFrame = timestamp;
  const distance = state.target - state.position;
  const traveling = Math.abs(distance) > .0004;
  if (traveling) {
    state.position += motion.matches ? distance : distance * (1 - Math.exp(-(state.drag?.moved ? 18 : 5.2) * dt));
  } else if (distance) {
    state.position = state.target;
    renderArchive = true;
  }
  if (!state.drag && !state.wheel && Math.abs(state.target) > records.length * 4) {
    const delta = state.target - wrap(state.target, records.length);
    state.target -= delta;
    state.position -= delta;
  }
  if (renderArchive || traveling) {
    paintArchive();
    renderArchive = false;
  }
  if (state.playing) tickPlayback(.26);
  if (traveling || renderArchive || state.playing) requestFrame();
  else lastFrame = 0;
}

function seek(position) {
  state.elapsed = clamp(position, 0, track().duration);
  if (state.playing) {
    Promise.resolve(audio.play(track(), state.elapsed)).catch(() => {
      stopPlayback();
      notify('Preview could not resume. Press Play to try again.');
    });
  }
  updateProgress();
}

function updateProgress() {
  const duration = track().duration;
  const elapsed = Math.min(duration, state.elapsed);
  $$('[data-el="seek"]').forEach(input => {
    if (Number(input.max) !== duration) input.max = duration;
    input.value = elapsed;
    input.style.setProperty('--fill', elapsed / duration * 100 + '%');
    input.setAttribute('aria-valuetext', `${formatTime(elapsed)} of ${formatTime(duration)}`);
  });
  $$('[data-el="elapsed"]').forEach(el => {
    const label = formatTime(elapsed);
    if (el.textContent !== label) el.textContent = label;
  });
  $$('[data-el="duration"]').forEach(el => {
    const label = formatTime(duration);
    if (el.textContent !== label) el.textContent = label;
  });
}

function updatePlaybackControls() {
  const current = track();
  const playing = state.playing;
  const album = current.album;
  const cover = $('#player-cover');
  if (cover.dataset.album !== album.id) {
    cover.dataset.album = album.id;
    cover.innerHTML = images(album.art);
  }
  $('#player-track').textContent = current.name;
  const artist = $('#player-artist');
  artist.textContent = album.artist;
  artist.dataset.view = 'artist';
  artist.dataset.id = album.artistAlbumId || album.id;
  $('#sheet-track').textContent = current.name + ' · ' + album.artist;
  const source = $('#playback-source');
  if (source) {
    source.hidden = !current.storeUrl;
    if (current.storeUrl) {
      source.innerHTML = `Preview courtesy of <a href="${escapeHtml(current.storeUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHtml(current.name)} on iTunes">iTunes ↗</a>`;
    }
  }
  const expanded = $('.expanded-player');
  if (expanded) {
    const art = expanded.querySelector('img');
    if (art.getAttribute('src') !== album.art) art.src = album.art;
    art.alt = album.title + ' album artwork';
    $('#sheet-title').textContent = current.name;
    const expandedArtist = expanded.querySelector('.artist-link');
    expandedArtist.textContent = album.artist;
    expandedArtist.dataset.id = album.artistAlbumId || album.id;
    expanded.querySelector('[data-kind="track"]').dataset.id = current.id;
  }
  document.body.classList.toggle('is-playing', playing);
  records.forEach(record => record.node.classList.toggle('vinyl-playing', playing && record.node.dataset.album === album.id));
  for (const button of $$('[data-action="toggle"]')) {
    setIcon(button, playing ? 'pause' : 'play');
    button.setAttribute('aria-label', playing ? 'Pause' : 'Play');
  }
  $$('[data-action="shuffle"]').forEach(button => button.setAttribute('aria-pressed', String(state.shuffle)));
  $$('[data-action="repeat"]').forEach(button => {
    setIcon(button, state.repeat === 2 ? 'repeatOne' : 'repeat');
    button.setAttribute('aria-label', ['Repeat off','Repeat queue','Repeat one'][state.repeat]);
    button.setAttribute('aria-pressed', String(state.repeat !== 0));
  });
  $$('[data-action="mute"]').forEach(button => {
    setIcon(button, state.volume ? 'volume' : 'mute');
    button.setAttribute('aria-label', state.volume ? 'Mute' : 'Unmute');
  });
  $$('[data-el="volume"]').forEach(input => {
    input.value = state.volume;
    input.style.setProperty('--fill', state.volume * 100 + '%');
  });
  $$('.track-row').forEach(row => {
    const active = row.dataset.track === current.id;
    const symbol = row.querySelector('.track-symbol');
    row.classList.toggle('current', active);
    symbol.innerHTML = active && playing ? eq : icon('play');
    row.querySelector('.track-start').setAttribute('aria-label', (active && playing ? 'Restart ' : 'Play ') + row.querySelector('.track-name').textContent);
  });
  updateSavedControls();
  updateProgress();
}

function notify(message) {
  clearTimeout(statusTimer);
  const banner = $('#status');
  // Modal dialogs occupy the browser top layer.
  (sheet.open ? sheet : document.body).append(banner);
  banner.textContent = message;
  statusTimer = setTimeout(() => { banner.textContent = ''; }, 4200);
}

async function startPlayback() {
  document.querySelector('#real-audio')?.pause();
  const request = ++state.playbackRequest;
  state.pending = true;
  try {
    await audio.prepare(state.volume, track());
    if (request !== state.playbackRequest) return;
    if (state.elapsed >= track().duration) state.elapsed = 0;
    await audio.play(track(), state.elapsed);
    if (request !== state.playbackRequest) return;
    state.playing = true;
    requestFrame();
  } catch {
    if (request !== state.playbackRequest) return;
    state.playing = false;
    audio.stop();
    notify('Audio could not start. Press Play to try again.');
  }
  state.pending = false;
  updatePlaybackControls();
}

function stopPlayback() {
  ++state.playbackRequest;
  if (state.playing) state.elapsed = Math.min(track().duration, audio.time());
  state.pending = false;
  state.playing = false;
  audio.stop();
  updatePlaybackControls();
}

function togglePlayback() {
  if (state.playing || state.pending) stopPlayback();
  else void startPlayback();
}

function setQueue(queue, index, play = true) {
  if (!queue.length || !queue[index]) return;
  stopPlayback();
  if (state.queue !== queue) state.shuffleHistory = [];
  state.queue = queue;
  state.index = index;
  state.elapsed = 0;
  selectAlbum(track().album, false);
  updatePlaybackControls();
  if (play) void startPlayback();
}

function moveTrack(direction, automatic = false) {
  const { queue, index, shuffle, shuffleHistory, repeat, pending, playing } = state;
  if (direction < 0 && state.elapsed > 3) return seek(0);
  if (automatic && repeat === 2) return seek(0);
  let next = index + direction;
  if (shuffle && queue.length > 1) {
    if (direction < 0) {
      next = shuffleHistory.pop() ?? Math.max(0, index - 1);
    } else {
      const choices = queue.map((_, i) => i).filter(i => i !== index && !shuffleHistory.includes(i));
      if (!choices.length && (!automatic || repeat === 1)) {
        shuffleHistory.length = 0;
        choices.push(...queue.map((_, i) => i).filter(i => i !== index));
      }
      next = choices.length ? choices[Math.floor(Math.random() * choices.length)] : queue.length;
      if (next < queue.length) shuffleHistory.push(index);
    }
  }
  if (automatic && next >= queue.length && repeat === 0) {
    stopPlayback();
    state.elapsed = track().duration;
    updateProgress();
    return;
  }
  next = automatic || direction > 0 ? wrap(next, queue.length) : Math.max(0, next);
  setQueue(queue, next, automatic || playing || pending || queue === state.archiveQueue);
}

function tickPlayback(lookahead) {
  if (!state.playing) return;
  state.elapsed = audio.time();
  if (state.elapsed >= track().duration) moveTrack(1, true);
  else {
    audio.schedule(lookahead);
    if (!document.hidden) updateProgress();
  }
}

let hiddenScheduler;
document.addEventListener('visibilitychange', () => {
  clearInterval(hiddenScheduler);
  if (document.hidden) {
    cancelAnimationFrame(frame);
    frame = lastFrame = 0;
    tickPlayback(1.65);
    hiddenScheduler = setInterval(() => tickPlayback(1.65), 500);
  } else {
    requestFrame();
  }
});

const iconButton = (action, symbol, label, attributes = '') =>
  `<button class="icon-button${action === 'toggle' ? ' primary-play' : ''}" data-action="${action}" data-icon="${symbol}" aria-label="${label}" ${attributes}>${icon(symbol)}</button>`;
const saveButton = (kind,id) =>
  iconButton('save','heart','Save '+kind,`data-kind="${kind}" data-id="${id}" aria-pressed="false"`);
const artistLink = (album, className = 'artist-link') =>
  `<button class="${className}" data-view="artist" data-id="${album.artistAlbumId || album.id}">${escapeHtml(album.artist)}</button>`;
const intro = (title, eyebrow, subtitle = '') =>
  `<div class="sheet-intro"><span class="eyebrow">${eyebrow}</span><h1 id="sheet-title">${title}</h1>${subtitle ? `<p>${subtitle}</p>` : ''}</div>`;
const playButton = (label, id, queue) =>
  `<button class="filled-button" data-action="play-queue" data-queue="${queue}" data-id="${id}" data-index="0">▶ &nbsp; ${label}</button>`;
const trackTotal = tracks => formatTime(tracks.reduce((total,song) => total + song.duration,0));

function updateSavedControls() {
  $('#player-save').dataset.id = track().id;
  $('#player-save').dataset.kind = 'track';
  $$('[data-kind]').forEach(button => {
    const {kind,id} = button.dataset;
    const active = state.saved.has(kind + ':' + id);
    button.setAttribute('aria-pressed', String(active));
    button.setAttribute('aria-label', (active ? 'Remove saved ' : 'Save ') + kind);
  });
}

function toggleSaved(kind, id, trigger) {
  const key = kind + ':' + id;
  if (state.saved.has(key)) state.saved.delete(key);
  else state.saved.add(key);
  try {
    localStorage.setItem(savedKey, JSON.stringify([...state.saved]));
  } catch {
    notify('Saved music is available for this session.');
  }
  if (state.views.at(-1)?.type === 'saved') {
    const buttons = $$('[data-action="save"]');
    const index = buttons.indexOf(trigger);
    renderView();
    const remaining = $$('[data-action="save"]');
    (remaining[Math.min(index,remaining.length-1)] || $('#close-sheet')).focus();
  } else {
    updateSavedControls();
  }
}

function trackList(tracks, queue, id, showAlbums = false) {
  return `<ol class="track-list">${tracks.map((song,index) => `
    <li class="track-row" data-track="${song.id}">
      <button class="track-start" data-action="play-queue" data-queue="${queue === 'saved' ? 'track' : queue}" data-id="${queue === 'saved' ? song.id : id}" data-index="${index}">
        <small>${pad(index+1)}</small>${showAlbums ? images(song.album.art) : ''}
        <span class="track-name">${escapeHtml(song.name)}</span><span class="track-symbol">${icon('play')}</span>
      </button>${artistLink(song.album,'track-artist')}<small>${formatTime(song.duration)}</small>${saveButton('track',song.id)}
    </li>`).join('')}</ol>`;
}

function photoCredit(credit) {
  return `<p class="photo-credit">Photo by <a href="${credit.source}">${escapeHtml(credit.author)}</a> · <a href="${credit.licenseUrl}">${credit.license}</a> · Display cropped</p>`;
}

function card(item, type) {
  const artist = type === 'artist';
  const playlist = type === 'playlist';
  const title = artist ? item.artist : item.title;
  const art = artist ? item.portrait : item.art;
  const meta = artist ? (item.artistAlbumId ? item.genre : item.genre + ' / ' + item.location) :
    playlist ? `${item.tracks.length} TRACKS / ${trackTotal(item.tracks)}` : item.artist + ' / ' + item.year;
  return `<article class="card">
    <button class="card-main" data-view="${type}" data-id="${item.id}">
      <span class="card-art">${images(art)}</span>
      <span class="card-name">${escapeHtml(title)} <span aria-hidden="true">↗</span></span>
      <span class="card-meta">${escapeHtml(meta)}</span>
    </button>
    ${artist && item.portraitCredit ? photoCredit(item.portraitCredit) : ''}
    ${playlist ? `<p>${escapeHtml(item.description)}</p><div class="card-actions">${iconButton('play-queue','play','Play '+title,`data-queue="playlist" data-id="${item.id}" data-index="0"`)}${saveButton(type,item.id)}</div>` :
      artist ? '' : `<div class="card-actions">${saveButton(type,item.id)}</div>`}
  </article>`;
}

function detailArt(url, label, captionText, ink, credit) {
  const labelText = escapeHtml(label);
  const artwork = ink ? `<svg class="ink-art" viewBox="0 0 800 800" role="img" aria-label="${labelText}">
    <defs><filter id="bleed" x="-25%" y="-25%" width="150%" height="150%"><feTurbulence type="fractalNoise" baseFrequency=".027" numOctaves="3" seed="26" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="45" xChannelSelector="R" yChannelSelector="G"/></filter>
    <mask id="ink-mask"><g filter="url(#bleed)">${[[250,313],[574,546],[400,100],[147,690],[678,225],[437,768],[382,425]].map(([x,y])=>circle(x,y,0,'white')).join('')}</g></mask></defs>
    <image href="${url}" width="800" height="800" mask="url(#ink-mask)"/></svg>` : images(url,label);
  return `<figure class="detail-visual">${artwork}<figcaption class="art-caption">${captionText}</figcaption>${credit ? photoCredit(credit) : ''}</figure>`;
}

function albumDetail(album, ink) {
  return `<div class="detail"><div class="detail-copy">
    <span class="eyebrow" lang="ja">${album.japanese}</span><h1 id="sheet-title">${escapeHtml(album.title)}</h1>
    ${artistLink(album)}<p class="detail-meta">${album.year} / ${album.genre} / ${album.tracks.length} ${album.tracks.length === 1 ? 'track' : 'tracks'}</p>
    <p>${escapeHtml(album.description)}</p>
    <div class="detail-actions">${playButton(album.artistAlbumId ? 'Play Preview' : 'Play Album',album.id,'album')}${saveButton('album',album.id)}</div>
    <h2>Tracklist</h2>${trackList(album.tracks,'album',album.id)}
    </div>${detailArt(album.art,album.title+' album artwork','ONDO RECORDS / ARCHIVE NO. '+String(album.index+1).padStart(3,'0'),ink)}</div>`;
}

function playlistDetail(playlist) {
  return `<div class="detail"><div class="detail-copy">
    <span class="eyebrow">${playlist.mood}</span><h1 id="sheet-title">${playlist.title}</h1>
    <p>${playlist.description}</p><span class="eyebrow">${playlist.tracks.length} tracks / ${trackTotal(playlist.tracks)}</span>
    <div class="detail-actions">${playButton('Play Playlist',playlist.id,'playlist')}${saveButton('playlist',playlist.id)}</div>
    <h2>Tracklist</h2>${trackList(playlist.tracks,'playlist',playlist.id,true)}
    </div>${detailArt(playlist.art,playlist.title+' playlist artwork','ONDO SELECTIONS')}</div>`;
}

function artistDetail(album) {
  const related = albums.filter(item => item !== album).sort((a,b) =>
    Number(b.category === album.category) - Number(a.category === album.category) ||
    Math.abs(a.year-album.year) - Math.abs(b.year-album.year)).slice(0,3);
  return `<div class="detail"><div class="detail-copy">
    <span class="eyebrow">Artist profile / アーティスト</span><h1 id="sheet-title">${escapeHtml(album.artist)}</h1>
    <span class="eyebrow">${album.artistAlbumId ? album.genre : album.genre + ' / ' + album.location}</span>
    <p>${escapeHtml(album.bio)}</p><div class="detail-actions">${playButton('Play Artist',album.id,'album')}</div>
    <h2>Popular tracks</h2>${trackList(album.tracks,'album',album.id)}
    <h2>Featured album</h2><button class="search-result" data-view="album" data-id="${album.id}">${images(album.art)}${escapeHtml(album.title)}<small>${album.year} ↗</small></button>
    </div>${detailArt(album.portrait,album.artist + (album.portraitCredit ? ' photograph' : ' artwork'),
      album.artistAlbumId ? album.artist : album.location, false, album.portraitCredit)}</div>
    <h2>Related artists</h2><div class="card-grid">${related.map(item=>card(item,'artist')).join('')}</div>`;
}

function savedView() {
  const collect = (kind, lookup) => [...state.saved]
    .filter(item => item.startsWith(kind + ':')).map(item => lookup.get(item.slice(kind.length+1))).filter(Boolean);
  const savedAlbums = collect('album',albumById);
  const savedTracks = collect('track',trackById);
  const savedPlaylists = collect('playlist',playlistById);
  return intro('Saved','Your collection') +
    (savedAlbums.length ? `<h2>Albums</h2><div class="card-grid">${savedAlbums.map(item=>card(item,'album')).join('')}</div>` : '') +
    (savedTracks.length ? '<h2>Tracks</h2>' + trackList(savedTracks,'saved','',true) : '') +
    (savedPlaylists.length ? `<h2>Playlists</h2><div class="card-grid">${savedPlaylists.map(item=>card(item,'playlist')).join('')}</div>` : '') +
    (savedAlbums.length + savedTracks.length + savedPlaylists.length === 0 ? '<p>Save a track, album or playlist using its heart to find it here.</p>' : '');
}

const rangeMarkup = '<div class="progress"><time data-el="elapsed"></time><input data-el="seek" type="range" min="0" step=".1" value="0" aria-label="Seek through track"><time data-el="duration"></time></div>';
function expandedPlayer() {
  return `<div class="expanded-player">${images(track().album.art,track().album.title+' album artwork')}
    <span class="eyebrow">Now playing</span><h1 id="sheet-title">${escapeHtml(track().name)}</h1>${artistLink(track().album)}
    <div class="transport-buttons">${iconButton('previous-track','previous','Previous track')}${iconButton('toggle','play','Play')}${iconButton('next-track','next','Next track')}</div>
    ${rangeMarkup}<div class="player-options">${iconButton('shuffle','shuffle','Shuffle')}${iconButton('repeat','repeat','Repeat off')}${iconButton('mute','volume','Mute')}
    <input data-el="volume" type="range" min="0" max="1" step=".01" aria-label="Volume">${saveButton('track',track().id)}</div></div>`;
}

function paintSearch() {
  const query = state.query.trim().toLocaleLowerCase();
  const results = $('#search-results');
  if (!query) {
    results.innerHTML = '<p>Find an album, artist, track, genre or playlist.</p>';
    return;
  }
  const matches = (...fields) => fields.some(field => field.toLocaleLowerCase().includes(query));
  const result = (label, image, note, attributes) =>
    `<button class="search-result" ${attributes}>${images(image)}${escapeHtml(label)}<small>${escapeHtml(note)}</small></button>`;
  const groups = [
    ['Albums', albums.filter(item => matches(item.title,item.genre,item.category,item.japanese)).map(item =>
      result(item.title,item.art,item.genre,`data-view="album" data-id="${item.id}"`))],
    ['Artists', [...featuredArtists,...albums].filter(item => matches(item.artist,item.genre)).map(item =>
      result(item.artist,item.portrait,item.location,`data-view="artist" data-id="${item.id}"`))],
    ['Tracks', [...trackById.values()].filter(item => matches(item.name)).map(item =>
      result(item.name,item.album.art,item.album.artist,`data-action="search-track" data-id="${item.id}"`))],
    ['Playlists', playlists.filter(item => matches(item.title,item.mood)).map(item =>
      result(item.title,item.art,item.mood,`data-view="playlist" data-id="${item.id}"`))]
  ];
  results.innerHTML = groups.filter(([,items]) => items.length)
    .map(([label,items]) => `<h2>${label}</h2>${items.join('')}`).join('') || '<p>No matches in the archive.</p>';
}

const viewTemplates = {
  album: (id, ink) => albumDetail(albumById.get(id), ink),
  artist: id => artistDetail(albumById.get(id)),
  playlist: id => playlistDetail(playlistById.get(id)),
  playlists: () => intro('Playlists','Curated for listening','Collections of sound for every state of mind.') +
    `<div class="card-grid">${playlists.map(item=>card(item,'playlist')).join('')}</div>`,
  artists: () => intro('The Artists','Artist index / アーティスト','The voices behind the sound.') +
    `<div class="card-grid">${[...featuredArtists,...albums].map(item=>card(item,'artist')).join('')}</div>`,
  about: () => intro('About ONDO','音の記憶 / Memories of sound') +
    '<p>Browse official music previews on vinyl by track, genre or release year. The original ONDO playlists also feature synthesized tracks.</p>',
  menu: () => intro('Archive menu','ONDO') +
    '<button class="menu-item" data-action="discover">Discover <span>↗</span></button>' +
    [['playlists','Playlists'],['artists','Artists'],['search','Search'],['saved','Saved music'],['about','About']].map(([type,label]) =>
      `<button class="menu-item" data-view="${type}">${label} <span>↗</span></button>`).join(''),
  search: () => intro('Search','Archive index') + '<label class="search-label" for="archive-search">Search the archive</label><input class="search-box" id="archive-search" type="search" placeholder="SEARCH THE ARCHIVE..." autocomplete="off"><div id="search-results" aria-live="polite"></div>',
  saved: savedView,
  now: expandedPlayer
};

function renderView(ink = false) {
  const {type,id,query} = state.views.at(-1);
  content.innerHTML = viewTemplates[type](id,ink);
  $('#back-sheet').hidden = state.views.length < 2;
  if (type === 'search') {
    state.query = query;
    $('#archive-search').value = state.query;
    paintSearch();
  }
  updatePlaybackControls();
}

function coverRectangle() {
  const virtual = wrap(Math.round(state.target), records.length);
  return records[virtual]?.front.getBoundingClientRect();
}

function clipRectangle(rect) {
  return `inset(${clamp(rect.top,0,innerHeight)}px ${clamp(innerWidth-rect.right,0,innerWidth)}px ${clamp(innerHeight-rect.bottom,0,innerHeight)}px ${clamp(rect.left,0,innerWidth)}px)`;
}

function revealInk() {
  const artwork = $('.ink-art');
  if (!artwork) return;
  const delays = [0,120,220,300,360,420,180];
  const finish = () => artwork.querySelector('image').removeAttribute('mask');
  const animations = [...artwork.querySelectorAll('circle')].map((dot,index) =>
    animate(dot,[{r:'0px'},{r:'385px'}],{duration:1250,delay:520+delays[index],fill:'forwards'}));
  if (animations.some(animation => !animation)) finish();
  else Promise.all(animations.map(animation=>animation.finished)).then(finish,finish);
}

function openView(type, id, trigger, rect) {
  const current = state.views.at(-1);
  if (!viewTemplates[type] || (current?.type === type && current?.id === id)) return;
  const fresh = !sheet.open;
  sheetAnimation?.cancel();
  if (fresh) {
    previousFocus = trigger || document.activeElement;
    originAlbum = rect ? state.album.id : null;
  } else if (current) {
    current.scroll = sheet.scrollTop;
  }
  const ink = !!rect && type === 'album' && !motion.matches;
  state.views.push({type,id,scroll:0,query:''});
  renderView(ink);
  if (fresh) sheet.showModal();
  sheet.scrollTop = 0;
  const start = rect ? clipRectangle(rect) : 'inset(12% 0 0 0)';
  sheetAnimation = animate(sheet,[{clipPath:start},{clipPath:'inset(0)'}],
    {duration:ink?1050:320,easing:ink?'cubic-bezier(.76,0,.18,1)':easing});
  if (ink) {
    $$('.detail-copy > *').forEach((node,index) => animate(node,
      [{clipPath:'inset(0 0 100%)',transform:'translateY(16px)'},{clipPath:'inset(0)',transform:'translateY(0)'}],
      {duration:650,delay:620+index*65,fill:'both'}));
    revealInk();
  }
  (type === 'search' ? $('#archive-search') : $('#close-sheet')).focus({preventScroll:true});
}

function closeView(all = false) {
  if (!sheet.open) return;
  if (!all && state.views.length > 1) {
    sheetAnimation?.cancel();
    state.views.pop();
    renderView();
    sheet.scrollTop = state.views.at(-1).scroll;
    (state.views.at(-1).type === 'search' ? $('#archive-search') : $('#close-sheet')).focus({preventScroll:true});
    return;
  }
  sheetAnimation?.cancel();
  const fromCover = originAlbum === state.album.id && state.views.at(-1)?.type === 'album' && state.views.at(-1)?.id === originAlbum;
  const rect = fromCover ? coverRectangle() : null;
  const finish = () => {
    state.views.length = 0;
    sheet.close();
    content.replaceChildren();
    document.body.append($('#status'));
    if (previousFocus?.isConnected) previousFocus.focus({preventScroll:true});
    else $('[data-action="discover"]').focus({preventScroll:true});
  };
  sheetAnimation = animate(sheet,[{clipPath:'inset(0)'},{clipPath:rect?clipRectangle(rect):'inset(10% 0 0 0)'}],
    {duration:rect?850:230,easing:rect?'cubic-bezier(.76,0,.18,1)':easing,fill:'forwards'});
  if (sheetAnimation) sheetAnimation.onfinish = finish;
  else finish();
}

function openSelected(trigger) {
  openView('album',state.album.id,trigger,coverRectangle());
}

function nearestYear(year) {
  return state.collection.reduce((best, album) =>
    Math.abs(album.year - year) < Math.abs(best.year - year) ? album : best);
}

function setVolume(value) {
  state.volume = clamp(value, 0, 1);
  if (state.volume) state.lastVolume = state.volume;
  audio.volume(state.volume);
  updatePlaybackControls();
}

function queueFromButton(button) {
  const {queue,id,index} = button.dataset;
  if (queue === 'track') {
    const song = trackById.get(id);
    setQueue(song.album.tracks,song.order);
  } else {
    const source = queue === 'playlist' ? playlistById.get(id) : albumById.get(id);
    setQueue(source.tracks,Number(index));
  }
}

function clickRecord(button) {
  if (performance.now() < suppressClickUntil) return;
  const virtual = Number(button.closest('[data-record]').dataset.record);
  const selected = virtual === wrap(Math.round(state.target), records.length);
  const centered = Math.abs(relative(virtual - state.position, records.length)) < .15;
  if (selected && centered && button.classList.contains('front')) {
    openSelected(button);
  } else {
    selectPosition(state.target + relative(virtual - state.target, records.length));
  }
}

const actions = {
  discover: () => closeView(true),
  close: () => closeView(true),
  back: () => closeView(),
  category: button => changeCategory(button.dataset.id),
  'next-album': () => selectPosition(state.target+1),
  'previous-album': () => selectPosition(state.target-1),
  year: button => selectAlbum(nearestYear(Number(button.dataset.id))),
  record: clickRecord,
  toggle: togglePlayback,
  'next-track': () => moveTrack(1),
  'previous-track': () => moveTrack(-1),
  'play-queue': queueFromButton,
  'search-track': button => {
    const song = trackById.get(button.dataset.id);
    setQueue(song.album.tracks,song.order);
    openView('album',song.album.id,button);
  },
  shuffle: () => {
    state.shuffle = !state.shuffle;
    state.shuffleHistory.length = 0;
    updatePlaybackControls();
  },
  repeat: () => {
    state.repeat = (state.repeat + 1) % 3;
    updatePlaybackControls();
  },
  mute: () => setVolume(state.volume ? 0 : state.lastVolume),
  save: button => toggleSaved(button.dataset.kind,button.dataset.id,button),
  'save-current': button => toggleSaved('track',track().id,button)
};

document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  const {action,view,id} = button.dataset;
  if (view) openView(view,id,button);
  else actions[action]?.(button);
});

document.addEventListener('input', event => {
  const input = event.target;
  if (input.id === 'archive-search') {
    state.query = input.value;
    state.views.at(-1).query = state.query;
    paintSearch();
  } else if (input.dataset.el === 'seek') {
    seek(Number(input.value));
  } else if (input.dataset.el === 'volume') {
    setVolume(Number(input.value));
  }
});

sheet.addEventListener('cancel', event => {
  event.preventDefault();
  closeView();
});

document.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.defaultPrevented) return;
  if (event.key === 'Escape' && sheet.open) {
    event.preventDefault();
    if (!event.repeat) closeView();
    return;
  }
  if (event.target.closest('input,textarea,select,[contenteditable]')) return;
  const onButton = event.target.closest('button');
  if (event.code === 'Space' && !onButton) {
    event.preventDefault();
    if (!event.repeat) togglePlayback();
  } else if (!sheet.open && (event.key === 'ArrowLeft' || event.key === 'ArrowRight') && state.collection.length > 1) {
    event.preventDefault();
    selectPosition(state.target + (event.key === 'ArrowRight' ? 1 : -1));
  }
});

stage.addEventListener('pointerdown', event => {
  if (event.button !== 0 || !event.isPrimary || state.collection.length < 2) return;
  if (state.wheel) {
    clearTimeout(state.wheel);
    state.wheel = null;
    selectPosition(state.target);
  }
  state.drag = {id:event.pointerId,x:event.clientX,y:event.clientY,start:state.target,moved:false};
});

stage.addEventListener('pointermove', event => {
  const drag = state.drag;
  if (drag && event.pointerId === drag.id) {
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.moved && Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) {
      drag.moved = true;
      stage.setPointerCapture(event.pointerId);
      stage.classList.add('dragging');
    }
    if (drag.moved) {
      const sensitivity = clamp(dimensions.height * .29, 48, 90);
      state.target = drag.start - dx / sensitivity;
      requestFrame();
    }
  }
});

function endDrag(event) {
  const drag = state.drag;
  if (!drag || drag.id !== event.pointerId) return;
  state.drag = null;
  stage.classList.remove('dragging');
  if (drag.moved) {
    suppressClickUntil = performance.now() + 300;
    selectPosition(state.target);
  }
}

window.addEventListener('pointerup',endDrag);
window.addEventListener('pointercancel',endDrag);
stage.addEventListener('lostpointercapture',endDrag);

stage.addEventListener('wheel', event => {
  if (state.collection.length < 2 || event.ctrlKey || state.drag?.moved) return;
  event.preventDefault();
  const primary = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
  if (!primary) return;
  const pixels = primary * (event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? 120 : 1);
  const delta = clamp(pixels / 103,-2,2);
  if (!state.wheel) state.wheelStart = state.target;
  state.target += delta;
  clearTimeout(state.wheel);
  state.wheel = setTimeout(() => {
    state.wheel = null;
    const change = state.target - state.wheelStart;
    selectPosition(Math.abs(change) > .06 && Math.abs(change) < .5 ?
      state.wheelStart + Math.sign(change) : state.target);
  },130);
  requestFrame();
},{passive:false});

function initialize() {
  $('#collection-years').textContent = `${firstYear}–${lastYear}`;
  $('.player').insertAdjacentHTML('afterend','<p id="playback-source" class="playback-source" hidden></p>');
  $$('[data-icon]').forEach(button => setIcon(button,button.dataset.icon));
  $('#genres').innerHTML = genres.map((genre,index) =>
    `<button data-action="category" data-id="${genre}" aria-pressed="${index === 0}">${genre}</button>`).join('');
  const scale = $('#timeline-scale');
  scale.insertAdjacentHTML('beforeend',sequence(yearSpan + 1,index => {
    const year = firstYear + index;
    const major = year % 5 === 0 || index === 0 || index === yearSpan;
    const mobile = [firstYear,2005,2015,lastYear].includes(year);
    return `<button class="timeline-tick${major?' major':''}${mobile?' mobile-year':''}" style="--year:${index/yearSpan*100}%"
      data-action="year" data-id="${year}" ${major?'':'tabindex="-1"'} aria-label="Find album closest to ${year}"><i></i>${major?`<span>${year}</span>`:''}</button>`;
  }));
  scale.addEventListener('click',event => {
    if (event.target.closest('button')) return;
    const rect = scale.getBoundingClientRect();
    selectAlbum(nearestYear(firstYear + (event.clientX - rect.left) / rect.width * yearSpan));
  });
  makeRecords();
  paintCaption();
  paintArchive();
  updatePlaybackControls();
  new ResizeObserver(measureArchive).observe(stage);
  motion.addEventListener('change', () => {
    renderArchive = true;
    requestFrame();
  });
  animate($('.brand'),[{clipPath:'inset(0 0 100%)'},{clipPath:'inset(0)'}],{duration:500,fill:'both'});
  animate(scale,[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 -12px)'}],{duration:600,delay:150,fill:'both'});
  animate($('.player'),[{transform:'translateY(12px)',opacity:.3},{transform:'translateY(0)',opacity:1}],{duration:570,delay:120,fill:'both'});
  if (!motion.matches) {
    state.position -= .66;
    renderArchive = true;
    requestFrame();
  }
}

initialize();
