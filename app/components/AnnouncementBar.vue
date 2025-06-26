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
}
</style>
