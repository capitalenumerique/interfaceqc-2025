import { repositoryName } from './slicemachine.config.json';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxt/eslint', '@nuxtjs/prismic'],

    devtools: {
        enabled: true,
    },

    future: {
        compatibilityVersion: 4,
    },

    compatibilityDate: '2024-04-03',

    eslint: {
        checker: true,
        config: {
            nuxt: {
                sortConfigKeys: true,
            },
        },
    },

    prismic: {
        endpoint: repositoryName,
    },
});
