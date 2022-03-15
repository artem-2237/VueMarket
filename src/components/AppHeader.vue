<template>
    <header class="header">
      <div class="header__wrapper container">
        <span class="header__info">{{ pageName }}</span>

        <router-link :to="{name: 'main'}" class="header__logo">
          <img src="img/svg/logo-tech.svg" alt="Логотип интернет магазина Технозавррр" width="190" height="33">
        </router-link>

        <a class="header__tel" href="tel:8 800 600 90 09">
          8 800 600 90 09
        </a>

        <CartIndicator/>
      </div>
    </header>
</template>

<script>
import CartIndicator from '@/components/CartIndicator.vue'

export default {
    components: {CartIndicator},
    computed: {
      pageName() {
        switch(this.$route.name) {
          case 'main': 
            return 'Каталог';
            break;

          case 'product': 
            return 'Товар';
            break;

          case 'cart': 
            return 'Корзина';
            break;

          case 'notFound': 
            return '';
            break;
        }
        
      },
    },
}
</script>
