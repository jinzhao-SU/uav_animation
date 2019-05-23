<template>
    <div id="test"></div>
</template>

<script>
import oboe from 'oboe'
import axios from 'axios';

import syrMap from '../js/syrMap'
// import dataReceiver from '../js/dataReceiver'
const urlStartArea = 'uav/startArea/'
const urlEndArea = 'uav/endArea/'
const urlUAV = 'uav/uav/'

export default {
    name: 'GoogleMap',
    data() {
        return {
            message: 'Here is Map.vue12',
            timer: 'a',
            dr: {},
            startData: [],
            endData: [],
            uavData: [],
            mapGoogle: {},
        };
    },
    async created () {
        try {
            // get data
            this.startData = await this.getStartData();
            this.endData = await this.getEndData();
            this.uavData = await this.getUAVData();
            // init map
            this.mapGoogle = new syrMap('map',this.uavData,this.startData,this.endData);

            // uav event listener
            Event.listen('startFly', ()=> this.mapGoogle.fly());
            Event.listen('pauseFly', ()=> this.mapGoogle.pause());
            Event.listen('resumeFly', ()=> this.mapGoogle.resume());
            Event.listen('getCurrTime', (time)=> this.mapGoogle.getCurrTime(time));
            Event.listen('setTimeInterval', (timeInterval)=> this.mapGoogle.setTimeInterval(timeInterval));
            Event.listen('setShowTrack', ()=> this.mapGoogle.setShowTrack());
            Event.listen('setShowUAVID', ()=> this.mapGoogle.setShowUAVID());
            Event.listen('setHideUAVTrack', ()=> this.mapGoogle.setHideUAVTrack());

        } catch(err) {
            this.error = err.message;
        }
    },

    methods: {

        getStartData() {
            return new Promise(async (resolve, reject) => {
                try {
                    const res = await axios.get(urlStartArea);
                    const data = res.data;
                    resolve(
                        data.map(post => ({
                            ...post,
                        }))
                    )
                } catch(err) {
                    reject(err);
                }
            })
        },

        getEndData() {
            return new Promise(async (resolve, reject) => {
                try {
                    const res = await axios.get(urlEndArea);
                    
                    const data = res.data;
                    resolve(
                        data.map(post => ({
                            ...post,
                        }))
                    )
                } catch(err) {
                    reject(err);
                }
            })
        },

        getUAVData() {
            return new Promise(async (resolve, reject) => {
                try {
                    var _this = this;
                    oboe(urlUAV).node(
                        '{TimeStep ID Latitude Longitude SignalStrength CurrentBasestation finished}',
                        async function (jsonObject) {
                        //    console.log(jsonObject);
                            _this.uavData.push(jsonObject);
                        }
                    );
                    const flag = await _this.checkUAVData();
                    if (flag) {
                        resolve(
                            _this.uavData.map(post => ({
                                ...post,
                            }))
                        )
                    }
                } catch(err) {
                    reject(err);
                }
            })
        },

        checkUAVData() {
            return new Promise(async (resolve, reject) => {
                try {
                    var _this = this;
                    
                    let x = setInterval(() => {
                        if(_this.uavData.length >= 100) {
                            clearInterval(x);
                            resolve(true);
                        }
                    }, 0);
                } catch (err) {
                    reject(err);
                }
            })
        },

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