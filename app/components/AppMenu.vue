<template>
    <OnClickOutside class="menu" :class="{ 'menu-opened': isAnimating }" @trigger="isOpen = false">
        <div class="menu-wrapper">
            <div class="logo-wrapper">
                <button class="btn-menu" type="button" :class="{ 'is-open': isOpen }" @click="isOpen = !isOpen">
                    <span class="sr-only">Menu</span>
                </button>
                <a href="#" class="logo-link">
                    <span class="sr-only">interface</span>
                    <IconInterfaceV class="icon-interface-v" />
                </a>
            </div>
            <IconStar class="icon-star" />
        </div>
        <Transition name="collapse" @enter="isAnimating = true" @after-leave="isAnimating = false">
            <nav v-if="isOpen" class="menu-inner">
                <ul class="menu-list">
                    <li v-for="item in items" :key="item" class="menu-item">
                        <a href="#" class="menu-link">
                            <IconDiamond class="icon-diamond" />
                            {{ item }}
                        </a>
                    </li>
                </ul>
            </nav>
        </Transition>
    </OnClickOutside>
</template>

<script lang="ts" setup>
import { OnClickOutside } from '@vueuse/components';
import IconInterfaceV from '@/assets/svg/interface-logo-v.svg?component';
import IconStar from '@/assets/svg/star.svg?component';
import IconDiamond from '@/assets/svg/diamond.svg?component';

const isOpen = ref(false);
const isAnimating = ref(false);
const items = ref(['billetterie', 'programmation', 'participer', 'médiathèque', 'à propos', 'contact', 'faq']);
</script>

<style lang="postcss" scoped>
.menu {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    overflow: hidden;
    border-right: 1px solid #333230;
    transition: background 0.5s ease;
    &.menu-opened,
    &:hover {
        background-color: #f3eee7;
    }
}
.menu-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 32px 0;
    width: 67px;
    flex-shrink: 0;
}
.logo-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
}
.logo-link {
    text-decoration: none;
    color: #000;
}
.icon-interface-v {
    width: 32px;
}
.icon-star {
    width: 26px;
    height: 26px;
}
.btn-menu {
    position: relative;
    background: transparent;
    width: 50px;
    height: 50px;
    padding: 0;
    margin: 0;
    color: #000;
    border: 0;
    appearance: none;
    margin-top: -20px;
    &::before,
    &::after {
        content: '';
        display: block;
        height: 1px;
        width: 32px;
        background: currentColor;
        transition: all 0.15s ease;
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50%;
        rotate: 0deg;
    }
    &::before {
        margin-top: -4px;
    }
    &::after {
        margin-top: 4px;
    }
    &.is-open {
        &::before {
            margin: 0;
            rotate: 45deg;
        }
        &::after {
            margin: 0;
            rotate: -45deg;
        }
    }
}
.menu-inner {
    width: 300px;
    max-width: 300px;
    overflow: hidden;
    will-change: auto;
}
.menu-list {
    padding: calc(32px - 20px + 50px + 50px) 28px 32px;
    white-space: nowrap;
    list-style: none;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
}
.menu-link {
    position: relative;
    display: inline-block;
    font-size: 24px;
    text-decoration: none;
    color: #000;
    font-weight: 500;
    transition: padding 0.3s ease;
    .icon-diamond {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        opacity: 0;
        transition: opacity 0.15s ease;
        transition-delay: 0s;
        width: 16px;
        height: 16px;
        color: #647f18;
    }
    &:hover {
        font-weight: 600;
        padding-left: 24px;
        .icon-diamond {
            opacity: 1;
            transition: opacity 0.3s ease 0.15s;
        }
    }
}
.collapse-enter-active,
.collapse-leave-active {
    /* transform: translate3d(0, 0, 0); */
    transition: max-width 0.5s ease;
}
.collapse-enter-from,
.collapse-leave-active {
    max-width: 0px;
}
</style>
