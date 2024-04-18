<script lang="ts" setup>
import { inject } from 'vue';
import { Operate } from '../../Operate';
import DragBarVue from '../Tool/DragBar/DragBar.vue';

const instance = inject('instance') as Operate

const {

} = instance.resource.InitStates()

instance.resource.InitHooks()

instance.resource.Run()
</script>

<template>
    <div class="Resource">
        <DragBarVue class="Bar"></DragBarVue>
    </div>
</template>

<style lang="scss" scoped>
@import "./Resource.scss"
</style>