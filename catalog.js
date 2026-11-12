'use strict';

const genres = ['All Sounds', 'Ambient', 'Electronic', 'Indie', 'Soul', 'Jazz', 'Pop'];
const entries = [
  ['signal-bloom', 'Signal Bloom', 'Mira Vale', 1998, 'Ambient', 'Ambient', '信号の花', 63, 'Reykjavík, Iceland', ['#243da2','#f5ead3','#e66a4d'], [223,182,269,248],
    'Shortwave tones drift through a bed of soft tape hiss. The opening note keeps returning, slightly detuned, like a station found again after a long drive.',
    'Mira Vale grew up listening to marine weather broadcasts on her mother’s radio. In Reykjavík she splices shortwave recordings into synthesizer pieces, leaving the tuning gaps and sudden bursts of static in the mix.',
    ['First Transmission','Luminous Dust','Low Orbit','The Signal Returns']],
  ['velvet-hour', 'Velvet Hour', 'Sora Grey', 2001, 'Neo-Soul', 'Soul', 'ビロードの時間', 82, 'London, UK', ['#631d38','#f7ddba','#ae5366'], [211,198,232,275],
    'The electric piano is close enough to hear the keys lift. Bass and brushed percussion stay just behind the beat until the final track drops the drums altogether.',
    'Sora Grey learned harmony by working out the chords of her father’s soul singles. She records with a small London trio and favors full takes that capture the give and take between the players.',
    ['Slow Motion','Honeylight','Blue Velvet','Until Morning']],
  ['chrome-dreams', 'Chrome Dreams', 'NOVA/9', 2004, 'Synthwave', 'Electronic', 'クロームの夢', 108, 'Osaka, Japan', ['#303e64','#e3eafa','#76a8d8'], [220,194,202,262],
    'Glass-bright arpeggios cut across a steady drum machine. The closing track loosens the grid, letting the same sequence run at two speeds until the parts fall back together.',
    'NOVA/9 builds tracks on a rack of secondhand synthesizers in Osaka. Early sessions were recorded straight to minidisc, a habit that taught the producer to commit to sounds while writing.',
    ['Electric Memory','Chrome City','Digital Hearts','Midnight Protocol']],
  ['moon-tides', 'Moon Tides', 'Kaito Rue', 2007, 'Downtempo', 'Ambient', '月の潮', 72, 'Kamakura, Japan', ['#1e3155','#f2e4c6','#6b87a9'], [257,194,278,226],
    'A low pulse recedes under suspended chords and shoreline recordings. Listen between phrases for the small clatter of stones as the water pulls away.',
    'Kaito Rue records the coast near his home in Kamakura before sunrise. He plays fragments back through a sampler and uses their natural rhythms to determine the length of each piece.',
    ['Lunar Current','Weightless','Ocean Without Shore','Last Reflection']],
  ['warm-static', 'Warm Static', 'Hazel Echo', 2010, 'Indie Rock', 'Indie', '暖かな雑音', 116, 'Melbourne, Australia', ['#dc5b36','#fae2b9','#24429e'], [183,207,239,202],
    'Overdriven guitars and clipped drums arrive in brief, bright bursts. Between songs you can hear the amp hum and the sound of someone setting a guitar down.',
    'Hazel Echo started by swapping guitar loops with friends in Melbourne. She still records in the same rehearsal room, close-miking a battered practice amp and letting the room bleed into the drums.',
    ['Radio Silence','Golden Haze','Polaroid Summer','Stay Awhile']],
  ['blue-noon', 'Blue Noon', 'Nami Sol', 2013, 'Jazz Fusion', 'Jazz', '青い午後', 91, 'Yokohama, Japan', ['#193a92','#eae3c9','#171c2c'], [222,204,269,247],
    'Four quiet jazz compositions follow the city between its final train and first morning light. Brushed drums and an unhurried Rhodes leave room for the bass to finish each phrase.',
    'Nami Sol studied piano in Yokohama and began arranging for a trio while playing the last set at a harbor bar. Her records make space for the soft edges of a performance, from the ring of an open string to the pause before the drummer comes back in.',
    ['Midnight in Blue','Paper Skies','A Thousand Miles of Quiet','Blue Noon']],
  ['neon-rain', 'Neon Rain', 'ARC-Ø', 2015, 'Electronica', 'Electronic', 'ネオンの雨', 124, 'Seoul, South Korea', ['#20274d','#f9c8cf','#ec477e'], [176,236,218,264],
    'Broken percussion cuts through bright FM tones. On the third track the drums fall away and the high synths are left to trace a melody in the open.',
    'ARC-Ø began making beats on the late bus home from work in Seoul. Their early recordings combine bus-stop ambience with sharply tuned percussion and short, tightly edited melodic phrases.',
    ['Pulse 01','Glass District','After the Rain','Night Signal']],
  ['sunroom', 'Sunroom', 'The Sunday Letters', 2017, 'Indie Pop', 'Indie', '日だまり', 99, 'Bristol, UK', ['#a67237','#f1dd9b','#52673c'], [197,208,235,176],
    'Fingerpicked guitar, spare piano and a barely audible shaker fill the room a little at a time. The band kept the windows open while recording the title track.',
    'The Sunday Letters formed around a rented upright piano in Bristol. All four members write, and arrangements often begin with two people trading a melody before the rest of the band comes in.',
    ['Sunday Morning','Open Windows','Everything in Gold','Sunroom']],
  ['afterimage', 'Afterimage', 'Veda North', 2019, 'Alternative', 'Indie', '残像', 105, 'Montréal, Canada', ['#452b69','#f2ad9e','#e45a38'], [183,244,226,261],
    'A motif appears on guitar, then returns blurred and doubled on a tape loop. Parts arrive a beat late or drift into the next song, where their outlines become clearer.',
    'Veda North studied printmaking before assembling a band in Montréal. She treats guitar parts much like a second ink pass, setting the repeat slightly out of register so both layers stay visible.',
    ['Unsaid','Ghost Frames','Another Version','Afterimage']],
  ['peach-frequency', 'Peach Frequency', 'Luma Bloom', 2021, 'Dream Pop', 'Pop', '桃の周波数', 112, 'Auckland, New Zealand', ['#be4c57','#f5c2a2','#8c3557'], [185,219,203,230],
    'Soft bass and weightless harmonies sit under melodies with clean, precise edges. Halfway through the record, a drum fill breaks the spell for just one bar.',
    'Luma Bloom writes pop songs on a pocket recorder while walking along the Auckland waterfront. She keeps the shape of those first takes and builds layered voices and synthesizers around them.',
    ['Peach Radio','Soft Focus','Satellite Love','Stay in the Light']],
  ['night-transit', 'Night Transit', 'KIRO', 2023, 'Deep House', 'Electronic', '夜の交通', 120, 'Berlin, Germany', ['#171f39','#bfd0da','#678aa8'], [224,250,238,271],
    'Deep bass and restrained drums hold a steady pace while station sounds and distant chords pass through the stereo field.',
    'KIRO came to production through a long-running late-night radio slot in Berlin. His house tracks are built for the quiet stretches of a set, with changes small enough to notice only after they have happened.',
    ['Platform Nine','Last Train','Sleepless City','Night Transit']],
  ['soft-future', 'Soft Future', 'ALTO/ONE', 2026, 'Ambient Pop', 'Ambient', '柔らかな未来', 68, 'Helsinki, Finland', ['#587c9a','#dce6e5','#254c72'], [209,243,256,238],
    'Breathy keyboards and overlapping bells leave stretches of near silence. In the closing minutes the bells thin out until the opening chord can be heard again.',
    'The Helsinki duo ALTO/ONE builds patches that shift slowly without a performer touching the controls. One member works from long synthesizer takes, while the other cuts and arranges them by ear.',
    ["Tomorrow's Weather",'Weight of Light','Soft Machines','A New Beginning']]
];

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, char => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
})[char]);
const sequence = (count, draw) => Array.from({ length: count }, (_, index) => draw(index)).join('');
const svgUrl = (svg) => 'data:image/svg+xml,' + encodeURIComponent(svg);
const line = (x1,y1,x2,y2,stroke,width=2) =>
  `<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${stroke}" stroke-width="${width}"/>`;
