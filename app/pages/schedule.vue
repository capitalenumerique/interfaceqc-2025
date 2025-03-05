<template>
    <div>
        <SliceZone :slices="page?.data?.slices ?? []" :components="components" />
        <div v-if="isLoading">{{ t('Loading...') }}</div>
        <!-- <div v-if="!isLoading && error?.message">
            {{ error?.message }}
        </div> -->
        <div v-else>{{ data }}</div>
    </div>
</template>

<script setup lang="ts">
import { components } from '~/slices';

const { t, locale } = useI18n();

const prismic = usePrismic();

const { data: page } = useAsyncData('index', () => {
    return prismic.client.getSingle('program', { lang: `${locale.value}-ca` });
});

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

<i18n lang="json">
{
    "en": {
        "Loading...": "Chargement...",
        "Something wrong happened on our side. Please try again. If the problem persist, contact...": "Un problème s'est produit de notre côté. Veuillez réessayer. Si le problème persiste, contactez..."
    }
}
</i18n>
