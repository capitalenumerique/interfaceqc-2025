<template>
    <div ref="container" class="container">
        <div ref="object" class="object"><slot /></div>
    </div>
</template>

<script setup>
import { useMotion } from '@vueuse/motion';

const props = defineProps({
    onCollision: {
        type: Function,
        default: undefined,
    },
});

const object = ref();
const container = ref();

onMounted(() => {
    const transitionOptions = {
        duration: 3000,
        ease: 'linear',
    };
    const enterPositions = { x: 0, y: container.value.clientHeight / 2 };
    const bottomBouncePositions = {
        x: container.value.clientWidth / 2,
        y: container.value.clientHeight - object.value.offsetHeight,
    };
    const rightBouncePositions = {
        x: container.value.clientWidth - object.value.offsetWidth,
        y: container.value.clientHeight / 2,
    };
    const topBouncePositions = { x: container.value.clientWidth / 2, y: 0 };

    const { variant } = useMotion(object, {
        enter: {
            x: enterPositions.x,
            y: enterPositions.y,
            opacity: 1,
            transition: {
                ...transitionOptions,
                onComplete: () => {
                    console.log('enter');
                    if (props.onCollision) {
                        props.onCollision();
                    }
                    variant.value = 'bottomBounce';
                },
            },
        },
        bottomBounce: {
            x: bottomBouncePositions.x,
            y: bottomBouncePositions.y,
            transition: {
                ...transitionOptions,
                onComplete: () => {
                    console.log('bottomBounce');
                    if (props.onCollision) {
                        props.onCollision();
                    }
                    variant.value = 'rightBounce';
                },
            },
        },
        rightBounce: {
            x: rightBouncePositions.x,
            y: rightBouncePositions.y,
            transition: {
                ...transitionOptions,
                onComplete: () => {
                    console.log('rightBounce');
                    if (props.onCollision) {
                        props.onCollision();
                    }
                    variant.value = 'topBounce';
                },
            },
        },
        topBounce: {
            x: topBouncePositions.x,
            y: topBouncePositions.y,
            transition: {
                ...transitionOptions,
                onComplete: () => {
                    console.log('topBounce');
                    if (props.onCollision) {
                        props.onCollision();
                    }
                    variant.value = 'enter';
                },
            },
        },
    });
});
</script>

<style lang="postcss" scoped>
.container {
    position: relative;
    width: 100%;
    height: 300px;
}
.object {
    position: absolute;
}
</style>
