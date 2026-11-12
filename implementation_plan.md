# ONDO — The Sound Archive
## Super-Detailed Music Streaming Interface — Complete Website Build Prompt

### YOUR MISSION

Build a visually extraordinary, fully interactive music streaming website called **ONDO — THE SOUND ARCHIVE**, inspired by Spotify, Apple Music, SoundCloud, and experimental Japanese editorial design.

The website must feel like an award-winning Awwwards-level digital experience, not a conventional Spotify clone.

**Most importantly, preserve the visual character of a curved 3D archival collection:** physical album sleeves receding into depth, a featured album rotating toward the viewer, oversized Japanese halftone typography, textured warm off-white backgrounds, cobalt-blue typography, dramatic spring-based interactions, and immersive full-screen detail transitions.

Transform this archive aesthetic into a modern, functional music discovery and streaming interface.

The final result must be beautiful, polished, responsive, animated, and genuinely usable.

The website must satisfy all these hackathon requirements:

- Modern music streaming platform
- Playlists with individual playlist pages
- Multiple music genres and category filtering
- Interactive album cards and album discovery
- Detailed artist profiles
- Functional music player with play/pause controls
- Next/previous tracks, progress bar, seek, and volume
- Responsive desktop and mobile layouts

Do not create a basic dashboard with generic rectangular cards.

Create a memorable, artistic, immersive website where browsing music feels like exploring a physical collection of treasured records.

---

# 1. CORE CONCEPT

**Brand:** ONDO

**Tagline:** THE SOUND ARCHIVE

**Japanese identity:** 音の記憶 (Memories of Sound)

**Visual direction:** Analog Japanese record archive meets futuristic streaming platform.

**Primary aesthetic:** Editorial / minimalist / analog / retro-futurist.

Imagine a Japanese music collector's record archive transformed into an interactive digital experience.

### The central visual

Across the center of the screen is an expansive curved collection of vinyl record sleeves.

The records stand vertically on an invisible shelf.

They form a shallow, elegant arc that recedes backward into depth on both sides.

Records at the edges become progressively smaller, darker, and closer together.

The central active record rotates approximately 90 degrees in 3D until its illustrated album cover faces the user.

It appears slightly forward from the collection, floating above a soft diffused shadow.

The arrangement must feel physically dimensional rather than like a flat horizontal carousel.

The user can drag, scroll, or click to navigate between albums.

Changing the active album updates the song information, artist, year, category, music player, and archival timeline.

Clicking the active album opens a cinematic full-screen album detail page, expanding directly from the album cover.

Every action should feel connected and intentional.

---

# 2. TECHNICAL REQUIREMENTS

Build the experience using:

- HTML5
- CSS3
- Vanilla JavaScript
- CSS 3D transforms
- Web Animations API
- requestAnimationFrame
- Web Audio API for functional demo playback
- SVG for illustrations, graphics, masks, and filters

Prefer a complete, self-contained `index.html` with CSS and JavaScript embedded.

Do not use React, Next.js, Tailwind, Bootstrap, jQuery, or heavy animation libraries.

Do not rely on paid APIs, API keys, authentication, or a backend.

The website must work when opened through a local development server.

All primary user interactions must be functional.

Use one central `requestAnimationFrame` rendering loop for the 3D collection, player progress, custom cursor, and spring-based movement.

Use the Web Animations API for structured entrance and exit transitions.

Avoid unnecessary animation loops and repeated DOM rebuilding.

Use proper application state so album selection, category filtering, playback, detail pages, and playlists remain synchronized.

### Asset reliability

The original VHS-specific artwork must be replaced entirely with music-specific artwork.

Do not reuse VHS posters, movie names, film branding, or movie-specific imagery.

Create **12 original, visually distinct album covers** using inline SVG, procedural illustration, CSS graphics, or locally generated assets.

Each album should have a recognizable visual identity.

Do not use broken image placeholders or invented remote asset URLs.

If generated SVG art is used, build the cover artwork once and reuse it consistently in:

- 3D record collection
- Album cards
- Player thumbnail
- Album detail page
- Playlist cards
- Artist profiles

All essential visuals must work without depending on an external image service.

---

# 3. DESIGN TOKENS

Use the following core colors:

| Token | Value |
|---|---|
| Paper background | `#ECE8E0` |
| Detail sheet | `#F3F0EA` |
| Primary ink | `#141414` |
| Muted text | `#6D6A63` |
| Electric cobalt | `#1F3FB0` |
| Vermilion accent | `#E95A3A` |
| Border rule | `rgba(20,20,20,.9)` |

Primary easing curve:

`cubic-bezier(.2,.8,.2,1)`

The website should remain predominantly paper-colored.

Cobalt blue is the primary visual accent for headings, buttons, active states, navigation, and line graphics.

Use vermilion sparingly for selected artwork details, indicators, and occasional highlights.

Avoid excessive neon gradients, glassmorphism, conventional dark Spotify layouts, or generic SaaS-style cards.

The design should feel curated, tactile, sophisticated, and experimental.

---

# 4. TYPOGRAPHY

Use these fonts:

**Inter Tight**

- Branding
- Navigation
- Album titles
- Player metadata
- Buttons
- Years
- Categories
- Interface labels

**Newsreader**

- Album descriptions
- Editorial content
- Artist biographies
- Emotional descriptions
- Italic credits

**Noto Sans JP**

- Japanese labels
- Japanese album subtitles
- Archive typography
- Oversized background kanji

Fonts may be loaded from Google Fonts with reliable system fallbacks.

### Typography rules

Small labels:

- 10–11px
- Weight 600
- Uppercase
- Letter spacing 0.14em

Album headline:

- 30–48px
- Weight 600
- Tight letter spacing
- Cobalt blue

Large detail-page title:

- 48–84px
- Weight 600
- Letter spacing -0.03em

Body editorial text:

- Newsreader
- 17–18px
- Line height 1.5

Avoid decorative fonts that undermine readability.

---

# 5. BACKGROUND AND TEXTURE

The main background is warm off-white textured paper.

Add a subtle fixed paper-grain layer covering the entire screen.

The texture should resemble printed Japanese art books or vintage record sleeves.

