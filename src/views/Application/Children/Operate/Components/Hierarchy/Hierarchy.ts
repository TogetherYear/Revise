import { onMounted, onUnmounted, ref } from "vue"
import { Operate } from "../../Operate"
import { OperateType } from "../../Type"

class Hierarchy {
    public constructor(parent: Operate) {
        this.parent = parent
    }

    private parent!: Operate

    public InitStates() {
        return {
            OnResize: this.OnResize.bind(this)
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

    public OnResize(e: { x: number, y: number }) {
        this.parent.OnLayoutResize(e, OperateType.Layout.Hierarchy)
    }
}

export { Hierarchy }