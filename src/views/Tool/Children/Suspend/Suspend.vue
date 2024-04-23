<script lang="ts" setup>
import { provide } from 'vue';
import { Suspend } from './Suspend';
import DrawVue from './Components/Draw/Draw.vue'
import FixVue from './Components/Fix/Fix.vue'
import { OperateType } from "@/views/Application/Children/Operate/Type"

const {
    type,
} = Suspend.Instance.InitStates()

Suspend.Instance.InitHooks()

Suspend.Instance.Run()
</script>

<template>
    <div class="Suspend">
        <span v-if="type == OperateType.SuspendType.Draw">
            <DrawVue></DrawVue>
        </span>
        <span v-if="type == OperateType.SuspendType.Fix">
            <FixVue></FixVue>
        </span>
    </div>
</template>

<style lang="scss" scoped>
@import "./Suspend.scss"
</style>