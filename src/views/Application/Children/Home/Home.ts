import { onMounted, onUnmounted } from "vue"

class Home {
    public constructor() {

    }

    public InitStates() {
        return {

        }
    }

    public InitHooks() {

    }

    public Run() {
        onMounted(() => {

        })

        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {

    }

    public async ToGetSuspendWidget() {
        Renderer.Tool.CreateSuspendScreenshotWidget()
    }
}

export { Home }