const circle = (x,y,r,fill,extra='') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
const square = (x,y,w,h,fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`;
const path = (d, fill, stroke='none', width=2) => `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"/>`;

const compositions = [
  (a,b,c) => square(0,0,800,800,a) + sequence(27, i => circle(382,420,18+i*13,'none',`stroke="${b}" stroke-width="${i%4===0?4:1.5}"`)) + circle(592,234,27,c) + line(60,420,740,420,b,1),
  (a,b,c) => square(0,0,800,800,a) + sequence(34,i => path(`M-45 ${360+i*8}C160 ${105+i*8} 265 ${650+i*6} 465 ${352+i*4}S710 ${230+i*9} 850 ${530+i*7}`,'none',i%6===0?b:c,2.6)),
  (a,b,c) => square(0,0,800,800,a) + sequence(19,i => line(i*47,0,i*47,800,c,.8)+line(0,i*47,800,i*47,c,.8)) + path('M196 469 365 191 645 346 527 620Z',b) + path('M365 191 401 498 645 346Z',c) + path('M196 469 401 498 527 620Z','#828da2') + path('M365 191 401 498 196 469Z','#f6f2e5'),
  (a,b,c) => square(0,0,800,800,a) + circle(451,325,173,b) + sequence(22,i => path(`M0 ${387+i*13}Q208 ${329+i*15} 405 ${398+i*13}T800 ${409+i*12}`,'none',i%4===0?b:c,2)),
  (a,b,c) => square(0,0,800,800,b) + path('M0 206 684 105 734 484 55 605Z',a) + path('M174 355 798 276 798 705 242 713Z',c) + circle(359,400,136,'url(#dots)') + sequence(12,i => line(110,421+i*11,543,330+i*11,b,2)),
  (a,b,c) => square(0,0,800,800,b) + circle(505,373,181,a) + circle(505,373,181,'url(#dots)') + sequence(11,i => line(60,464+i*13,740,464+i*13,a,1)) + path('M0 603 52 575 121 508 162 531 214 461 254 476 321 415 378 497 421 477 470 538 516 550 576 615 641 585 700 613 800 577V800H0Z',c) + path('M0 665 121 586 205 631 296 564 392 615 471 608 581 663 691 643 800 688V800H0Z','#292f40') + path('M178 536 217 491 254 509 318 449 370 518 324 484 270 550 251 528Z','#eae3c9') + circle(713,126,10,'#db654a'),
  (a,b,c) => square(0,0,800,800,a) + sequence(28,i => line(i*36-80,70,i*36-245,639,i%5===0?c:b,i%5===0?4:1)) + path('M0 700V531H100V416H167V567H239V322H347V485H406V402H463V545H513V272H598V471H673V381H751V519H800V800H0Z','#101733') + sequence(20,i => square(35+i*39,579+(i%4)*17,12,4,i%2?c:b)),
  (a,b,c) => square(0,0,800,800,b) + sequence(9,i=>line(110+i*73,135,110+i*73,685,a,1)+line(110,135+i*69,694,135+i*69,a,1)) + path('M353 695Q397 480 465 242M418 549Q520 446 602 445M389 628Q298 521 208 499','none',c,8) + sequence(9,i=>`<ellipse cx="${459-i*22}" cy="${268+i*41}" rx="${37+i*2}" ry="17" transform="rotate(${i%2?35:-32} ${459-i*22} ${268+i*41})" fill="${c}"/>`) + circle(608,233,66,a),
  (a,b,c) => square(0,0,800,800,b) + path('M119 714C301 636 68 432 212 281S564 91 622 301 430 533 675 693Z',a) + path('M263 714C455 650 170 399 358 265S677 123 705 333 498 541 760 689Z',c) + path('M119 714C301 636 68 432 212 281S564 91 622 301 430 533 675 693Z','url(#dots)'),
  (a,b,c) => square(0,0,800,800,b) + sequence(34,i=>path(`M-40 ${254+i*8}C180 ${210+i*12} 180 ${544-i*5} 401 ${441+i*4}S620 ${158+i*15} 840 ${367+i*6}`,'none',i%5===0?c:a,2.3)) + circle(648,522,45,a),
  (a,b,c) => square(0,0,800,800,a) + sequence(22,i=>line(400,296,i*65-300,800,i%3===0?b:c,i%3===0?2.4:1)) + sequence(14,i=>line(0,303+i*i*2.8,800,303+i*i*2.8,c,1)) + path('M111 625 400 296 687 625 510 227H290Z','none',b,4) + circle(400,297,7,'#ef825f'),
  (a,b,c) => square(0,0,800,800,b) + sequence(11,i=>path(`M${92+i*23} 633V${373+i*10}a${308-i*23} ${213-i*14} 0 0 1 ${616-i*46} 0V633`,'none',i%3===0?c:a,3)) + path('M0 581Q184 543 351 608T800 593V800H0Z','#bdcdd3') + path('M0 662Q216 588 446 674T800 621V800H0Z','#a4bdc9')
];

function coverArt(album, index) {
  const [a,b,c] = album.palette;
  const dark = [0,1,2,3,6,10].includes(index);
  const titleInk = dark ? b : index === 5 ? a : '#24263d';
  const footInk = [5,6,10].includes(index) ? b : titleInk;
  const title = index === 5 ? 'BLUE NOON' : album.title.toUpperCase();
  return svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
    <defs><pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".9" fill="#121522" opacity=".55"/></pattern>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="3" seed="${album.seed}" stitchTiles="stitch"/></filter></defs>
    ${compositions[index](a,b,c)}
    <rect width="800" height="800" filter="url(#grain)" opacity=".20" style="mix-blend-mode:multiply"/>
    <g font-family="Arial,sans-serif" fill="${titleInk}">
    <text x="48" y="57" font-size="17" letter-spacing="4">ONDO RECORDS / ${String(index+1).padStart(3,'0')}</text>
    <text x="45" y="${index===5?185:141}" font-size="${index===5?109:title.length>13?60:76}" font-weight="900" letter-spacing="-3">${escapeHtml(title)}</text>
    <text x="50" y="${index===5?220:176}" font-size="23" font-weight="700" letter-spacing="5">${escapeHtml(album.artist.toUpperCase())}</text>
    <g fill="${footInk}" font-size="17" letter-spacing="3"><text x="49" y="750">${album.year} / ${escapeHtml(album.genre.toUpperCase())}</text><text x="748" y="750" text-anchor="end">STEREO</text></g>
    </g></svg>`);
}

function artistArt(album, index) {
  const [a,b,c] = album.palette;
  const face = 230 + (index % 4) * 87;
  return svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
    ${square(0,0,800,800,b)}${circle(face,340,214,a)}
    ${path(`M${face-58} 183Q${face+94} 131 ${face+129} 303l50 91-59 13-7 85-82 21 39 108 169 179H${face-316}l106-169 125-68-29-103Q${face-205} 287 ${face-58} 183Z`,c)}
    ${sequence(28,i=>line(0,111+i*23,800,269+i*16,a,i%7===0?3:1))}
    <text x="40" y="740" fill="${b}" stroke="${a}" stroke-width="8" paint-order="stroke" font-family="Arial,sans-serif" font-weight="bold" font-size="52">${escapeHtml(album.artist.toUpperCase())}</text>
    </svg>`);
}