Create the grain using SVG fractal noise:

- `feTurbulence`
- `type="fractalNoise"`
- `baseFrequency=".85"`
- `numOctaves="3"`
- `stitchTiles="stitch"`

Use a low-opacity paper-colored noise overlay with `mix-blend-mode:multiply`.

The grain must be visible but delicate.

Do not make the interface dirty or excessively distressed.

### Background Japanese typography

Place two enormous vertical Japanese text elements behind the curved record collection.

Left:

**音楽**

Right:

**の記憶**

Use:

- `writing-mode:vertical-rl`
- Noto Sans JP, weight 800
- Approximately `min(19vh,12.5vw)`
- Pale desaturated cobalt coloring
- Halftone dot pattern inside the letters

Create the halftone fill with:

- Transparent text color
- `background-clip:text`
- Repeating radial-gradient dots
- Approximately 3px dot spacing

These elements should remain behind the albums.

They provide visual atmosphere without obstructing interaction.

---

# 6. DESKTOP PAGE STRUCTURE

The main landing page is an immersive single-screen archive composition.

It contains:

1. Top navigation
2. Music category navigation
3. Massive background Japanese typography
4. Interactive 3D album archive
5. Featured album information
6. Left/right navigation arrows
7. Floating play control
8. Functional music player
9. Release-year archive timeline
10. Minimal footer
11. Custom animated cursor

All components should feel part of one connected composition.

Avoid large unused sections or conventional stacked dashboard layouts.

Use full-screen overlays for additional content such as playlists, artist browsing, album details, and search.

---

# 7. TOP NAVIGATION

Desktop navigation height: approximately 76px.

Horizontal padding: 36px.

### Left side

Display:

**ONDO**

A short horizontal blue divider.

**THE SOUND ARCHIVE**

Use uppercase cobalt typography.

The logo should feel editorial and understated.

### Right side

Navigation items:

**DISCOVER**

**PLAYLISTS**

**ARTISTS**

**ABOUT**

Then a minimal two-line menu icon.

Use approximately 30–34px spacing.

Hover effects should be elegant:

- Animated underline
- Horizontal mask movement
- Small arrow appearance
- Smooth color changes

Every navigation item must function.

Discover returns to the 3D album collection.

Playlists opens the playlist browsing interface.

Artists opens artist browsing.

About opens a minimal editorial information sheet about ONDO.

The menu icon opens a compact navigation panel.

Do not leave any decorative controls unresponsive.

---

# 8. MUSIC CATEGORY SELECTOR

Below the top navigation, include a thin row of selectable music genres.

Categories:

- ALL SOUNDS
- AMBIENT
- ELECTRONIC
- INDIE
- SOUL
- JAZZ
- POP

Style as small editorial text rather than large rounded pills.

The selected category receives a blue underline or a small circular indicator.

Clicking a category should:

1. Filter the available album collection.
2. Animate the 3D collection into the filtered arrangement.
3. Automatically select a valid album.
4. Update the featured information.
5. Update the available navigation sequence.
6. Preserve playback safely if the currently playing track belongs to another category.

Do not reload the page.

The category strip should scroll horizontally on mobile if necessary.

---

# 9. THE CURVED 3D VINYL ARCHIVE

**This is the most important visual element in the entire website.**

It must be implemented carefully and beautifully.

The collection contains 12 fictional albums.

Render the albums three times internally to create a seamless circular browsing arrangement.

Use 36 virtual album objects.

### Visual structure

Each album is a physical 3D object with:

- A narrow spine
- A square illustrated front cover
- A subtle sleeve thickness
- Slight surface shading
- A soft physical shadow

The record sleeves stand vertically on an invisible curved shelf.

Around 9–11 record spines should be visible on each side depending on viewport width.

Farther records:

- Appear smaller
- Move backward in 3D
- Become darker
- Pack together more closely
- Rotate gently toward the center
- Sit slightly lower than central records

The arrangement should resemble an elegant shallow bowl viewed from the front.

### Active album

The album nearest the center rotates approximately 90 degrees so the front cover faces the user.

It separates slightly from neighboring records.

The central sleeve should be visually dominant.

Its square album art should remain recognizable.

A soft shadow appears beneath it.

The cover should feel like an actual printed vinyl sleeve.

Add extremely subtle perspective tilt following pointer movement.

### Approximate sizing

Use a responsive CSS height variable:

`--H:min(38svh,30vw,330px)`

On mobile:

`--H:min(58vw,34svh)`

Use:

- Album height `H`
- Spine width `ws = H * 0.095`
- Cover width `d = H * 0.94`
- Horizontal gap `gap = H * 0.035`
- Perspective `P = 1400`
- Depth falloff `U = H * 1.3`

Place the collection around 38% of the viewport height on desktop.

Use 3D transforms rather than merely scaling flat image cards.

---

# 10. EXACT ARC GEOMETRY AND DEPTH MODEL

Use a mathematical arc with smooth depth falloff.

Let the current fractional carousel position be `s`.

Let virtual album index be `v`.

Calculate the relative index:

`r = ((v-s) mod 36)`

Map the result into `[-18,18)`.

Define the central opening blend:

`o = smoothstep(max(0,1-abs(r)))`

This creates a smooth transition between spine and front cover.

### Arc length

Define:

`B(r) = (r + sin(πr)/π)/2` when `abs(r)<1`

Outside that region, clamp `B(r)` to `-0.5` or `0.5` depending on direction.

Then:

`F(r) = r*(ws+gap) + (d-ws+1.4*gap)*B(r)`

This increases the spacing around the featured record as it opens.

### Depth scaling

Let:

`u = F(r)`

`sc = 1/(1+(abs(u)/U)^1.6)`

`k = 1/sc`

The record's 3D depth is:

`z = P*(1-k) + o*H*0.1`

To prevent the visible record sleeves from spreading too far apart, calculate their screen-space position from the integral of the scale function.

Precompute a lookup table `XS` by integrating:

`2/(1+(u/U)^1.6)`

using approximately 2px increments.

Then:

`x = xsc(u)*k`

Vertical position:

