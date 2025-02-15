<template>
    <div class="test">
        <BouncingAnimation class="bouncing-animation-zone" :on-collision="changeShape">
            <div class="bouncing-object"></div>
        </BouncingAnimation>
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
import BouncingAnimation from '@/components/BouncingAnimation.vue';

function changeShape() {
    console.log('change shape!');
}
const img = useImage();
const { t } = useI18n();
const prismic = usePrismic();

const { data: page } = useAsyncData('index', () => {
    return prismic.client.getSingle('home');
});
</script>

<style lang="postcss" scoped>
.bouncing-animation-zone {
    height: 100vh;
    background-color: #f3eee7;
}
.bouncing-object {
    background-color: #16b0a3;
    width: 280px;
    height: 280px;
    border-radius: 20px;
}
</style>

<i18n lang="json">
{
    "en": {
        "Accueil": "Homepage"
    }
}
</i18n>
