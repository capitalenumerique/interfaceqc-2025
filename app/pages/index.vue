<template>
    <div>
        <HomeHeader />
        <SliceZone :slices="page?.data?.slices ?? []" :components="components" />
        <NewsletterSection />
    </div>
</template>

<script setup>
import { components } from '~/slices';

const prismic = usePrismic();

const { data: page } = useAsyncData('index', () => {
    return prismic.client.getSingle('home');
});
</script>
