import { onMounted, onUnmounted, ref } from "vue"
import * as L from 'leafer-ui'
import { BackFrame } from "./Core/BackFrame"
import { Mathf } from "@/libs/Mathf"

class Suspend {
    public constructor() {

    }

    private isSearchMonitor = true

    private isMouseDown = false

    private isFirstDown = true

    private searchMonitorTimer: NodeJS.Timeout | null = null

    private current!: {
        x: number,
        y: number,
        width: number,
        height: number
    }

    private move = {
        startX: 0,
        startY: 0,
        eraserX: 0,
        eraserY: 0,
    }

    private dom = ref<HTMLSpanElement | null>(null)

    private leafer!: L.Leafer

    private back!: BackFrame

    public get L() {
        return this.leafer
    }

    public InitStates() {
        return {
            dom: this.dom,
        }
    }

    public InitHooks() {

    }

    public Run() {
        onMounted(async () => {
            await this.SetDefaultTransform()
            this.CreateLeafer()
            this.ListenEvents()
            this.GenerateSearchTimrer()
        })

        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {

    }

    private async SetDefaultTransform() {
        const ms = await Renderer.Monitor.GetAllMonitors()
        const minX = Math.min(...ms.map(c => c.x))
        const minY = Math.min(...ms.map(c => c.y))
        const maxY = Math.max(...ms.map(c => c.y))
        const maxHeight = Math.max(...ms.map(c => c.height))
        const width = ms.reduce((acc, cur) => acc + cur.width, 0)
        const height = Math.abs(maxY) + maxHeight + Math.abs(minY)
        this.current = { x: minX, y: minY, width, height }
        await Renderer.Widget.SetPosition(minX, minY)
        await Renderer.Widget.SetSize(width, height)
        await Renderer.Widget.Show()
    }

    private CreateLeafer() {
        if (this.dom.value) {
            this.leafer = new L.Leafer({
                view: this.dom.value,
                wheel: { zoomMode: false, preventDefault: true },
                type: 'draw',
                fill: 'transparent',
            })
            this.back = new BackFrame({
                suspend: this
            })
        }
    }

    private ListenEvents() {
        this.leafer.on_(L.PointerEvent.DOWN, this.OnMouseDown, this)
        this.leafer.on_(L.KeyEvent.DOWN, this.OnKeyDown, this)
        this.leafer.on_(L.PointerEvent.UP, this.OnMouseUp, this)
        this.leafer.on_(L.PointerEvent.MOVE, this.OnMouseMove, this)
    }

    private async OnMouseDown(e: L.PointerEvent) {
        if (this.isSearchMonitor && this.searchMonitorTimer) {
            clearInterval(this.searchMonitorTimer)
            this.searchMonitorTimer = null
        }
        if (this.isFirstDown) {
            this.move.startX = e.x
            this.move.startY = e.y
            this.move.eraserX = e.x
            this.move.eraserY = e.y
        }
        this.isMouseDown = true
    }

    private OnMouseUp(e: L.PointerEvent) {
        this.isFirstDown = false
        this.isMouseDown = false
    }

    private OnMouseMove(e: L.PointerEvent) {
        if (this.isFirstDown && this.isMouseDown) {
            const delta = {
                x: e.x - this.move.startX,
                y: e.y - this.move.startY
            }
            this.back.UpdateEraser(this.move.eraserX, this.move.eraserY, Mathf.Clamp(0, this.back.F.width - this.move.eraserX, delta.x), Mathf.Clamp(0, this.back.F.height - this.move.eraserY, delta.y))
        }
    }

    private async OnKeyDown(e: KeyboardEvent) {
        if (e.key == 'Escape') {
            await Renderer.Widget.Close()
        }
    }

    private GenerateSearchTimrer() {
        if (this.searchMonitorTimer) {
            clearInterval(this.searchMonitorTimer)
            this.searchMonitorTimer = null
        }
        this.searchMonitorTimer = setInterval(async () => {
            const m = await Renderer.Monitor.GetCurrentMouseMonitor()
            this.back.UpdateEraser(m.x, m.y - this.current.y, m.width, m.height)
        }, 100)
    }
}

export { Suspend }