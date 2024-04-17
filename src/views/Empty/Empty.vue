<script lang="ts" setup>
import { Empty } from './Empty'
import HeaderBarVue from '@/common/HeaderBar/HeaderBar.vue';
const instance = new Empty()

const {

} = instance.InitStates()

instance.InitHooks()

instance.Run()
</script>

<template>
    <div class="DefaultWindow Empty">
        <HeaderBarVue></HeaderBarVue>
        <span class="Title">404</span>
    </div>
</template>

<style lang="scss" scoped>
@import "./Empty.scss"
</style>