<template>
    <div>
        <HomeHeader />
        <SliceZone :slices="page?.data?.slices ?? []" :components="components" />
        <NewsletterSection />
    </div>
</template>

<script setup>
import { components } from '~/slices';
const { locale } = useI18n();

const prismic = usePrismic();

const { data: page } = useAsyncData('index', () => {
    return prismic.client.getSingle('home', { lang: `${locale.value}-ca` });
});

useSeoMeta({
    title: page.value?.data.meta_title,
    ogTitle: page.value?.data.meta_title,
    description: page.value?.data.meta_description,
    ogDescription: page.value?.data.meta_description,
    ogImage: computed(() => prismic.asImageSrc(page.value?.data.meta_image)),
});
</script>
