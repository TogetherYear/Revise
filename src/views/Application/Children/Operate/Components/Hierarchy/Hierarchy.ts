import { onMounted, onUnmounted, ref } from "vue"
import { Operate } from "../../Operate"

class Hierarchy {
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

export { Hierarchy }