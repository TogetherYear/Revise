import { onMounted, onUnmounted, ref } from "vue"
import { OperateType } from "@/views/Application/Children/Operate/Type"

class Suspend {
    private constructor() {

    }

    private static instance = new Suspend()

    public static get Instance() {
        return this.instance
    }

    public type = ref<OperateType.SuspendType>(OperateType.SuspendType.Draw)

    public currentImage!: HTMLImageElement

    public currentTransform!: OperateType.FixTransform

    public InitStates() {
        return {
            type: this.type,
            OnNeedFix: this.OnNeedFix.bind(this),
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

    public OnNeedFix(transform: OperateType.FixTransform, image: HTMLImageElement) {
        this.currentImage = image
        this.currentTransform = transform
        this.type.value = OperateType.SuspendType.Fix
    }
}

export { Suspend }