const albums = entries.map(([id,title,artist,year,genre,category,japanese,bpm,location,palette,durations,description,bio,titles], index) => {
  const album = { id,title,artist,year,genre,category,japanese,bpm,location,palette,description,bio,index,seed:19+index*13,artistId:id+'-artist' };
  album.tracks = titles.map((name, order) => ({
    id: id+'-'+(order+1), name, duration:durations[order], seed:album.seed*11+order*53, order, album
  }));
  album.art = coverArt(album,index);
  album.portrait = artistArt(album,index);
  return album;
});
const albumById = new Map(albums.map(album => [album.id, album]));
const trackById = new Map(albums.flatMap(album => album.tracks.map(track => [track.id,track])));

const playlists = [
  ['after-dark','After Dark','Nocturnal / Atmospheric','A sequence for empty streets, late trains, and the strange peace of a city that refuses to sleep.',10,[[10,0],[3,1],[6,2],[5,0],[10,3],[1,3]]],
  ['soft-signals','Soft Signals','Ambient / Introspective','Slow harmonies and distant pulses for a room with the lights turned down.',0,[[0,0],[3,2],[11,0],[0,2],[11,3],[3,3]]],
  ['city-in-motion','City in Motion','Electronic / Kinetic','Arpeggios, broken beats and house rhythms set to the pace of a long walk across town.',6,[[2,1],[6,0],[10,2],[2,2],[6,1],[10,1]]],
  ['sunday-slow','Sunday Slow','Warm / Relaxed','Open the windows and let the guitar, soft keys and a little tape hiss into the room.',7,[[7,0],[4,1],[9,1],[7,2],[1,1],[4,3]]],
  ['echoes-of-blue','Echoes of Blue','Jazz / Soul / Reflective','Electric piano, brushed drums and warm bass from the quiet end of the archive.',5,[[5,0],[1,0],[5,1],[1,2],[5,3],[5,2]]]
].map(([id,title,mood,description,artIndex,refs], index) => {
  const [a,b,c] = albums[artIndex].palette;
  const art = svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><defs><pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1" fill="${c}"/></pattern></defs>
    <g transform="translate(-75 -75) scale(1.19)">${compositions[artIndex](a,b,c)}</g><path d="M34 34H766V766H34Z" fill="none" stroke="${b}" stroke-width="3"/>
    <rect x="49" y="49" width="702" height="170" fill="${b}"/><g fill="${a}" font-family="Arial,sans-serif"><text x="69" y="102" font-size="20" letter-spacing="4">ONDO SELECTIONS / 0${index+1}</text><text x="67" y="184" font-size="68" letter-spacing="-3" font-weight="900">${title.toUpperCase()}</text></g></svg>`);
  return {id,title,mood,description,art,tracks:refs.map(([album,track])=>albums[album].tracks[track])};
});
const playlistById = new Map(playlists.map(playlist => [playlist.id,playlist]));
