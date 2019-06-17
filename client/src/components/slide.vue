<template>
    <div>
        <Menu v-bind="this.$attrs" @openMenu="openMenu" @closeMenu="closeMenu">
            <slot>
                <div class='uavControlBtn control'>
                    <button v-ripple
                        v-on:click="startFly" class='button firstBtn'>start</button>
                    <button v-ripple
                        v-on:click="pauseFly" class='button secondBtn'>pause</button>
                    <button v-ripple
                        v-on:click="resumeFly" class='button thirdBtn'>resume</button>
                </div>
                <div class="separate-line" style="padding: 0px;"></div>
                <label class="label">Playback:</label>
                <div class='uavControlBtn'>
                    <button v-ripple v-on:click="backtrack(2)" class='playback'>
                        <img src="../assets/playback2.png">
                    </button>
                    <button v-ripple v-on:click="backtrack(4)" class='playback'>
                        <img src="../assets/playback4.png">
                    </button>
                    <button v-ripple v-on:click="backtrack(8)" class='playback'>
                        <img src="../assets/playback8.png">
                    </button>
                </div>
                <uavinfo/>
            </slot>
        </Menu>
    </div>
</template>

<script>
import Menu from './Menu';
import uavinfo from './sidepanel-uvainfo'


export default {
    name: 'slide',
    components: {
        Menu: Menu,
        uavinfo: uavinfo,
    },
    methods: {
        openMenu() {
            this.$emit('openMenu');
        },
        closeMenu() {
            this.$emit('closeMenu');
        },
        startFly() {
            Event.fire('startFly');
        },
        pauseFly() {
            Event.fire('pauseFly');
        },
        resumeFly() {
            Event.fire('resumeFly');
        },
        backtrack(flag) {
            Event.fire('backtrack', flag);
        },
    }
};
</script>
<style  lang="less">
.uavControlBtn {
    .control {
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        margin-top: 10px;
        padding: 0px;
    }
    
    > button {
        // width: 70px;
        width: 100%;
        height: 80px;
        margin: 0 auto;
        // border-radius: 20px;
        box-shadow: none;
        outline: none;
        color: black;
        &:hover {
            background-color: rgb(219,218,218);
        }
    }
    
    .playback {
        border-radius: 50px 50px 50px 50px;
        width: 60px;
        height: 60px;
    }

    .firstBtn {
        border-radius: 15px 0px 0px 15px;
        background-color: aqua;
    }
    .secondBtn {
        margin: 0px 3px 0px 3px;
        border-style: solid;
        border-width: 0px 1px 0px 1px;
        
        background-color: red;
    }
    .thirdBtn {
        border-radius: 0px 15px 15px 0px;
        background-color: yellow;
    }
    .label {
        text-transform: uppercase;
        display:inline-block;
        width: 80%;
        text-align: center;
        text-decoration:none;
        font-size: 13px;
    }
    .separate-line {
        height: 0;
        border-top: 1px solid #f0f0f0;
        flex: none;
        white-space: normal;
    }
}

</style>