<script lang="ts" setup>
import { inject } from 'vue';
import { Operate } from '../../Operate';

const instance = inject('instance') as Operate

const {
    dom,
} = instance.scene.InitStates()

instance.scene.InitHooks()

instance.scene.Run()
</script>

<template>
    <div class="Scene">
        <span class="Leafer" ref="dom"></span>
    </div>
</template>

<style lang="scss" scoped>
@import "./Scene.scss"
</style>