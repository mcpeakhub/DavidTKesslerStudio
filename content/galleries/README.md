# David T. Kessler Studios Content

This folder contains editable website content.

## Galleries

Paintings are stored in:

```text
content/galleries/gallery1/
content/galleries/gallery2/
content/galleries/gallery3/
content/galleries/gallery4/
content/galleries/gallery5/
content/galleries/gallery6/
```

Each painting is one JSON file.

Example:
{
"id": "morning-light",
"title": "Morning Light",
"medium": "Oil on Canvas",
"year": 2025,
"dimensions": "30 × 40 in",
"featured": true,
"dateAdded": "2026-07-04",
"image": "/images/gallery1/morning-light.jpg",
"description": "Light reflecting across water at dawn."
}

New Paintings

The "New Paintings" page is automatic.

It shows the 12 newest paintings based on each JSON file:
"dateAdded": "YYYY-MM-DD"

Featured Work

The home page featured artwork is controlled with:
"featured": true

Only one painting should usually be marked as featured.

Adding a painting
Copy the painting image into the correct image folder.
Create a new JSON file in the correct gallery folder.
Give it a unique id.
Save the file.
Refresh the browser.
