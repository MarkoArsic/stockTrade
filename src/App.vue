<template>
  <div >
    <app-navigation></app-navigation>
    <div class="container-fluid">
      <div class="row">
        <div class="container col-xs-12 col-md-12 col-sm-12 col-lg-12">
          <transition name="slide" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "./components/header.vue";
export default {
  components: {
    appNavigation: navbar
  },
  created() {
    this.$store.dispatch("initStocks");
    this.$store.dispatch("tryAutoLogin");
    this.$store.dispatch("loadData");
  }
};
</script>

<style>
body {
  padding-top: 10rem;
  padding-bottom: 20px;
  /* background:rgba(0,0,0,0.15);
  background-size: cover;
  background-attachment: fixed;  */
}
/* .overlay {
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0,0,0,0.75);
} */
.navbar {
  margin-bottom: 20px;
}
h1 {
  columns: #b4b4b4;
}
.slide-enter-active {
  animation: slide-in 400ms ease-out forwards;
}
.slide-leave-active {
  animation: slide-out 400ms ease-out forwards;
}
@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
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

