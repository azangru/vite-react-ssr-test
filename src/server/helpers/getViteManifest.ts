import fs from 'node:fs/promises';
import path from 'node:path';

import type { Manifest } from 'vite';

const pathToManifest = path.resolve(import.meta.dirname, '../../../dist/client/.vite/manifest.json');
let manifest: null | Manifest = null

export const getViteManifest = async () => {
  if (manifest) {
    return manifest;
  } else {
    const manifestString = await fs.readFile(pathToManifest, { encoding: 'utf-8' });
    manifest = JSON.parse(manifestString) as Manifest;
    return manifest;
  }
};
