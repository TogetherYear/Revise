import { onMounted, onUnmounted } from "vue"
import { AActor } from "@/libs/AActor"

class Application extends AActor {
    public constructor() { super() }

    public InitStates() {
        return {

        }
    }

    public InitHooks() {

    }

    public Run() {
        onMounted(async () => {
            await this.RegisterShortcut()
            // await Renderer.Widget.SetShadow(true)
            // await Renderer.Widget.Show()
        })
        onUnmounted(async () => {
            await Renderer.GlobalShortcut.UnregisterAll()
            this.Destroy()
        })
    }

    protected Destroy() {

    }

    private async RegisterShortcut() {
        await Renderer.GlobalShortcut.UnregisterAll()
        Renderer.GlobalShortcut.Register("CommandOrControl+[", () => {
            Renderer.Tool.CreateSuspendScreenshotWidget()
        })
    }
}

export { Application }