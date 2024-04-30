<script lang="ts" setup>
import { Fix } from './Fix';

const instance = new Fix()
const {
    dom,
    content,
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
        <span class="Content" ref="content" :style="{ opacity: currentOpacity, filter: `blur(${currentBlur * 10}px)` }">
            <span class="Container" ref="container"></span>
        </span>
        <span class="Scale" v-show="isShowInfo">
            <span>大小：{{ ~~(currentScale * 100) }}%</span>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <span>透明度：{{ ~~(currentOpacity * 100) }}%</span>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <span>模糊度：{{ ~~(currentBlur * 100) }}%</span>
        </span>
    </div>
</template>

<style lang="scss" scoped>
@import "./Fix.scss"
</style>