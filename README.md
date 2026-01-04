# Tangara Studio Blog

Blog serverless para lanzamiento de videojuegos construido con Astro + Decap CMS + AWS Amplify.

## 🎯 Quick Start

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env
# Edita .env con tus valores

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# Blog: http://localhost:4321
# CMS Admin: http://localhost:4321/admin
```

**📚 Documentación:**
- [docs/QUICK_START.md](./docs/QUICK_START.md) - Primeros pasos
- [docs/DEPLOYMENT_GUIDE.md](./docs/DEPLOYMENT_GUIDE.md) - Deploy a producción
- [docs/BEST_PRACTICES.md](./docs/BEST_PRACTICES.md) - Tips y mejores prácticas

## 🚀 Stack Tecnológico

- **Frontend:** Astro (Static Site Generator)
- **CMS:** Decap CMS (Git-based)
- **Hosting:** AWS Amplify
- **Analytics:** Google Analytics 4

## 📦 Estructura del Proyecto

```
/
├── public/
│   ├── admin/              # Decap CMS
│   │   ├── config.yml      # Configuración del CMS
│   │   └── index.html      # Admin panel
│   ├── images/             # Imágenes estáticas
│   └── robots.txt
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── PostCard.astro
│   ├── content/
│   │   ├── blog/           # Posts del blog (Markdown)
│   │   └── config.ts       # Schema de contenido
│   ├── layouts/            # Layouts de página
│   │   ├── BaseLayout.astro
│   │   ├── Layout.astro
│   │   └── BlogPost.astro
│   ├── pages/              # Rutas del sitio
│   │   ├── index.astro     # Home
│   │   ├── blog/[slug].astro
│   │   ├── tags/
│   │   └── 404.astro
│   └── styles/
│       └── global.css      # Estilos globales
├── amplify.yml             # Configuración AWS Amplify
├── astro.config.mjs        # Configuración Astro
└── package.json
```

## 🧞 Comandos

| Comando           | Acción                                             |
| :---------------- | :------------------------------------------------- |
| `npm install`     | Instalar dependencias                              |
| `npm run dev`     | Iniciar servidor de desarrollo en `localhost:4321` |
| `npm run build`   | Construir sitio para producción en `./dist/`       |
| `npm run preview` | Previsualizar build localmente antes de deploy     |
| `npm run clean`   | Limpiar archivos de build                          |
| `npm run format`  | Formatear código con Prettier                      |

## 📝 Crear Posts

### Opción 1: Usando el CMS (Recomendado)
1. Abre `http://localhost:4321/admin`
2. Click en "Blog Posts" → "New Blog Posts"
3. Rellena los campos y publica

### Opción 2: Manualmente
Crea un archivo `.md` en `src/content/blog/`:

```markdown
---
title: 'Tu Título'
description: 'Descripción breve'
author: 'Tu Nombre'
pubDate: 2025-01-04
heroImage: '/images/tu-imagen.jpg'
tags: ['devlog', 'tutorial']
draft: false
---

# Tu contenido aquí

Escribe en Markdown...
```

## 🌍 Ambientes

- **Development:** `develop` branch → `dev.blog.tangara.studio`
- **Production:** `main` branch → `blog.tangara.studio`

## 🔐 Seguridad

El panel `/admin` en producción está protegido mediante:
1. **Basic Authentication** en el edge (CloudFront/Lambda@Edge)
2. **OAuth con GitHub** (Decap CMS)

En desarrollo, `/admin` está accesible sin restricciones.

## 📊 Analytics

Google Analytics 4 está integrado y registra automáticamente:
- Tráfico por post
- Fuentes de tráfico
- Tiempo en página
- Engagement de usuarios

## 🎮 Features

- ✅ Edición visual de posts con Decap CMS
- ✅ Markdown con HTML embebido (widgets de Steam, YouTube, etc.)
- ✅ Social sharing optimizado (Open Graph, Twitter Cards)
- ✅ SEO friendly (sitemap, robots.txt, meta tags)
- ✅ Responsive design
- ✅ Sistema de tags y categorías
- ✅ Página 404 personalizada
- ✅ Dark mode automático
- ✅ Performance optimizado
- ✅ Zero cost (dentro del free tier de AWS)

## 🎨 Personalización

### Cambiar colores
Edita `src/styles/global.css`:
```css
:root {
  --color-primary: #6366f1;
  --color-primary-dark: #4f46e5;
}
```

### Cambiar información del blog
- Header: `src/components/Header.astro`
- Footer: `src/components/Footer.astro`
- Home: `src/pages/index.astro`

## 🚢 Deployment

Ver guía completa: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Resumen:**
1. Push código a GitHub
2. Conectar repo con AWS Amplify
3. Configurar dominio personalizado
4. Proteger `/admin` con Basic Auth
5. Configurar Google Analytics

## 🔧 Requisitos de Sistema

- Node.js 18+ 
- npm 9+
- Git

## 📄 Licencia

Este proyecto está bajo tu licencia. Úsalo libremente para tu blog.

## 🆘 Soporte

- **Issues:** Reporta bugs en GitHub Issues
- **Documentación:** Lee las guías en `/docs`
- **Community:** Únete a nuestro Discord

---

**¿Listo para comenzar?** Lee [QUICK_START.md](./QUICK_START.md) para los primeros pasos.

---

Hecho con ❤️ por Tangara Studio
