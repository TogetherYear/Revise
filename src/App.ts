import { EventSystem } from "./libs/EventSystem"
import { onMounted, onUnmounted, ref } from "vue"

class App extends EventSystem {
    private constructor() { super() }

    private static instance: App = new App()

    public static get Instance() { return this.instance }

    public isMax = ref<boolean>(false)

    public InitStates() {
        return {
            isMax: this.isMax,
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
}

export { App }