`y = (H*0.5*(1-sc)*0.42 + o*H*0.012 - lift*H*0.05)*k`

Rotation:

`rotateY = sign(u)*min(1,abs(u)/U)*26deg*(1-o) - 90deg*o + tiltY*o`

`rotateX = tiltX*o`

Final transform:

`translate3d(x,y,z) rotateX(...) rotateY(...)`

Use `transform-style:preserve-3d`.

Set z-index based on depth so foreground albums overlap correctly.

Hide records beyond the chosen arc distance.

### Shading

A dark pseudo-element overlays the record surface.

Spine shade:

`min(0.6,o*0.55+(1-sc)*0.32)`

Cover shade:

`(1-o)*0.82`

This gives distant records a convincing darkened appearance.

The center front cover should remain bright and crisp.

---

# 11. ALBUM ART DIRECTION

Create 12 unique album cover designs.

They should resemble carefully art-directed Japanese indie releases, electronic music records, ambient LPs, and limited-edition vinyl packaging.

Use a cohesive print-design language while making each album distinct.

The album artwork may combine:

- Abstract geometry
- Risograph textures
- Halftone printing
- Experimental typography
- Hand-drawn curves
- Optical patterns
- Analog grain
- Architectural shapes
- Japanese editorial inspiration
- Abstract landscapes

Every cover must show its album title and artist name.

Typography must be readable.

Create unique compositions instead of using the same generic gradient with different colors.

### Artwork specifications

Generate the artwork as square SVG illustrations with a virtual canvas of approximately 800 × 800.

Make each image reusable at multiple sizes.

Each spine should derive its title, artist, color, and composition from its corresponding album.

Do not rotate a full square cover into a narrow strip; create a dedicated spine layout.

Suggested visual directions:

| Album | Visual art direction |
|---|---|
| Signal Bloom | Cobalt concentric circles with a tiny coral sun |
| Velvet Hour | Burgundy silk-like curves and cream typography |
| Chrome Dreams | Metallic geometric shapes against a fine grid |
| Moon Tides | Oversized moon and fine horizontal wave lines |
| Warm Static | Orange and cobalt risograph blocks |
| Blue Noon | Graphic blue sun above black abstract mountains |
| Neon Rain | Slanted graphic rain and electric city shapes |
| Sunroom | Pale yellow botanical silhouettes and architectural grid |
| Afterimage | Overlapping distorted silhouettes in two-color print |
| Peach Frequency | Peach-colored waveform and optical curves |
| Night Transit | Dark midnight railway-inspired perspective lines |
| Soft Future | Gentle pale blue layers, fog, and concentric arches |

Spend serious effort on the artwork.

These covers are the most important visual assets in the experience.

---

# 12. ALBUM DATA

Use the following fictional music catalog.

All musicians, albums, and tracks are original fictional content.

| Index | ID | Album | Artist | Year | Genre | Category |
|---|---|---|---|---|---|---|
| 0 | signal-bloom | Signal Bloom | Mira Vale | 1998 | Ambient | Ambient |
| 1 | velvet-hour | Velvet Hour | Sora Grey | 2001 | Neo-Soul | Soul |
| 2 | chrome-dreams | Chrome Dreams | NOVA/9 | 2004 | Synthwave | Electronic |
| 3 | moon-tides | Moon Tides | Kaito Rue | 2007 | Downtempo | Ambient |
| 4 | warm-static | Warm Static | Hazel Echo | 2010 | Indie Rock | Indie |
| 5 | blue-noon | Blue Noon | Nami Sol | 2013 | Jazz Fusion | Jazz |
| 6 | neon-rain | Neon Rain | ARC-Ø | 2015 | Electronica | Electronic |
| 7 | sunroom | Sunroom | The Sunday Letters | 2017 | Indie Pop | Indie |
| 8 | afterimage | Afterimage | Veda North | 2019 | Alternative | Indie |
| 9 | peach-frequency | Peach Frequency | Luma Bloom | 2021 | Dream Pop | Pop |
| 10 | night-transit | Night Transit | KIRO | 2023 | Deep House | Electronic |
| 11 | soft-future | Soft Future | ALTO/ONE | 2026 | Ambient Pop | Ambient |

The archive opens with index 5, **Blue Noon — Nami Sol**.

For the three-copy array, initialize the carousel position to:

`s = T = 5 + 12`

Each album must include:

- ID
- Title
- Artist
- Year
- Genre
- Category
- Japanese subtitle
- Description
- Album artwork
- Four songs
- Song durations
- BPM
- Artist profile ID
- Cover palette
- Artwork seed

### Track data

Create four tracks per album using these titles, in order:

**Signal Bloom — Mira Vale**
1. First Transmission
2. Luminous Dust
3. Low Orbit
4. The Signal Returns

**Velvet Hour — Sora Grey**
1. Slow Motion
2. Honeylight
3. Blue Velvet
4. Until Morning

**Chrome Dreams — NOVA/9**
1. Electric Memory
2. Chrome City
3. Digital Hearts
4. Midnight Protocol

**Moon Tides — Kaito Rue**
1. Lunar Current
2. Weightless
3. Ocean Without Shore
4. Last Reflection

**Warm Static — Hazel Echo**
1. Radio Silence
2. Golden Haze
3. Polaroid Summer
4. Stay Awhile

**Blue Noon — Nami Sol**
1. Midnight in Blue
2. Paper Skies
3. A Thousand Miles of Quiet
4. Blue Noon

**Neon Rain — ARC-Ø**
1. Pulse 01
2. Glass District
3. After the Rain
4. Night Signal

**Sunroom — The Sunday Letters**
1. Sunday Morning
2. Open Windows
3. Everything in Gold
4. Sunroom

**Afterimage — Veda North**
1. Unsaid
2. Ghost Frames
3. Another Version
4. Afterimage

**Peach Frequency — Luma Bloom**
1. Peach Radio
2. Soft Focus
3. Satellite Love
4. Stay in the Light

**Night Transit — KIRO**
1. Platform Nine
2. Last Train
3. Sleepless City
4. Night Transit

**Soft Future — ALTO/ONE**
1. Tomorrow's Weather
2. Weight of Light
3. Soft Machines
4. A New Beginning

