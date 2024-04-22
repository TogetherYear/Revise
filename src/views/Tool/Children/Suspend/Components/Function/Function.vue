<script lang="ts" setup>
import { inject } from 'vue';
import { Suspend } from '../../Suspend';

const instance = inject('instance') as Suspend
const {
    isShow,
    transform,
    dom,
} = instance.func.InitStates()
instance.func.InitHooks()
instance.func.Run()
</script>

<template>
    <div class="Function" ref="dom" v-show="isShow"
        :style="{ left: `${transform.left}px`, top: `${transform.top}px`, width: `${transform.width}px`, height: `${transform.height}px` }">

    </div>
</template>

<style lang="scss" scoped>
@import "./Function.scss"
</style>