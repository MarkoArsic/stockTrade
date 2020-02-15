<template>
    <div class="container">
      <app-navigation></app-navigation> 
      <div class="row">
        <div class="col-xs-12 col-md-10 col-sm-10 col-lg-10">
          <transition name="slide" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div> 
    </div>
</template>

<script>
import navbar from './components/header.vue'
    export default {
      components: {
        appNavigation : navbar
      },
      created(){
        this.$store.dispatch('initStocks');
        this.$store.dispatch('tryAutoLogin');
        this.$store.dispatch('loadData');
      }
    }
</script>

<style>
h1{
  columns: #b4b4b4;;
}

.slide-enter-active {
  animation: slide-in 200ms ease-out forwards;
}
.slide-leave-active {
  animation: slide-out 200ms ease-out forwards;
}
body { padding-bottom: 70px; }
@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  } 
  to 
  {
    transform: translateY(0px);
    opacity: 1;
  }
}
@keyframes slide-out {
  from {
    transform: translateY(0px);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>

