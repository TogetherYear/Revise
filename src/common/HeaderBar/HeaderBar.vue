<script lang="ts" setup>
import { HeaderBar } from './HeaderBar'
import minIcon from '@/assets/mc/min.png'
import maxIcon from '@/assets/mc/max.png'
import hideIcon from '@/assets/mc/hide.png'
import { App } from '@/App';

const attribute = withDefaults(defineProps<{
    bgc?: string,
    /**
     * 窗口类型 
     */
    type?: 'main' | 'tool',
}>(), {
    bgc: '#212121',
    type: 'tool'
})

const instance = new HeaderBar()

const {
    isMax,
} = App.Instance.InitStates()

const {

} = instance.InitStates()
instance.InitHooks()
instance.Run()
</script>

<template>
    <div class="HeaderBar" :style="{ background: attribute.bgc }">
        <span v-if="attribute.type == 'main'">
            <span class="Btn">
                <span class="Min" @click="instance.OnOptionClick('Min', attribute.type)">
                    <img :src="minIcon" class="Icon" />
                </span>
                <span class="Max" @click="instance.OnOptionClick('Max', attribute.type)">
                    <img :src="maxIcon" class="Icon" />
                </span>
                <span class="Close" @click="instance.OnOptionClick('Close', attribute.type)">
                    <img :src="hideIcon" class="Icon" />
                </span>
            </span>
            <span class="Drag" data-tauri-drag-region v-show="!isMax"></span>
            <span class="Drag" v-show="isMax"></span>
        </span>
        <span v-if="attribute.type == 'tool'">
            <span class="Btn">
                <span class="Close" @click="instance.OnOptionClick('Close', attribute.type)">
                    <img :src="hideIcon" class="Icon" />
                </span>
            </span>
            <span class="Drag" data-tauri-drag-region></span>
        </span>
    </div>
</template>

<style lang="scss" scoped>
@import "./HeaderBar.scss";
</style>
