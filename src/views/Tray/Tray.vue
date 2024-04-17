<script lang="ts" setup>
import { provide } from 'vue';
import { Tray } from './Tray'
import closeIcon from '@/assets/mc/close.png'

const instance = new Tray()

provide('instance', instance)

const {

} = instance.InitStates()

instance.InitHooks()

instance.Run()
</script>

<template>
    <div class="TrayWindow Tray">
        <span class="Content">
            <span class="Title">Tray</span>
        </span>
        <span class="Close" @click="instance.OnClose()">
            <span class="Icon">
                <img :src="closeIcon" alt="">
            </span>
            <span class="Title">退出软件</span>
        </span>
    </div>
</template>

<style lang="scss" scoped>
@import "./Tray.scss";
</style>
