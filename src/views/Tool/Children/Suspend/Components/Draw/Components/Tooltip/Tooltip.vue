<script lang="ts" setup>
import { inject } from 'vue';
import { Draw } from '../../Draw';

const instance = inject('instance') as Draw

const {
    sizeTransform,
} = instance.tooltip.InitStates()
instance.tooltip.InitHooks()
instance.tooltip.Run()
</script>

<template>
    <div class="Tooltip">
        <span class="Size" :style="{ left: `${sizeTransform.x}px`, top: `${sizeTransform.y}px` }">
            <span class="A">{{ sizeTransform.width }}<span :style="{ marginLeft: '8px', marginRight: '8px' }">x</span>{{
                sizeTransform.height }}</span>
            <span class="B">px</span>
        </span>
    </div>
</template>

<style lang="scss" scoped>
@import "./Tooltip.scss"
</style>