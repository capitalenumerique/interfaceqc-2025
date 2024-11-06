<template>
    <header>
        This is the header
        <LanguageSwitcher />
        <p>{{ t('Bienvenue') }}</p>
    </header>
</template>

<script setup>
const { t } = useI18n();
</script>

<i18n lang="json">
{
    "en": {
        "Bienvenue": "Welcome"
    }
}
</i18n>