Assign realistic durations between approximately 2:30 and 4:40.

Track durations must be stored in seconds and formatted consistently as MM:SS.

Each track should have a stable unique ID and a deterministic audio-generation seed.

Do not use copyrighted songs, Spotify streaming endpoints, or unlicensed commercial audio files.

---

# 13. FEATURED ALBUM CAPTION

Beneath the central album, display a centered editorial information block.

Each line should sit inside an overflow-hidden mask container.

The text must change smoothly when the selected album changes.

### Content order

1. Large album title
2. Artist name
3. Japanese subtitle
4. Short cobalt divider
5. Year and genre

For example, the initial state:

**Blue Noon**

NAMI SOL

青い午後 / BLUE NOON

2013 — JAZZ FUSION

Use cobalt for the title and Japanese subtitle.

Use dark ink for the year and genre line.

Position the caption below the visual collection with enough spacing to avoid overlapping the player.

### Caption animation

Do not fade text in and out.

When an album changes:

- New text enters from below or above depending on navigation direction.
- Old text slides out in the opposite direction.
- Each line is clipped inside its own mask.
- Duration approximately 650ms.
- Easing `cubic-bezier(.2,.8,.2,1)`.

The animation must remain smooth during rapid navigation.

---

# 14. ALBUM NAVIGATION

Place two minimalist cobalt arrow controls on either side of the featured caption.

Each arrow should be approximately 44px.

Use thin SVG arrow strokes.

Navigation methods:

### Arrow buttons

Clicking right selects the next album.

Clicking left selects the previous album.

### Keyboard

- ArrowRight: next album
- ArrowLeft: previous album
- Enter: open selected album
- Escape: close overlays
- Space: toggle music play/pause when focus is not inside a text input

### Dragging

Pointer dragging moves the physical archive left and right.

When dragging begins:

- Record the initial pointer position.
- Update the target position according to horizontal movement.
- Follow the pointer smoothly.
- Increase the spring responsiveness during dragging.

On release:

- Snap the closest album into the center.
- Animate the cover rotation.
- Update metadata.

Clicks immediately following a completed drag should not accidentally open an album.

### Mouse wheel

Scrolling over the archive should navigate horizontally between albums.

Normalize wheel delta and snap the selection to a whole album index after the gesture ends.

Do not hijack normal scrolling inside detail overlays.

### Direct album clicks

Clicking a non-active record brings it to the center.

Clicking the centered album opens its detail page.

---

# 15. MOTION SYSTEM

The archive should have luxurious spring-driven movement.

Do not use abrupt transitions.

Store:

- `s`: current fractional position
- `T`: target position

Update the position using:

`s += (T-s)*(1-exp(-k*dt))`

Where:

- `k = 5.2` during normal navigation
- `k = 18` during dragging
- `dt` is capped at 50ms

Use modulo normalization to support endless carousel navigation.

### Hover lift

When a non-active album is hovered:

- Lift the record upward slightly.
- Reduce its visual shading.
- Optionally reveal a tiny label.
- Restore smoothly on pointer exit.

Use an exponential easing response:

`1-exp(-12*dt)`

### Featured album pointer tilt

When the pointer is over the active cover and the carousel has settled:

- Rotate X approximately ±5 degrees
- Rotate Y approximately ±8 degrees
- Apply smooth interpolation
- Return naturally to the default orientation when the pointer leaves

Keep it subtle and premium.

Do not create an exaggerated card-flipping effect.

---

# 16. FLOATING PLAY CONTROL

Place a circular play control near the lower-left corner of the featured album.

Dimensions: approximately 42–48px.

Appearance:

- Cobalt 1px border
- Semi-opaque paper-colored fill
- Cobalt play icon
- Smooth scale transitions

Behavior:

- Displays play when music is paused
- Displays pause when playing
- Starts the selected album's first track when necessary
- Controls the same playback state as the bottom player

It should follow the featured album's visual location.

Hide or minimize it while detail pages are expanding.

When hovered, the ring can enlarge slightly.

Do not use an unresponsive decorative play button.

---

# 17. FUNCTIONAL MUSIC PLAYER

Create a fixed, elegant music player across the lower portion of the viewport.

This must be a functional player, not merely a static UI mockup.

It should resemble a refined editorial interpretation of the Spotify or Apple Music mini-player.

### Desktop layout

Three sections:

**Left section — Currently playing**

- Small square album artwork
- Track title
- Artist name
- Tiny playing indicator
- Save/favorite button

**Center section — Playback controls**

- Previous track
- Play/pause
- Next track
- Progress bar
- Current playback time
- Total duration

**Right section — Additional controls**

- Shuffle
- Repeat
- Volume icon
- Volume slider

The player should sit above the year timeline without colliding with other content.

Use a subtle border and a paper-colored surface.

Avoid a heavy black player background.

### Play/pause behavior

The play/pause button must actually control playback.

When play is pressed:

1. Initialize or resume playback.
2. Update the icon to pause.
3. Animate the progress indicator.
4. Update the current time.
5. Highlight the active track.
6. Show a subtle moving equalizer.

When pause is pressed:

1. Pause audio playback.
2. Freeze playback progress.
3. Update the icon to play.
4. Stop the equalizer animation.

### Previous/next

Next moves to the next song in the current playback context.

Previous returns to the previous song, or restarts the current song when appropriate.

At the end of a song, advance automatically based on repeat settings.

### Seek bar

Clicking or dragging the progress bar changes playback position.

The progress thumb should move smoothly.

The time labels must update correctly.

### Volume

Provide a working volume slider for generated demo audio.

### Shuffle and repeat

Implement working shuffle and repeat behavior.

Repeat modes:

- Off
- Repeat queue
- Repeat one

Use accessible button labels and visible state indicators.

---

# 18. AUDIO PLAYBACK IMPLEMENTATION

Use the **Web Audio API** to generate original procedural music demos.

This keeps the application self-contained and avoids copyright problems, broken audio links, and external streaming dependencies.

The audio does not need to reproduce full commercial songs.

It should provide an audible, pleasant, looping musical preview for each fictional track.

### Audio engine

Create one lazily initialized `AudioContext`.

