<template>
    <div>
        <Menu v-bind="this.$attrs" @openMenu="openMenu" @closeMenu="closeMenu">
            <slot>
                <div class='uavControlBtn'>
                    <button v-on:click="startFly" class='startBtn'>start</button>
                    <button v-on:click="pauseFly" class='pauseBtn'>pause</button>
                    <button v-on:click="resumeFly" class='resumeBtn'>resume</button>
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
    }
};
</script>
<style  lang="less">
.uavControlBtn {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

    > button {
        width: 70px;
        height: 70px;
        margin: 0 auto;
        border-radius: 20px;
        box-shadow: none;
    }
    .startBtn {
        background-color: aqua;
    }
    .pauseBtn {
        background-color: red;
    }
    .resumeBtn {
        background-color: yellow;
    }
}

</style>