---
title: How to Embed Steam Widgets in Your Blog
description: Quick guide to add interactive Steam Store widgets to your devlog posts
author: Tangara Studio
pubDate: 2025-01-04
heroImage: /images/placeholder-hero.jpg
tags:
  - tutorial
  - steam
  - marketing
draft: true
language: en
---

# Steam Widgets in Your Posts

One of the best ways to promote your game on Steam is to embed the official widget directly in your devlogs.

## Why use the widget?

- ✅ **Attractive visual** with game image
- ✅ **Integrated wishlist** button
- ✅ **Price and discounts** automatically updated
- ✅ **No complicated configuration**

## How to Add It

### 1. Get the widget code

Go to your game's page on Steam Store and get the App ID (the number in the URL).

For example, for **Hollow Knight**:
- URL: `https://store.steampowered.com/app/367520/`
- App ID: `367520`

### 2. Insert the HTML code

In your markdown post, simply paste:

```html
<iframe src="https://store.steampowered.com/widget/367520/" 
        frameborder="0" 
        width="100%" 
        height="190">
</iframe>
```

### 3. Result

<iframe src="https://store.steampowered.com/widget/367520/" 
        frameborder="0" 
        width="100%" 
        height="190">
</iframe>

## Additional Tips

### Responsive
The widget is responsive by default with `width="100%"`.

### Multiple Widgets
You can add multiple widgets in the same post:

<iframe src="https://store.steampowered.com/widget/374320/" 
        frameborder="0" 
        width="100%" 
        height="190">
</iframe>

### Call to Action

Combine it with persuasive text:

> **Like what you see?** Add our game to your Steam wishlist. Every wishlist counts! 🎮

---

## Other Useful Embeds

### YouTube
```html
<iframe width="560" height="315" 
        src="https://www.youtube.com/embed/VIDEO_ID" 
        frameborder="0" 
        allowfullscreen>
</iframe>
```

### Itch.io
```html
<iframe src="https://itch.io/embed/GAME_ID?linkback=true&border_width=2&bg_color=222222&fg_color=eeeeee&link_color=FA5C5C&border_color=363636" 
        width="100%" 
        height="167" 
        frameborder="0">
</iframe>
```

---

**Now you're all set to promote your game directly from your posts! 🚀**
