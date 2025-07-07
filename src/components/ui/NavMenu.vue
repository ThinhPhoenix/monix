<template>
    <nav class="bottom-nav">
        <div class="nav-bar-indicator" :style="indicatorStyle"></div>
        <ul>
            <li :class="{ active: activeIndex === 0 }" @click="setActive(0)">
                <span class="icon">
                    <PiggyBank :size="25" :color="activeIndex === 0 ? '#0A400C' : '#819067'" :stroke-width="1.8" />
                </span>
                <span class="label">{{ $t('home') }}</span>
            </li>
            <li :class="{ active: activeIndex === 1 }" @click="setActive(1)">
                <span class="icon">
                    <ChartSpline :size="25" :color="activeIndex === 1 ? '#0A400C' : '#819067'" :stroke-width="1.8" />
                </span>
                <span class="label">{{ $t('analysis') }}</span>
            </li>
            <li :class="{ active: activeIndex === 2 }" @click="setActive(2)">
                <span class="icon">
                    <User :size="25" :color="activeIndex === 2 ? '#0A400C' : '#819067'" :stroke-width="1.8" />
                </span>
                <span class="label">{{ $t('profile') }}</span>
            </li>
        </ul>
    </nav>
</template>

<script>
import { PiggyBank, User, ChartSpline } from 'lucide-vue-next';
export default {
    components: { PiggyBank, User, ChartSpline },
    data() {
        return {
            activeIndex: 0
        }
    },
    computed: {
        indicatorStyle() {
            // 3 tabs, each 33.3333% width
            return {
                left: `calc(${this.activeIndex * 33.3333}% )`,
                boxShadow: '0 0 16px 4px rgba(10,64,12,0.18), 0 0 32px 8px rgba(10,64,12,0.10)'
            }
        }
    },
    methods: {
        setActive(index) {
            this.activeIndex = index;
        }
    }
}
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
    padding-bottom: env(safe-area-inset-bottom, 0);
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
    width: 33.3333%;
    background: linear-gradient(90deg, #B1AB86 0%, #0A400C 50%, #B1AB86 100%);
    border-radius: 0 0 8px 8px;
    transition: left 0.35s cubic-bezier(.4, 1.6, .6, 1), box-shadow 0.35s cubic-bezier(.4, 1.6, .6, 1);
    pointer-events: none;
    z-index: 2;
    box-shadow: 0 0 16px 4px rgba(10, 64, 12, 0.18), 0 0 32px 8px rgba(10, 64, 12, 0.10);
}

.bottom-nav ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    justify-content: space-around;
    align-items: center;
    position: relative;
    height: 56px;
    margin-top: 5px;
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
