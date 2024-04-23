<script lang="ts" setup>
import { provide } from 'vue';
import { Suspend } from './Suspend';
import DrawVue from './Components/Draw/Draw.vue'
import FunctionVue from './Components/Function/Function.vue'
import { OperateType } from "@/views/Application/Children/Operate/Type"

const instance = new Suspend()

provide('instance', instance)

const {
    type,
} = instance.InitStates()

instance.InitHooks()

instance.Run()
</script>

<template>
    <div class="Suspend">
        <span v-if="type == OperateType.SuspendType.Select">
            <DrawVue></DrawVue>
            <FunctionVue></FunctionVue>
        </span>
        <span></span>
        <span class="Test">Test</span>
    </div>
</template>

<style lang="scss" scoped>
@import "./Suspend.scss"
</style>