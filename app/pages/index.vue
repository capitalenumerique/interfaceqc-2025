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
    </div>
</template>

<script setup>
import IconLibeo from '@/assets/svg/libeo-logo.svg?component';
const img = useImage();
const { t } = useI18n();
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
