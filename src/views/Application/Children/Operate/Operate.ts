import { onMounted, onUnmounted } from "vue"
import { Area } from "./Area/Area"

class Operate {
    public constructor() {

    }

    public area = new Area(this)

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

export { Operate }