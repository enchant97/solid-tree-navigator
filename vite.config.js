import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    root: "src/demo",
    plugins: [solidPlugin()],
});
