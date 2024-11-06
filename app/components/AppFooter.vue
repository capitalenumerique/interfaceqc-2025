<template>
    <footer>
        <div>{{ t('Pied de page') }}</div>
        <div>
            <template v-if="$config.public.commitTag || $config.public.commitShortSha">Version:</template>
            {{ $config.public.commitTag }}
            {{ $config.public.commitTag ? `(${$config.public.commitShortSha})` : $config.public.commitShortSha }}
        </div>
    </footer>
</template>

<script lang="ts" setup>
const { t } = useI18n();
</script>

<i18n lang="json">
{
    "en": {
        "Pied de page": "Footer"
    }
}
</i18n>
