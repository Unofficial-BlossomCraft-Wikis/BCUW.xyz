// @ts-check
import { defineConfig } from 'astro/config';

import netlify from "@astrojs/netlify";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

const site = "https://bcuw.xyz/";

// https://astro.build/config
export default defineConfig({
  site,
  output: "server",
  adapter: netlify(),
  integrations: [react(), tailwind()],
});