<script lang="ts" setup>
import { Suspend } from './Suspend';

const instance = new Suspend()

const {
    dom,
} = instance.InitStates()

instance.InitHooks()

instance.Run()
</script>

<template>
    <div class="Suspend">
        <span class="Leafer" ref="dom"></span>
        <span class="Test">Test</span>
    </div>
</template>

<style lang="scss" scoped>
@import "./Suspend.scss"
</style>