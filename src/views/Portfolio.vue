<template>
  <div class="container">
    <app-stock v-for="stock in stocks" :stock="stock"></app-stock>  
  </div>
</template>
<script>
import Stock from '@/components/portfolio/stock.vue';
export default {
  components: {
    appStock: Stock
  },
  computed: {
    stocks() {
      return this.$store.getters.stockPortfolio;
    }
  }
}
</script>