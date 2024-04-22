<script lang="ts" setup>
import { Home } from './Home';

const instance = new Home()

const {

} = instance.InitStates()

instance.InitHooks()

instance.Run()
</script>

<template>
    <div class="Home">
        <button @click="instance.ToGetSuspendWidget()">ToGetSuspendWidget</button>
    </div>
</template>

<style lang="scss" scoped>
@import "./Home.scss"
</style>