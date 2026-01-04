# Mejores Prácticas

## 📝 Posts Efectivos

### Estructura
- H1 solo para título principal
- H2 para secciones
- Introducción breve
- Conclusión con call to action

### Imágenes
- **Hero:** 1200x630px (social sharing)
- **Formato:** WebP o JPG < 200KB
- **Alt text:** Siempre para SEO
- **Herramientas:** [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)

### SEO
- **Título:** 50-60 caracteres
- **Descripción:** 150-160 caracteres
- **Keywords:** En título, descripción y primeros párrafos

## 🎯 Marketing

### Frecuencia
- Mínimo: 1 post/semana
- Ideal: 2-3 posts/semana

### Tipos de Contenido
- Devlogs (progreso)
- Behind the scenes
- Tutoriales
- Anuncios

### Promoción
- Twitter/X (#gamedev)
- Reddit (r/gamedev, r/IndieDev)
- Discord communities

## 🔒 Seguridad

### NUNCA commitees:
- Passwords
- API Keys
- Client Secrets
- Tokens

Usa variables de entorno (`.env`)

### Mantén:
- Acceso al repo limitado
- Rota passwords cada 3 meses
- HTTPS siempre activo (automático con Amplify)

## ⚡ Performance

### Core Web Vitals
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

### Verificar
```bash
npm run build
npm run preview
npx lighthouse http://localhost:4321 --view
```

## 📊 Analytics

### Métricas Clave
- Pageviews
- Bounce rate (< 60% es bueno)
- Avg. time on page (> 2 min excelente)
- Traffic sources

## 🔄 Git Workflow

### Commits
Usa [Conventional Commits](https://www.conventionalcommits.org/):
```bash
feat: nueva funcionalidad
fix: corrección de bug
docs: documentación
style: cambios de estilo
```

### Branches
```
main (producción)
└── develop (desarrollo)
    └── feature/nombre
```

### Deploy
```bash
# A develop
git checkout develop
git commit -m "feat: nuevo post"
git push origin develop

# A producción
git checkout main
git merge develop
git push origin main
```

## 🐛 Troubleshooting

### Build falla
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Admin no carga
- Limpia caché (Cmd+Shift+R)
- Verifica `public/admin/index.html` existe
- Revisa consola de errores

### Posts no aparecen
- `draft: false`
- Fecha no futura
- Formato frontmatter correcto

## 📚 Recursos

- [Astro Docs](https://docs.astro.build/)
- [Markdown Guide](https://www.markdownguide.org/)
