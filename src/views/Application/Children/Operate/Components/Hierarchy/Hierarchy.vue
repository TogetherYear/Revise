<script lang="ts" setup>
import { inject } from 'vue';
import { Operate } from '../../Operate';
import DragBarVue from '../Tool/DragBar/DragBar.vue';

const instance = inject('instance') as Operate

const {
    hierarchyDom,
    positions,
} = instance.InitStates()

const {
    OnResize,
} = instance.hierarchy.InitStates()

instance.hierarchy.InitHooks()

instance.hierarchy.Run()
</script>

<template>
    <div class="Hierarchy" ref="hierarchyDom"
        :style="{ width: positions.hierarchy.width, height: positions.hierarchy.height }">
        <DragBarVue class="Bar" @resize="OnResize"></DragBarVue>
    </div>
</template>

<style lang="scss" scoped>
@import "./Hierarchy.scss"
</style>