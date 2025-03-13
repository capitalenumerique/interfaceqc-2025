<script setup lang="ts">
import type { Content } from '@prismicio/client';

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(getSliceComponentProps<Content.AccordeonsSlice>(['slice', 'index', 'slices', 'context']));
</script>

<template>
    <section :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation" class="accordeons-slice">
        <ul class="accordeon-list">
            <AppAccordeon v-for="accordeon in slice.primary.accordeons" :key="accordeon.title" :title="accordeon.title">
                <PrismicRichText :field="accordeon.content" />
            </AppAccordeon>
        </ul>
    </section>
</template>

<style lang="postcss" scoped>
.accordeons-slice {
    max-width: 1272px;
    padding: 0 16px;
    margin: 64px auto;
}
.accordeon-list {
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin: 0;
    padding: 0;
    list-style: none;
    max-width: 1052px;
}
</style>
