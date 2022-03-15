<template>
    <label class="form__label">
        <input class="form__input" v-model="dataValue" :type="type" name="placeholder" :placeholder="placeholder">
        <span class="form__value">{{ title }}</span>
        <span class="form__error" v-if="error">{{ error }}</span>
    </label>
</template>

<script>
export default {
    props: {
        title: String,
        placeholder: String,
        error: String,
        value: String,
        type: {
            type: String,
            default: 'text'
        }
    },
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
