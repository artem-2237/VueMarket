<template>
    <label class="form__label">
        <textarea class="form__input form__input--area" v-model="dataValue" name="placeholder" :placeholder="placeholder"></textarea>
        <span class="form__value">{{ title }}</span>
        <span class="form__error" v-if="error">{{ error }}</span>
    </label>
</template>

<script>
export default {
    props: ['title', 'placeholder', 'error', 'value'],
    computed: {
        dataValue: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    }
}
</script>
