import { AActor } from "@/libs/AActor"
import { onMounted, onUnmounted } from "vue"

class Tray extends AActor {
    public constructor() { super() }

    public InitStates() {
        return {}
    }

    public InitHooks() {

    }

    public Run() {
        this.ListenEvents()
        onMounted(async () => {
            await this.RegisterShortcut()
            await Renderer.Widget.Hide()
        })
        onUnmounted(async () => {
            await Renderer.GlobalShortcut.UnregisterAll()
            this.Destroy()
        })
    }

    protected Destroy() {

    }

    private ListenEvents() {
        Renderer.Widget.Listen(Renderer.Event.TauriEvent.WINDOW_BLUR, async (e) => {
            await Renderer.Widget.Hide()
        })
    }

    public async OnClose() {
        await Renderer.App.Close()
    }

    private async RegisterShortcut() {
        await Renderer.GlobalShortcut.UnregisterAll()
        Renderer.GlobalShortcut.Register("CommandOrControl+[", () => {
            Renderer.Tool.CreateSuspendScreenshotWidget()
        })
    }
}

export { Tray }