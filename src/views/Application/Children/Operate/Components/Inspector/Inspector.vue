<script lang="ts" setup>
import { inject } from 'vue';
import { Operate } from '../../Operate';
import DragBarVue from '../Tool/DragBar/DragBar.vue';

const instance = inject('instance') as Operate

const {

} = instance.inspector.InitStates()

instance.inspector.InitHooks()

instance.inspector.Run()
</script>

<template>
    <div class="Inspector">
        <DragBarVue class="Bar"></DragBarVue>
    </div>
</template>

<style lang="scss" scoped>
@import "./Inspector.scss"
</style>