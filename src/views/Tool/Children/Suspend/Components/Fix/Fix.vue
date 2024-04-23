<script lang="ts" setup>
import { Fix } from './Fix';

const instance = new Fix()
const {
    dom,
    container,
    currentScale,
    isShowInfo,
    currentOpacity,
} = instance.InitStates()
instance.InitHooks()
instance.Run()
</script>

<template>
    <div class="Fix" ref="dom" data-tauri-drag-region>
        <span :style="{ opacity: currentOpacity }" class="Content" ref="container"></span>
        <span class="Scale" v-show="isShowInfo">大小：{{ ~~(currentScale * 100) }}%&nbsp;&nbsp;&nbsp;透明度：{{
            ~~(currentOpacity * 100)
            }}%</span>
    </div>
</template>

<style lang="scss" scoped>
@import "./Fix.scss"
</style>