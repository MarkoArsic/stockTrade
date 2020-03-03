<template>
<div>
    <table class="table" >
      <thead>
        <tr>
        <th>Rank </th>
        <th>Name</th>
        <th>Market Cap </th>
        <th> Price</th>
        <th> Price Change (1d)</th>
        <th> Change pct (1d)</th>
        <th> Volume (1d)</th>
        <th> Supply</th> 
        </tr>
        
      </thead>
      <tbody v-if="!isLoading">
        <tr v-for="(stock,index) in orderBy(stocks, stocks.rank)" :key="index">
          <td>{{stock.rank}}</td>
          <td>
            <div class="name">
            <img :src="stock.logo_url" :alt="stock.name" width="35" height="35">  
            <div class="flex-col">
                <p>{{stock.name}}</p> <small>{{stock.symbol}}</small>
            </div>
            </div>
          </td>
          <td>{{stock.market_cap | currency}} </td>
          <td>{{stock.price | currency}}</td>
          <td>{{ returnNestedValueIfExists(stock, 'price_change') }}</td> 
          <td :class="[returnNestedValueIfExists(stock, 'price_change_pct') < 0 ? 'red' : 'green']">{{ returnNestedValueIfExists(stock, 'price_change_pct') }}%</td>
          <td>{{returnNestedValueIfExists(stock, 'volume') | currency}}</td>
          <td>{{stock.circulating_supply}}</td>
        </tr>

      </tbody>
    </table>

</div>

</template>

<script>
import { funds } from "@/mixins/fundsDisplay.js";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [funds, Vue2Filters.mixin],
  data() {
    return {
      quantity: null,
      isActive :false
    };
  },
  methods: {
    returnNestedValueIfExists(stock, row){
      let d1 = stock["1d"];
      
      if(d1){        
        if(row == 'price_change'){
          return d1.price_change;
        }      
        if(row == 'price_change_pct') {
          return  Math.round( d1.price_change_pct * 100 + Number.EPSILON ) / 100;
        }
        if (row == 'volume') {
          return d1.volume;
        }   
      }   
    },
    buyStock() {
      const order = {
        stockSymbol: this.stock.symbol,
        stockPrice: this.stock.price,
        stockQuantity: parseInt(this.quantity)
      };
      this.$store.dispatch("buyStock", order);
      this.quantity = 0;
    }
  },
  computed: {
     
    cantBuy() {
      return this.quantity * this.stock.price > this.funds;
    },
    stocks() {
      return this.$store.getters.stocks;
    },
    isLoading(){
      return this.$store.getters.isLoading;
    }
  }
};
</script>

<style lang="css" scoped>
.name {
  display: flex;
  flex-direction: row;
  align-content: center;
}
.name img {
  margin: 5px 15px;
}
/* table {
    background: linear-gradient(90deg,#0c2646 0,#204065 60%,#2a5788);
    color: blanchedalmond;
} */
.green{
  color: rgb(0, 224, 142); 
}
.red{
  color: rgb(255, 0, 21);}
.blue{
  color: rgb(0, 149, 255);
}
small{
  color: gray;
  font-size: 1rem;
}
.flex-col{
  display: flex;
  flex-direction: column;  
}

</style>