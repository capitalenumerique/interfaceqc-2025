<script setup lang="ts">
import type { Content } from '@prismicio/client';

const { t } = useI18n();

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(getSliceComponentProps<Content.HomeTicketsSlice>(['slice', 'index', 'slices', 'context']));
</script>

<template>
    <section class="home-tickets" :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
        <h2 class="home-tickets-title">
            <div>{{ t('Réserve ta place') }}</div>
        </h2>
        <div class="ticket-types-wrapper">
            <div class="ticket-types">
                <h3 v-if="slice.primary.title" class="ticket-types-title">{{ slice.primary.title }}</h3>
                <ul>
                    <li v-for="item in slice.primary.tickets" :key="item.ticket_type.uid">
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
            </div>
        </div>
    </section>
</template>

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
    div {
        max-width: 1272px;
        padding: 0 16px;
        margin: 0 auto;
    }
}

.ticket-types-wrapper {
    margin: 40px auto;
    width: 100%;
    max-width: 1368px;
    padding: 0 16px;
    @media (--lg) {
        margin: 64px auto;
    }
}
.ticket-types {
    background-color: var(--gray-900);
    color: var(--beige-100);
    padding: 64px 48px;
    border-radius: 40px;
}

.ticket-types-title {
    font-size: rem(48px);
    font-weight: 600;
    max-width: 700px;
    margin-bottom: 64px;
}
</style>
