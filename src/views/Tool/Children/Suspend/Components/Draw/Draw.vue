<script lang="ts" setup>
import { inject } from 'vue';
import { Suspend } from '../../Suspend';

const instance = inject('instance') as Suspend
const {
    dom,
} = instance.draw.InitStates()
instance.draw.InitHooks()
instance.draw.Run()
</script>

<template>
    <div class="Draw">
        <span class="Leafer" ref="dom"></span>
    </div>
</template>

<style lang="scss" scoped>
@import "./Draw.scss"
</style>