Initialize it only after a user interaction such as pressing Play.

Use:

- Oscillator nodes
- Gain nodes
- Low-pass filtering
- Simple attack and release envelopes
- Quiet harmonic layers
- Optional soft percussion generated from noise buffers

Each song should have a deterministic musical pattern derived from its seed.

Use different note choices, tempos, and textures for genres.

Examples:

- Ambient: slow sustained notes and soft pads
- Electronic: gentle pulsing synth arpeggios
- Indie: bright plucked tones and soft rhythmic accents
- Jazz: warm chord voicings and gentle bass
- Soul: mellow chords with a relaxed pulse
- Pop: melodic repeating patterns

Keep volume controlled and pleasant.

Do not generate aggressively loud or distorted noise.

### Playback scheduling

Schedule musical notes slightly ahead of playback time using `AudioContext.currentTime`.

Integrate scheduling with the central application update loop.

Avoid creating unlimited oscillator nodes or leaking resources.

Maintain accurate logical playback time when:

- Pausing
- Resuming
- Seeking
- Skipping tracks
- Switching playlists
- Repeating tracks

On track change, release or stop the previous scheduled voices and initialize the new musical sequence.

The procedural sequence can repeat for the duration of the fictional song.

The player timeline should follow the track's defined duration.

If the browser blocks audio, handle the problem gracefully rather than leaving the interface broken.

Show a clear indication that playback requires interaction.

Do not silently pretend that audio is playing when initialization fails.

---

# 19. RELEASE-YEAR TIMELINE

Preserve the archival timeline concept from the original reference design.

Instead of movie release years, use album release years.

Timeline range:

**1998 — 2026**

Place it near the bottom of the viewport, below the music player.

### Appearance

- Thin cobalt horizontal line
- Small yearly ticks
- Larger ticks every five years
- Small editorial year labels
- Moving cobalt selection dot

Display labels around:

2000, 2005, 2010, 2015, 2020, 2025

Also show the endpoints when space permits.

### Behavior

The cobalt dot marks the currently selected album's year.

During carousel movement, interpolate smoothly between neighboring album years.

On wraparound from 2026 back to 1998, avoid drawing an ugly animation across the entire timeline.

Snap or transition cleanly at the wrap midpoint.

Clicking a timeline position selects the album closest to the clicked year.

When a category filter is active, choose the closest album in that filtered category.

The timeline must be a functional album navigation component.

It is separate from the player's track-progress bar.

---

# 20. FULL-SCREEN ALBUM DETAIL SHEET

When the active album cover is clicked, open a cinematic album detail page.

This is another signature interaction that must be preserved.

### Opening effect

The full-screen detail sheet should appear to grow directly from the central album cover.

It should not simply fade or slide in from the right.

Use the selected cover's `getBoundingClientRect()` to determine its current screen position.

Start a fixed full-screen sheet clipped precisely to the rectangle of that album cover.

Animate the clip to fill the viewport.

### Timing

- Sheet expansion: approximately 1050ms
- Easing: `cubic-bezier(.76,0,.18,1)`
- Text appearance: approximately 900ms
- Stagger delays: `620 + i*75` ms
- Artwork reveal: begins around 520ms

The effect should look like a sheet of archival paper physically expanding out of the record sleeve.

### Desktop detail layout

Two columns.

Left: editorial information and tracklist.

Right: large album cover artwork.

Use:

- Background `#F3F0EA`
- Padding approximately `110px 6vw 56px 7vw`
- Column gap approximately `4vw`

### Top-left

Outlined close button:

**CLOSE / 閉じる**

### Top-right

**ONDO — THE SOUND ARCHIVE**

### Left column

Display:

1. Japanese album subtitle
2. Huge cobalt album title
3. Artist name
4. Year / genre / number of tracks
5. Album description
6. Artist credit
7. Main "PLAY ALBUM" button
8. Tracklist

Example:

**Blue Noon**

NAMI SOL

2013 / JAZZ FUSION / 4 TRACKS

A poetic short description about a collection of late-night jazz-inspired compositions, wandering memories, and moments suspended between midnight and morning.

### Tracklist layout

Each track row contains:

- Track number
- Title
- Duration
- Play icon
- Optional favorite icon

Clicking a track starts that specific track.

Currently playing tracks should be visibly highlighted.

Show an animated equalizer beside the active song.

The tracklist must not be static decoration.

### Right column

Show the original album artwork much larger.

Add subtle paper texture and artistic cropping.

The visual should dominate the page without feeling oversized or pixelated.

Below the cover, display a small archival caption and catalog number such as:

ONDO RECORDS / ARCHIVE NO. 006

All catalog information should be derived from the selected album.

---

# 21. INK-BLEED ALBUM ART REVEAL

When the album detail page opens, reveal the artwork like ink spreading across textured paper.

Use an SVG mask and displacement filter.

### SVG technique

Create an album image masked by several growing circles.

Use seven reveal positions.

Suggested coordinates on a 474 × 900 virtual reveal surface:

- `(150,330)` delay 0ms
- `(340,600)` delay 120ms
- `(250,120)` delay 220ms
- `(90,760)` delay 300ms
- `(400,250)` delay 360ms
- `(260,860)` delay 420ms
- `(230,470)` delay 180ms

Apply `feTurbulence` with a low frequency and `feDisplacementMap` to make the reveal edges irregular.

Animate each circle from radius 0 to sufficiently large to reveal the entire cover.

Duration approximately 1250ms.

The final image should become completely clear.

Do not leave permanent missing areas in the artwork.

For reduced-motion users, show the complete artwork immediately.

### Closing

Reverse the sheet's clip animation toward the central album cover.

Duration approximately 850ms.

After completion:

- Hide the detail overlay
- Restore the interactive archive
- Restore keyboard navigation
- Preserve current playback

Do not restart music unnecessarily when a detail page closes.

---

# 22. PLAYLISTS INTERFACE

Create a complete interactive playlist section.

Clicking PLAYLISTS in the navigation should open a full-screen editorial browsing interface.

Keep the same visual language:

- Paper background
- Cobalt headings
- Fine rules
- Japanese accents
- Strong typography
- Subtle transitions

