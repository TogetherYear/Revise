<script lang="ts" setup>
import { inject } from 'vue';
import { Operate } from '../Operate';

const instance = inject('instance') as Operate

const {
    dom,
} = instance.area.InitStates()

instance.area.InitHooks()

instance.area.Run()
</script>

<template>
    <div class="Area">
        <span class="Leafer" ref="dom"></span>
    </div>
</template>

<style lang="scss" scoped>
@import "./Area.scss"
</style>