<template>
    <div class="col-sm-4 col-md-4 col-lg-4">
        <div class="panel panel-success">
            <div class="panel-heading">
                <h3 class="panel-title">{{stock.name}}<small>  (Price: {{stock.price | currency}})</small></h3>     
                <h3 class="panel-title"><small>Price at opening: {{stock.price_open | currency}}</small></h3>
            </div>    
            <div class="panel-body">
                <div class="pull-left">
                    <input type="number" class="form-control" placeholder="Quantity" v-model="quantity" :class="{danger: cantBuy}">
                </div>
                <div class="pull-right">
                    <button 
                    class="btn btn-success"
                    @click="buyStock"
                    :disabled="quantity <= 0 || cantBuy"
                    >{{ cantBuy ? 'Not enough funds' : 'Buy' }}</button>    
                </div>            
            </div>
        </div>
    </div>
</template>
<script>
import { funds } from '@/mixins/fundsDisplay.js'
export default {
    props:['stock'],
    mixins: [funds],
    data() {
        return {
            quantity: null
        }
    },
    methods: {
        buyStock(){
            const order = {
                stockSymbol: this.stock.symbol,
                stockPrice: this.stock.price,
                stockQuantity: parseInt(this.quantity) 
            };
            this.$store.dispatch('buyStock', order);
            this.quantity = 0;
        }
    },
    computed:{
        cantBuy() {
            return this.quantity * this.stock.price > this.funds;
        }
    }
}
</script>
<style scoped>
    .danger{
        border: 1px solid red;
    }
</style>