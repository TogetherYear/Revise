import { onMounted, onUnmounted, reactive } from "vue"
import { Draw } from "../../Draw"

class Tooltip {
    public constructor(parent: Draw) {
        this.parent = parent
    }

    private parent!: Draw

    private sizeTransform = reactive({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    })

    public InitStates() {
        return {
            sizeTransform: this.sizeTransform,
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

    public UpdateSizeTransform() {
        const t = this.parent.GetEraserTransform()
        this.sizeTransform.x = t.x + 6
        this.sizeTransform.y = t.y - 26
        this.sizeTransform.width = t.width
        this.sizeTransform.height = t.height
    }
}

export { Tooltip }