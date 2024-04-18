<script lang="ts" setup>
import { DragBar } from './DragBar';

const instance = new DragBar()

const {

} = instance.InitStates()
instance.InitHooks()
instance.Run()
</script>

<template>
    <div class="DragBar">

    </div>
</template>

<style lang="scss" scoped>
@import "./DragBar.scss"
</style>