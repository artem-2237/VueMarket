<template>
    <div class="cart__block">
        <ul class="cart__orders">
        <OrderProductItem :item="item" v-for="item in products" :key="item.productId"/>
        </ul>
        
        <div class="cart__total">
        <p>Доставка: <b>500 ₽</b></p>
        <p>Итого: <b>{{ products.length }}</b> {{ products.length | productAmountText }}  на сумму <b>{{ totalPrice | priceFormat }} ₽</b></p>
        </div>

        <button class="cart__button button button--primery" v-if="orderButton" type="submit">
        Оформить заказ
        </button>
    </div>
</template>

<script>
import OrderProductItem from '@/components/OrderProductItem.vue'
import priceFormat from '@/helpers/priceFormat'
import productAmountText from '@/helpers/productAmountFormat'

export default {
    props: {
        products: {
            type: Array,
            default: [
                {
                    product: {
                        title: 'Loading...',
                        price: 'Loading...'
                    },
                    amount: 'Loading...',
                    productId: 'Loading...'
                }
            ]
        },
        totalPrice: {
            type: Number,
            default: 0,
        },
        orderButton: {
            type: Boolean,
            default: true
        }
    },
    components: {OrderProductItem},
    filters: {priceFormat, productAmountText},
}
</script>
