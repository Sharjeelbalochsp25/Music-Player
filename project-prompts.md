# ONDO — Project prompts

These prompts follow the order of the project conversation. For a fresh build, apply the later prompts as revisions to the original brief. [Original implementation plan](implementation_plan.md)

## 1. Build ONDO from the implementation plan

> Implement **ONDO — The Sound Archive** using [implementation_plan.md](implementation_plan.md) as the full specification. Build a working music discovery site around a curved 3D record archive. Preserve the warm paper texture, cobalt typography, oversized Japanese lettering, and editorial style.
>
> Implement the album and track views, genre filters, artist profiles, playlists, search, saved music, and playback controls. Start with the demo catalog and audio described in the plan. Make the site work on desktop and mobile, including keyboard and touch navigation. Verify the main browsing and playback flows before calling the build complete.

## 2. Commit the initial implementation

> Review the working tree and commit the initial ONDO implementation with a clear Git message. Stage the files that belong to the implementation and report the commit hash and branch.

## 3. Replace the sleeves with vinyl and expand the homepage

> Replace the square, VHS-like objects in the 3D archive with circular vinyl records. Give each record visible grooves, a spindle hole, and a center label that uses the release artwork. Preserve the curved layout and the ability to browse the collection.
>
> Make the homepage scrollable. Below the vinyl archive, add sections people can use to discover music, such as song and artist search, curated playlists, artist profiles, and saved music. Use the same typography, color palette, and layout style throughout.
>
> Add recognizable songs by established artists. Use official previews for in-app playback and clearly label them as previews.

## 4. Enlarge the artwork, spin the records, and feature established artists

> Enlarge the artwork in the center of each vinyl while leaving enough of the grooves visible to keep the record shape recognizable. Rotate the artwork while that record’s preview plays and pause the rotation when playback pauses. Respect reduced-motion preferences.
>
> Put The Weeknd and other established artists directly in the main vinyl archive. Open the homepage on The Weeknd and play featured previews through the main player.

## 5. Simplify the cursor and make vinyl clicks predictable

> Remove the floating play/pause button beside the center vinyl. Keep playback controls in the main player.
>
> Replace the custom “OPEN” cursor with the native pointer over clickable vinyls. Keep records steady on hover so the target stays under the pointer. A click on a side vinyl should bring it to the center. A click on the centered vinyl should open its details. Clicking the empty space around or below the vinyl should do nothing.

## 6. Start the selected song and add at least 50 more

> When I switch vinyls, stop the previous song immediately and start the newly selected song’s preview automatically. Keep the centered vinyl, track title, playback progress, and rotation in sync. When the player advances to another track in the vinyl queue, move the carousel to the matching record.
>
> Show each song only once in the carousel, including at either end of the visible row. Add at least 50 new, distinct songs with official previews, bringing variety to the artists and genres in the main archive. Verify the catalog for duplicate tracks and test switching records while a preview is already playing.

## 7. Replace placeholder artist cards with real portraits

> Replace the “Meet the independent archive” section with a **Featured artists** section for recognizable singers in the vinyl catalog. Use real photographs of the artists with appropriate credit, and frame the images so each face is easy to recognize. Each card should open the artist’s profile and give visitors a way to find their tracks.

## 8. Improve track and artist descriptions and simplify the iTunes credit

> Replace generic descriptions with short, specific listening notes for as many catalog tracks as possible. Mention what listeners can hear, such as the instrumentation, vocal delivery, rhythm, or arrangement. Add concise artist bios that describe each artist’s sound and give listeners context for their tracks.
>
> Remove repeated “Download on iTunes” calls to action from track details and discovery cards. Keep one discreet release link in the preview credit beneath the main player, where it follows the active track. Keep Play Preview easy to find in track details.

## 9. Collect and polish the project prompts

> Collect my requests from the start of the ONDO project in a single Markdown file. Keep them in chronological order and rewrite each one as a clear, actionable prompt. Preserve the intent of each request, link to the original implementation plan, and make it clear when a later request revises an earlier one.
