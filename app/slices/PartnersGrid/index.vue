<script setup lang="ts">
import type { Content } from '@prismicio/client';
import IconAsterisk from '@/assets/svg/shapes/asterisk.svg?component';
import IconLemon from '@/assets/svg/shapes/lemon.svg?component';

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(getSliceComponentProps<Content.PartnersGridSlice>(['slice', 'index', 'slices', 'context']));
</script>

<template>
    <section class="partners-section" :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
        <BouncingAnimation class="animation-container" :duration="9000">
            <IconAsterisk class="asterisk" width="180" />
        </BouncingAnimation>
        <BouncingAnimation class="animation-container is-reversed" :duration="9000">
            <IconLemon class="lemon" width="180" />
        </BouncingAnimation>
        <ul class="partners-list">
            <li v-for="(partner, index) in slice.primary.partner" :key="`partner-${index}`" class="partner-item">
                <a :href="partner.website.url" :target="partner.website.target">
                    <img class="partner-logo" :src="partner.logo.url" :alt="partner.logo.alt" />
                </a>
            </li>
        </ul>
    </section>
</template>

<style lang="postcss" scoped>
.partners-section {
    position: relative;
    max-width: 1240px;
    margin: auto;
    padding: 64px 16px;
}
.animation-container {
    position: absolute;
    height: 100%;
    &.is-reversed {
        transform: scale(-1, -1);
    }
}
.asterisk {
    fill: var(--teal-500);
}
.lemon {
    fill: var(--pink-300);
}
.partners-list {
    position: relative;
    z-index: 1;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0;
    margin: 0;
    justify-content: space-around;
    @media (--lg) {
        grid-template-columns: repeat(4, 1fr);
    }
}
.partner-item {
    display: flex;
    justify-content: center;
    align-items: center;
}
.partner-logo {
    width: 160px;
    height: 160px;
    object-fit: contain;
    @media (--lg) {
        width: 200px;
        height: 200px;
    }
}
</style>
