import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'api-proxy-plugin',
        configureServer(server) {
          server.middlewares.use('/api/chat', (req, res, next) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => {
                body += chunk.toString();
              });
              req.on('end', async () => {
                try {
                  const { messages } = JSON.parse(body);
                  const apiKey = env.GROK_API_KEY;

                  if (!apiKey) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: "API key not configured." }));
                    return;
                  }

                  const response = await fetch("https://api.x.ai/v1/chat/completions", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                      messages,
                      model: "grok-beta",
                      temperature: 0.7,
                      max_tokens: 512,
                    }),
                  });

                  if (!response.ok) {
                    res.statusCode = response.status;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: `Grok API error: ${response.statusText}` }));
                    return;
                  }

                  const data = await response.json();
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                } catch (error) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Failed to communicate with Grok API' }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ],
    build: {
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/three/')) return 'three-core';
            if (id.includes('@react-three')) return 'three-fiber';
            if (id.includes('framer-motion')) return 'framer';
            if (id.includes('react-dom')) return 'react-dom';
          },
        },
      },
    },
  }
})
