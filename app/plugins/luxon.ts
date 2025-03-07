import { DateTime, Settings } from 'luxon';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('luxon', { DateTime, Settings });
});
