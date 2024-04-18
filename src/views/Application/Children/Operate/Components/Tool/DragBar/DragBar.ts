import { onMounted, onUnmounted, ref } from "vue"

class DragBar {
    public constructor(events: { (event: 'resize', delta: { x: number, y: number }): void }) {
        this.events = events
    }

    private events!: { (event: 'resize', delta: { x: number, y: number }): void }

    private barDom = ref<HTMLSpanElement | null>(null)

    private isDown = false

    private moveDelta = {
        lastX: 0,
        lastY: 0,
        currentX: 0,
        currentY: 0,
    }

    private timer: NodeJS.Timeout | null = null

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
            window.addEventListener('mousemove', this.OnBarMove.bind(this))
            window.addEventListener('mouseup', this.OnBarUp.bind(this))
        }
    }

    private OnBarDown(e: MouseEvent) {
        this.isDown = true
        this.moveDelta.lastX = e.clientX
        this.moveDelta.lastY = e.clientY
    }

    private OnBarMove(e: MouseEvent) {
        if (this.isDown) {
            this.moveDelta.currentX = e.clientX
            this.moveDelta.currentY = e.clientY
            this.OnResize()
        }
    }

    private OnResize() {
        const delta = {
            x: this.moveDelta.currentX - this.moveDelta.lastX,
            y: this.moveDelta.currentY - this.moveDelta.lastY,
        }
        this.moveDelta.lastX = this.moveDelta.currentX
        this.moveDelta.lastY = this.moveDelta.currentY
        this.events("resize", delta)
        // if (this.timer) {
        //     clearTimeout(this.timer)
        // }
        // this.timer = setTimeout(() => {
        //     const delta = {
        //         x: this.moveDelta.currentX - this.moveDelta.lastX,
        //         y: this.moveDelta.currentY - this.moveDelta.lastY,
        //     }
        //     this.moveDelta.lastX = this.moveDelta.currentX
        //     this.moveDelta.lastY = this.moveDelta.currentY
        //     this.events("resize", delta)
        // }, 60);
    }

    private OnBarUp() {
        this.isDown = false
    }
}

export { DragBar }