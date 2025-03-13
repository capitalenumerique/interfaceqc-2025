<template>
    <li class="accordeon-item" :class="{ 'is-open': isOpen || isAnimating }">
        <button class="accordeon-trigger" @click="isOpen = !isOpen">
            {{ title }}
            <IconPlus v-if="!isOpen" />
            <IconMinus v-else />
        </button>
        <Transition name="collapse" @enter="onEnter" @after-leave="isAnimating = false">
            <div v-show="isOpen" class="accordeon-content-wrapper">
                <div ref="content" class="accordeon-content">
                    <slot />
                </div>
            </div>
        </Transition>
    </li>
</template>

<script lang="ts" setup>
import IconPlus from '@/assets/svg/plus.svg?component';
import IconMinus from '@/assets/svg/minus.svg?component';

defineProps<{
    title: string;
}>();

const isOpen = ref(false);
const isAnimating = ref(false);
const maxHeight = ref('0px');
const content = useTemplateRef('content');

const onEnter = () => {
    const { height } = useElementSize(content);
    isAnimating.value = true;
    maxHeight.value = `${height.value}px`;
};
</script>

<style lang="postcss" scoped>
.accordeon-item {
    &:nth-child(7n + 1) {
        --backgroundColor: var(--yellow-DEFAULT);
        --textColor: var(--gray-900);
    }
    &:nth-child(7n + 2) {
        --backgroundColor: var(--teal-DEFAULT);
        --textColor: var(--gray-900);
    }
    &:nth-child(7n + 3) {
        --backgroundColor: var(--pink-DEFAULT);
        --textColor: var(--gray-900);
    }
    &:nth-child(7n + 4) {
        --backgroundColor: var(--red-DEFAULT);
        --textColor: var(--gray-900);
    }
    &:nth-child(7n + 5) {
        --backgroundColor: var(--orange-DEFAULT);
        --textColor: var(--gray-900);
    }
    &:nth-child(7n + 6) {
        --backgroundColor: var(--green-DEFAULT);
        --textColor: var(--beige-DEFAULT);
    }
    &:nth-child(7n + 7) {
        --backgroundColor: var(--blue-DEFAULT);
        --textColor: var(--beige-DEFAULT);
    }
    &.is-open {
        .accordeon-trigger,
        .accordeon-content {
            background-color: var(--backgroundColor);
            color: var(--textColor);
            border-color: transparent;
        }
    }
}
.accordeon-content-wrapper {
    overflow: hidden;
    max-height: v-bind(maxHeight);
    border-radius: 20px;
}
.accordeon-trigger {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
    font-size: rem(18px);
    font-weight: 600;
    padding: 16px;
    border-radius: 16px;
    width: 100%;
    text-align: left;
    appearance: none;
    background-color: transparent;
    color: var(--gray-900);
    border: 1px solid var(--gray-900);
    transition: all var(--hover-transition);
    @media (--lg) {
        font-size: rem(20px);
        padding: 24px;
        border-radius: 20px;
    }
    svg {
        width: 32px;
        flex-shrink: 0;
        @media (--lg) {
            width: 40px;
        }
    }
}
.accordeon-content {
    padding: 16px;
    margin-top: -1px;
    border: 1px solid var(--gray-900);
    transition: all var(--hover-transition);
    font-weight: 500;
    font-size: rem(16px);
    @media (--lg) {
        font-size: rem(18px);
        padding: 24px;
    }
}

.collapse-enter-active,
.collapse-leave-active {
    transition: max-height 300ms ease-in-out;
}
.collapse-enter-from,
.collapse-leave-to {
    max-height: 0px;
}
</style>
