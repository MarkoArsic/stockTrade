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
        <div class="boughtPrice">
          <h3 class="panel-title">
            <small>Price bought: {{stock.priceBought | currency}}</small>
          </h3>
        </div>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input
            type="number"
            class="form-control"
            placeholder="Quantity for sale"
            v-model="quantity"
            :class="{danger:cantSell}"
          />
        </div>
        <div class="pull-right">
          <button
            class="btn btn-success"
            @click="sellStock"
            :disabled="quantity <= 0 || cantSell"
          >Sell</button>
        </div>
      </div>
      <div class="panel-footer">Market cap: {{ stock.market_cap | currency}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["stock"],
  data() {
    return {
      quantity: null
    };
  },
  computed: {
    cantSell() {
      return this.quantity > this.stock.quantity;
    }
  },
  methods: {
    sellStock() {
      const order = {
        stockSymbol: this.stock.symbol,
        stockPrice: this.stock.price,
        stockQuantity: parseInt(this.quantity)
      };
      this.$store.dispatch("sellStock", order);
      this.quantity = 0;
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
.boughtPrice {
  align-self: flex-end;
  margin: 0 auto;
}
</style>