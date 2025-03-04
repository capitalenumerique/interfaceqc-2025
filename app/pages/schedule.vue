<template>
    <div>
        <SliceZone :slices="page?.data?.slices ?? []" :components="components" />
        <div class="page-container">
            <ul class="date-tabs">
                <li v-for="(date, i) in dates" :key="`date-${i}`">
                    <button
                        type="button"
                        class="date-tab"
                        :class="{ 'is-active': activeDate === i + 1 }"
                        @click="selectDate(i + 1)"
                    >
                        {{ date }}
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const router = useRouter();
const prismic = usePrismic();

const { data: page } = useAsyncData('index', () => {
    return prismic.client.getSingle('program', { lang: `${locale.value}-ca` });
});

// Fake data (replace with real API data when available)
const swapcardEventFakeData = {
    id: 'event_12345',
    name: 'Interface',
    start_date: '2025-05-27T09:00:00Z',
    end_date: '2025-05-29T18:00:00Z',
    timezone: 'America/New_York',
    venue: {
        name: 'Terminal de croisière',
        address: '84 Rue Dalhousie, Québec, QC',
        city: 'Québec',
        country: 'CA',
    },
};

function getEventDates(eventData) {
    const startDate = new Date(eventData.start_date);
    const endDate = new Date(eventData.end_date);
    const dates = [];
    const formatter = new Intl.DateTimeFormat(locale.value, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });

    while (startDate <= endDate) {
        const formattedDate = formatter.format(startDate);
        dates.push(formattedDate);
        startDate.setDate(startDate.getDate() + 1);
    }

    return dates;
}

const dates = getEventDates(swapcardEventFakeData);
const activeDate = ref(1);

// Update `activeDate` when `router.query.d` changes
watchEffect(() => {
    const dateParam = parseInt(router.currentRoute.value.query.d);
    activeDate.value = isNaN(dateParam) ? 1 : dateParam;
});

function selectDate(dateIndex) {
    activeDate.value = dateIndex;
    router.push({ query: { d: dateIndex } });
}

useSeoMeta({
    title: page.value?.data.meta_title,
    ogTitle: page.value?.data.meta_title,
    description: page.value?.data.meta_description,
    ogDescription: page.value?.data.meta_description,
    ogImage: computed(() => prismic.asImageSrc(page.value?.data.meta_image)),
});
</script>

<style lang="postcss" scoped>
.page-container {
    max-width: 1240px;
    margin: auto;
    padding: 0 16px;
}
.date-tabs {
    display: inline-flex;
    gap: 8px;
    border: 1px solid var(--gray-900);
    border-radius: 8px;
    padding: 8px;
    margin: 0 0 64px;
    list-style: none;
}
.date-tab {
    color: var(--gray-900);
    background-color: transparent;
    border-radius: 6px;
    padding: 10px 12px;
    line-height: 1.5;
    cursor: pointer;
    border: 2px solid transparent;
    transition:
        background-color var(--hover-transition),
        color var(--hover-transition),
        border-style var(--hover-transition),
        border-color var(--hover-transition);
    &.is-active {
        background-color: var(--gray-900);
        color: var(--beige-100);
        border-color: var(--gray-900);
    }
    &:hover,
    &:focus-visible {
        background-color: var(--beige-100);
        color: var(--gray-900);
        border-color: var(--gray-900);
        border-style: dashed;
    }
}
</style>
