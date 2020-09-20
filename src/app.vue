<template>
  <div id="app">
    <HeaderComponent></HeaderComponent>
    <router-view></router-view>
  </div>

</template>

<script>

  import HeaderComponent from "./components/header/header.vue";

  export default {
    name: 'app',
    components: {
      HeaderComponent
    }
  };

</script>

<style>
@import './css/style.css'

</style>
