<template>
<div>
<div class="page-header"> 
    <!-- <message-alert v-show="showAlert"></message-alert> -->
    <msg-alert v-show="alert" @alertClose="triggerAlert" :message="poruka" :btnText="btnText"></msg-alert>
    <button @click="triggerAlert">alert</button>
    <h1>Trade or View your portfolio</h1>
    <h6>Save or load your data</h6>
    <h6>Click on 'End Day' to begin New Day!</h6>
    <hr>
    <p v-if="username">Hello {{username}}</p>
    <p>Your funds: {{funds | currency}}</p>
    <p v-if="email">Your email: {{email}}</p>
  </div>
      <stock-table></stock-table>

</div>
  
</template>

<script>
import { funds } from '@/mixins/fundsDisplay.js'
import alert from '@/mixins/alertMixin.js'
import stockTable from '@/components/stocks/tableStocks.vue';

//import messageAlert from '@/components/messageAlert'
export default {
  mixins: [funds, alert],
  components:{
    'stock-table':stockTable
  },
  data() {
    return {
      poruka: 'Hello! I am an custom alert box!! Same as APEX have :-D',
      btnText: 'Close'
    }
  },
  computed:{
    email(){
      return !this.$store.getters.user ? false : this.$store.getters.user.email;
    },
    username(){
      return !this.$store.getters.user ? false : this.$store.getters.user.username;
    },
    getPortfolio(){
      return this.$store.getters.stockPortfolio;
    }
  },
  created() {      
    this.$store.dispatch('fetchUser');
  }
}
</script>
