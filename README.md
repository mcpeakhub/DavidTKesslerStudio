# David T. Kessler Studios

A modern React/TypeScript website for contemporary artist **David T. Kessler**.

The site was built to replace the original ASP.NET website with a modern, responsive application that is easy to maintain and update without requiring a database.

---

# Features

- React 19
- TypeScript
- Vite
- Express API
- Tailwind CSS
- Responsive design
- Dark Mode
- Lightbox image viewing
- JSON-based artwork catalog
- No database required

---

# Technology Stack

Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

Backend

- Node.js
- Express

Shared

- TypeScript shared models

---

# Project Structure

```
apps/
    api/            Express API
    web/            React application

packages/
    shared/         Shared TypeScript types

content/
    galleries/
        gallery0/
        gallery1/
        gallery2/
        gallery3/
        gallery4/
        gallery5/
        gallery6/

public/
    images/
        gallery0/
        gallery1/
        ...
```

---

# Running the Project

Install dependencies

```bash
pnpm install
```

Start both the API and the React application

```bash
pnpm dev
```

The website will be available at

```
http://localhost:5173
```

---

# Adding a New Painting

1. Copy the JPEG into

```
apps/web/public/images/galleryX/
```

2. Give the image a meaningful filename.

Example

```
creekside-patterns.jpg
```

instead of

```
DSC_4837.jpg
```

3. Create a matching JSON file in

```
content/galleries/galleryX/
```

Example

```
creekside-patterns.json
```

4. Edit the JSON file.

Example

```json
{
	"id": "creekside-patterns",
	"title": "Creekside Patterns",
	"medium": "Acrylic on Aluminum",
	"dimensions": "48 x 72",
	"year": 2026,
	"sold": false
}
```

Restarting the server is not required.

---

# Sold Paintings

A painting can be marked as sold by setting

```json
"sold": true
```

Most paintings display

```
Sold
```

If a custom label is desired

```json
"sold": true,
"soldLabel": "OK Harris Show Sold"
```

---

# New Paintings

Gallery 0 contains the newest works.

Images

```
apps/web/public/images/gallery0/
```

Metadata

```
content/galleries/gallery0/
```

---

# Dark Mode

The site supports both light and dark themes.

The user's preference is remembered automatically.

---

# Deployment

Build

```bash
pnpm build
```

Deploy the contents of the web application to your hosting provider.

---

# Future Improvements

Potential future enhancements include

- Search
- Painting filtering
- Video content
- Virtual exhibitions
- Online purchasing
- Artist news
- Exhibition calendar

---

# Design Philosophy

The artwork should always remain the primary focus. Interface changes should be subtle, restrained, and never compete with the paintings. When in doubt, simplify rather than add.

---

Created for

**David T. Kessler Studios**

Modernized from the original ASP.NET website using React, TypeScript, Vite, Express, and Tailwind CSS.
