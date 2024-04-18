<script lang="ts" setup>
import { DragBar } from './DragBar';

const events = defineEmits<{
    (event: 'resize', delta: { x: number, y: number }): void,
}>()

const instance = new DragBar(events)

const {
    barDom,
} = instance.InitStates()
instance.InitHooks()
instance.Run()
</script>

<template>
    <div class="DragBar" ref="barDom">

    </div>
</template>

<style lang="scss" scoped>
@import "./DragBar.scss"
</style>