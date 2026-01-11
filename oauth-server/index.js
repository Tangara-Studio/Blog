// Servidor OAuth para Decap CMS con GitHub
// Compatible con AWS Lambda

const crypto = require('crypto');

// Configuración desde variables de entorno
const config = {
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  redirectUrl: process.env.REDIRECT_URL || 'https://blog.tangara.studio/admin/',
};

// Genera estado aleatorio para prevenir CSRF
function randomState() {
  return crypto.randomBytes(16).toString('hex');
}

// Handler principal de Lambda
exports.handler = async (event) => {
  const { httpMethod, path, queryStringParameters = {} } = event;
  
  console.log('Request:', { httpMethod, path, queryStringParameters });

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle OPTIONS (preflight)
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Ruta: /auth - Inicia el flujo OAuth
  if (path.endsWith('/auth') && httpMethod === 'GET') {
    const state = randomState();
    const authUrl = 
      `https://github.com/login/oauth/authorize?` +
      `client_id=${config.clientId}&` +
      `scope=repo,user&` +
      `state=${state}`;

    return {
      statusCode: 302,
      headers: {
        ...headers,
        Location: authUrl,
      },
      body: '',
    };
  }

  // Ruta: /callback - GitHub redirige aquí con el código
  if (path.endsWith('/callback') && httpMethod === 'GET') {
    const { code, state } = queryStringParameters;

    if (!code) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing authorization code' }),
      };
    }

    try {
      // Intercambiar código por token de acceso
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          client_id: config.clientId,
          client_secret: config.clientSecret,
          code,
        }),
      });

      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        throw new Error(tokenData.error_description || tokenData.error);
      }

      // Redirigir de vuelta al CMS con el token
      const redirectUrl = `${config.redirectUrl}?token=${tokenData.access_token}&provider=github`;
      
      // Página HTML con mensaje y redirección automática
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Autenticación exitosa</title>
          <script>
            (function() {
              // Enviar mensaje al opener (ventana del CMS)
              if (window.opener) {
                window.opener.postMessage(
                  'authorization:github:success:${JSON.stringify({ token: tokenData.access_token, provider: 'github' })}',
                  '${config.redirectUrl}'
                );
              }
              
              // Redirigir después de un momento
              setTimeout(function() {
                window.close();
                window.location.href = '${redirectUrl}';
              }, 1000);
            })();
          </script>
        </head>
        <body>
          <p>Autenticación exitosa. Redirigiendo...</p>
        </body>
        </html>
      `;

      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'text/html',
        },
        body: html,
      };
    } catch (error) {
      console.error('OAuth error:', error);
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Authentication failed', 
          details: error.message 
        }),
      };
    }
  }

  // Ruta: /success - Confirmación visual (opcional)
  if (path.endsWith('/success') && httpMethod === 'GET') {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Autenticación exitosa</title>
        <style>
          body {
            font-family: system-ui, -apple-system, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: #f5f5f5;
          }
          .container {
            text-align: center;
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          h1 { color: #2e7d32; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>✓ Autenticación exitosa</h1>
          <p>Puedes cerrar esta ventana y volver al CMS.</p>
        </div>
      </body>
      </html>
    `;

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'text/html',
      },
      body: html,
    };
  }

  // Ruta no encontrada
  return {
    statusCode: 404,
    headers,
    body: JSON.stringify({ error: 'Not found' }),
  };
};
