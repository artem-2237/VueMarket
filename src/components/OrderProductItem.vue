<template>
    <li class="cart__order">
        <h3>{{ item.product.title }}</h3>
        <b>{{ (item.product.price * item.amount) | priceFormat }} ₽</b>
        <span>Артикул: {{ item.productId }}</span>
    </li>
</template>

<script>
import priceFormat from '@/helpers/priceFormat'

export default {
    props: ['item'],
    filters: {priceFormat}
}
</script>
