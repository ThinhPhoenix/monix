<template>
    <div class="app-layout">
        <main class="main-content bg-grid">
            <slot />
        </main>
        <NavMenu />
    </div>
</template>

<script>
import NavMenu from '../components/ui/NavMenu.vue';
export default {
    components: { NavMenu }
}
</script>

<style scoped>
.app-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.main-content {
    flex: 1 1 auto;
    padding-bottom: 60px;
    /* Để tránh che bởi navbar */
}
</style>
