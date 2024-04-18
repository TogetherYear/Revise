<script lang="ts" setup>
import { inject } from 'vue';
import { Operate } from '../../Operate';
import DragBarVue from '../Tool/DragBar/DragBar.vue';

const instance = inject('instance') as Operate

const {
    resourceDom,
    positions,
} = instance.InitStates()

const {
    OnResize,
} = instance.resource.InitStates()

instance.resource.InitHooks()

instance.resource.Run()
</script>

<template>
    <div class="Resource" ref="resourceDom" :style="{ height: positions.resource.height }">
        <DragBarVue class="Bar" @resize="OnResize"></DragBarVue>
    </div>
</template>

<style lang="scss" scoped>
@import "./Resource.scss"
</style>