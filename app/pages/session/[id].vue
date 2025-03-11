<template>
    <div class="page-wrapper">
        <NuxtLinkLocale :to="{ name: 'schedule-day', params: { day: 1 } }">
            <IconBackArrow width="16" height="10" />
            {{ t('Retour à la programmation') }}
        </NuxtLinkLocale>
        <div v-if="!isLoading && error?.message">
            {{ error?.message }}
        </div>
        <div v-else-if="isLoading">{{ t('Chargement') }}...</div>
        <div v-else class="session-wrapper">
            <div class="session-header">
                <span>{{ data.date }}</span>
                <span class="session-time">{{
                    t('{start} à {end}', {
                        start: formatSessionTime(data.beginsAt),
                        end: formatSessionTime(data.endsAt),
                    })
                }}</span>
            </div>
            <h1>{{ data.title }}</h1>
            <div v-html="data.htmlDescription"></div>
            <p>{{ data.place }}</p>
            <u>
                <!-- <li v-for=""></li> -->
            </u>
            <pre>{{ data }}</pre>
        </div>
    </div>
</template>

<script setup>
import IconBackArrow from '@/assets/svg/back-arrow.svg?component';
const { formatSessionTime } = useTimeFormatter();

const { t } = useI18n();

const route = useRoute();
const sessionId = route.params.id;

const { data, error, suspense, isLoading } = useSession(sessionId);

await suspense;

defineI18nRoute({
    paths: {
        fr: '/conference/[id]',
    },
});

defineRouteRules({
    prerender: false,
});
</script>

<style lang="postcss" scoped>
.page-wrapper {
    margin: 0 auto;
    flex-direction: column;
    max-width: var(--page-container-max-width);
    padding: 80px 16px;
}
.session-wrapper {
    border: 1px solid var(--gray-500);
    border-radius: 8px;
    max-width: 875px;
}
</style>

<i18n lang="json">
{
    "en": {
        "Chargement": "Loading",
        "Retour à la programmation": "Go back to schedule",
        "{start} à {end}": "{start} to {end}"
    }
}
</i18n>
