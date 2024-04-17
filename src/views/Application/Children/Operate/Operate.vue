<script lang="ts" setup>
import { Operate } from './Operate';

import AreaVue from './Area/Area.vue'
import { provide } from 'vue';

const instance = new Operate()

provide('instance', instance)

const {

} = instance.InitStates()

instance.InitHooks()

instance.Run()
</script>

<template>
    <div class="Operate">
        <AreaVue></AreaVue>
    </div>
</template>

<style lang="scss" scoped>
@import "./Operate.scss"
</style>