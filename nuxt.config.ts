import { repositoryName } from './slicemachine.config.json';
import ViteSvgLoader from 'vite-svg-loader';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxt/eslint', '@nuxtjs/prismic', '@nuxtjs/i18n', '@nuxt/image'],

    devtools: {
        enabled: true,
    },

    css: ['normalize.css/normalize.css', '@/assets/css/app.css'],

    runtimeConfig: {
        public: {
            commitTag: process.env.COMMIT_TAG || process.env.NUXT_ENV_CURRENT_GIT_TAG,
            commitShortSha: process.env.COMMIT_SHORT_SHA || process.env.NUXT_ENV_CURRENT_GIT_SHA,
        },
    },

    future: {
        compatibilityVersion: 4,
    },

    compatibilityDate: '2024-04-03',

    vite: {
        plugins: [
            ViteSvgLoader({
                svgoConfig: {
                    plugins: [
                        'prefixIds',
                        'removeTitle',
                        'removeDesc',
                        'removeDimensions',
                        {
                            name: 'removeAttrs',
                            params: {
                                attrs: '(fill|stroke)',
                            },
                        },
                    ],
                },
                defaultImport: 'url',
            }),
        ],
    },
    postcss: {
        plugins: {
            'postcss-nested': {},
        },
    },

    eslint: {
        checker: true,
        config: {
            nuxt: {
                sortConfigKeys: true,
            },
        },
    },

    i18n: {
        baseUrl: 'https://interfaceqc.com',
        strategy: 'prefix_except_default',
        defaultLocale: 'fr',
        locales: [
            {
                code: 'fr',
                name: 'Français',
                language: 'fr-CA',
            },
            {
                code: 'en',
                name: 'English',
                language: 'en-CA',
            },
        ],
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root', // recommended
        },
    },

    prismic: {
        endpoint: repositoryName,
    },
});
