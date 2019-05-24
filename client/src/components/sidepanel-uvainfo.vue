<template>
    <div class="infoArea">
        <div class="separate-line"></div>
        <p>
            <label class="label">Current time:</label>
            <input type="text" class="txtbox " id="curtime" value="0">
        </p>
        <div class="separate-line"></div>
        <p>
            <label class="label">Current UAV num:</label>
            <input type="text" class="txtbox " id="curUAVnum" value="0">
        </p>
        <div class="separate-line"></div>
        <p>
            <label for='setCurtime' class="label">Set current time:</label>
            <input type="text" class="txtbox" id="setCurtime" v-on:change="getCurrTime()">
        </p>
        <div class="separate-line"></div>
        <p>
            <label for='timeinterval' class="label">Animation speed interval:</label>
            <!-- <input type="text" class="txtbox" id="timeinterval"  v-on:change="setTimeInterval()" v-model="timeInterval" placeholder="0"> -->
            <ticks></ticks>
        </p>
        
        <div class="separate-line"></div>
        <div class="auvOption">
        <table>
            <tr>
                <td>
                    <label>Show UAV track</label>
                </td>
                <td>
                    <label class="switch">
                        <input id="uavTrackChkBox" type="checkbox"  v-on:change="setShowTrack()" checked>
                        <span class="slider"></span>
                    </label>
                </td>
            </tr>
            <tr>
                <td>
                    <label>Show UAV ID</label>
                </td>
                <td>
                    <label class="switch">
                        <input id="uavIDChkBox" type="checkbox" v-on:change="setShowUAVID()">
                        <span class="slider"></span>
                    </label>
                </td>
            </tr>
            <tr>
                <td>
                    <label>Hide UAV icon and track after landing</label>
                </td>
                <td>
                    <label class="switch">
                        <input id="uavHideChkBox" type="checkbox" v-on:change="setHideUAVTrack()" checked>
                        <span class="slider"></span>
                    </label>
                </td>
            </tr>
        </table>
    </div>
    </div>
</template>


<script>
import ticks from './ticks'

export default {
    name: 'sidepanel-uvainfo',
    components: {
        ticks,
    },
    data() {
        return {
            timeInterval: '',
        }
    },

    methods: {
        getCurrTime() {
            // Event.fire('getCurrTime', time);
            let time = document.getElementById('setCurtime').value;
            Event.fire('getCurrTime', time);
        },
        setTimeInterval() {
            Event.fire('setTimeInterval', this.timeInterval)
        },
        setShowTrack() {
            Event.fire('setShowTrack');
        },
        setShowUAVID() {
            Event.fire('setShowUAVID');
        },
        setHideUAVTrack() {
            Event.fire('setHideUAVTrack');
        },
    },
}


</script>

<style lang="less">
    .infoArea {
        display: block;
    }
    .label {
        text-transform: uppercase;
        display:inline-block;
        width: 80%;
        text-align: center;
        text-decoration:none;
        font-size: 13px;
    }
    .txtbox {
        background-color: #FFFFFF;
        border-color: black;
        border-style: solid;
        border-width: 2px ;
        border-radius: 4px;
        color: black;
        padding: 14px 24px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        margin: 4px 2px;
        font-size: 16px;
        height: 100%;
    }
    .separate-line {
        height: 0;
        border-top: 1px solid #f0f0f0;
        flex: none;
        white-space: normal;
    }
    .auvOption {
        padding-top: 20px;
        padding-bottom: 10px;
    }
</style>



