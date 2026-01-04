import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://blog.tangara.studio',
  integrations: [sitemap()],
  output: 'static',
  build: {
    format: 'directory'
  }
});
