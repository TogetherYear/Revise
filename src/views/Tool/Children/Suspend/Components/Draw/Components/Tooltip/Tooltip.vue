<script lang="ts" setup>
import { inject } from 'vue';
import { Draw } from '../../Draw';

const instance = inject('instance') as Draw

const {

} = instance.tooltip.InitStates()
instance.tooltip.InitHooks()
instance.tooltip.Run()
</script>

<template>
    <div class="Tooltip">

    </div>
</template>

<style lang="scss" scoped>
@import "./Tooltip.scss"
</style>