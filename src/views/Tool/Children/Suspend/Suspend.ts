import { onMounted, onUnmounted, ref } from "vue"
import { OperateType } from "@/views/Application/Children/Operate/Type"

class Suspend {
    public constructor() {

    }

    public type = ref<OperateType.SuspendType>(OperateType.SuspendType.Draw)

    public InitStates() {
        return {
            type: this.type,
        }
    }

    public InitHooks() {

    }

    public Run() {
        onMounted(async () => {
            await Renderer.Widget.Show()
        })

        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {

    }
}

export { Suspend }