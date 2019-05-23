<template>
    <div id="test"></div>
</template>

<script>
import oboe from 'oboe'
import axios from 'axios';

import syrMap from '../js/syrMap'
import dataReceiver from '../js/dataReceiver'

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
            // this.dr = new dataReceiver();
            // let dr = new dataReceiver();
            // this.startData = await this.dr.getStartData();
            // this.endData = await this.dr.getEndData();
            // this.uavData = await this.dr.getUAVData();
            this.startData = await this.getStartData();
            this.endData = await this.getEndData();
            this.uavData = await this.getUAVData();
            this.mapGoogle = new syrMap('map',this.uavData,this.startData,this.endData);
            this.mapGoogle.fly();

            // this.fetchEventsList();
            // this.timer = setInterval(this.fetchEventsList, 1000);

            // console.log(this.uavData)
            // console.log(this.startData)
            // console.log(this.endData)


            // this.uavData = [{"TimeStep":"10","ID":"1233186384","Latitude":"43.0827885","Longitude":"-76.1771582","SignalStrength":"134.4682058","CurrentBasestation":"7","finished":"1"}]

            // let mapGoogle = new syrMap('map',this.uavData,this.startData,this.endData);
            // mapGoogle.fly();
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




        fetchEventsList: async function() {

            // this.$http.get('events', function(events) {
            //     this.list = events;
            // }).bind(this);

            const urlUAV = 'uav/uav/';
            var _this = this;
            oboe(urlUAV).node(
                '{TimeStep ID Latitude Longitude SignalStrength CurrentBasestation finished}',
                async function (jsonObject) {
                //    console.log(jsonObject);
                    _this.uavData.push(jsonObject);
                }
            );
        },
        cancelAutoUpdate: function() { clearInterval(this.timer) }

    },
    beforeDestroy() {
        clearInterval(this.timer)
    }
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