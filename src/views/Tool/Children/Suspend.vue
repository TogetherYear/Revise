<script lang="ts" setup>
import { Suspend } from './Suspend';

const instance = new Suspend()

const {

} = instance.InitStates()

instance.InitHooks()

instance.Run()
</script>

<template>
    <div class="Suspend">

    </div>
</template>

<style lang="scss" scoped>
@import "./Suspend.scss"
</style>