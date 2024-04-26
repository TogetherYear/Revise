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
    draws,
    isOnDrawBtn,
    currentDrawType,
} = instance.func.InitStates()
instance.func.InitHooks()
instance.func.Run()
</script>

<template>
    <div class="Function" ref="dom" v-show="isShow && isShowFunc"
        :style="{ left: `${transform.left}px`, top: `${transform.top}px`, width: `${transform.width}px`, height: `${transform.height}px` }">
        <span class="Item" v-for="b in btns" :key="b.type" @click="instance.func.OnClickBtn(b)">
            <span class="Icon">
                <img :src="b.icon" :title="b.label" alt="">
            </span>
        </span>
        <span class="Draw" v-show="isOnDrawBtn">
            <span class="Arrow"></span>
            <span class="Type"
                :style="{ background: currentDrawType == t.type ? 'rgba(80, 80, 80, 1.0)' : 'rgba(30, 30, 30, 1.0)' }"
                v-for="t in draws" :key="t.type" @click="instance.func.OnClickDrawBtn(t.type)">
                <span class="Icon">
                    <img :src="t.icon" :title="t.label" alt="">
                </span>
            </span>
        </span>
    </div>
</template>

<style lang="scss" scoped>
@import "./Function.scss"
</style>