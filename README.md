# ONDO · The Sound Archive

ONDO is a browser-based music discovery archive built around a curved 3D carousel of vinyl records. It opens on The Weeknd’s “Call Out My Name.” Browse the records by track, genre, or release year, then listen to a preview or open the record for a closer look.

## Run locally

From the repository directory, start a static server with Python 3.

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open [localhost:8000](http://127.0.0.1:8000). The app uses plain HTML, CSS, and JavaScript. There is no build step or API key. An internet connection is needed for iTunes previews, release artwork, and live music search.

## Explore the archive

- **Browse 145 tracks from 23 artists.** Drag the carousel, use the arrows, or choose a genre or release year. Select a side record to bring it to the center and start its preview. Click the centered record to open its listening notes.
- **Control playback.** Play, pause, seek, adjust volume, or skip tracks. Shuffle and repeat are available in the player. The vinyl artwork rotates during playback and follows your reduced-motion preference.
- **Discover music.** Search the archive, look up official releases in the Listening Room, and explore artist profiles and curated playlists. The original ONDO playlists use music synthesized in the browser.
- **Save a collection.** Bookmark tracks, records, and playlists. Saved items are stored in the current browser and are available from the menu.

## Project files

| File | Purpose |
| --- | --- |
| [index.html](index.html), [ondo.css](ondo.css) | Page structure, responsive styles, and vinyl presentation |
| [ondo.js](ondo.js), [audio.js](audio.js) | Carousel, player, library views, and audio playback |
| [discovery.js](discovery.js) | Listening Room search and homepage sections |
| [featured-releases.js](featured-releases.js), [featured-catalog.js](featured-catalog.js), [featured-notes.js](featured-notes.js) | Official preview catalog, artist profiles, and listening notes |
| [catalog.js](catalog.js) | Original ONDO tracks, artwork, and playlists |

The [implementation plan](implementation_plan.md) documents the original brief. The [project prompts](project-prompts.md) record the later revisions, including the switch to vinyl and the expansion to official music previews.

## Credits

Featured recordings are streamed as official previews courtesy of iTunes. The preview credit below the main player links to the active release.

- The Weeknd photograph by Brian Ziff. [Source](https://commons.wikimedia.org/wiki/File:The_Weeknd_Portrait_by_Brian_Ziff.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- Billie Eilish photograph by Lars Crommelinck. [Source](https://commons.wikimedia.org/wiki/File:Billie_Eilish_at_Pukkelpop_Festival_-_18_AUGUST_2019_(08)_(cropped).jpg) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)
- Dua Lipa photograph by TNT Brasil. [Source](https://commons.wikimedia.org/wiki/File:Dua_Lipa_Grammys_2024.jpg) · [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)
- Adele photograph by Marc E. [Source](https://commons.wikimedia.org/wiki/File:Adele_2016.jpg) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)

Portraits are cropped in the interface.
