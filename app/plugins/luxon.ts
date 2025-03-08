import { DateTime, Settings } from 'luxon';

export default defineNuxtPlugin(() => {
    // nuxtApp.provide('luxon', { DateTime, Settings });
    return {
        provide: {
            luxon: { DateTime, Settings },
        },
    };
});
