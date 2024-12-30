/// <reference types="node" />
import { renderToPipeableStream, type RenderToPipeableStreamOptions } from "react-dom/server";
import type { Manifest } from 'vite';

import App from './App';
import Document from './html/Document';

import type { Environment } from './types/environment';

type Params = {
  environment: Environment;
  manifest?: Manifest;
}

const render = (params: Params, options: RenderToPipeableStreamOptions) => {
  const { manifest = {}, environment } = params;
  const entry = Object.values(manifest).find((chunk) => chunk.isEntry);

  console.log('entry', entry);

  return renderToPipeableStream(
    <Document
      environment={environment}
    >
      <App />
    </Document>,
    options
  );
};


export type RenderFunction = typeof render;
export default render;
