<template>
    <component :is="href ? 'nuxt-link' : 'button'" :href="href" :class="buttonClasses" class="primary-button">
        <slot />
    </component>
</template>

<script lang="ts" setup>
const props = defineProps({
    type: {
        type: String,
        default: 'button',
    },
    href: {
        type: String,
        default: '',
    },
    isOutlined: {
        type: Boolean,
        default: false,
    },
    isSmall: {
        type: Boolean,
        default: false,
    },
});

const buttonClasses = computed(() => {
    return {
        'is-outlined': props.isOutlined,
        'is-small': props.isSmall,
    };
});
</script>

<style lang="postcss" scoped>
.primary-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 18px 32px;
    background-color: var(--black-900);
    color: var(--brown-100);
    font-weight: 500;
    border-radius: 12px;
    cursor: pointer;
    transition:
        background-color var(--hover-transition),
        color var(--hover-transition);
    &:hover,
    &:focus {
        background-color: var(--brown-100);
        color: var(--black-900);
    }
}
.is-outlined {
    background-color: transparent;
    border: 1px solid var(--brown-100);
}
.is-small {
    padding: 12px 24px;
    border-radius: 8px;
}
</style>
