<template>
  <div id="app">
    <!-- <Map/> -->
    <router-view name="main"/>
    <router-view name="sidepanel"/>
    <!-- <component 
      :is="currentMenu" :right="side === 'right' ? true: false">
    </component> -->
  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
