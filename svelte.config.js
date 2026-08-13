import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Using adapter-static for a fully static build (SPA fallback: index.html).
 		// See https://svelte.dev/docs/kit/adapter-static for configuration options.
 		adapter: adapter({
 			pages: 'dist',
 			assets: 'dist',
 			fallback: 'index.html',
 			precompress: true,
 			strict: false
 		}),
		prerender: {
			handleHttpError: 'warn',
		},
		alias: {
			$components: './src/components',
			$constants: './src/constants',
			$layouts: './src/layouts',
			$config: './src/config',
			$services: './src/services',
			$types: './src/types',
			$utils: './src/utils',
			$enums: './src/enums',
			$hooks: './src/hooks',
			$stores: './src/stores',
			$validation: './src/validation'
		}
	}
};

export default config;
