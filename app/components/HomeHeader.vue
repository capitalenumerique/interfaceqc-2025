<template>
    <section class="home-header">
        <BouncingAnimation class="bouncing-animation-zone" :on-collision="changeShape">
            <div class="bouncing-object" :style="{ backgroundColor: `var(${backgroundColors[activeIndex]})` }">
                <component
                    :is="shapes[activeIndex]"
                    class="shape"
                    :style="{ fill: `var(${shapesColors[activeIndex]})` }"
                />
            </div>
        </BouncingAnimation>
        <Vue3Marquee v-if="width <= 1024">
            <IconLogo class="logo" />
        </Vue3Marquee>
        <IconLogo v-else class="logo" />
    </section>
</template>

<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core';
import BouncingAnimation from '@/components/BouncingAnimation.vue';
import IconAsterisk from '@/assets/svg/shapes/asterisk.svg?component';
import IconHexagon from '@/assets/svg/shapes/hexagon.svg?component';
import IconLemon from '@/assets/svg/shapes/lemon.svg?component';
import IconStar from '@/assets/svg/shapes/star.svg?component';
import IconLogo from '@/assets/svg/logo-with-star.svg?component';

const activeIndex = ref(0);
const shapes = [IconAsterisk, IconLemon, IconStar, IconHexagon];
const shapesColors = ['--orange-400', '--red-500', '--green-700', '--red-500'];
const backgroundColors = ['--blue-700', '--pink-300', '--teal-500', '--yellow-200'];
const { width } = useWindowSize();

function changeShape() {
    if (activeIndex.value < shapes.length - 1) {
        activeIndex.value++;
    } else {
        activeIndex.value = 0;
    }
}
</script>

<style lang="postcss" scoped>
.home-header {
    height: 100vh;
    background-color: var(--brown-100);
}
.bouncing-animation-zone {
    height: 70%;
}
.bouncing-object {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 180px;
    border-radius: 20px;
    @media (--large) {
        width: 250px;
        height: 250px;
    }
}
.shape {
    width: 75%;
}
.logo {
    display: block;
    margin-left: 50px;
    fill: var(--black-900);
    width: 860px;
    @media (--large) {
        margin-left: auto;
        width: 950px;
    }
}
</style>