### Header

**CURATED FOR LISTENING**

Large title:

**Playlists**

Subtitle:

*Collections of sound for every state of mind.*

### Playlist cards

Create five playlists:

**01 — AFTER DARK**

Mood: Nocturnal / atmospheric

Artwork: Midnight blue abstract city silhouette.

**02 — SOFT SIGNALS**

Mood: Ambient / introspective

Artwork: Pale cobalt concentric signal waves.

**03 — CITY IN MOTION**

Mood: Electronic / kinetic

Artwork: Rhythmic geometric city grid.

**04 — SUNDAY SLOW**

Mood: Warm / relaxed

Artwork: Soft amber architectural illustration.

**05 — ECHOES OF BLUE**

Mood: Jazz / soul / reflective

Artwork: Cobalt and cream expressive shapes.

Each playlist card should contain:

- Original illustrated artwork
- Playlist name
- Short description
- Track count
- Duration
- A functional play button

The playlists must contain real references to the fictional catalog's tracks.

Do not add fake titles that cannot be played.

### Playlist page

Clicking a playlist opens its detail view.

Include:

- Large illustrated cover
- Playlist name
- Description
- Number of tracks
- Total duration
- PLAY PLAYLIST button
- Ordered tracklist
- Album artwork thumbnails
- Artist names
- Track durations

Clicking PLAY PLAYLIST starts the first track and loads that playlist as the active playback queue.

Next and previous must follow the playlist order.

Clicking any individual track starts that track within the same playlist queue.

Include a way to return to all playlists.

---

# 23. ARTIST PROFILES

Create an artist browsing section that feels like a curated music magazine.

It must include meaningful profiles rather than just artist names.

### Artists page

Large editorial title:

**THE ARTISTS**

Subtitle:

*The voices behind the sound.*

Display an elegant responsive grid of artist cards.

Each card contains:

- Artistic portrait or abstract identity illustration
- Artist name
- Primary genre
- Country or fictional city
- Small arrow indicator
- Hover animation

Use original SVG portrait-inspired compositions if photographic assets are unavailable.

Avoid blank portrait placeholders.

### Artist detail page

Clicking an artist opens a dedicated profile.

Include:

1. Artist name in oversized cobalt typography
2. Japanese or editorial subtitle
3. Original portrait / graphic illustration
4. Artist biography
5. Genre
6. Artist location
7. Featured album
8. Popular tracks
9. PLAY ARTIST button
10. Related artists

The artist biography should contain 2–4 well-written sentences describing their fictional musical style and creative identity.

All artist names and album references must remain consistent with the catalog.

### Artist interactions

Clicking an artist name on:

- Album caption
- Album detail page
- Tracklist
- Player

should open the corresponding artist profile.

Clicking a featured album on the artist page should navigate to that album detail.

PLAY ARTIST should create a playback queue from that artist's tracks.

No artist profile should be a dead end.

---

# 24. SEARCH EXPERIENCE

Add a minimal search control in the navigation or menu.

When clicked, it opens a compact editorial search overlay.

Include a search input with placeholder:

**SEARCH THE ARCHIVE...**

Search must work instantly against:

- Album titles
- Artist names
- Track names
- Genres
- Playlists

Results should be grouped by type.

Use small artwork thumbnails and clean typography.

Clicking a result navigates to the relevant content.

Pressing Escape closes search.

Handle empty results with a well-designed message.

Do not require a backend.

---

# 25. FAVORITES AND SAVED MUSIC

Add a functional favorite system.

Users should be able to save:

- Individual tracks
- Albums
- Playlists

Use a subtle outlined heart or bookmark icon.

When selected, the icon fills with cobalt.

Persist saved items using `localStorage`.

Include a SAVED or YOUR COLLECTION view accessible from navigation.

Display saved albums and songs in a clean editorial layout.

Allow users to unsave items.

Keep saved state synchronized across all components.

---

# 26. CUSTOM CURSOR

On desktop devices with a fine pointer, hide the native cursor inside the experimental archive experience.

Create a custom cursor following the pointer smoothly.

The cursor should contain:

- Outer circular ring
- Small central dot
- Contextual text when appropriate

Default size approximately 58px.

### Smoothing

Follow the mouse with:

`1-exp(-16*dt)`

### Cursor states

**Default**

Thin dark ring and small central dot.

**Hovering active album cover**

The ring expands to approximately 1.75x.

The circle fills cobalt.

Display:

OPEN

開く

in small white typography.

**Hovering other record spines**

Scale down slightly, approximately 0.72.

**Hovering buttons and controls**

Scale approximately 0.55.

Hide the dot when appropriate.

**Hovering the play control**

Display a small PLAY or PAUSE indication.

### Important

Do not hide the native cursor on touch devices.

Do not allow the custom cursor to obstruct clicking.

Use `pointer-events:none`.

Do not interfere with keyboard accessibility.

---

# 27. HOVER AND MICROINTERACTIONS

Add polished, subtle microinteractions throughout the experience.

Examples:

- Album sleeves lift slightly on hover.
- Navigation underlines slide into view.
- Playlist cards reveal a play indicator.
- Artist cards shift artwork within a clipped frame.
- Buttons slide their text or arrow inside a mask.
- Track rows reveal controls on hover.
- Playback buttons compress slightly on click.
- Active category indicators glide between positions.
- Music progress updates smoothly.
- Equalizer bars animate while playing.
- The timeline dot glides between years.

Motion should feel physical and intentional.

Avoid excessive bounces, random rotation, or distracting perpetual animations.

Use a consistent easing system.

### Reveal philosophy

Prefer:

- Mask slides
- Clip-path transitions
- Transform motion
- Scaling
- SVG displacement reveals

Avoid using simple opacity fades as the primary animation for every component.

Opacity may be used subtly for secondary interface states, but major transitions should rely on physical movement and masking.

---

# 28. MOBILE RESPONSIVE DESIGN

The entire website must work beautifully on phones.

Breakpoint:

`max-width:767px`

### General mobile rules

- Use viewport-safe units such as `svh`.
- Avoid horizontal overflow.
- Preserve touch interactions.
- Keep text readable.
- Keep player controls accessible.
- Make scrollable detail pages usable.

