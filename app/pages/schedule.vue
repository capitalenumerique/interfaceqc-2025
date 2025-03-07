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
            <div v-if="isLoading">{{ t('Loading...') }}</div>
            <div v-else class="schedule-grid">
                <template v-if="data">
                    <div
                        v-for="(timeslot, i) in data[activeDate].timeslots"
                        :key="`timeslot-${timeslot.time}`"
                        class="timeslot"
                        :class="timeslot.type"
                    >
                        <span
                            class="time"
                            :class="{ 'has-place': i === 0 || data[activeDate].timeslots[i - 1].type !== 'regular' }"
                            >{{ timeslot.time }}</span
                        >
                        <div class="timeslot-sessions">
                            <div
                                v-for="place in timeslot.places"
                                :key="`session-${timeslot.time}-${place.name}`"
                                class="session"
                            >
                                <div
                                    v-if="i === 0 || data[activeDate].timeslots[i - 1].type !== 'regular'"
                                    class="place"
                                >
                                    {{ place.name }}
                                </div>
                                <div class="session-cell">
                                    <SessionItem v-if="place.session" :session="place.session" />
                                    <div v-else class="to-be-anounced">{{ t('À déterminer') }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <pre>{{ data }}</pre>
        <!-- <div v-if="!isLoading && error?.message">
            {{ error?.message }}
        </div> -->
    </div>
</template>

<script setup>
import { components } from '~/slices';
import { useRouter } from 'vue-router';

const { t, locale } = useI18n();
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

const { data, suspense, isLoading } = useSchedule();

// wait for query to actually resolve on the server
await suspense();
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
.timeslot {
    display: grid;
    grid-template-columns: 80px 1fr;
    &.special {
        margin-bottom: 24px;
    }
    &.regular {
        + .regular {
            .timeslot-sessions {
                border-top: 0;
            }
        }
    }
    &:first-child {
        .timeslot-sessions {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
    }
    &:last-child {
        .timeslot-sessions {
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }
    }
}
.time {
    font-weight: 600;
    &.has-place {
        margin-top: 68px;
    }
}
.timeslot-sessions {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 1px solid var(--gray-900);
    .special & {
        border-radius: 8px;
    }
}
.place {
    padding: 24px;
    font-weight: 600;
    border-bottom: 1px solid var(--gray-900);
}
.session {
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--gray-900);
    &:last-child {
        border-right: 0;
    }
}
.session-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 250px;
    flex-grow: 1;
}
.to-be-anounced {
    font-weight: 700;
    color: var(--gray-300);
}
</style>

<i18n lang="json">
{
    "en": {
        "Loading...": "Chargement...",
        "Something wrong happened on our side. Please try again. If the problem persist, contact...": "Un problème s'est produit de notre côté. Veuillez réessayer. Si le problème persiste, contactez...",
        "À déterminer": "To be announced"
    }
}
</i18n>
