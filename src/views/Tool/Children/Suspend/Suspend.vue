<script lang="ts" setup>
import { provide } from 'vue';
import { Suspend } from './Suspend';
import DrawVue from './Components/Draw/Draw.vue'
import FunctionVue from './Components/Function/Function.vue'

const instance = new Suspend()

provide('instance', instance)

const {

} = instance.InitStates()

instance.InitHooks()

instance.Run()
</script>

<template>
    <div class="Suspend">
        <DrawVue></DrawVue>
        <FunctionVue></FunctionVue>
        <span class="Test">Test</span>
    </div>
</template>

<style lang="scss" scoped>
@import "./Suspend.scss"
</style>