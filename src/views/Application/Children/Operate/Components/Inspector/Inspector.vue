<script lang="ts" setup>
import { inject } from 'vue';
import { Operate } from '../../Operate';
import DragBarVue from '../Tool/DragBar/DragBar.vue';

const instance = inject('instance') as Operate

const {
    inspectorDom,
    positions,
} = instance.InitStates()

const {
    OnResize,
} = instance.inspector.InitStates()

instance.inspector.InitHooks()

instance.inspector.Run()
</script>

<template>
    <div class="Inspector" ref="inspectorDom"
        :style="{ width: positions.inspector.width, height: positions.inspector.height }">
        <DragBarVue class="Bar" @resize="OnResize"></DragBarVue>
    </div>
</template>

<style lang="scss" scoped>
@import "./Inspector.scss"
</style>