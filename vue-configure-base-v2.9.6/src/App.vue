<template>
  <div id="app">
<!--    注意@可以代表src，但是地址写src/...路径找不到-->
<!--    <img src="src/assets/logo/logo.png">-->
    <img src="@/assets/logo/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
