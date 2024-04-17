<script lang="ts" setup>
import { inject } from 'vue';
import { Operate } from '../../Operate';

const instance = inject('instance') as Operate

const {

} = instance.hierarchy.InitStates()

instance.hierarchy.InitHooks()

instance.hierarchy.Run()
</script>

<template>
    <div class="Inspector">

    </div>
</template>

<style lang="scss" scoped>
@import "./Inspector.scss"
</style>