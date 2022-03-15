<template> 
    <li class="catalog__item">
        <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
            <img :src="product.image" :alt="product.title">
        </router-link>

        <h3 class="catalog__title">
            <a href="#">
            {{ product.title }}
            </a>
        </h3>

        <span class="catalog__price">
            {{ product.price | priceFormat }} ₽
        </span>

        <ColorsSection :colors="colors" :productId="product.id"/>
        
    </li>
</template>

<script>
import priceFormat from '@/helpers/priceFormat'
import axios from 'axios'
import ColorsSection from '@/components/ColorsSection.vue'

export default {
  props: ['product'],
  components: {ColorsSection},
  computed: {
      colors() {
          return this.product.colors
      }
  },
  filters: {
      priceFormat,
  },
};
</script>
