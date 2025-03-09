<template>
    <div>
        <SliceZone :slices="page?.data?.slices ?? []" :components="components" />
        <ul>
            <li v-for="item in page?.data?.tickets" :key="item.ticket_type.uid">
                <h4>{{ item.ticket_type.data.name }}</h4>
                <h4>{{ item.ticket_type.data.price }}</h4>
                <ul>
                    <li v-for="inclusion in item.ticket_type.data.inclusions" :key="inclusion.item">
                        {{ inclusion.item }}
                    </li>
                </ul>
                <h4>{{ item.ticket_type.data.link }}</h4>
            </li>
        </ul>
        <p>
            {{
                t(
                    'Tous les tarifs indiqués sont avant taxes. Les billets sont non-remboursables, mais peuvent être transférés à une autre personne avant le début de l’événement. Les tarifs sont en vigueur jusqu’au 20 mars inclusivement.',
                )
            }}
        </p>
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

const prismic = usePrismic();

const { data: page } = await useAsyncData('index', () => {
    return prismic.client.getSingle('tickets', {
        graphQuery: `{
            tickets {
                ...ticketsFields
                tickets {
                    ticket_type {
                        ...ticket_typeFields
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
