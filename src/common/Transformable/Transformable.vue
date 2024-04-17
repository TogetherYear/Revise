<script lang="ts" setup>
import { Transformable } from './Transformable';

const attribute = withDefaults(defineProps<{
    x?: string,
    y?: string,
}>(), {
    x: '0',
    y: '0',
})

const instance = new Transformable(parseInt(attribute.x), parseInt(attribute.y))

const {
    dom
} = instance.InitStates()
instance.InitHooks()
instance.Run()
</script>

<template>
    <div class="Transformable" ref="dom">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
@import "./Transformable.scss"
</style>