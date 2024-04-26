<script lang="ts" setup>
import { Fix } from './Fix';

const instance = new Fix()
const {
    dom,
    container,
    currentScale,
    isShowInfo,
    currentOpacity,
    currentBlur,
} = instance.InitStates()
instance.InitHooks()
instance.Run()
</script>

<template>
    <div class="Fix" ref="dom" data-tauri-drag-region>
        <span :style="{ opacity: currentOpacity, filter: `blur(${currentBlur * 10}px)` }" class="Content"
            ref="container"></span>
        <span class="Scale" v-show="isShowInfo">
            <span :style="{ color: '#dddddd' }">大小：{{ ~~(currentScale * 100) }}%</span>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <span :style="{ color: '#dddddd' }">透明度：{{ ~~(currentOpacity * 100) }}%</span>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <span :style="{ color: '#dddddd' }">模糊度：{{ ~~(currentBlur * 100) }}%</span>
        </span>
    </div>
</template>

<style lang="scss" scoped>
@import "./Fix.scss"
</style>