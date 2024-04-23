<script lang="ts" setup>
import { provide } from 'vue';
import FunctionVue from './Components/Function/Function.vue'
import { Draw } from './Draw';

const instance = new Draw()

provide('instance', instance)

const {
    dom,
} = instance.InitStates()
instance.InitHooks()
instance.Run()
</script>

<template>
    <div class="Draw">
        <span class="Leafer" ref="dom"></span>
        <FunctionVue></FunctionVue>
    </div>
</template>

<style lang="scss" scoped>
@import "./Draw.scss"
</style>