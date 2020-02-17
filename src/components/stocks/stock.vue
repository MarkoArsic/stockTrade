<template>
  <div class="col-sm-4 col-md-4 col-lg-4">
    <div class="panel panel-success">
      <div class="panel-heading flex">
        <img :src="stock.logo_url" :alt="stock.name + '_logo'" height="45" width="45" />
        <h3 class="panel-title">
          {{stock.name}} | {{stock.symbol}}
          <br />
          <small>Price: {{stock.price | currency}}</small>
          <br />
          <small>Date: {{stock.price_date.slice(0,10)}}</small>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input
            type="number"
            class="form-control"
            placeholder="Quantity"
            v-model="quantity"
            :class="{danger: cantBuy}"
          />
        </div>
        <div class="pull-right">
          <button
            class="btn btn-success"
            @click="buyStock"
            :disabled="quantity <= 0 || cantBuy"
          >{{ cantBuy ? 'Not enough funds' : 'Buy' }}</button>
        </div>
      </div>
      <div class="panel-footer">Market cap: {{ stock.market_cap | currency}}</div>
    </div>
  </div>
</template>
<script>
import { funds } from "@/mixins/fundsDisplay.js";
export default {
  props: ["stock"],
  mixins: [funds],
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
    }
  },
  computed: {
    cantBuy() {
      return this.quantity * this.stock.price > this.funds;
    }
  }
};
</script>
<style lang="css" scoped>
.danger {
  border: 1px solid red;
}
.flex {
  display: flex;
  padding: 10px;
  background: inherit;
  border-radius: 20px !important;
}
img {
  margin-right: 1rem;
}

.panel-success {
  background-color: #f9f9f9;
  border-radius: 20px;
}
.panel-success input {
  border-radius: 20px;
}
.panel-success button {
  border-radius: 20px;
}
.panel-footer {
  background-color: #b1b1b1;
  color: #ffffff;
}
</style>