<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>README - Proyecto React Router con Vite</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 20px;
      background-color: #f9f9f9;
      color: #333;
    }
    h1, h2, h3 {
      color: #2c3e50;
    }
    pre {
      background: #2d2d2d;
      color: #f8f8f2;
      padding: 15px;
      border-radius: 6px;
      overflow-x: auto;
    }
    a {
      color: #3498db;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    ul {
      margin-left: 20px;
    }
    code {
      background-color: #eee;
      padding: 2px 5px;
      border-radius: 4px;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <h1>Enlace del sitio web</h1>
  <h2><a href="http://20.175.206.106:5173/home" target="_blank" rel="noopener noreferrer">http://20.175.206.106:5173/home</a></h2>
  <p>Una plantilla moderna y lista para producción para construir aplicaciones React full-stack usando React Router.</p>
  <p><a href="https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default" target="_blank" rel="noopener noreferrer">
    <img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt="Abrir en StackBlitz" />
  </a></p>

  <h2>Características</h2>
  <ul>
    <li>🚀 Renderizado del lado servidor (Server-side rendering)</li>
    <li>⚡️ Recarga en caliente de módulos (Hot Module Replacement, HMR)</li>
    <li>📦 Empaquetado y optimización de recursos (assets)</li>
    <li>🔄 Carga y mutaciones de datos</li>
    <li>🔒 TypeScript activado por defecto</li>
    <li>🎉 TailwindCSS para estilos</li>
    <li>📖 <a href="https://reactrouter.com/" target="_blank" rel="noopener noreferrer">Documentación de React Router</a></li>
    <li>🛠️ Construido con Vite para un desarrollo rápido y eficiente</li>
  </ul>

  <h2>Cómo empezar</h2>

  <h3>Instalación</h3>
  <p>Instala las dependencias con:</p>
  <pre><code>npm install</code></pre>

  <h3>Desarrollo</h3>
  <p>Inicia el servidor de desarrollo con recarga en caliente (HMR):</p>
  <pre><code>npm run dev</code></pre>
  <p>La aplicación estará disponible en <code>http://localhost:5173</code>.</p>

  <h2>Construcción para producción</h2>
  <p>Genera una versión optimizada para producción con:</p>
  <pre><code>npm run build</code></pre>

  <h2>Despliegue</h2>

  <h3>Despliegue con Docker</h3>
  <p>Para construir y ejecutar usando Docker:</p>
  <pre><code>docker build -t mi-app .

# Ejecutar el contenedor
docker run -p 3000:3000 mi-app
</code></pre>
  <p>La aplicación en contenedor puede desplegarse en cualquier plataforma que soporte Docker, como:</p>
  <ul>
    <li>AWS ECS</li>
    <li>Google Cloud Run</li>
    <li>Azure Container Apps</li>
    <li>Digital Ocean App Platform</li>
    <li>Fly.io</li>
    <li>Railway</li>
  </ul>

  <h3>Despliegue manual (DIY)</h3>
  <p>Si tienes experiencia desplegando aplicaciones Node.js, el servidor interno está listo para producción.</p>
  <p>Asegúrate de desplegar el resultado de <code>npm run build</code> que contiene:</p>
  <pre><code>├── package.json
├── package-lock.json (o pnpm-lock.yaml, o bun.lockb)
├── build/
│   ├── client/    # Archivos estáticos
│   └── server/    # Código del servidor
</code></pre>

  <h2>Estilos</h2>
  <p>Esta plantilla viene con <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">Tailwind CSS</a> preconfigurado para una experiencia simple y lista para empezar. Puedes usar cualquier otro framework CSS si prefieres.</p>

  <hr />

  <p>Creado con ❤️ usando React Router y Vite.</p>

  <p><strong>Repositorio del proyecto:</strong><br />
  <a href="https://github.com/AxlEnr/CRUD-React.git" target="_blank" rel="noopener noreferrer">
    https://github.com/AxlEnr/CRUD-React.git
  </a></p>
</body>
</html>
