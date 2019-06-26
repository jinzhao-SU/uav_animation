<template>
    <div id="test">{{this.$route.params.index}}</div>
</template>

<script>
import oboe from 'oboe'
import axios from 'axios';
import syrMap from '../js/syrMap'
import syrMap2 from '../js/syrMap2'
import syrMap_nocheck from '../js/syrMap_nocheck'
import syrMap_reactive from '../js/syrMap_reactive';
const urlStartArea = 'uav/startArea/'
const urlEndArea = 'uav/endArea/'
const urlUAV = 'uav/uav/'
const urlBastStation = 'uav/baseStation/'
const urlUAV_nocheck = 'uav/uav_nocheck/'
const urlUAV_tp = 'uav/uav_tp/'
const urlUAV_reactive = 'uav/uav_reactive/'


export default {
    name: 'GoogleMap',
    props: [
        'index',
    ],
    data() {
        return {
            message: 'Here is Map.vue',
            timer: 'a',
            dr: {},
            startData: [],
            endData: [],
            uavData: [],
            baseStationData: [],
            mapGoogle: {},
        };
    },
    async created () {
        try {
            console.log(`index: ${this.index}`);
            // get data
            this.startData = await this.getStartData();
            this.endData = await this.getEndData();
            this.baseStationData = await this.getBaseStationData();
            // init map
            let regexpress = /reactive*/;
            let flag = -1;
            let stmt = this.index;
            stmt ? stmt : stmt = '';
            console.log(`stmt: ${stmt}`);
            if (stmt.match(regexpress)) {
                flag = stmt.substring(stmt.length-1, stmt.length);
                stmt = 'reactive';
            }
            switch(stmt) {
                case 'proactive':
                    this.uavData = await this.getUAVData(urlUAV);
                    //console.log("length",this.uavData.length)
                    this.mapGoogle = new syrMap('map',this.uavData,this.startData,this.endData,this.baseStationData);
                    break;
                case 'reactive':
                    if (flag === 'e') {
                        this.uavData = await this.getUAVData(urlUAV_reactive);
                        console.log(`flag: ${flag}`);
                    } else if (flag === '1') {
                        console.log(`flag: ${flag}`);
                    } else if (flag === '2') {
                        console.log(`flag: ${flag}`);
                    } else {
                        console.log(`flag: ${flag}`);
                    }
                    this.mapGoogle = new syrMap_reactive('map',this.uavData,this.startData,this.endData);
                    break;
                case 'reduce_turn_point':
                    this.uavData = await this.getUAVData(urlUAV_tp);
                    this.mapGoogle = new syrMap('map',this.uavData,this.startData,this.endData,this.baseStationData);
                    break;
                case 'proactive_nocheck':
                    this.uavData = await this.getUAVData(urlUAV_nocheck);
                    this.mapGoogle = new syrMap_nocheck('map',this.uavData,this.startData,this.endData,this.baseStationData);
                    break;
                default:
                    this.mapGoogle = new syrMap2('map',this.uavData,this.startData,this.endData);
            }


            // uav event listener
            Event.listen('startFly', ()=> this.mapGoogle.fly());
            Event.listen('pauseFly', ()=> this.mapGoogle.pause());
            Event.listen('resumeFly', ()=> this.mapGoogle.resume());
            Event.listen('getCurrTime', (time)=> this.mapGoogle.getCurrTime(time));
            Event.listen('setTimeInterval', (timeInterval)=> this.mapGoogle.setTimeInterval(timeInterval));
            Event.listen('setShowTrack', ()=> this.mapGoogle.setShowTrack());
            Event.listen('setShowUAVID', ()=> this.mapGoogle.setShowUAVID());
            Event.listen('setHideUAVTrack', ()=> this.mapGoogle.setHideUAVTrack());
            Event.listen('backtrack', (flag)=> this.mapGoogle.backtrack(flag));

        } catch(err) {
            this.error = err.message;
        }
    },

    methods: {
        getBaseStationData() {
            return new Promise(async (resolve, reject) => {
                try {
                    const res = await axios.get(urlBastStation);
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

        getUAVData(uavURL) {
            return new Promise(async (resolve, reject) => {
                try {
                    var _this = this;
                    console.log("get data from",uavURL)
                    oboe(uavURL).node(
                        // '{TimeStep ID Latitude Longitude SignalStrength CurrentBasestation Finished}',
                        '{Time_Step UAV_ID Latitude Longitude Signal_strength Current_Basestation Finished}',
                        async function (jsonObject) {
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
