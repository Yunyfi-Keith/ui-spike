import {mergeConfig, defineConfig} from 'vite'
import projectConfig from '../../vite.base.config';

export default defineConfig(mergeConfig(
    projectConfig,
    {
        root: __dirname,
        build: {
            lib: {
                entry: 'src/index.ts',
                fileName: 'lib',
                formats: ['es']
            }
        }
    }
));