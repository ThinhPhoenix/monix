<template>
    <div class="app-layout">
        <main class="main-content bg-grid">
            <router-view />
        </main>
        <NavMenu />
    </div>
</template>

<script setup>
import NavMenu from '../components/ui/NavMenu.vue';
</script>

<style scoped>
.app-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
}

.main-content {
    flex: 1 1 auto;
    padding-bottom: 60px;
    position: relative;
    z-index: 1;
}
</style>
