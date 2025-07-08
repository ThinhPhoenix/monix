<template>
  <div @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @mousedown="onMouseDown"
    @mousemove="onMouseMove" @mouseup="onMouseUp">
    <router-view />
    <div v-if="showRefresh" class="refresh-indicator">Đang làm mới...</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const startY = ref(0);
const pulling = ref(false);
const showRefresh = ref(false);

function onTouchStart(e) {
  if (window.scrollY === 0) {
    pulling.value = true;
    startY.value = e.touches[0].clientY;
  }
}
function onTouchMove(e) {
  if (!pulling.value) return;
  const delta = e.touches[0].clientY - startY.value;
  if (delta > 80) {
    showRefresh.value = true;
  }
}
function onTouchEnd() {
  if (showRefresh.value) {
    window.location.reload();
  }
  pulling.value = false;
  showRefresh.value = false;
}
// Optional: support mouse for desktop
let mouseDown = false;
function onMouseDown(e) {
  if (window.scrollY === 0) {
    mouseDown = true;
    startY.value = e.clientY;
  }
}
function onMouseMove(e) {
  if (!mouseDown) return;
  const delta = e.clientY - startY.value;
  if (delta > 80) {
    showRefresh.value = true;
  }
}
function onMouseUp() {
  if (showRefresh.value) {
    window.location.reload();
  }
  mouseDown = false;
  showRefresh.value = false;
}
</script>

<style scoped>
.refresh-indicator {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #FEFAE0;
  color: #0A400C;
  padding: 8px 24px;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(177, 171, 134, 0.10);
  font-weight: 600;
  z-index: 2000;
  font-size: 1rem;
  animation: fadeIn 0.2s;
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