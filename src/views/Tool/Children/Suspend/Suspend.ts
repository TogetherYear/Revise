import { onMounted, onUnmounted, ref } from "vue"
import { Draw } from "./Components/Draw/Draw"
import { Function } from "./Components/Function/Function"
import { OperateType } from "@/views/Application/Children/Operate/Type"

class Suspend {
    public constructor() {

    }

    public draw = new Draw(this)

    public func = new Function(this)

    public type = ref<OperateType.SuspendType>(OperateType.SuspendType.Select)

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