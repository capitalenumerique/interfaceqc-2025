<script setup>
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
    return locales.value.filter((i) => i.code !== locale.value);
});
</script>

<template>
    <NuxtLink v-for="l in availableLocales" :key="l.code" :to="switchLocalePath(l.code)" class="switcher">
        {{ l.code }}
    </NuxtLink>
</template>

<style lang="postcss" scoped>
.switcher {
    color: var(--gray-900);
    text-decoration: none;
    font-weight: 500;
}
</style>
