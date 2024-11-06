<template>
    <header>
        {{ t('Entête') }}
        <LanguageSwitcher />
    </header>
</template>

<script setup>
const { t } = useI18n();
</script>

<i18n lang="json">
{
    "en": {
        "Entête": "Header"
    }
}
</i18n>
