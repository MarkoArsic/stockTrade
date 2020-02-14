<template>
    <div class="col-sm-6 col-md-6 col-lg-6">
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">{{stock.name}}<small> (Price: {{stock.price | currency}} | Quantity: {{stock.quantity}})</small></h3>     
            </div>    
            <div class="panel-body">
                <div class="pull-left">
                    <input type="number" class="form-control" placeholder="Quantity for sale" v-model="quantity" :class="{danger:cantSell}">
                </div>
                <div class="pull-right">
                    <button 
                    class="btn btn-success"
                    @click="sellStock"
                    :disabled="quantity <= 0 || cantSell"
                    >Sell</button>    
                </div>            
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['stock'],
    data() {
        return {
            quantity: null
        }
    },
    computed:{
      cantSell(){
        return this.quantity > this.stock.quantity;
      }
    },
    methods: {
        sellStock(){
            const order = {
                stockSymbol: this.stock.symbol,
                stockPrice: this.stock.price,
                stockQuantity: parseInt(this.quantity)
            };
            this.$store.dispatch('sellStock', order);
            this.quantity = 0;
        }
    }
}
</script>
<style lang="css" scoped>
.danger{
  border:1px solid red;
}
  
</style>