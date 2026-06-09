<script setup>
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const nav = useNav()

const showLogo = computed(() => {
    return nav.currentSlideRoute.value.meta?.slide?.frontmatter?.logo !== false
})
</script>

<template>
    <footer>
        <img
            v-if="showLogo"
            src="./images/duplojs.svg"
            class="absolute bottom-4 right-4 w-12 opacity-80 z-10"
        />
    </footer>
</template>