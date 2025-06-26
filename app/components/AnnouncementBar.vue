<template>
    <div class="announcement-bar">
        <div class="announcement-content">
            <slot />
        </div>
    </div>
</template>

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
    justify-content: center;
    flex-wrap: wrap;
    gap: 4px;

    :deep(a) {
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
}
</style>
