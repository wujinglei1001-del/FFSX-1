import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMicroAppConfig } from '../../vite.microapp.js';

const root = path.dirname(fileURLToPath(import.meta.url));
export default createMicroAppConfig({
  root,
  appId: 'marketplace',
  globalName: 'FFAXMarketplace',
  port: 7101,
});
