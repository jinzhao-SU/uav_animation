<template>
    <div></div>
</template>

<script>
import syrMap from '../js/syrMap'
import dataReceiver from '../js/dataReceiver'
export default {
    name: 'GoogleMap',
    data() {
        return {
<<<<<<< HEAD
            message: 'Here is Map.vue12',
=======
            message: 'Here is Map.vue',
            d: this.getData()
>>>>>>> 2e7540746e11e88e21041e2c39c713088c07da6d
        };
    },
    async created () {
        try {
            let dr = new dataReceiver();
            this.startData = await dr.getStartData();
            this.endData = await dr.getEndData();
<<<<<<< HEAD
            this.uavData = await dr.getUAVData();
            // console.log(this.uavData)
            // console.log(this.startData)
            // console.log(this.endData)


            // this.uavData = [{"TimeStep":"10","ID":"1233186384","Latitude":"43.0827885","Longitude":"-76.1771582","SignalStrength":"134.4682058","CurrentBasestation":"7","finished":"1"}]

            let mapGoogle = new syrMap('map',this.uavData,this.startData,this.endData);
            mapGoogle.fly();
=======
            // this.uavData = await dr.getUAVData();
            // console.log(this.uavData)
            // console.log(this.startData)
            // console.log(this.endData)
            let mapGoogle = new syrMap('map',this.uavData,this.startData,this.endData);
>>>>>>> 2e7540746e11e88e21041e2c39c713088c07da6d
        } catch(err) {
            this.error = err.message;
        }
    },
<<<<<<< HEAD
=======
    methods: {
        async getData() {
            let dr = new dataReceiver();
            this.uavData = await dr.getUAVData();
            console.log(this.uavData);
            return this.uavData;
        }
    },
    
>>>>>>> 2e7540746e11e88e21041e2c39c713088c07da6d
};
</script>

<style>
    /* Always set the map height explicitly to define the size of the div
    * element that contains the map. */
    #map {
        height: 100%;
    }
    /* Optional: Makes the sample page fill the window. */
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
    }
</style>