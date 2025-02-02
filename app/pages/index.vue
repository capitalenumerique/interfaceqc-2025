<template>
    <div class="test">
        <h1>{{ t('Accueil') }}</h1>
        <NuxtImg
            :placeholder="img(`/patate.jpg`, { h: 10, f: 'png', q: 50 })"
            src="/patate.jpg"
            format="webp"
            quality="70"
            width="200"
            height="150"
        />
        <IconLibeo width="200" />
        <img src="@/assets/svg/libeo-logo.svg" width="200" />
        <SliceZone :slices="page?.data?.slices ?? []" :components="components" />
    </div>
</template>

<script setup>
import { components } from '~/slices';

import IconLibeo from '@/assets/svg/libeo-logo.svg?component';

const img = useImage();
const { t } = useI18n();
const prismic = usePrismic();

const { data: page } = useAsyncData('index', () => {
    return prismic.client.getSingle('home');
});
</script>

<style lang="postcss" scoped>
h1 {
    color: var(--primary-color);
    @media (--small-viewport) {
        background: yellow;
    }
}
</style>

<i18n lang="json">
{
    "en": {
        "Accueil": "Homepage"
    }
}
</i18n>
