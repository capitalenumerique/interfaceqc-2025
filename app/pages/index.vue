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
        <SliceZone :slices="page?.data?.slices ?? []" :components="components" />
    </div>
</template>

<script setup>
import { components } from '~/slices';

const img = useImage();
const { t } = useI18n();
const prismic = usePrismic();

const { data: page } = useAsyncData('index', () => {
    return prismic.client.getSingle('home');
});
</script>

<style lang="postcss" scoped>
.test {
    h1 {
        color: var(--primary-color);
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
