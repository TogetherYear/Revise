<script lang="ts" setup>
import { Fix } from './Fix';

const instance = new Fix()
const {
    dom,
} = instance.InitStates()
instance.InitHooks()
instance.Run()
</script>

<template>
    <div class="Fix" ref="dom" data-tauri-drag-region>

    </div>
</template>

<style lang="scss" scoped>
@import "./Fix.scss"
</style>