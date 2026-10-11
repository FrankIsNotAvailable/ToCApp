import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	server: {
		host: process.env.VITE_HOST || 'localhost',
		port: 5173,
		strictPort: true,
		watch: {
			usePolling: process.env.CHOKIDAR_USEPOLLING === 'true'
		}
	}
});
