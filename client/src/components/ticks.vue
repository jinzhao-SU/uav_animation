<template>
  <!-- <v-app id="inspire" style="height: 100px;"> -->
  <v-app id="inspire" class="custom_slide">
    <v-card flat color="transparent"> 
        <v-card-text>
        <v-slider
            v-model="speeds"
            :tick-labels="ticksLabels"
            :max="5"
            step="1"
            ticks="always"
            tick-size="2"
        ></v-slider>
        </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
  export default {
    name: 'ticks',
    data () {
      return {
        speeds: 0,
        ticksLabels: [
          'fast',
          '',
          '',
          '',
          '',
          'slow',
        ],
      }
    },
    updated() {
        console.log(this.speeds);
        this.setTimeInterval(this.speeds * 20);
    },
    methods: {
        setTimeInterval(speed) {
            Event.fire('setTimeInterval', speed)
        },
    },
  }
</script>
<style lang="less">
.custom_slide {
    .application--wrap {
        min-height: 0;
    } 
}
</style>