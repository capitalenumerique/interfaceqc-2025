<template>
    <BouncingAnimation class="bouncing-animation-zone" :on-collision="changeShape">
        <div class="bouncing-object"></div>
    </BouncingAnimation>
</template>

<script setup>
import BouncingAnimation from '@/components/BouncingAnimation.vue';

function changeShape() {
    console.log('change shape!');
}
</script>

<style lang="postcss" scoped>
.bouncing-animation-zone {
    height: 100vh;
    background-color: #f3eee7;
}
.bouncing-object {
    background-color: #16b0a3;
    width: 280px;
    height: 280px;
    border-radius: 20px;
}
</style>

<i18n lang="json">
{
    "en": {
        "Accueil": "Homepage"
    }
}
</i18n>