### Top bar

Height approximately 60px.

Padding 16px.

Keep ONDO branding visible.

Hide the large desktop navigation.

Show the two-line menu icon.

The menu should open an accessible navigation overlay.

### Background typography

Reduce the kanji sizing to approximately 22vw.

Keep the letters decorative and behind the archive.

### 3D archive

Use:

`--H:min(58vw,34svh)`

Move the collection center to approximately 43% of the viewport.

Show fewer visible record spines.

Preserve depth and perspective.

Support finger dragging.

The active album remains large enough to recognize but must not cover the entire screen.

### Caption

Album title approximately 26–30px.

Make the text block compact.

Navigation arrows can move toward the lower left and lower right sides of the album area.

### Player

Create a compact mobile mini-player.

It must show:

- Small album thumbnail
- Track name
- Artist
- Play/pause
- Next
- Progress

Tapping the mini-player can expand a larger mobile player.

The expanded player includes all playback controls.

### Timeline

Reduce the number of visible year labels.

Keep the horizontal line and active indicator.

### Album detail

Use a single scrolling column.

Show album artwork first.

Then:

- Album title
- Artist
- Metadata
- Description
- Play button
- Tracklist

The artwork can occupy approximately 40–46svh.

Use a clear close button.

### Playlists and artists

Use responsive one- or two-column cards.

Ensure comfortable tap targets.

Do not disable core features on mobile.

---

# 29. ACCESSIBILITY

Include:

- Semantic HTML
- Real button elements for interactions
- Accessible labels
- Keyboard navigation
- Visible focus styles
- Appropriate text contrast
- Alt text or accessible descriptions for album art
- Screen-reader-friendly playback controls
- Proper dialog focus management
- Escape-to-close behavior
- Reduced-motion support

Respect:

`prefers-reduced-motion:reduce`

Under reduced motion:

- Make spring movement instant or nearly instant.
- Disable elaborate cursor transitions.
- Show artwork without ink animation.
- Replace mask slides with immediate state changes.
- Preserve all functionality.

Never sacrifice usability for visual effects.

---

# 30. STATE MANAGEMENT

Use a clean central state object.

It should track:

- Current album
- Carousel fractional position
- Carousel target position
- Current music category
- Current track
- Active playback queue
- Current queue index
- Playback status
- Playback position
- Volume
- Shuffle state
- Repeat mode
- Open view
- Open album
- Open artist
- Open playlist
- Search query
- Saved items
- Pointer position
- Dragging state
- Hovered record

### State consistency rules

Selecting an album in the archive updates the featured metadata.

It must not interrupt an already playing song unless the user explicitly initiates playback or track selection.

Opening a detail sheet must not change the currently playing track by itself.

Starting a song from a playlist updates the player queue.

Starting an album sets the album's tracks as the queue.

Opening artist profiles must not stop playback.

Closing overlays must restore the previous view.

Changing categories should not erase saved items.

Do not create multiple independent audio players with conflicting states.

All playback controls must control the same audio engine.

---

# 31. PERFORMANCE

Optimize the interface for smooth 60fps interaction where possible.

Important requirements:

- Precompute album artwork.
- Reuse DOM nodes.
- Avoid rebuilding 36 record elements every frame.
- Update only the necessary transforms during animation.
- Prefer transform and clip-path properties.
- Minimize layout thrashing.
- Read bounding rectangles only when necessary.
- Cache album measurements.
- Recalculate geometry on resize.
- Pause unnecessary animation work when the tab is hidden.
- Avoid excessive SVG filters on mobile.
- Avoid unnecessary large shadows on every moving record.

Support modern Chromium-based browsers, Firefox, and Safari where possible.

Gracefully handle Web Audio compatibility differences.

---

# 32. CONTENT QUALITY

All fictional content should feel convincing and art-directed.

Album descriptions should sound like thoughtful music editorial writing.

Avoid generic text such as:

"This album has amazing songs."

Instead use evocative descriptions, such as:

"A collection of quiet jazz compositions that follow the city between its final train and first morning light."

Artist bios should feel authentic and distinct.

Playlist descriptions should communicate a mood.

Example:

**AFTER DARK**

*A sequence for empty streets, late trains, and the strange peace of a city that refuses to sleep.*

Use this restrained poetic tone consistently.

Do not fill the website with placeholder text.

---

# 33. FOOTER

Keep the footer subtle.

Desktop lower left:

© ONDO — THE SOUND ARCHIVE

Desktop lower right:

SOUND IS MEMORY / 音の記憶

Use small uppercase cobalt typography.

Ensure the footer doesn't overlap the timeline or music player.

On narrow mobile screens, simplify or hide secondary footer copy when needed.

---

# 34. LANDING PAGE OPENING SEQUENCE

Create a memorable but fast introductory animation.

When the page loads:

1. The paper background appears immediately.
2. The ONDO brand reveals through a small vertical mask.
3. The giant Japanese typography is already present behind the composition.
4. Record spines settle into the curved archive arrangement.
5. The active Blue Noon sleeve rotates toward the viewer.
6. The album caption slides upward into view.
7. The bottom timeline draws across the page.
8. The music player enters subtly.

Keep the overall sequence short enough that it does not frustrate users.

The experience should feel cinematic without becoming a loading screen.

Do not autoplay music on page load.

Audio starts only after user interaction.

---

# 35. EXACT INITIAL VIEW

At first load, the desktop viewport should communicate the entire design immediately.

The user sees:

**Top left**

ONDO — THE SOUND ARCHIVE

**Top right**

DISCOVER / PLAYLISTS / ARTISTS / ABOUT / MENU

**Upper area**

Small editorial genre selector.

**Background**

Huge faded halftone Japanese writing:

音楽

の記憶

**Center**

A sweeping curved archive of physically dimensional record sleeves.

The middle record is **BLUE NOON**, with its illustrated cover facing forward.

Neighboring album spines fan away into depth.

A soft shadow sits beneath the central sleeve.

**Below the cover**

Blue Noon

NAMI SOL

青い午後 / BLUE NOON

2013 — JAZZ FUSION

