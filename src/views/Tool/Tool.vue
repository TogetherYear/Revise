<script lang="ts" setup>
import { Tool } from './Tool';

const instance = new Tool()

const {

} = instance.InitStates()

instance.InitHooks()

instance.Run()
</script>

<template>
    <div class="TransparentWindow Tool">
        <router-view class="ExtraViewFull" />
    </div>
</template>

<style lang="scss" scoped>
@import "./Tool.scss"
</style>