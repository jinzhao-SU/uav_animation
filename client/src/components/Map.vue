<template>
    <div></div>
</template>

<!-- Google map in background -->

<script>
import syrMap from '../syrMap'
import dataReceiver from '../dataReceiver'

export default {
    name: 'GoogleMap',
    data() {
        // let map = new google.maps.Map(document.getElementById('map'), {
        //     zoom: 13,
        //     center: {lat: 43.0481221, lng: -76.14742439999999}
        // });
        // new google.maps.Marker({position: {lat: 43.0481221, lng: -76.14742439999999}, map: map});
        // this.$emit('msgFunc', map);

        return {
            message: 'Here is Map.vue',
            d: this.getData()
        };
    },
    async created () {
        try {
            let dr = new dataReceiver();
            this.startData = await dr.getStartData();
            this.endData = await dr.getEndData();
            // this.uavData = await dr.getUAVData();
            // console.log(this.uavData)
            // console.log(this.startData)
            // console.log(this.endData)
            let mapGoogle = new syrMap('map',this.uavData,this.startData,this.endData);
        } catch(err) {
            this.error = err.message;
        }
    },
    methods: {
        async getData() {
            let dr = new dataReceiver();
            this.uavData = await dr.getUAVData();
            console.log(this.uavData);
            return this.uavData;
        }
    },
    
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
