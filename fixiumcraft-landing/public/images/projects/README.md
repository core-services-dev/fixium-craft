# Recent Projects — Before/After photos

Drop real (or generated) job photos into this folder using these exact filenames — the gallery on the homepage will pick them up automatically, no code changes needed.

| Gallery item | Before | After |
|---|---|---|
| Modern Bed Frame Assembly | `bed-before.jpg` | `bed-after.jpg` |
| Wardrobe & Closet System Assembly (IKEA PAX) | `wardrobe-before.jpg` | `wardrobe-after.jpg` |
| Window AC Unit Installation | `ac-before.jpg` | `ac-after.jpg` |
| TV Wall Mounting & Shelving | `tv-mount-before.jpg` | `tv-mount-after.jpg` |

Notes:
- Recommended aspect ratio: 4:3 (matches the card's image container).
- If a file is missing, that card's Before/After toggle still works — it just shows the existing icon-based placeholder for that state instead of a photo, so it's safe to add these one at a time.
- To add a 5th (or different) project, add a matching `beforeImage`/`afterImage` pair to the item's entry in `components/contentData.js`'s `projectsGallery.items` array.
