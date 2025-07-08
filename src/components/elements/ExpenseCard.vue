<template>
  <div class="expense-card group relative flex items-center gap-4 bg-gradient-to-br from-[#FEFAE0]/80 to-[#B1AB86]/40 border-0 rounded-2xl shadow-xl px-6 py-5 mb-6 overflow-hidden hover:scale-[1.03] hover:shadow-2xl transition-all duration-200 cursor-pointer backdrop-blur-md"
    @click="onClick">
    <div class="w-14 h-14 flex items-center justify-center rounded-xl bg-white/70 border-2 border-[#B1AB86] shadow-lg mr-3">
      <span class="text-[#0A400C] text-2xl font-extrabold drop-shadow">{{ expense.title.charAt(0) }}</span>
    </div>
    <div class="flex-1 flex flex-col min-w-0">
      <h1 class="expense-title font-bold text-[#0A400C] text-lg truncate">{{ expense.title }}</h1>
      <div class="expense-date text-xs text-[#B1AB86] mt-1">{{ expense.date }}</div>
    </div>
    <div class="expense-amount font-extrabold text-[#e74c3c] text-lg ml-2 shrink-0 drop-shadow">-{{ expense.amount.toLocaleString() }}₫</div>
    <span class="pointer-events-none absolute inset-0 rounded-2xl border-2 border-white/30 group-hover:border-white/60 transition-all duration-200"></span>
  </div>
</template>

<script setup>
const props = defineProps({
  expense: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(['click']);
function onClick() {
  emit('click', props.expense);
}
</script>
