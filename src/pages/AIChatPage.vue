<template>
    <div class="flex flex-col h-full min-h-screen">
        <div class="flex-1"></div>
        <div :class="['chat-input-sticky', { 'chat-input-small': isNavHidden }]">
            <div class="input-bg-inner">
                <InputElement v-model="message" placeholder="Nhập tin nhắn..." class="mb-0">
                    <template #icon-right>
                        <button type="button" @click="sendMessage"
                            class="p-1.5 rounded-lg hover:bg-[#B1AB86]/10 transition flex items-center justify-center">
                            <CornerDownRight :size="18" class="text-[#B1AB86]" />
                        </button>
                    </template>
                </InputElement>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { CornerDownRight } from 'lucide-vue-next';
import InputElement from '@/components/elements/InputElement.vue';

const message = ref("");
const isNavHidden = ref(false);
let lastScrollY = window.scrollY;
function handleScroll() {
    const currentY = window.scrollY;
    if (currentY > lastScrollY && currentY > 40) {
        isNavHidden.value = true;
    } else {
        isNavHidden.value = false;
    }
    lastScrollY = currentY;
}
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
function sendMessage() {
    // Xử lý gửi tin nhắn ở đây
    message.value = "";
}
</script>

<style scoped>
.chat-input-sticky {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 30;
    backdrop-filter: blur(10px);
    padding: 0 24px 0 24px;
    border-radius: 0 0 18px 18px;
    box-shadow: 0 4px 24px 0 rgba(177, 171, 134, 0.10);
    border: 1.5px solid #f3f3e7;
    height: 175px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    transition: height 0.3s;
}

.chat-input-sticky.chat-input-small {
    height: 90px;
}

.input-bg-inner {
    padding-top: 16px;
    padding-bottom: 48px;
    transition: padding-bottom 0.3s;
}

.chat-input-sticky.chat-input-small .input-bg-inner {
    padding-bottom: 12px;
}
</style>