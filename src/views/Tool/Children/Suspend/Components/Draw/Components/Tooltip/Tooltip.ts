import { onMounted, onUnmounted } from "vue"
import { Draw } from "../../Draw"

class Tooltip {
    public constructor(parent: Draw) {
        this.parent = parent
    }

    private parent!: Draw

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
}

export { Tooltip }