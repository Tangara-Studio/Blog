# Guía de Deployment

Proceso completo para llevar el blog a producción.

## 📋 Requisitos

- Cuenta de GitHub
- Cuenta de AWS (acceso a Amplify)
- Google Analytics 4
- Dominio (ej: blog.tangara.studio)

---

## 1️⃣ GitHub Setup

### Crear repositorio
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/tangara-blog.git
git push -u origin main

# Crear rama develop
git checkout -b develop
git push -u origin develop
```

### GitHub OAuth (Decap CMS)

1. https://github.com/settings/developers → "New OAuth App"
2. **Homepage URL**: `https://blog.tangara.studio`
3. **Callback URL**: `https://api.netlify.com/auth/done`
4. Guarda **Client ID** y **Client Secret**

### Actualizar CMS config
`public/admin/config.yml`:
```yaml
backend:
  repo: tu-usuario/tangara-blog  # ⚠️ ACTUALIZAR
```

---

## 2️⃣ AWS Amplify

### Crear app
1. [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. "New app" → "Host web app" → GitHub
3. Autoriza y selecciona tu repo

### Variables de Entorno
Amplify Console → App settings → Environment variables

**Rama `main` (Producción):**
```
PUBLIC_SITE_URL = https://blog.tangara.studio
PUBLIC_GA_MEASUREMENT_ID = G-XXXXXXXXXX
```

**Rama `develop`:**
```
PUBLIC_SITE_URL = https://dev.blog.tangara.studio
PUBLIC_GA_MEASUREMENT_ID = (vacío o test ID)
```

### Multi-ambiente
App settings → Branches → Agregar rama `develop`
- `main` → Producción
- `develop` → Staging

---

## 3️⃣ Dominio Personalizado

### Configurar en Amplify
1. App settings → Domain management → "Add domain"
2. Ingresa: `tangara.studio`
3. Subdominios:
   - `main` → `blog.tangara.studio`
   - `develop` → `dev.blog.tangara.studio`

### Configurar DNS
En tu proveedor DNS (Route 53, Cloudflare, etc.):
```
blog → CNAME → [tu-app].amplifyapp.com
dev.blog → CNAME → [tu-app].amplifyapp.com
```

⏱️ Propagación DNS: 5-48 horas

---

## 4️⃣ Proteger /admin

### Opción A: Basic Auth via Amplify (Recomendado)
1. Amplify Console → Access control → "Manage access"
2. Selecciona solo rama `main`
3. "Restrict access" → Agrega usuario/contraseña
4. Guarda

✅ `/admin` en prod ahora requiere autenticación

### Opción B: Lambda@Edge
Para control granular, crea Lambda function en us-east-1 y asocia con CloudFront.

---

## 5️⃣ Google Analytics

### Crear Propiedad
1. https://analytics.google.com/ → Admin → Create Property
2. Nombre: "Tangara Studio Blog"
3. Create Data Stream (Web)
4. URL: `https://blog.tangara.studio`

### Configurar
1. Copia **Measurement ID** (G-XXXXXXXXXX)
2. Amplify → Environment variables
3. `PUBLIC_GA_MEASUREMENT_ID` = tu ID
4. Redeploy

### Verificar
GA4 → Reports → Realtime (visita tu sitio)

---

## 6️⃣ OAuth para Decap CMS

### Netlify OAuth Gateway (gratis)
1. Cuenta en Netlify
2. Site settings → Access control → OAuth
3. "Install provider" → GitHub
4. Ingresa Client ID y Secret de GitHub

Configuración en `public/admin/config.yml`:
```yaml
backend:
  base_url: https://api.netlify.com
  auth_endpoint: auth
```

---

## 7️⃣ Workflow

### Desarrollo
```bash
git checkout develop
# hacer cambios
git commit -m "feat: nuevo post"
git push origin develop
```
↓ Auto-deploy a `dev.blog.tangara.studio`

### Producción
```bash
git checkout main
git merge develop
git push origin main
```
↓ Auto-deploy a `blog.tangara.studio`

### Usando CMS
1. https://blog.tangara.studio/admin
2. Basic Auth (solo prod)
3. GitHub OAuth
4. Crear/editar post → Publish
5. Auto-redeploy

---

## ✅ Verificación

- [ ] Sitio en `https://blog.tangara.studio`
- [ ] SSL activo (🔒)
- [ ] `/admin` protegido (prod)
- [ ] OAuth funciona
- [ ] Posts se muestran
- [ ] GA4 registra visitas
- [ ] Social sharing (Twitter Card Validator, Facebook Debugger)
- [ ] Responsive
- [ ] Lighthouse > 90

---

## 🆘 Troubleshooting

### Admin no carga
- Verifica `public/admin/index.html` existe
- Limpia caché navegador
- Revisa consola de errores

### OAuth falla
- Verifica Client ID/Secret en Netlify
- Verifica Callback URL en GitHub
- Revisa `base_url` en config.yml

### Posts no aparecen
- `draft: false`
- Formato de frontmatter correcto
- Revisa build logs en Amplify

### GA4 no registra
- Verifica Measurement ID
- Espera 24-48h para datos completos
- Usa GA4 DebugView para testing

---

## 💰 Costos Esperados

- Amplify: ~$0 (free tier: 1000 min build/mes, 15 GB hosting)
- Route 53: ~$0.50/mes (si usas)
- GA4: $0
- **Total: < $1/mes**

---

## 📚 Referencias

- [Astro Docs](https://docs.astro.build/)
- [Decap CMS](https://decapcms.org/docs/)
- [AWS Amplify](https://docs.amplify.aws/)
- [GA4 Setup](https://support.google.com/analytics/answer/9304153)
```

### 2.4 Configurar Multi-ambiente

1. En Amplify Console → App settings → General
2. En "Branches", agrega la rama `develop`
3. Configura:
   - `main` → Producción
   - `develop` → Desarrollo (staging)

---

## 3️⃣ Configuración de Dominio

### 3.1 Configurar Dominio Personalizado

1. En Amplify Console → App settings → Domain management
2. Click "Add domain"
3. Ingresa: `tangara.studio`
4. Configura subdominios:
   ```
   main branch → blog.tangara.studio
   develop branch → dev.blog.tangara.studio
   ```

### 3.2 Configurar DNS

En tu proveedor de DNS (Route 53, Cloudflare, etc.):

**Opción A: CNAME (recomendado)**
```
blog.tangara.studio → CNAME → [url-de-amplify].amplifyapp.com
dev.blog.tangara.studio → CNAME → [url-de-amplify].amplifyapp.com
```

**Opción B: A Record + ALIAS**
AWS Amplify proporcionará los valores necesarios.

⏱️ **Espera**: La propagación de DNS puede tomar 5-48 horas.

---

## 4️⃣ Protección de /admin en Producción

### Opción A: Basic Auth via Amplify (Más Simple) ⭐

1. En Amplify Console → App settings → Access control
2. Click "Manage access"
3. Selecciona solo la rama `main`
4. Activa "Restrict access"
5. Agrega credenciales:
   ```
   Username: admin
   Password: [contraseña-segura-aquí]
   ```
6. Guarda

✅ Ahora `/admin` en producción pedirá usuario/contraseña.

### Opción B: Lambda@Edge (Más Control)

Si necesitas control más granular:

1. Crea función Lambda@Edge en us-east-1
2. Código de ejemplo en `AMPLIFY_SETUP.md`
3. Asocia con distribución CloudFront de Amplify
4. Configura trigger: Viewer Request

---

## 5️⃣ Configuración de Google Analytics 4

### 5.1 Crear Propiedad GA4

1. Ve a: https://analytics.google.com/
2. Admin → Create Property
3. Nombre: "Tangara Studio Blog"
4. Configuración:
   - Timezone: Tu zona horaria
   - Currency: Tu moneda
5. Crea Data Stream:
   - Type: Web
   - URL: `https://blog.tangara.studio`
   - Stream name: "Blog Production"

### 5.2 Obtener Measurement ID

1. En la página del stream, copia el **Measurement ID** (formato: `G-XXXXXXXXXX`)
2. Actualiza en Amplify:
   - App settings → Environment variables
   - `PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`

### 5.3 Verificar Integración

1. Deploy la aplicación
2. Abre https://blog.tangara.studio
3. En GA4, ve a Reports → Realtime
4. Deberías ver tu visita registrada

---

## 6️⃣ Configuración de OAuth para Decap CMS

### 6.1 Usando Netlify OAuth Gateway (Gratis)

Aunque no usamos Netlify para hosting, podemos usar su OAuth gateway:

1. Crea cuenta en Netlify (gratis)
2. Ve a: https://app.netlify.com/
3. Site settings → Access control → OAuth
4. Click "Install provider"
5. Selecciona "GitHub"
6. Ingresa:
   - **Client ID**: (de GitHub OAuth App)
   - **Client Secret**: (de GitHub OAuth App)

### 6.2 Verificar Configuración

En `public/admin/config.yml`:
```yaml
backend:
  name: github
  repo: tu-usuario/tangara-blog
  branch: main
  base_url: https://api.netlify.com
  auth_endpoint: auth
```

---

## 7️⃣ Workflow de Publicación

### Desarrollo Local
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Abrir http://localhost:4321
# Abrir CMS: http://localhost:4321/admin
```

### Publicar en Desarrollo
```bash
git checkout develop
git add .
git commit -m "feat: nuevo post de devlog"
git push origin develop
```
↓ Amplify construye automáticamente ↓  
✅ Disponible en: `https://dev.blog.tangara.studio`

### Publicar en Producción
```bash
git checkout main
git merge develop
git push origin main
```
↓ Amplify construye automáticamente ↓  
✅ Disponible en: `https://blog.tangara.studio`

### Usando el CMS

1. Ve a `https://blog.tangara.studio/admin`
2. Ingresa credenciales de Basic Auth (solo en prod)
3. Click "Login with GitHub"
4. Crea/edita posts
5. Click "Publish"
6. Amplify detecta el commit y redeploya automáticamente

---

## 8️⃣ Verificación Post-Deploy

### Checklist de Producción

- [ ] Sitio accesible en https://blog.tangara.studio
- [ ] SSL activo (🔒 en el navegador)
- [ ] `/admin` requiere autenticación
- [ ] OAuth con GitHub funciona
- [ ] Posts se muestran correctamente
- [ ] Imágenes cargan correctamente
- [ ] GA4 registra visitas
- [ ] Social sharing muestra preview correcto
- [ ] Responsive en móvil/tablet
- [ ] Performance > 90 en Lighthouse

### Herramientas de Verificación

**Social Sharing:**
- Twitter: https://cards-dev.twitter.com/validator
- Facebook: https://developers.facebook.com/tools/debug/
- LinkedIn: https://www.linkedin.com/post-inspector/

**SEO & Performance:**
- Lighthouse (Chrome DevTools)
- PageSpeed Insights: https://pagespeed.web.dev/

**Analytics:**
- GA4 Realtime reports
- Amplify Analytics dashboard

---

## 9️⃣ Mantenimiento

### Actualizar Dependencias
```bash
npm update
npm audit fix
```

### Monitoreo
- AWS Amplify Console: Deploy logs, errores
- Google Analytics 4: Tráfico, engagement
- GitHub: Issues, pull requests

### Backups
El contenido vive en Git → ya está respaldado 🎉

### Costos Esperados
- Amplify: ~$0 (free tier)
- Route 53 (si usas): ~$0.50/mes
- **Total: < $1 USD/mes**

---

## 🆘 Troubleshooting

### El admin no carga
- Verifica que `public/admin/index.html` existe
- Verifica rutas en `amplify.yml`
- Limpia caché del navegador

### OAuth falla
- Verifica Client ID/Secret en Netlify
- Verifica Callback URL en GitHub OAuth App
- Verifica `base_url` en `config.yml`

### Posts no aparecen
- Verifica que `draft: false` en el post
- Verifica formato del markdown
- Revisa build logs en Amplify Console

### GA4 no registra
- Verifica Measurement ID en variables de entorno
- Verifica que estás en producción (no local)
- Espera 24-48h para datos completos

---

## 📚 Referencias

- [Astro Docs](https://docs.astro.build/)
- [Decap CMS Docs](https://decapcms.org/docs/)
- [AWS Amplify Docs](https://docs.amplify.aws/)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)

---

## ✅ Próximos Pasos (Opcional)

- [ ] Configurar newsletter (ConvertKit, Mailchimp)
- [ ] Agregar comentarios (Giscus, Utterances)
- [ ] RSS Feed automático
- [ ] Sitemap XML
- [ ] Búsqueda de posts
- [ ] Categorías/Taxonomías
- [ ] Posts relacionados
- [ ] Dark mode toggle manual

---

**¡Felicitaciones! Tu blog está listo para acompañar el lanzamiento de tus videojuegos. 🎮🚀**
