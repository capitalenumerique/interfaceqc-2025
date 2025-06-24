<template>
    <div class="layout-wrapper">
        <div class="announcement-bar">
            <div class="announcement-content">
                <span>{{ t("Vous consultez l’édition 2025 de l'événement.") }}</span>
                <a :href="'https://interfaceqc.com/'" class="external-link">
                    <span>{{ t('Voir la plus récente') }}</span>
                    <IconExternal class="icon-external" />
                </a>
            </div>
        </div>
        <div class="page-wrapper">
            <AppMenu />
            <PrimaryButton to="https://ti.to/cnum/interface-2025" target="_blank" class="btn-cta">
                <IconTickets class="icon-star-outline" />
                <span>{{ t('Acheter mon billet') }}</span>
                <span>{{ t('Billets') }}</span>
            </PrimaryButton>
            <main class="content-wrapper">
                <slot />
            </main>
        </div>
        <AppFooter />
    </div>
</template>

<script lang="ts" setup>
import IconTickets from '@/assets/svg/tickets.svg?component';
import IconExternal from '@/assets/svg/external.svg?component';
const { t } = useI18n();
</script>

<style lang="postcss" scoped>
.announcement-bar {
    z-index: 1;
    background-color: var(--gray-900);
    color: var(--beige-100);
    padding: 6px 12px;
    font-size: 14px;
    text-align: center;
    border-bottom: 1px solid var(--gray-900);
}
.announcement-content {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    @media (--xs-down) {
        display: flex;
        flex-direction: column;
    }
}
.external-link {
    margin-top: 2px;
    color: var(--textColor);
    text-decoration: underline;
    text-underline-offset: 4px;
    display: inline-flex;
    align-items: center;
    font-weight: 500;
    font-size: rem(14px);
    transition: color 0.2s ease;
    &:hover,
    &:focus {
        color: var(--yellow-200);
    }
    span {
        margin-top: -2px;
    }
    .icon-external {
        width: 12px;
        height: 12px;
        margin: 6px 0;
        margin-left: 4px;
    }
}
.layout-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.page-wrapper {
    position: relative;
    flex-grow: 1;
    z-index: 10;
    background: var(--beige-100);
    @media (--md) {
        display: grid;
        grid-template-columns: 68px 1fr;
        margin-top: 0;
        transform: translate3d(0, 0, 0);
    }
    &::before,
    &::after {
        content: '';
        display: block;
        width: 50px;
        height: 50px;
        position: absolute;
        top: 100%;
        background: var(--beige-100);
        z-index: 10;
    }
    &::before {
        left: 0;
        clip-path: path('M50,0 C22.6619049,0 0.448238098,21.9402858 0.00669857147,49.1731586 L0,50 L0,0 L50,0 Z');
    }
    &::after {
        right: 0;
        clip-path: path('M0,0 C27.3380951,0 49.5517619,21.9402858 49.9933014,49.1731586 L50,50 L50,0 L0,0 Z');
    }
}
.content-wrapper {
    min-width: 0;
}
.primary-button.btn-cta {
    display: flex;
    gap: 8px;
    position: absolute;
    right: 32px;
    top: 32px;
    z-index: 50;
    padding: 8px 12px;
    border-radius: 8px;
    text-transform: lowercase;
    @media (--md-down) {
        display: none;
    }
    @media (--lg) {
        padding: 14px 18px;
        top: 64px;
    }
    @media (--xl) {
        right: 64px;
    }
    .icon-star-outline {
        margin: -2px;
        width: 22px;
    }
}
.btn-cta {
    span {
        &:first-of-type {
            display: none;
            @media (min-width: 375px) {
                display: inline;
            }
        }
        &:last-of-type {
            display: inline;
            @media (min-width: 375px) {
                display: none;
            }
        }
    }
}
</style>

<i18n lang="json">
{
    "en": {
        "Acheter mon billet": "Buy my ticket",
        "Billets": "tickets",
        "Vous consultez l’édition 2025 de l'événement.": "You’re viewing the 2025 edition of the event.",
        "Voir la plus récente": "View the latest"
    }
}
</i18n>
