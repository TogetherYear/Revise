<script lang="ts" setup>
import { Fix } from './Fix';

const instance = new Fix()
const {

} = instance.InitStates()
instance.InitHooks()
instance.Run()
</script>

<template>
    <div class="Fix">

    </div>
</template>

<style lang="scss" scoped>
@import "./Fix.scss"
</style>