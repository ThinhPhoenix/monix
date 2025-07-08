<template>
    <form class="expense-form" @submit.prevent="onSubmit">
        <div class="form-group">
            <label for="title">Tên khoản chi</label>
            <InputElement id="title" v-model="form.title" placeholder="Nhập tên khoản chi" required />
        </div>
        <div class="form-group">
            <label for="amount">Số tiền</label>
            <InputElement id="amount" v-model="form.amount" type="number" placeholder="Nhập số tiền" required />
        </div>
        <div class="form-group">
            <label for="date">Ngày</label>
            <InputElement id="date" v-model="form.date" type="date" required />
        </div>
        <div class="form-actions">
            <button type="submit" class="btn-save">{{ isEdit ? 'Cập nhật' : 'Thêm mới' }}</button>
            <button v-if="isEdit" type="button" class="btn-cancel" @click="onCancel">Huỷ</button>
        </div>
    </form>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import InputElement from '../elements/InputElement.vue';

const props = defineProps({
    expense: Object // Nếu truyền vào sẽ là edit, không thì là thêm mới
});
const emit = defineEmits(['save', 'cancel']);

const form = ref({
    title: '',
    amount: '',
    date: ''
});

const isEdit = computed(() => !!props.expense);

watch(() => props.expense, (val) => {
    if (val) {
        form.value = { ...val };
    } else {
        form.value = { title: '', amount: '', date: '' };
    }
}, { immediate: true });

function onSubmit() {
    emit('save', { ...form.value });
}
function onCancel() {
    emit('cancel');
}
</script>

<style scoped>
.expense-form {
    max-width: 420px;
    margin: 0 auto;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 4px 24px 0 rgba(177, 171, 134, 0.10);
    padding: 32px 24px 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.form-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 12px;
}

.btn-save {
    background: #0A400C;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px 22px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
}

.btn-save:hover {
    background: #17691a;
}

.btn-cancel {
    background: #fff;
    color: #B1AB86;
    border: 1.5px solid #B1AB86;
    border-radius: 8px;
    padding: 10px 22px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
}

.btn-cancel:hover {
    background: #F6F5F0;
    color: #0A400C;
}
</style>