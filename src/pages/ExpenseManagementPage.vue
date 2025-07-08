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
            <ExpenseCardElement v-for="expense in expenses" :key="expense.id" :expense="expense"
                @click="handleExpenseClick" />
        </div>
    </div>

    <div v-if="showForm" class="slide-over-overlay" @click="closeForm">
        <div class="slide-over-panel" @click.stop>
            <div class="slide-over-header">
                <h2 class="slide-over-title">{{ editingExpense ? 'Sửa chi tiêu' : 'Thêm chi tiêu mới' }}</h2>
                <button class="slide-over-close" @click="closeForm">
                    <X :size="24" :color="'#B1AB86'" />
                </button>
            </div>
            <div class="slide-over-content">
                <ManagementForm :expense="editingExpense" @save="handleSave" @cancel="closeForm" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Search, Plus, X } from 'lucide-vue-next';
import InputElement from '@/components/elements/InputElement.vue';
import ExpenseCardElement from '@/components/elements/ExpenseCardElement.vue';
import ManagementForm from '@/components/ui/ManagementForm.vue';

const expenses = ref([
    { id: 1, title: 'Ăn sáng', amount: 30000, date: '2025-07-07' },
    { id: 2, title: 'Cafe', amount: 25000, date: '2025-07-07' },
    { id: 3, title: 'Mua sách', amount: 120000, date: '2025-07-06' }
]);

const showForm = ref(false);
const editingExpense = ref(null);

function addExpense() {
    editingExpense.value = null;
    showForm.value = true;
}

function handleExpenseClick(expense) {
    editingExpense.value = expense;
    showForm.value = true;
}

function closeForm() {
    showForm.value = false;
    editingExpense.value = null;
}

function handleSave(formData) {
    if (editingExpense.value) {
        // Cập nhật expense
        const index = expenses.value.findIndex(e => e.id === editingExpense.value.id);
        if (index !== -1) {
            expenses.value[index] = { ...editingExpense.value, ...formData };
        }
    } else {
        // Thêm expense mới
        const newExpense = {
            id: Date.now(),
            ...formData,
            amount: Number(formData.amount)
        };
        expenses.value.unshift(newExpense);
    }
    closeForm();
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

/* Slide-over styles */
.slide-over-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    z-index: 1000;
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
}

.slide-over-panel {
    width: 100%;
    max-width: 480px;
    background: #FEFAE0;
    box-shadow: -4px 0 32px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    animation: slideInFromRight 0.3s ease-out;
}

.slide-over-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid rgba(177, 171, 134, 0.2);
    background: rgba(254, 250, 224, 0.9);
    backdrop-filter: blur(10px);
}

.slide-over-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0A400C;
    margin: 0;
}

.slide-over-close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
}

.slide-over-close:hover {
    background: rgba(177, 171, 134, 0.1);
}

.slide-over-content {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
}

@keyframes slideInFromRight {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0);
    }
}

/* Responsive */
@media (max-width: 640px) {
    .slide-over-panel {
        max-width: 100%;
    }

    .slide-over-header {
        padding: 16px;
    }

    .slide-over-content {
        padding: 16px;
    }
}
</style>