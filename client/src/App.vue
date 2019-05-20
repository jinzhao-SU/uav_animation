<template>
  <div id="app">
    <Map/>
    <component :is="currentMenu" :right="side === 'right' ? true: false">
      <div class='uavControlBtn'>
        <button v-on:click="startFly" class='start'>start</button>
        <button v-on:click="pauseFly" class='pause'>pause</button>
        <button v-on:click="resumeFly" class='resume'>resume</button>
      </div>
    </component>
    <!-- <PostComponent/> -->
  </div>
</template>

<script>
// import PostComponent from './components/PostComponent.vue';
import slide from './components/slide';
import Menu from './components/Menu';
// import GoogleMap from "./components/GoogleMap";
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
    // PostComponent,
    // GoogleMap,
    slide,
    Menu,
    // GoogleMap,
    Map,
  },
  methods: {
    startFly() {
        console.log('startFlying')    
    },
    pauseFly() {
        console.log('pauseFlying')    
    },
    resumeFly() {
        console.log('resumeFlying')    
    },
  },
  mounted() {
    
  },
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
