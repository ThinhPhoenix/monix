<template>
  <div @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @mousedown="onMouseDown"
    @mousemove="onMouseMove" @mouseup="onMouseUp">
    <router-view />
    <div v-if="showRefresh" class="refresh-indicator">
      <span class="refresh-icon">
        <svg class="spin" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#B1AB86" stroke-width="3" opacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="#0A400C" stroke-width="3" stroke-linecap="round" />
        </svg>
      </span>
      <span class="refresh-text">Đang làm mới...</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const startY = ref(0);
const pulling = ref(false);
const showRefresh = ref(false);
let vibrated = false;

function vibrate() {
  if (navigator.vibrate) navigator.vibrate(30);
}

function onTouchStart(e) {
  if (window.scrollY === 0) {
    pulling.value = true;
    startY.value = e.touches[0].clientY;
    vibrated = false;
  }
}
function onTouchMove(e) {
  if (!pulling.value) return;
  const delta = e.touches[0].clientY - startY.value;
  if (delta > 80) {
    showRefresh.value = true;
    if (!vibrated) {
      vibrate();
      vibrated = true;
    }
  }
}
function onTouchEnd() {
  if (showRefresh.value) {
    window.location.reload();
  }
  pulling.value = false;
  showRefresh.value = false;
  vibrated = false;
}
// Optional: support mouse for desktop
let mouseDown = false;
function onMouseDown(e) {
  if (window.scrollY === 0) {
    mouseDown = true;
    startY.value = e.clientY;
    vibrated = false;
  }
}
function onMouseMove(e) {
  if (!mouseDown) return;
  const delta = e.clientY - startY.value;
  if (delta > 80) {
    showRefresh.value = true;
    if (!vibrated) {
      vibrate();
      vibrated = true;
    }
  }
}
function onMouseUp() {
  if (showRefresh.value) {
    window.location.reload();
  }
  mouseDown = false;
  showRefresh.value = false;
  vibrated = false;
}
</script>

<style scoped>
.refresh-indicator {
  position: fixed;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  color: #0A400C;
  padding: 14px 32px 14px 24px;
  border-radius: 2rem;
  box-shadow: 0 4px 24px 0 rgba(177, 171, 134, 0.13);
  font-weight: 600;
  z-index: 2000;
  font-size: 1.08rem;
  display: flex;
  align-items: center;
  gap: 14px;
  border: 2px solid #B1AB86;
  animation: fadeIn 0.2s;
}

.refresh-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spin {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>