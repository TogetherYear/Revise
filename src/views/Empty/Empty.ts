import { AActor } from "@/libs/AActor"
import { onMounted, onUnmounted } from "vue"

class Empty extends AActor {
    public constructor() {
        super()
    }


    public InitStates() {
        return {

        }
    }

    public InitHooks() {

    }

    public Run() {
        onMounted(async () => {
            await Renderer.Widget.SetShadow(true)
            await Renderer.Widget.Show()
            await this.GenerateEvent()
        })

        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {

    }

    private async GenerateEvent() {
        await Renderer.Event.Emit(Renderer.Event.TauriEvent.TAURI, { event: Renderer.RendererEvent.WidgetEmpty, extra: {} })
    }
}

export { Empty }