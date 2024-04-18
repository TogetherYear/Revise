<script lang="ts" setup>
import { inject } from 'vue';
import { Operate } from '../../Operate';
import DragBarVue from '../Tool/DragBar/DragBar.vue';

const instance = inject('instance') as Operate

const {

} = instance.hierarchy.InitStates()

instance.hierarchy.InitHooks()

instance.hierarchy.Run()
</script>

<template>
    <div class="Hierarchy">
        <DragBarVue class="Bar"></DragBarVue>
    </div>
</template>

<style lang="scss" scoped>
@import "./Hierarchy.scss"
</style>