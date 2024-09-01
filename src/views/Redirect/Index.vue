<template></template>

<script setup>
const route = useRoute()
const router = useRouter()

const { params, query } = route
const { pathMatch } = params
router.replace({ path: '/' + pathMatch.join('/'), query })
</script>
