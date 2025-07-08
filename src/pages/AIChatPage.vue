<template>
  <div class="flex flex-col h-screen text-[#0A400C]">
    <!-- Messages -->
    <div class="flex-1 overflow-y-auto px-4 py-6 space-y-6" ref="messagesRef">
      <template v-for="(msg, idx) in messages" :key="idx">
        <div class="flex gap-3">
          <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
            <div :class="[
              'w-8 h-8 rounded-full flex items-center justify-center',
              msg.role === 'user' ? 'bg-[#3498db]' : 'bg-[#B1AB86]',
            ]">
              <component :is="msg.role === 'user' ? User : Bot" size="16" class="text-white" />
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-sm font-medium">{{ msg.role === 'user' ? 'You' : 'AI Assistant' }}</span>
              <span class="text-xs text-[#0A400C]/40">{{ formatTime(msg.timestamp) }}</span>
            </div>
            <div class="text-sm leading-relaxed whitespace-pre-wrap">{{ msg.content }}</div>
          </div>
        </div>
      </template>

      <!-- Loading -->
      <div v-if="loading" class="flex gap-3">
        <div class="w-8 h-8 bg-[#B1AB86] rounded-full flex items-center justify-center">
          <Bot :size="16" class="text-white" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-sm font-medium">AI Assistant</span>
          </div>
          <div class="flex gap-1 items-center">
            <div class="w-2 h-2 bg-[#B1AB86] rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-[#B1AB86] rounded-full animate-bounce delay-150"></div>
            <div class="w-2 h-2 bg-[#B1AB86] rounded-full animate-bounce delay-300"></div>
            <span class="text-xs text-[#0A400C]/60 ml-2">Đang soạn...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="border-t border-[#B1AB86]/20 p-4">
      <div class="flex gap-3 items-end">
        <div class="flex-1 relative">
          <textarea v-model="input" @keydown.enter.prevent="handleKey" placeholder="Nhập tin nhắn..."
            class="w-full px-4 py-3 pr-12 border border-[#B1AB86]/30 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#B1AB86]/50 focus:border-transparent text-sm"
            rows="1" style="min-height: 48px; max-height: 120px" />
          <button @click="sendMessage" :disabled="!input.trim()"
            class="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#B1AB86]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <Send :size="18" class="text-[#B1AB86]" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, watch } from 'vue'
import { Bot, Trash2, Settings, Send, User } from 'lucide-vue-next'

const input = ref('')
const loading = ref(false)
const messages = ref([
  {
    role: 'ai',
    content: 'Xin chào! Tôi là AI Assistant. Tôi có thể giúp gì cho bạn hôm nay?',
    timestamp: Date.now(),
  },
])
const messagesRef = ref(null)

const sendMessage = () => {
  if (!input.value.trim()) return

  const content = input.value.trim()
  messages.value.push({ role: 'user', content, timestamp: Date.now() })
  input.value = ''
  loading.value = true
  scrollToBottom()

  setTimeout(() => {
    messages.value.push({
      role: 'ai',
      content: `Về "${content}": Đây là phản hồi mẫu từ AI.`,
      timestamp: Date.now(),
    })
    loading.value = false
    scrollToBottom()
  }, 1500 + Math.random() * 500)
}

const clearChat = () => {
  messages.value = [
    {
      role: 'ai',
      content: 'Xin chào! Tôi là AI Assistant. Tôi có thể giúp gì cho bạn hôm nay?',
      timestamp: Date.now(),
    },
  ]
}

const formatTime = (ts) => {
  return new Date(ts).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}

const handleKey = (e) => {
  if (!e.shiftKey) sendMessage()
}
</script>

<style scoped>
.animate-bounce {
  animation: bounce 1.4s infinite;
}

.delay-150 {
  animation-delay: 0.15s;
}

.delay-300 {
  animation-delay: 0.3s;
}

@keyframes bounce {

  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.5;
  }

  30% {
    transform: translateY(-6px);
    opacity: 1;
  }
}
</style>
