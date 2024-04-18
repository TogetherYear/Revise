import { onMounted, onUnmounted, ref } from "vue"

class DragBar {
    public constructor() {

    }

    private barDom = ref<HTMLSpanElement | null>(null)

    public InitStates() {
        return {
            barDom: this.barDom,
        }
    }

    public InitHooks() {

    }

    public Run() {
        onMounted(() => {
            this.ListenEvents()
        })

        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {

    }

    private ListenEvents() {
        if (this.barDom.value) {
            this.barDom.value.addEventListener('mousedown', this.OnBarDown.bind(this))
            this.barDom.value.addEventListener('mousemove', this.OnBarMove.bind(this))
            document.addEventListener('mouseup', this.OnBarUp.bind(this))
        }
    }

    private OnBarDown(e: MouseEvent) {
        Debug.Log("D")
    }

    private OnBarMove(e: MouseEvent) {

    }

    private OnBarUp() {

    }
}

export { DragBar }