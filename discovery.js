'use strict';

// Official store results are requested on demand and previews are streamed.
const realAudio = document.querySelector('#real-audio');
const realResults = document.querySelector('#real-results');
const musicStatus = document.querySelector('#music-status');
let musicRequest = 0;
let releases = [];

function searchStore(term) {
  return new Promise((resolve, reject) => {
    const callback = 'ondoStore' + Date.now() + Math.floor(Math.random() * 10000);
    const script = document.createElement('script');
    const cleanup = () => {
      clearTimeout(timeout);
      script.remove();
      delete window[callback];
    };
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error('The music store took too long to respond.'));
    }, 15000);
    window[callback] = data => { cleanup(); resolve(data.results || []); };
    script.onerror = () => { cleanup(); reject(new Error('The music store could not be reached.')); };
    const params = new URLSearchParams({term, entity:'song', media:'music', limit:'12', country:'US', callback});
    script.src = 'https://itunes.apple.com/search?' + params;
    document.head.append(script);
  });
}

function storeUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && (url.hostname.endsWith('.apple.com') || url.hostname.endsWith('.mzstatic.com')) ? url.href : '';
  } catch { return ''; }
}

async function loadMusic(term) {
  const request = ++musicRequest;
  musicStatus.textContent = 'Finding releases by ' + term + '…';
  realResults.setAttribute('aria-busy','true');
  try {
    const results = await searchStore(term);
    if (request !== musicRequest) return;
    releases = results.filter(item => item.kind === 'song' && storeUrl(item.previewUrl));
    realResults.innerHTML = releases.map((item,index) => {
      const image = storeUrl(item.artworkUrl100)?.replace('100x100bb','600x600bb');
      const note = featuredTrackNotes[item.trackId];
      const context = item.collectionName && item.collectionName !== item.trackName
        ? ' · ' + escapeHtml(item.collectionName) : '';
      return `<article class="release-card">${image ? images(image,item.collectionName) : ''}
        <h3>${escapeHtml(item.trackName)}</h3>
        <p>${escapeHtml(item.artistName)} · ${new Date(item.releaseDate).getFullYear()}${context}</p>
        ${note ? `<p>${escapeHtml(note)}</p>` : ''}
        <div class="release-actions"><button class="outline-button" data-preview="${index}">▶ Preview</button></div></article>`;
    }).join('');
    musicStatus.textContent = releases.length ? 'Official releases · previews provided courtesy of iTunes' : 'No playable previews found. Try another artist or song.';
  } catch (error) {
    if (request !== musicRequest) return;
    realResults.replaceChildren();
    musicStatus.textContent = error.message + ' Search again to retry.';
  } finally {
    if (request === musicRequest) realResults.setAttribute('aria-busy','false');
  }
}

$('#music-search').addEventListener('submit', event => {
  event.preventDefault();
  const query = $('#music-query').value.trim();
  if (query) void loadMusic(query);
});
const wellKnownArtists = ['The Weeknd','Daft Punk','Frank Ocean','SZA','Arctic Monkeys','Billie Eilish','Kendrick Lamar','Atif Aslam'];
$('#artist-shortcuts').innerHTML = wellKnownArtists.map(name => `<button type="button">${escapeHtml(name)}</button>`).join('');
$('#artist-shortcuts').addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  $('#music-query').value = button.textContent;
  void loadMusic(button.textContent);
});
realResults.addEventListener('click', async event => {
  const button = event.target.closest('[data-preview]');
  if (!button) return;
  const release = releases[Number(button.dataset.preview)];
  stopPlayback();
  $('#preview-title').textContent = release.trackName + ' — ' + release.artistName;
  $('#preview-player').hidden = false;
  realAudio.src = storeUrl(release.previewUrl);
  try { await realAudio.play(); }
  catch { musicStatus.textContent = 'Preview could not start. Use the audio Play control to retry.'; }
});
realAudio.addEventListener('play', () => stopPlayback());
realAudio.addEventListener('error', () => { musicStatus.textContent = 'This preview is currently unavailable. Try another track.'; });
$('#close-preview').addEventListener('click', () => {
  realAudio.pause();
  $('#preview-player').hidden = true;
});
$('#home-playlists').innerHTML = playlists.map(playlist => card(playlist,'playlist')).join('');
$('#home-artists').innerHTML = featuredArtists.filter(artist => artist.portraitCredit)
  .map(artist => card(artist,'artist')).join('');
updateSavedControls();
$('.archive-key span').textContent = 'THE VINYL COLLECTION';
$('.browse-hint').innerHTML = '<span></span> DRAG TO BROWSE · SCROLL TO DISCOVER <span></span>';
void loadMusic('The Weeknd');
