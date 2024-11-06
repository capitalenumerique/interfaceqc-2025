<template>
    <footer>
        <div>This is the footer</div>
        <template v-if="$config.public.commitTag || $config.public.commitShortSha">Version:</template>
        {{ $config.public.commitTag }}
        {{ $config.public.commitTag ? `(${$config.public.commitShortSha})` : $config.public.commitShortSha }}
    </footer>
</template>
