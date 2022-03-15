<template>
    <ul class="colors colors--black">
        <li class="colors__item" v-for="color in colors" :key="color.productId">
            <label class="colors__label">
                <input class="colors__radio sr-only" type="radio" :value="color.code" :name="`${color.code}-${productId}`">
                <span class="colors__value" :style="{backgroundColor: color.code}">
                </span>
            </label>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['colors', 'productId']
}
</script>