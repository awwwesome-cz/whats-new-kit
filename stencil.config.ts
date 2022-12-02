import {Config} from '@stencil/core';
import {sass} from '@stencil/sass';

export const config: Config = {
    namespace: 'whats-new-kit',
    globalStyle: 'src/global/global.scss',
    globalScript: 'src/global/global.ts',
    outputTargets: [
        {
            type: 'dist',
            esmLoaderPath: '../loader',
        },
        {
            type: 'dist-custom-elements',
        },
        {
            type: 'docs-readme',
        },
        {
            type: 'www',
            serviceWorker: null, // disable service workers
        },
    ],
    devServer: {
        reloadStrategy: 'pageReload',
    },
    preamble: 'My Web Components - MIT License',
    plugins: [
        sass(),
        // nodePolyfills()
    ]
};
