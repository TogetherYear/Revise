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
        <span :style="{ opacity: currentOpacity, filter: `blur(${currentBlur}px)` }" class="Content"
            ref="container"></span>
        <span class="Scale" v-show="isShowInfo">
            <span :style="{ color: '#dd0000' }">大小：{{ ~~(currentScale * 100) }}%</span>
            <span>&nbsp;&nbsp;</span>
            <span :style="{ color: '#dddd00' }">透明度：{{ ~~(currentOpacity * 100) }}%</span>
            <span>&nbsp;&nbsp;</span>
            <span :style="{ color: '#00dd00' }">模糊度：{{ currentBlur }}px</span>
        </span>
    </div>
</template>

<style lang="scss" scoped>
@import "./Fix.scss"
</style>