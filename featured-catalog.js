'use strict';

const featuredCategory = genre => /electronic|dance/i.test(genre) ? 'Electronic' :
  /rock|alternative/i.test(genre) ? 'Indie' :
  /soul|r&b/i.test(genre) ? 'Soul' : 'Pop';

const artistPortraits = new Map([
  ['The Weeknd', {
    file:'the-weeknd.jpg', author:'Brian Ziff', license:'CC BY-SA 4.0',
    source:'https://commons.wikimedia.org/wiki/File:The_Weeknd_Portrait_by_Brian_Ziff.jpg',
    licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'
  }],
  ['Billie Eilish', {
    file:'billie-eilish.jpg', author:'Lars Crommelinck', license:'CC BY 2.0',
    source:'https://commons.wikimedia.org/wiki/File:Billie_Eilish_at_Pukkelpop_Festival_-_18_AUGUST_2019_(08)_(cropped).jpg',
    licenseUrl:'https://creativecommons.org/licenses/by/2.0/'
  }],
  ['Adele', {
    file:'adele.jpg', author:'Marc E.', license:'CC BY 2.0',
    source:'https://commons.wikimedia.org/wiki/File:Adele_2016.jpg',
    licenseUrl:'https://creativecommons.org/licenses/by/2.0/'
  }],
  ['Dua Lipa', {
    file:'dua-lipa.jpg', author:'TNT Brasil', license:'CC BY 3.0',
    source:'https://commons.wikimedia.org/wiki/File:Dua_Lipa_Grammys_2024.jpg',
    licenseUrl:'https://creativecommons.org/licenses/by/3.0/'
  }]
]);

const mainCatalog = [];
const featuredArtists = [];
const seenTracks = new Set();
const maxSongs = Math.max(0, ...featuredReleases.map(release => release.songs.length));
for (let slot = 0; slot < maxSongs; slot++) {
  for (const release of featuredReleases) {
    const song = release.songs[slot];
    if (!song || seenTracks.has(song.trackId)) continue;
    seenTracks.add(song.trackId);
    const genre = song.primaryGenreName || release.primaryGenreName;
    const index = mainCatalog.length;
    const art = (song.artworkUrl100 || release.artworkUrl100).replace('100x100bb','600x600bb');
    const artistAlbumId = 'featured-' + release.songs[0].trackId;
    const album = {
      id:'record-' + song.trackId,
      title:song.trackName,
      artist:release.artistName,
      year:new Date(song.releaseDate || release.releaseDate).getFullYear(),
      genre,
      category:featuredCategory(genre), japanese:'アーティスト・セレクション', index,
      artistAlbumId, location:'Featured artist',
      palette:['#17191d','#ece8e0','#1f3fb0'],
      art, portrait:art,
      description:featuredTrackNotes[song.trackId] || featuredArtistNotes[release.artistName],
      bio:featuredArtistNotes[release.artistName],
      storeUrl:song.trackViewUrl
    };
    const track = { id:'itunes-' + song.trackId, name:song.trackName, duration:30,
      previewUrl:song.previewUrl, storeUrl:song.trackViewUrl, album, order:0 };
    album.tracks = [track];
    albumById.set(album.id,album);
    trackById.set(track.id,track);
    mainCatalog.push(album);

    if (slot === 0) {
      const portraitCredit = artistPortraits.get(release.artistName);
      const artist = { ...album, id:artistAlbumId, title:release.artistName, tracks:[],
        portrait:portraitCredit ? 'assets/artists/' + portraitCredit.file : album.portrait, portraitCredit,
        storeUrl:release.collectionViewUrl, description:album.bio };
      albumById.set(artist.id, artist);
      featuredArtists.push(artist);
    }
    albumById.get(artistAlbumId).tracks.push(track);
  }
}
