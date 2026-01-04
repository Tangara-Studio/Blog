# Guía Rápida - Primeros Pasos

## 🚀 Setup (3 minutos)

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env

# 3. Iniciar servidor
npm run dev
```

**URLs:**
- Blog: http://localhost:4321
- Admin: http://localhost:4321/admin (redirige a /admin/)

---

## ✏️ Crear tu Primer Post

### Opción A: Usando el CMS (Recomendado)

1. Abre http://localhost:4321/admin
2. Click "Blog Posts" → "New Blog Posts"
3. Rellena campos y publica

### Opción B: Manualmente

Crea `src/content/blog/2025-01-04-mi-post.md`:

```markdown
---
title: 'Mi Primer Post'
description: 'Descripción breve'
author: 'Tu Nombre'
pubDate: 2025-01-04
heroImage: '/images/imagen.jpg'
tags: ['devlog']
draft: false
---

Tu contenido aquí...
```

---

## 🎨 Personalización

### Colores
`src/styles/global.css`:
```css
:root {
  --color-primary: #6366f1;
}
```

### Textos
- Header: `src/components/Header.astro`
- Footer: `src/components/Footer.astro`
- Home: `src/pages/index.astro`

---

## 📦 Comandos

```bash
npm run dev        # Desarrollo local
npm run build      # Construir para producción
npm run preview    # Previsualizar build local
```

---

## 🔧 Configuración Necesaria

### 1. Variables de Entorno
```bash
npm run dev        # Desarrollo local
npm run build      # Build para producción
npm run preview    # Previsualizar build
```

---

## 🔧 Configuración Inicial

### Variables de Entorno
```bash
cp .env.example .env
```

Edita `.env`:
```env
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Configurar Decap CMS
Edita `public/admin/config.yml`:
```yaml
backend:
  repo: tu-usuario/tangara-blog  # ⚠️ Actualizar con tu repo
```

---

## 📝 Markdown y Embeds

### HTML Embeds

```html
<!-- Steam Widget -->
<iframe src="https://store.steampowered.com/widget/APP_ID/"
        width="100%" height="190" frameborder="0"></iframe>

<!-- YouTube -->
<iframe width="560" height="315" 
        src="https://www.youtube.com/embed/VIDEO_ID"
        frameborder="0" allowfullscreen></iframe>
```

---

## 🚢 Deploy

Ver [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) para guía completa.

## ❓ Problemas

- Admin no carga: Limpia caché (Cmd+Shift+R)
- Posts no aparecen: Verifica `draft: false` y fecha
- Build falla: `npm run build` para ver errores
