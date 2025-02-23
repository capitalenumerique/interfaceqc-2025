<script setup lang="ts">
import type { Content } from '@prismicio/client';

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(getSliceComponentProps<Content.PartnersGridSlice>(['slice', 'index', 'slices', 'context']));
</script>

<template>
    <section class="partners-section" :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
        <ul class="partners-list">
            <li v-for="(partner, index) in slice.primary.partner" :key="`partner-${index}`">
                <a :href="partner.website.url" :target="partner.website.target">
                    <img class="partner-logo" :src="partner.logo.url" :alt="partner.logo.alt" />
                </a>
            </li>
        </ul>
    </section>
</template>

<style lang="postcss" scoped>
.partners-section {
    max-width: 1240px;
    margin: auto;
    padding: 64px 16px;
}
.partners-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}
.partner-logo {
    width: 200px;
    height: 200px;
    object-fit: contain;
}
</style>
