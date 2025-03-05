<template>
    <div>
        <h2>{{ session.title }}</h2>
        <ul>
            <li v-for="(speaker, i) in session.speakers" :key="`speaker-${session.id}-${i}`">
                <p>{{ speaker.firstName }} {{ speaker.lastName }}</p>
                <p>{{ speaker.organization }}</p>
            </li>
        </ul>
        <ul>
            <li
                v-for="(category, j) in session.categories"
                :key="`category-${session.id}-${j}`"
                :class="category.color"
            >
                {{ category.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>
defineProps({
    session: {
        type: Object,
        required: true,
    },
});
</script>
