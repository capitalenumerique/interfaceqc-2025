<template>
    <div class="layout-wrapper">
        <div class="page-wrapper">
            <AppMenu />
            <div class="content-wrapper">
                <AppHeader />
                <slot />
            </div>
        </div>
        <AppFooter />
    </div>
</template>

<style lang="postcss" scoped>
.layout-wrapper {
    min-height: 100vh;
}
.page-wrapper {
    position: relative;
    flex-grow: 1;
    margin-top: 80px;
    z-index: 10;
    background: var(--beige-100);
    @media (--md) {
        display: grid;
        grid-template-columns: 68px 1fr;
        margin-top: 0;
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
</style>
