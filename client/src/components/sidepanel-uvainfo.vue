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
            <input type="text" class="txtbox" id="setCurtime" onchange="getCurrTime(this)">
        </p>
    </div>
</template>


<script>

export default {
    name: 'sidepanel-uvainfo',
    methods: {
        getCurrTime(time) {
            // Event.fire('getCurrTime', time);
            console.log(time);
        }
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
</style>



