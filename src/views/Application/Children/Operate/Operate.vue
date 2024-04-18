<script lang="ts" setup>
import { Operate } from './Operate';

import SceneVue from './Components/Scene/Scene.vue'
import HierarchyVue from './Components/Hierarchy/Hierarchy.vue'
import InspectorVue from './Components/Inspector/Inspector.vue'
import ResourceVue from './Components/Resource/Resource.vue'
import { provide } from 'vue';

const instance = new Operate()

provide('instance', instance)

const {

} = instance.InitStates()

instance.InitHooks()

instance.Run()
</script>

<template>
    <div class="Operate">
        <SceneVue></SceneVue>
        <HierarchyVue></HierarchyVue>
        <InspectorVue></InspectorVue>
        <ResourceVue></ResourceVue>
    </div>
</template>

<style lang="scss" scoped>
@import "./Operate.scss"
</style>