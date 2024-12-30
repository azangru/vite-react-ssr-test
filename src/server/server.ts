import express from 'express';

import { getViteManifest } from './helpers/getViteManifest';

import type { RenderFunction } from 'src/client/MainServer';

import type { ViteDevServer } from 'vite';
// import { Transform } from 'node:stream'

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';
const ABORT_DELAY = 10000;

// Create http server
const app = express();

// Add Vite or respective production middleware
let vite: ViteDevServer;
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares);
} else {
  // const compression = (await import('compression')).default
  // const sirv = (await import('sirv')).default
  // app.use(compression())
  // app.use(base, sirv('./dist/client', { extensions: [] }))
}

// Serve HTML
app.use('*splat', async (req, res) => {
  try {
    let render: RenderFunction;
    if (!isProduction) {
      // Always read fresh template in development
      render = (await vite.ssrLoadModule('src/client/MainServer.tsx')).default
    } else {
      // @ts-ignore
      render = (await import('dist/server/MainServer.js')).default
    }

    let didError = false
    const manifest = isProduction ? await getViteManifest() : undefined;

    const { pipe, abort } = render({
      environment: isProduction ? 'production' : 'development',
      manifest
    }, {
      onShellError() {
        res.status(500)
        res.set({ 'Content-Type': 'text/html' })
        res.send('<h1>Something went wrong</h1>')
      },
      onShellReady() {
        res.status(didError ? 500 : 200)
        res.set({ 'Content-Type': 'text/html' })

        pipe(res);
      },
      onError(error) {
        didError = true
        console.error(error)
      },
    })

    setTimeout(() => {
      abort()
    }, ABORT_DELAY)
  } catch (e) {
    vite?.ssrFixStacktrace(e as Error)
    console.log((e as Error).stack)
    res.status(500).end((e as Error).stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
