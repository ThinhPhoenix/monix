<template>
    <div class="app-layout">
        <!-- Particle Blur Background -->
        <div class="particle-bg">
            <span class="particle particle-1"></span>
            <span class="particle particle-2"></span>
            <span class="particle particle-3"></span>
            <span class="particle particle-4"></span>
        </div>
        <main class="main-content bg-grid">
            <router-view />
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
    position: relative;
}

.particle-bg {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
}

.particle {
    position: absolute;
    border-radius: 50%;
    filter: blur(48px);
    opacity: 0.55;
    mix-blend-mode: lighten;
    animation: float 12s ease-in-out infinite alternate;
    transition: opacity 0.3s;
}

.particle-1 {
    width: 180px;
    height: 180px;
    background: #B1AB86;
    top: 8%;
    left: 6%;
    animation-delay: 0s;
}

.particle-2 {
    width: 120px;
    height: 120px;
    background: #0A400C;
    top: 60%;
    left: 12%;
    opacity: 0.32;
    animation-delay: 2s;
}

.particle-3 {
    width: 140px;
    height: 140px;
    background: #FEBF00;
    top: 30%;
    right: 8%;
    opacity: 0.28;
    animation-delay: 4s;
}

.particle-4 {
    width: 100px;
    height: 100px;
    background: #819067;
    bottom: 10%;
    right: 14%;
    opacity: 0.22;
    animation-delay: 1s;
}

@keyframes float {
    0% {
        transform: translateY(0) scale(1);
    }

    100% {
        transform: translateY(-30px) scale(1.08);
    }
}

.main-content {
    flex: 1 1 auto;
    padding-bottom: 60px;
    /* Để tránh che bởi navbar */
    position: relative;
    z-index: 1;
}
</style>
