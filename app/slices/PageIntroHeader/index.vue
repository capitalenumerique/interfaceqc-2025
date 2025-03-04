<script setup lang="ts">
import type { Content } from '@prismicio/client';

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(getSliceComponentProps<Content.PageIntroHeaderSlice>(['slice', 'index', 'slices', 'context']));
</script>

<template>
    <div class="page-header" :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
        <h1 class="header-title">{{ slice.primary.title }}</h1>
        <div class="header-intro">
            <PrismicRichText :field="slice.primary.introduction" />
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.page-header {
    max-width: 1240px;
    margin: auto;
    padding: 64px 16px;
}
.header-title {
    font-size: rem(36px);
    font-weight: 600;
    margin-bottom: 16px;
    @media (--lg) {
        font-size: rem(72px);
        margin-bottom: 24px;
    }
}
.header-intro {
    max-width: 600px;
    font-size: rem(18px);
    color: var(--gray-700);
    @media (--lg) {
        font-size: rem(36px);
        font-weight: 500;
    }
    :deep(p) {
        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