Navigation arrows on either side.

**Below that**

A slim, functional music player with album artwork and transport controls.

**Near the bottom**

A release-year timeline from 1998 to 2026 with a cobalt dot marking 2013.

**Bottom**

Minimal copyright and Japanese archival text.

The first screen must look visually complete and professionally composed.

Do not fill it with irrelevant dashboard statistics, pricing plans, signup cards, or generic welcome panels.

---

# 36. INTERACTION ACCEPTANCE TESTS

The project is only complete when the following behaviors work:

### Album collection

- Clicking an album spine selects that album.
- Clicking the active cover opens its details.
- Dragging navigates through records.
- The mouse wheel navigates records.
- Keyboard arrows navigate records.
- The active album updates the caption.
- The timeline dot updates with album selection.
- The archive loops seamlessly.

### Album details

- The sheet expands from the album cover.
- Album information is correct.
- All tracklist rows work.
- PLAY ALBUM starts playback.
- Close returns to the archive.
- Playback survives opening and closing the sheet.

### Music player

- Play starts playback.
- Pause actually pauses playback.
- Next selects the next song.
- Previous works.
- Progress updates.
- Seek works.
- Volume works.
- Shuffle works.
- Repeat works.
- Track changes update album artwork and metadata.
- The equalizer only animates while playing.

### Music discovery

- Category filtering works.
- Playlist cards open real playlists.
- Playlist playback uses the correct queue.
- Artist cards open real profiles.
- Artist pages link to their music.
- Search returns relevant results.
- Favorites can be saved and removed.
- Saved items survive a page refresh.

### Responsive behavior

- The page works at 1440px width.
- The page works at 1024px width.
- The page works at 768px width.
- The page works at 390px width.
- The page works at 320px width.
- Touch dragging works.
- The mobile player works.
- No major elements overlap.
- No critical text is cut off.
- Detail pages scroll properly.

---

# 37. VISUAL QUALITY REQUIREMENTS

The finished website should feel like an experimental digital music museum.

The key characteristics are:

**Editorial typography**

Large, confident, tightly spaced headings.

**Analog texture**

Warm paper, subtle grain, printed imperfections.

**Physical depth**

The collection should feel like objects occupying a real space.

**Music identity**

Artwork, tracks, genres, artists, and playback must make this unmistakably a music platform.

**Controlled contrast**

Cobalt blue against warm paper.

**Beautiful motion**

Cinematic transforms, responsive springs, staggered masks.

**Immersive discovery**

The central record collection should make users curious to explore the next album.

**Functional product behavior**

A visually impressive design is not enough. The streaming interactions must actually work.

### Avoid

- Generic Spotify clones
- Standard left-sidebar dashboards
- Unstyled browser audio controls
- Huge empty areas
- Random gradients
- Broken album images
- Generic stock photos
- Excessive glass effects
- Unreadable text
- Janky carousel movement
- Fake controls
- Incomplete navigation
- Placeholder artist pages
- Inconsistent spacing
- Default browser buttons

---

# 38. CODE QUALITY

Write production-quality frontend code.

Organize the JavaScript into logical sections:

1. Catalog data
2. Album artwork generation
3. Initial DOM construction
4. 3D archive geometry
5. Rendering and animation
6. Pointer and keyboard interactions
7. Audio engine
8. Playback state management
9. Playlist and artist views
10. Search and filtering
11. Favorites persistence
12. Responsive adjustments
13. Initialization

Use descriptive variable and function names.

Avoid duplicated event handlers.

Use event delegation where appropriate.

Ensure every DOM reference exists before use.

Handle empty filter results.

Handle rapid repeated clicks.

Handle resizing during animations.

Do not leave unfinished TODO comments or placeholder implementations for core features.

---

# 39. IMPLEMENTATION PRIORITY

Implement in this order:

**Phase 1 — Visual foundation**

Create the page structure, fonts, paper texture, background kanji, top navigation, and overall composition.

**Phase 2 — Artwork and catalog**

Create all 12 original album designs, matching spines, album data, artist identities, and tracks.

**Phase 3 — 3D archive**

Implement the curved record collection with depth, rotations, navigation, dragging, shading, and spring motion.

**Phase 4 — Music player**

Implement Web Audio demo playback, track queues, transport controls, seeking, volume, shuffle, repeat, and time display.

**Phase 5 — Detail experience**

Implement the full-screen album sheet, mask transitions, ink reveal, and functional tracklist.

**Phase 6 — Discovery features**

Implement playlists, artist profiles, category filters, search, and saved music.

**Phase 7 — Polish**

Add cursor states, hover effects, captions, timeline movement, responsive layouts, accessibility, and performance optimization.

**Phase 8 — Testing**

Run the project, inspect the rendered result, test all functionality, fix runtime errors, and improve any weak visual details.

---

# 40. FINAL INSTRUCTIONS TO THE CODING AGENT

You are not building a basic proof of concept.

You are building a finished, polished music discovery experience for a competitive creative coding hackathon.

The project must stand out immediately through its visual design and remain impressive when a judge begins interacting with it.

Pay special attention to the curved 3D album archive. This is the centerpiece of the entire design and should receive the greatest amount of animation and layout effort.

The musical identity must be just as strong as the archive aesthetic.

Create real playlist interactions, real artist profiles, working category filters, and one coherent functional music player.

Do not sacrifice interface functionality for animation.

Do not sacrifice the artistic design for a conventional music dashboard.

Keep the original editorial analog aesthetic throughout every section.

Make the result feel expensive, distinctive, tactile, and intentional.

If your development environment supports a browser preview, open the finished website, inspect the layout, check for JavaScript errors, and fix issues before considering the task complete.

Use the initial Blue Noon album view as the reference composition for final visual polishing.

Ensure all core controls work without external credentials or a backend.

**Do not stop after generating the initial layout. Build the complete working interface.**

**Do not ask me to choose colors, layouts, or artwork. Follow this specification and make strong creative decisions where details are unspecified.**

**Begin implementing the website now.**

**The final experience should feel like Spotify reinvented as a beautiful, interactive Japanese vinyl archive — ONDO, where every sound has a memory.**