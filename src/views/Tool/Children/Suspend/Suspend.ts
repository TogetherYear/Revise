import { onMounted, onUnmounted, ref } from "vue"
import { SuspendType } from "./Type"

class Suspend {
    private constructor() {

    }

    private static instance = new Suspend()

    public static get Instance() {
        return this.instance
    }

    public type = ref<SuspendType.WidgetType>(SuspendType.WidgetType.Draw)

    public currentImage!: HTMLImageElement

    public currentTransform!: SuspendType.FixTransform

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
            if (this.type.value == SuspendType.WidgetType.Draw) {
                await Renderer.Event.Emit(Renderer.Event.TauriEvent.TAURI, { event: Renderer.RendererEvent.Suspend, extra: { type: 'escape', format: '', url: '' } })
            }
            await Renderer.Widget.SetSize(0, 0)
            await Renderer.Widget.Close()
        }
    }

    public async OnNeedFix(transform: SuspendType.FixTransform, image: HTMLImageElement) {
        await Renderer.Event.Emit(Renderer.Event.TauriEvent.TAURI, { event: Renderer.RendererEvent.Suspend, extra: { type: 'fix', format: 'base64', url: image.src } })
        await Renderer.Widget.SetSize(0, 0)
        await Renderer.Widget.Hide()
        this.currentImage = image
        this.currentTransform = transform
        this.type.value = SuspendType.WidgetType.Fix
    }
}

export { Suspend }