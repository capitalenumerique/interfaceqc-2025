<template>
    <section>
        <div class="programming-header">
            <h2 class="programming-title">
                {{ t('la programmation') }}<br />
                {{ new Date().getFullYear() }}
            </h2>
            <div class="programming-content">
                <div class="wysiwyg">
                    {{
                        t(
                            'Texte tu souhaites transmettre ton expertise sur un sujet qui te passionne lié au numérique, aux communications ou de tout autre sujets plutôt softskills?Texte tu souhaites transmettre ton expertise sur un sujet qui te passionne lié au numérique, aux communications ou de tout autre sujets plutôt softskills?',
                        )
                    }}
                </div>
                <PrimaryButton>{{ t('voir la programmation complète') }}</PrimaryButton>
            </div>
        </div>
        <Swiper
            slides-per-view="auto"
            :space-between="24"
            :modules="[Navigation, Autoplay]"
            :loop="true"
            :loop-additional-slides="10"
            :loop-prevents-sliding="false"
            :centered-slides="true"
            :speed="2000"
            :autoplay="{
                delay: 4000,
                pauseOnMouseEnter: true,
            }"
            @swiper="(s) => (swiperRef = s)"
        >
            <SwiperSlide class="slide-view-all">
                <NuxtLinkLocale to="/programming">
                    <div class="icon-wrapper">
                        <IconStar />
                    </div>
                    <div class="slide-content">
                        <h3 v-html="t('Voir <br>la programmation <br>complète')"></h3>
                        <IconArrow class="icon-arrow" />
                    </div>
                </NuxtLinkLocale>
            </SwiperSlide>
            <SwiperSlide
                v-for="(slide, index) in slides"
                :key="`${slide.firstName} ${slide.lastName}`"
                class="slide-presenter"
                :style="{ '--backgroundColor': slide.backgroundColor, '--textColor': slide.textColor }"
            >
                <NuxtLinkLocale to="/">
                    <div>
                        <img :src="`https://picsum.photos/seed/${index + 1}/322/375`" width="322" height="375" alt="" />
                    </div>
                    <div class="slide-content">
                        <h3>
                            {{ slide.firstName }}<br />
                            {{ slide.lastName }}
                        </h3>
                        <div>{{ slide.job }}</div>
                    </div>
                </NuxtLinkLocale>
            </SwiperSlide>
            <div class="swiper-actions">
                <button type="button" class="swiper-button-prev" @click="prev">
                    <IconArrow class="size-7 -scale-x-100" />
                </button>
                <button type="button" class="swiper-button-next" @click="next">
                    <IconArrow class="size-7" />
                </button>
            </div>
        </Swiper>
    </section>
</template>

<script lang="ts" setup>
import 'swiper/css';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay } from 'swiper/modules';

import IconArrow from '@/assets/svg/arrow.svg?component';
import IconStar from '@/assets/svg/shapes/star.svg?component';

const { t } = useI18n();
const swiperRef = ref();

const slides = [
    {
        firstName: 'ioana',
        lastName: 'teleanu',
        job: 'Product Designer, Miro',
        img: '',
        backgroundColor: '',
        textColor: '',
    },
    {
        firstName: 'philippe',
        lastName: 'lamarre',
        job: 'Co-fondateur, Urbania ',
        img: '',
        backgroundColor: '',
        textColor: '',
    },
    {
        firstName: 'ioana',
        lastName: 'teleanu',
        job: 'Product Designer, Miro',
        img: '',
        backgroundColor: '',
        textColor: '',
    },
    {
        firstName: 'philippe',
        lastName: 'lamarre',
        job: 'Co-fondateur, Urbania ',
        img: '',
        backgroundColor: '',
        textColor: '',
    },
    {
        firstName: 'ioana',
        lastName: 'teleanu',
        job: 'Product Designer, Miro',
        img: '',
        backgroundColor: '',
        textColor: '',
    },
    {
        firstName: 'philippe',
        lastName: 'lamarre',
        job: 'Co-fondateur, Urbania ',
        img: '',
        backgroundColor: '',
        textColor: '',
    },
    {
        firstName: 'ioana',
        lastName: 'teleanu',
        job: 'Product Designer, Miro',
        img: '',
        backgroundColor: '',
        textColor: '',
    },
    {
        firstName: 'philippe',
        lastName: 'lamarre',
        job: 'Co-fondateur, Urbania ',
        img: '',
        backgroundColor: '',
        textColor: '',
    },
    {
        firstName: 'ioana',
        lastName: 'teleanu',
        job: 'Product Designer, Miro',
        img: '',
        backgroundColor: '',
        textColor: '',
    },
    {
        firstName: 'philippe',
        lastName: 'lamarre',
        job: 'Co-fondateur, Urbania ',
        img: '',
        backgroundColor: '',
        textColor: '',
    },
];

const prev = () => {
    swiperRef.value.slidePrev(300);
};
const next = () => {
    swiperRef.value.slideNext(300);
};
</script>

<style lang="postcss" scoped>
.programming-header {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
    max-width: 1272px;
    margin: 0 auto;
    padding: 0 16px;
    gap: 24px 32px;
    margin-bottom: 64px;
    @media (--lg) {
        flex-direction: row;
    }
}
.programming-title {
    font-size: rem(32px);
    font-weight: 600;
    max-width: 430px;
    flex-shrink: 0;
    margin: 0;
    @media (--lg) {
        font-size: rem(48px);
    }
}
.programming-content {
    display: flex;
    flex-direction: column;
    font-size: rem(16px);
    line-height: 1.777;
    gap: 40px;
    @media (--lg) {
        font-size: rem(18px);
        align-items: flex-start;
        max-width: 668px;
    }
    .wysiwyg {
        margin-left: 40px;
        @media (--lg) {
            margin-left: 0px;
        }
    }
}

.swiper {
    padding: 30px 0;
    margin: -30px 0;
}

.swiper-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    margin-top: 32px;
    max-width: 1272px;
    padding: 0 16px;
}

.swiper-button-prev,
.swiper-button-next {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: 1px solid var(--gray-900);
    border-radius: 12px;
    width: 48px;
    height: 48px;
    color: var(--gray-900);
    transition: scale 300ms ease-in-out;
    &:hover,
    &:focus-visible {
        scale: 1.1;
    }
    svg {
        width: 16px;
    }
}
.swiper-button-prev {
    svg {
        rotate: 180deg;
    }
}

.slide-presenter,
.slide-view-all {
    width: 322px;
    height: auto;
    margin-right: 24px;
    a {
        height: 100%;
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: var(--gray-900);
        transition: scale 300ms ease-in-out;
        &:hover {
            scale: 1.1;
        }
    }
}

.slide-presenter {
    a {
        border-radius: 20px;
        background-color: var(--backgroundColor, var(--green-800));
        color: var(--textColor, var(--pink-300));
    }
    img {
        border-radius: 20px;
    }
    .slide-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
        h3 {
            margin: 0;
        }
    }
}

.slide-view-all {
    a {
        gap: 16px;
    }
    .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1 / 1;
        border-radius: 20px;
        background-color: var(--pink-300);
        svg {
            width: 69%;
            fill: var(--green-800);
        }
    }
    .slide-content {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        justify-content: space-between;
        padding: 16px;
        border: 1px solid black;
        border-radius: 20px;
        h3 {
            margin: 0;
            font-weight: 400;
        }
    }
    .icon-arrow {
        width: 16px;
        align-self: flex-end;
    }
}
</style>
