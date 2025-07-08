<template>
    <nav class="bottom-nav">
        <div class="nav-bar-indicator" :style="indicatorStyle"></div>
        <ul>
            <router-link to="/expense-management" custom v-slot="{ navigate, isActive }">
                <li :class="{ active: isActive }" @click="onTabClick(navigate)">
                    <span class="icon">
                        <PiggyBank :size="25" :color="isActive ? '#0A400C' : '#819067'" :stroke-width="1.8" />
                    </span>
                    <span class="label">{{ $t('home') }}</span>
                </li>
            </router-link>
            <router-link to="/analysis" custom v-slot="{ navigate, isActive }">
                <li :class="{ active: isActive }" @click="onTabClick(navigate)">
                    <span class="icon">
                        <ChartSpline :size="25" :color="isActive ? '#0A400C' : '#819067'" :stroke-width="1.8" />
                    </span>
                    <span class="label">{{ $t('analysis') }}</span>
                </li>
            </router-link>
            <router-link to="/ai-chat" custom v-slot="{ navigate, isActive }">
                <li :class="{ active: isActive }" @click="onTabClick(navigate)">
                    <span class="icon">
                        <Sparkles :size="25" :stroke-width="1.8" :color="isActive ? '#0A400C' : '#819067'" />
                    </span>
                    <span class="label">{{ $t('ai_chat') }}</span>
                </li>
            </router-link>
            <router-link to="/profile" custom v-slot="{ navigate, isActive }">
                <li :class="{ active: isActive }" @click="onTabClick(navigate)">
                    <span class="icon">
                        <User :size="25" :color="isActive ? '#0A400C' : '#819067'" :stroke-width="1.8" />
                    </span>
                    <span class="label">{{ $t('profile') }}</span>
                </li>
            </router-link>
        </ul>
    </nav>
</template>

<script setup>
import { computed } from 'vue';
import { PiggyBank, User, ChartSpline, Sparkles } from 'lucide-vue-next';
import { useRoute } from 'vue-router';
import Assets from '@/assets';

const route = useRoute();
const tabRoutes = ['/expense-management', '/analysis', '/ai-chat', '/profile'];

// Sử dụng Web Audio API để preload và phát âm thanh cực nhanh
let audioBuffer = null;
let audioContext = null;
const soundUrl = Assets.SoundsNavMenuClick;
if (typeof window !== 'undefined') {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    fetch(soundUrl)
        .then(res => res.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(buffer => { audioBuffer = buffer; });
}
const playClickSound = () => {
    if (audioBuffer && audioContext) {
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start(0);
    }
};
const onTabClick = (navigate) => {
    playClickSound();
    navigate();
};
const getActiveIndex = () => tabRoutes.findIndex(r => route.path === r || route.path.startsWith(r + '/'));
const indicatorStyle = computed(() => {
    const idx = getActiveIndex();
    return {
        left: `calc(${(idx < 0 ? 0 : idx) * 25}% )`,
        boxShadow: '0 0 16px 4px rgba(10,64,12,0.18), 0 0 32px 8px rgba(10,64,12,0.10)'
    };
});
</script>

<style scoped>
.bottom-nav {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(254, 250, 224, 0.7);
    box-shadow: 0 -2px 16px 0 rgba(177, 171, 134, 0.10);
    z-index: 100;
    padding-bottom: calc(env(safe-area-inset-bottom, 0) + 12px);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1.5px solid #B1AB86;
    overflow: hidden;
}

.nav-bar-indicator {
    position: absolute;
    top: 0;
    left: 0;
    height: 5px;
    width: 25%;
    background: linear-gradient(90deg, #B1AB86 0%, #0A400C 50%, #B1AB86 100%);
    border-radius: 0 0 18px 18px;
    transition: left 0.35s cubic-bezier(.4, 1.6, .6, 1), box-shadow 0.35s cubic-bezier(.4, 1.6, .6, 1);
    pointer-events: none;
    z-index: 2;
    box-shadow: 0 0 16px 4px rgba(10, 64, 12, 0.18), 0 0 32px 8px rgba(10, 64, 12, 0.10);
    backdrop-filter: blur(12px) saturate(160%);
    -webkit-backdrop-filter: blur(12px) saturate(160%);
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    opacity: 0.85;
}

.bottom-nav ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    justify-content: space-around;
    align-items: center;
    position: relative;
    height: 68px;
    margin-top: 5px;
    margin-bottom: 8px;
}

.bottom-nav li {
    flex: 1;
    text-align: center;
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #819067;
    transition: color 0.2s;
}

.bottom-nav li.active {
    color: #0A400C;
}

.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    margin-bottom: 2px;
    transition: color 0.2s;
}

.label {
    font-size: 0.78rem;
    display: block;
    font-weight: 400;
    margin-top: 0px;
    letter-spacing: 0.01em;
    color: inherit;
    transition: font-weight 0.2s;
}

.bottom-nav li.active .label {
    font-weight: 700;
}

.bottom-nav li:hover .icon,
.bottom-nav li:focus .icon {
    color: #B1AB86;
}
</style>
