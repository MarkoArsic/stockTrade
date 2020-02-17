<template>
  <div class="container">
    <app-stock v-for="(stock,index) in orderBy(stocks, stocks.rank)" :key="index" :stock="stock"></app-stock>
  </div>
</template>
<script>
import Stock from "@/components/portfolio/stock.vue";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],

  components: {
    appStock: Stock
  },
  
  computed: {
    stocks() {
      return this.$store.getters.stockPortfolio;
    }
  }
};
</script>