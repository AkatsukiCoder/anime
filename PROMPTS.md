# 🎬 Anime Explorer — Useful Prompts for ChatGPT

This document stores helpful prompts to use with ChatGPT while developing and improving the Anime Explorer app.

---

### ✅ Layout
- *Write me Page that call "https://api.jikan.moe/v4/anime" and display in content
- *Split content to AnimePage
- *Add floating icon of magnifying glass to open SideBar that allow search
- *Split sidebar search to standalone component

### ✅ AnimePage
- *Add infinite load
- *Remove duplicate by mal_id
- *Split out the fetch into service file
- *Get search term from Redux
- *Make fetch to support searchTerm 
- *Debounce API calls to 250ms intervals to avoid excessive requests
- *Cancel any in-flight API requests if the user continues typing
- *On select on anime go detail page
- *Split AnimeDetailPage to standalone component

### ✅ AnimeDetailPage
- *Write me AnimeDetailPage that call "https://api.jikan.moe/v4/anime/:id" when loaded
- *Split out the fetch into service file
- *Add max-width and max-height for photo