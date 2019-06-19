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

<!--<script>
import slide from './components/slide';
import Map from "./components/Map.vue"

export default {
  name: 'app',
  data() {
    return {
      side: 'left',
      currentMenu: 'slide'
    };
  },
  components: {
    slide,
    Map,
  },
}
</script>-->

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
  // margin-top: 60px;
}

</style>
