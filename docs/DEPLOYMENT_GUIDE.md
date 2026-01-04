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

