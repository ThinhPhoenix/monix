<template>
    <div class="input-group">
        <label v-if="label" class="input-label">{{ label }}</label>
        <div class="input-wrapper">
            <span v-if="$slots['icon-left']" class="input-icon input-icon-left">
                <slot name="icon-left" />
            </span>
            <input :type="type" :placeholder="placeholder" :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)" class="input-element" :disabled="disabled"
                :autocomplete="autocomplete" />
            <span v-if="$slots['icon-right']" class="input-icon input-icon-right">
                <slot name="icon-right" />
            </span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: String,
    label: String,
    placeholder: String,
    type: {
        type: String,
        default: 'text'
    },
    disabled: Boolean,
    autocomplete: {
        type: String,
        default: 'off'
    }
});
const emit = defineEmits(['update:modelValue']);
</script>

<style scoped>
.input-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 18px;
}

.input-label {
    font-size: 0.95rem;
    color: #222831;
    font-weight: 500;
    letter-spacing: 0.01em;
    margin-bottom: 2px;
}

.input-wrapper {
    display: flex;
    align-items: center;
    position: relative;
}

.input-element {
    border-radius: 10px;
    outline: 2px solid #B1AB86;
    border: 0;
    background-color: rgba(254, 250, 224, 0.7);
    outline-offset: 3px;
    padding: 10px 1rem;
    transition: 0.25s;
    color: #0A400C;
    font-size: 1rem;
    width: 100%;
    box-shadow: 0 1px 4px 0 rgba(177, 171, 134, 0.07);
    padding-left: 2.2em;
    padding-right: 2.2em;
}

.input-element:focus {
    outline-offset: 5px;
    background-color: #fff;
    outline: 2px solid #0A400C;
}

.input-element:disabled {
    background: #F6F5F0;
    color: #B1AB86;
    cursor: not-allowed;
}

.input-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #B1AB86;
    font-size: 1.15em;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
}

.input-icon-left {
    left: 8px;
}

.input-icon-right {
    right: 12px;
}

.input-icon:empty {
    display: none;
}
</style>