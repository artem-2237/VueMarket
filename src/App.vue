<template>
  <div class="page">
    <AppHeader/>

    <router-view/>

    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {AppHeader, AppFooter},
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey')
    if(userAccessKey) {
      this.updateUserAccessKey(userAccessKey) 
    }
    this.loadCart()
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey'])
  }
};
</script>
