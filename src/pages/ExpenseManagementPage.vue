<template>
    <div class="expense-search-sticky">
        <InputElement :placeholder="$t('search_expense')">
            <template #icon-left>
                <span style="margin-right:16px;display:flex;align-items:center;">
                    <Search :size="20" :color="'#B1AB86'" />
                </span>
            </template>
        </InputElement>
    </div>
    <div class="expense-list">
        <div class="expense-card-new group flex items-center gap-4 bg-gradient-to-br from-[#B1AB86]/20 to-[#FEFAE0]/60 border-2 border-dashed border-[#B1AB86] rounded-2xl shadow px-6 py-5 mb-6 cursor-pointer hover:bg-[#FEFAE0]/80 transition-all duration-200"
            @click="addExpense">
            <div
                class="w-14 h-14 flex items-center justify-center rounded-xl bg-white/60 border-2 border-[#B1AB86] shadow mr-3">
                <span class="text-[#B1AB86] text-2xl font-extrabold drop-shadow">+</span>
            </div>
            <div class="flex-1 flex flex-col min-w-0">
                <div class="font-bold text-[#0A400C] text-lg">{{ $t('add_new_expense') }}</div>
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
                    <div class="expense-title font-bold text-[#0A400C] text-lg truncate">{{ expense.title }}</div>
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

<script>
import { Search } from 'lucide-vue-next';
import InputElement from '../components/elements/InputElement.vue';
export default {
    components: { Search, InputElement },
    data() {
        return {
            expenses: [
                { id: 1, title: 'Ăn sáng', amount: 30000, date: '2025-07-07' },
                { id: 2, title: 'Cafe', amount: 25000, date: '2025-07-07' },
                { id: 3, title: 'Mua sách', amount: 120000, date: '2025-07-06' }
            ]
        }
    },
    methods: {
        addExpense() {
            alert('Thêm chi tiêu mới!');
        }
    }
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
</style>