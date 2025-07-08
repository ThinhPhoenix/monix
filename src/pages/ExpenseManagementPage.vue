<template>
    <div class="expense-search-sticky">
        <InputElement :placeholder="$t('search_expense')">
            <template #icon-left>
                <span class="search-icon-gap">
                    <Search :size="20" :color="'#B1AB86'" />
                </span>
            </template>
        </InputElement>
    </div>
    <div class="expense-list">
        <div class="expense-card-new group flex items-center gap-4 bg-gradient-to-br from-[#B1AB86]/20 to-[#FEFAE0]/60 border-2 border-dashed border-[#B1AB86] rounded-2xl shadow px-6 py-5 mb-6 cursor-pointer hover:bg-[#FEFAE0]/80 transition-all duration-200 backdrop-blur-sm"
            @click="addExpense">
            <div
                class="w-14 h-14 flex items-center justify-center rounded-xl bg-white/60 border-2 border-[#B1AB86] shadow">
                <Plus :size="28" :color="'#B1AB86'" />
            </div>
            <div class="flex-1 flex flex-col min-w-0 ml-3">
                <h1 class="font-bold text-[#0A400C] text-lg">{{ $t('add_new_expense') }}</h1>
                <div class="text-xs text-[#B1AB86] mt-1">{{ $t('add_new_expense_hint') }}</div>
            </div>
        </div>
        <div v-if="expenses.length === 0" class="empty-expense text-center text-[#B1AB86] text-[1.05rem] mt-8">{{
            $t('no_expense') }}</div>
        <div v-else>
            <div v-for="expense in expenses" :key="expense.id"
                class="expense-card group relative flex items-center gap-4 bg-gradient-to-br from-[#FEFAE0]/80 to-[#B1AB86]/40 border-0 rounded-2xl shadow-xl px-6 py-5 mb-6 overflow-hidden hover:scale-[1.03] hover:shadow-2xl transition-all duration-200 cursor-pointer backdrop-blur-md">
                <div
                    class="w-14 h-14 flex items-center justify-center rounded-xl bg-white/70 border-2 border-[#B1AB86] shadow-lg mr-3">
                    <span class="text-[#0A400C] text-2xl font-extrabold drop-shadow">{{ expense.title.charAt(0)
                    }}</span>
                </div>
                <div class="flex-1 flex flex-col min-w-0">
                    <h1 class="expense-title font-bold text-[#0A400C] text-lg truncate">{{ expense.title }}</h1>
                    <div class="expense-date text-xs text-[#B1AB86] mt-1">{{ expense.date }}</div>
                </div>
                <div class="expense-amount font-extrabold text-[#e74c3c] text-lg ml-2 shrink-0 drop-shadow">-{{
                    expense.amount.toLocaleString() }}₫</div>
                <span
                    class="pointer-events-none absolute inset-0 rounded-2xl border-2 border-white/30 group-hover:border-white/60 transition-all duration-200"></span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Search, Plus } from 'lucide-vue-next';
import InputElement from '../components/elements/InputElement.vue';

const expenses = ref([
    { id: 1, title: 'Ăn sáng', amount: 30000, date: '2025-07-07' },
    { id: 2, title: 'Cafe', amount: 25000, date: '2025-07-07' },
    { id: 3, title: 'Mua sách', amount: 120000, date: '2025-07-06' }
]);

function addExpense() {
    alert('Thêm chi tiêu mới!');
}
</script>

<style scoped>
.expense-search-sticky {
    position: sticky;
    top: 0px;
    z-index: 30;
    /* background: rgba(254, 250, 224, 0.92); */
    backdrop-filter: blur(10px);
    padding: 24px 24px 0px 24px;
    margin-bottom: 16px;
    border-radius: 0 0 18px 18px;
    box-shadow: 0 4px 24px 0 rgba(177, 171, 134, 0.10);
    border: 1.5px solid #f3f3e7;
}

.expense-list {
    padding: 0 16px 32px 16px;
}

.expense-card-new .w-14.h-14 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    min-width: 56px;
    min-height: 56px;
    background: #fff6;
    border-radius: 1rem;
    border: 2px solid #B1AB86;
    box-shadow: 0 2px 8px 0 rgba(177, 171, 134, 0.10);
    margin: 0 !important;
    padding: 0;
}

.expense-card-new .w-14.h-14 span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 2rem;
    font-weight: 800;
    line-height: 1;
    margin: 0;
}

.search-icon-gap {
    display: flex;
    align-items: center;
    margin-right: 5px;
}
</style>