<template>
    <div>
        <SliceZone :slices="page?.data?.slices ?? []" :components="components" />
    </div>
</template>

<script lang="ts" setup>
import { components } from '~/slices';

defineI18nRoute({
    paths: {
        fr: '/partenaires',
    },
});

const { locale } = useI18n();
const prismic = usePrismic();

const { data: page } = await useAsyncData(`partners-${locale.value}`, () => {
    return prismic.client.getSingle('partners', {
        graphQuery: `{
            partners {
                ...partnersFields
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
                    ...on partners_grid {
                        variation {
                            ...on default {
                                primary {
                                    ...primaryFields
                                    partners_grid {
                                        partner {
                                            ...partnerFields
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
    description: page.value?.data.meta_description,
});
</script>
