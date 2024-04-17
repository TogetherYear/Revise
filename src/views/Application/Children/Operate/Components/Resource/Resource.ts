import { onMounted, onUnmounted } from "vue"
import { Operate } from "../../Operate"

class Resource {
    public constructor(parent: Operate) {
        this.parent = parent
    }

    private parent!: Operate

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

export { Resource }