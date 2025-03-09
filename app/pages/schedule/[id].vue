<template>
    <div>
        <h1>{{ sessionId }}</h1>
        <div v-if="session">{{ session }}</div>
        <div v-else>{{ t('Chargement') }}...</div>
    </div>
</template>

<script setup>
const { t } = useI18n();

const route = useRoute();
const sessionId = route.params.id;

const { data: session } = await useAsyncData(`session-${sessionId}`, async () => {
    const { data } = useSession(sessionId);
    return data.value;
});

defineI18nRoute({
    paths: {
        fr: '/programmation/[id]',
    },
});

defineRouteRules({
    prerender: true,
});
</script>

<i18n lang="json">
{
    "en": {
        "Chargement": "Loading"
    }
}
</i18n>
