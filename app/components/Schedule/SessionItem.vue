<template>
    <div class="session-wrapper" :style="hoverColor">
        <div>
            <h2 class="session-title">
                <NuxtLinkLocale :to="{ name: 'session-id', params: { id: session.id } }" class="session-link">
                    {{ session.title }}
                </NuxtLinkLocale>
            </h2>
            <ul class="speakers-list">
                <li v-for="(speaker, i) in session.speakers" :key="`speaker-${session.id}-${i}`" class="speaker-item">
                    <p class="speaker-name">{{ speaker.firstName }} {{ speaker.lastName }}</p>
                    <p class="speaker-organization">{{ speaker.organization }}</p>
                </li>
            </ul>
            <span class="session-time">{{
                t('{start} à {end}', {
                    start: formatSessionTime(session.beginsAt),
                    end: formatSessionTime(session.endsAt),
                })
            }}</span>
        </div>
        <ScheduleSessionCategories :list-id="session.id" :categories="session.categories" />
    </div>
</template>

<script setup>
const { t } = useI18n();
const { formatSessionTime } = useTimeFormatter();

const props = defineProps({
    session: {
        type: Object,
        required: true,
    },
});

const hoverColor = computed(() => {
    const colors = props.session.categories?.[0]?.colors || { bg: 'var(--red-600)', text: 'var(--yellow-200)' };
    return {
        '--hover-text': colors.text,
        '--hover-bg': colors.bg,
    };
});
</script>

<style lang="postcss" scoped>
.session-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 24px;
    transition:
        background-color var(--hover-transition),
        color var(--hover-transition);
    &:hover,
    &:focus-visible {
        background-color: var(--hover-bg);
        color: var(--hover-text);
        .category-item {
            background-color: var(--hover-bg);
            color: var(--hover-text);
        }
    }
}
.session-title {
    margin-bottom: 16px;
    max-width: 250px;
}
.session-link {
    font-size: rem(24px);
    font-weight: 600;
    text-decoration: none;
    color: currentColor;
    &::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
}
.session-time {
    display: inline-block;
    font-size: rem(14px);
    padding: 8px;
    border-radius: 6px;
    font-weight: 700;
    border: 1px solid currentColor;
    margin-bottom: 8px;
}
.speakers-list {
    list-style: none;
    padding: 0;
    margin: 0 0 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.speaker-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.speaker-name {
    font-weight: 700;
    margin: 0;
}
.speaker-organization {
    margin: 0;
}
</style>

<i18n lang="json">
{
    "en": {
        "{start} à {end}": "{start} to {end}"
    }
}
</i18n>
