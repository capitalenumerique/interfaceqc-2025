<template>
    <div>
        <SliceZone :slices="page?.data?.slices ?? []" :components="components" />
        <h2 class="home-tickets-title">
            <div class="container">{{ t('Termes et conditions') }}</div>
        </h2>
        <div class="container">
            <div class="content">
                <PrismicRichText :field="page?.data?.terms" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { components } from '~/slices';
const { locale, t } = useI18n();

defineI18nRoute({
    paths: {
        fr: '/billetterie',
    },
});

const prismic = usePrismic();

const { data: page } = await useAsyncData('index', () => {
    return prismic.client.getSingle('tickets', {
        graphQuery: `{
            tickets {
                ...ticketsFields
                slices {
                    ...on page_intro_header {
                       variation {
                            ...on default {
                                primary {
                                    ...primaryFields
                                }
                            }
                        }
                    }
                    ...on home_tickets {
                        variation {
                            ...on default {
                                primary {
                                    ...primaryFields
                                    tickets {
                                        ticket_type {
                                            ...ticket_typeFields
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }`,
        lang: `${locale.value}-ca`,
    });
});

useSeoMeta({
    title: page.value?.data.meta_title,
    ogTitle: page.value?.data.meta_title,
    description: page.value?.data.meta_description,
    ogDescription: page.value?.data.meta_description,
    ogImage: computed(() => prismic.asImageSrc(page.value?.data.meta_image)),
});
</script>

<style lang="postcss" scoped>
.home-tickets {
    margin: 120px 0;
}
.home-tickets-title {
    font-size: rem(18px);
    font-weight: bold;
    padding: 24px 0;
    border-top: 1px solid var(--gray-900);
    border-bottom: 1px solid var(--gray-900);
    margin: 0;
}
.container {
    max-width: 1272px;
    padding: 0 16px;
    margin: 0 auto;
    .content {
        margin: 48px 0 96px;
        max-width: 768px;
    }
}
</style>
