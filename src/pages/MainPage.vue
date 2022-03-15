<template>
    <main class="content container">
        <div class="content__top content__top--catalog">
        <h1 class="content__title">
            Каталог
        </h1>
        <span class="content__info">
            {{ countProducts }} {{ countProducts | productAmountText }} 
        </span>
        </div>
        <div class="content__catalog">

        <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo" :category-id.sync="filterCategoryId" :color-id.sync="filterColorId"/>
        
        <section class="catalog">
            <div v-if="productsLoading">Идёт загрузка товаров...</div>
            <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров <button @click.prevent="loadProducts">Попробовать ещё раз</button></div>

            <ProductList :products="products"/>
            <AppPagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
        
        </section>
            
        </div>
    </main>
</template>

<script>
import productAmountText from '@/helpers/productAmountFormat'
import ProductList from '@/components/ProductList.vue';
import AppPagination from '@/components/AppPagination.vue'
import ProductFilter from '@/components/ProductFilter.vue'
import axios from 'axios'
import { BASE_API_URL } from '@/config'

export default {
  filters: {productAmountText},
  components: {
    ProductList,
    AppPagination,
    ProductFilter,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,

      page: 1,
      productsPerPage: 6,

      productsData: null,

      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData ? this.productsData.items.map(item => {
        return {
          ...item,
          image: item.image.file.url,
        }
      }) : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts(){
      this.productsLoading = true;
      this.productsLoadingFailed = false;

      clearTimeout(this.loadProductsTimer);

      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(BASE_API_URL + `/api/products`, {
            params: {
              categoryId: this.filterCategoryId,
              colorId: this.filterColorId,
              page: this.page,
              limit: this.productsPerPage,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo, 
            }
          })
          .then(response => this.productsData =  response.data)
          .catch(() => this.productsLoadingFailed = true)
          .then(() => this.productsLoading = false);
      }, 0)
    },
  },
  watch: {
    page() {
      this.loadProducts()
    },
    filterPriceFrom() {
      this.loadProducts()
    },
    filterPriceTo() {
      this.loadProducts()
    },
    filterCategoryId() {
      this.loadProducts()
    },
    filterColorId() {
      this.loadProducts()
    }
  },
  created() {
    this.loadProducts();
  }
};
</script>
