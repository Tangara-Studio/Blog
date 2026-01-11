# OAuth Server para Decap CMS

Servidor OAuth personalizado para autenticación con GitHub en Decap CMS, desplegado en AWS Lambda.

## 🏗️ Arquitectura

- **AWS Lambda**: Ejecuta el código del servidor OAuth
- **API Gateway**: Proporciona endpoints HTTP públicos
- **GitHub OAuth App**: Maneja la autenticación

## 📋 Rutas

- `GET /auth` - Inicia el flujo OAuth con GitHub
- `GET /callback` - GitHub redirige aquí con el código de autorización
- `GET /success` - Página de confirmación (opcional)

## 🔧 Variables de Entorno

En Lambda, configura:

```
GITHUB_CLIENT_ID = tu_client_id_de_github
GITHUB_CLIENT_SECRET = tu_client_secret_de_github
REDIRECT_URL = https://blog.tangara.studio/admin/
```

## 🚀 Despliegue

### Opción 1: Manual (AWS Console)

1. **Crear función Lambda:**
   - Ve a AWS Lambda Console
   - "Create function" → "Author from scratch"
   - Nombre: `tangara-blog-oauth`
   - Runtime: Node.js 20.x
   - Copia el contenido de `index.js`

2. **Configurar variables de entorno:**
   - Configuration → Environment variables
   - Agrega las 3 variables mencionadas arriba

3. **Crear API Gateway:**
   - API Gateway Console → "Create API" → HTTP API
   - Integración: Lambda function → selecciona `tangara-blog-oauth`
   - Rutas:
     - `GET /oauth/auth`
     - `GET /oauth/callback`
     - `GET /oauth/success`
   - Deploy

4. **Configurar CORS:**
   - En API Gateway → CORS
   - Access-Control-Allow-Origin: `*`
   - Access-Control-Allow-Methods: `GET, POST, OPTIONS`

5. **Obtener URL:**
   - Ejemplo: `https://abc123.execute-api.us-east-1.amazonaws.com`
   - Tu URL completa: `https://abc123.execute-api.us-east-1.amazonaws.com/oauth`

### Opción 2: AWS SAM (Infraestructura como código)

Ver `template.yaml` en este directorio.

## 🔐 Configurar GitHub OAuth App

1. Ve a https://github.com/settings/developers
2. Edita tu OAuth App
3. **Authorization callback URL**: 
   ```
   https://[tu-api-gateway-url]/oauth/callback
   ```

## 📝 Actualizar Decap CMS

En `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: Tangara-Studio/Blog
  branch: main
  base_url: https://[tu-api-gateway-url]/oauth
  auth_endpoint: auth
```

## ✅ Verificar

1. Abre `https://blog.tangara.studio/admin`
2. Click "Login with GitHub"
3. Deberías ser redirigido a GitHub
4. Autoriza la aplicación
5. Deberías regresar al CMS autenticado

## 🐛 Debugging

Ver logs en CloudWatch:
- Lambda → Monitor → View logs in CloudWatch
- Busca errores en el flujo OAuth
