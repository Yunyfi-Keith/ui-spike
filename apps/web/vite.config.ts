import {defineConfig, mergeConfig} from 'vite';
import projectConfig from '../../vite.base.config';

import {svelte} from '@sveltejs/vite-plugin-svelte';

export default defineConfig(mergeConfig(
    projectConfig,
    {
        root: __dirname,
        plugins: [svelte()],
        build: {
            lib: {
                entry: 'src/index.ts',
                fileName: 'lib',
                formats: ['es']
            }
        }
    }
));