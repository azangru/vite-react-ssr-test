import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import Document from './html/Document';

const config = (window as any).CONFIG_FIELD_ON_WINDOW;
const environment = config.environment;

hydrateRoot(
  document,
  <StrictMode>
    <Document environment={environment}>
      <App />
    </Document>
  </StrictMode>
);
