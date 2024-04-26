<script lang="ts" setup>
import { inject } from 'vue';
import { Draw } from '../../Draw';


const instance = inject('instance') as Draw

const {
    isShowFunc,
} = instance.InitStates()

const {
    isShow,
    transform,
    dom,
    btns,
} = instance.func.InitStates()
instance.func.InitHooks()
instance.func.Run()
</script>

<template>
    <div class="Function" ref="dom" v-show="isShow && isShowFunc"
        :style="{ left: `${transform.left}px`, top: `${transform.top}px`, width: `${transform.width}px`, height: `${transform.height}px` }">
        <span class="Item" v-for="b in btns" :key="b.type" @click="instance.func.OnClickBtn(b)">
            <img :src="b.icon" :title="b.label" alt="">
        </span>
    </div>
</template>

<style lang="scss" scoped>
@import "./Function.scss"
</style>