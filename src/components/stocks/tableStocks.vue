<template>
<div>
       
    </ul>
    
    <table class="table" >
      <thead>
        <tr>
        <th>Rank </th>
        <th>Name</th>
        <th>Market Cap </th>
        <th> Price</th>
        <th> Price Change </th>
        <th> Change pct</th>
        <th> Volume</th>
        <th> Supply</th> 
        </tr>
        
      </thead>
      <tbody>
        <tr v-for="(stock,index) in stocks" :key="index">
          <td>{{stock.rank}}</td>
          <td>
            <div>
            <img :src="stock.logo_url" :alt="stock.name" width="25" height="25">  
            </div>{{stock.name}}</td>
          <td>{{stock.market_cap}}</td>
          <td>{{stock.price}}</td>
            <div v-for="(d1,i) in stock" :key="i">
              <td>{{ ["1d"].price_change}}</td>
              <td></td>
              <td></td>
              <td></td>
            </div>
              
         
        
          <!-- <td>{{stock.circulating_supply}}</td> -->
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
      quantity: null
    };
  },
  methods: {
    buyStock() {
      const order = {
        stockSymbol: this.stock.symbol,
        stockPrice: this.stock.price,
        stockQuantity: parseInt(this.quantity)
      };
      this.$store.dispatch("buyStock", order);
      this.quantity = 0;
    },
    nervira(i){
      return this.stocks[i]["1d"].price_change;
    }
  },
  computed: {
    cantBuy() {
      return this.quantity * this.stock.price > this.funds;
    },
    stocks() {
      return this.$store.getters.stocks;
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
  align-content: flex-start;
}
/* table {
    background: linear-gradient(90deg,#0c2646 0,#204065 60%,#2a5788);
    color: blanchedalmond;
} */
</style>