import { onMounted, onUnmounted, ref } from "vue"
import { Draw } from "./Components/Draw/Draw"
import { Function } from "./Components/Function/Function"

class Suspend {
    public constructor() {

    }

    public draw = new Draw(this)

    public func = new Function(this)

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

export { Suspend }