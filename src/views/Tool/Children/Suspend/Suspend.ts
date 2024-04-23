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
        onMounted(() => {
            this.ListenEvents()
        })

        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {

    }

    private ListenEvents() {
        window.addEventListener('keydown', (e) => {
            this.OnKeyDown(e)
        })
    }

    private async OnKeyDown(e: KeyboardEvent) {
        if (e.key == 'Escape') {
            await Renderer.Widget.Close()
        }
    }

    public async OnNeedFix(transform: OperateType.FixTransform, image: HTMLImageElement) {
        await Renderer.Widget.SetSize(0, 0)
        await Renderer.Widget.Hide()
        this.currentImage = image
        this.currentTransform = transform
        this.type.value = OperateType.SuspendType.Fix
    }
}

export { Suspend }