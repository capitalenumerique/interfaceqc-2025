<template>
    <div class="session-wrapper" :style="hoverColor">
        <div>
            <h2 class="session-title">
                <NuxtLinkLocale :to="{ name: 'schedule-session-id', params: { id: session.id } }" class="session-link">
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
                    start: formatSessionTime(session.startAt),
                    end: formatSessionTime(session.endsAt),
                })
            }}</span>
        </div>
        <ul class="categories-list">
            <li
                v-for="(category, j) in session.categories"
                :key="`category-${session.id}-${j}`"
                :style="getCategoryStyle(category.color)"
                class="category-item"
            >
                {{ category.name }}
            </li>
        </ul>
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

const colorMap = {
    red: { bg: 'var(--red-600)', text: 'var(--yellow-200)' },
    yellow: { bg: 'var(--yellow-200)', text: 'var(--red-600)' },
    pink: { bg: 'var(--pink-300)', text: 'var(--green-800)' },
    blue: { bg: 'var(--blue-700)', text: 'var(--orange-300)' },
    teal: { bg: 'var(--teal-600)', text: 'var(--color-white)' },
    gray: { bg: 'var(--gray-900)', text: 'var(--pink-300)' },
    orange: { bg: 'var(--orange-300)', text: 'var(--blue-700)' },
};

const colorArray = Object.keys(colorMap);

const hoverColor = computed(() => {
    const colorKey =
        props.session.categories.length > 0
            ? props.session.categories[0].color
            : colorArray[Math.floor(Math.random() * colorArray.length)];
    const colors = colorMap[colorKey] || colorMap.red;
    return {
        '--hover-bg': colors.bg,
        '--hover-text': colors.text,
    };
});

const getCategoryStyle = (colorKey) => {
    const colors = colorMap[colorKey] || colorMap.red;
    return {
        '--category-bg': colors.bg,
        '--category-text': colors.text,
        '--hover-bg': hoverColor.value['--hover-text'],
        '--hover-text': hoverColor.value['--hover-bg'],
    };
};
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
.categories-list {
    list-style: none;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0;
    margin: 0;
}
.category-item {
    font-size: rem(14px);
    padding: 8px;
    border-radius: 6px;
    font-weight: 700;
    background-color: var(--category-bg);
    color: var(--category-text);
    transition:
        background-color var(--hover-transition),
        color var(--hover-transition);
}
</style>

<i18n lang="json">
{
    "en": {
        "{start} à {end}": "{start} to {end}"
    }
}
</i18n>
