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
            <div v-if="!isLoading && error?.message">
                {{ error?.message }}
            </div>
            <div v-else-if="isLoading">{{ t('Loading...') }}</div>
            <div v-else class="schedule-grid">
                <template v-if="data">
                    <div
                        v-for="(timeslot, i) in data[activeDate - 1].timeslots"
                        :key="`timeslot-${timeslot.time}`"
                        class="timeslot"
                        :class="timeslot.type"
                    >
                        <span
                            class="time"
                            :class="{
                                'has-place': i === 0 || data[activeDate - 1].timeslots[i - 1].type !== 'regular',
                            }"
                            >{{ formatSessionTime(timeslot.time) }}</span
                        >
                        <div class="timeslot-sessions">
                            <div
                                v-for="place in timeslot.places"
                                :key="`session-${timeslot.time}-${place.name}`"
                                class="session"
                            >
                                <div
                                    v-if="i === 0 || data[activeDate - 1].timeslots[i - 1].type !== 'regular'"
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

const { data, suspense, isLoading } = useSchedule();

await suspense();

const { $luxon } = useNuxtApp();

const dates = computed(() => {
    if (!data.value) return [];
    return data.value
        .map((entry) => {
            const formattedDate = $luxon.DateTime.fromISO(entry.date).toLocaleString({
                weekday: 'long',
                day: 'numeric',
                month: 'long',
            });
            return formattedDate;
        })
        .sort();
});

const activeDate = ref(1);

watchEffect(() => {
    const dateParam = parseInt(router.currentRoute.value.query.d);
    activeDate.value = isNaN(dateParam) || dateParam < 1 || dateParam > dates.value.length ? 1 : dateParam;
});

function selectDate(dateIndex) {
    activeDate.value = dateIndex;
    router.push({ query: { d: dateIndex } });
}

function formatSessionTime(time) {
    const dateTime = $luxon.DateTime.fromISO(time);
    if (locale.value === 'fr') {
        return dateTime.toFormat("HH'h'mm");
    }
    return dateTime.toFormat('HH:mm');
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
.schedule-grid {
    margin-bottom: 64px;
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
    color: var(--gray-300);
}
</style>

<i18n lang="json">
{
    "en": {
        "Chargement": "Loading",
        "La programmation est présentement indisponible, veuillez réessayer plus tard.": "The schedule is currently unavailable. Please try again later.",
        "À déterminer": "To be announced"
    }
}
</i18n>
