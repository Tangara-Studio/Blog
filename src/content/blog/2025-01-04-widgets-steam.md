---
title: 'Cómo Incrustar Widgets de Steam en tu Blog'
description: 'Guía rápida para agregar widgets interactivos de Steam Store a tus posts de devlog'
author: 'Tangara Studio'
pubDate: 2025-01-04
heroImage: '/images/placeholder-hero.jpg'
tags: ['tutorial', 'steam', 'marketing']
draft: false
---

# Widgets de Steam en tus Posts

Una de las mejores formas de promocionar tu juego en Steam es incrustar el widget oficial directamente en tus devlogs.

## ¿Por qué usar el widget?

- ✅ **Visual atractivo** con imagen del juego
- ✅ **Botón de wishlist** integrado
- ✅ **Precio y descuentos** actualizados automáticamente
- ✅ **Sin configuración complicada**

## Cómo Agregarlo

### 1. Obtén el código del widget

Ve a la página de tu juego en Steam Store y obtén el App ID (el número en la URL).

Por ejemplo, para **Hollow Knight**:
- URL: `https://store.steampowered.com/app/367520/`
- App ID: `367520`

### 2. Inserta el código HTML

En tu post markdown, simplemente pega:

```html
<iframe src="https://store.steampowered.com/widget/367520/" 
        frameborder="0" 
        width="100%" 
        height="190">
</iframe>
```

### 3. Resultado

<iframe src="https://store.steampowered.com/widget/367520/" 
        frameborder="0" 
        width="100%" 
        height="190">
</iframe>

## Tips Adicionales

### Responsive
El widget es responsive por defecto con `width="100%"`.

### Múltiples Widgets
Puedes agregar varios widgets en el mismo post:

<iframe src="https://store.steampowered.com/widget/374320/" 
        frameborder="0" 
        width="100%" 
        height="190">
</iframe>

### Call to Action

Combínalo con texto persuasivo:

> **¿Te gusta lo que ves?** Agrega nuestro juego a tu wishlist en Steam. ¡Cada wishlist cuenta! 🎮

---

## Otros Embeds Útiles

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

**¡Ahora tienes todo listo para promocionar tu juego directamente desde tus posts! 🚀**
