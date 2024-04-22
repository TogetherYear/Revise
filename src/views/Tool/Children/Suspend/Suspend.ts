import { onMounted, onUnmounted, ref } from "vue"
import * as L from 'leafer-ui'
import { BackFrame } from "./Core/BackFrame"
import { Mathf } from "@/libs/Mathf"

class Suspend {
    public constructor() {

    }

    private isSearchMonitor = true

    private isMouseDown = false

    public isFirstDown = true

    private searchTargetTimer: NodeJS.Timeout | null = null

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

    private target: {
        monitor: Array<IT.Monitor>,
        window: Array<IT.Window>,
    } = {
            monitor: [],
            window: [],
        }

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
            await this.SetDefaultTarget()
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

    private async SetDefaultTarget() {
        this.target.monitor = await Renderer.Monitor.GetAllMonitors()
        this.target.window = await Renderer.Window.GetAllWindows()
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
        this.leafer.on_(L.DragEvent.DRAG, this.OnDragging, this)
    }

    private async OnMouseDown(e: L.PointerEvent) {
        if (this.isSearchMonitor && this.searchTargetTimer) {
            clearInterval(this.searchTargetTimer)
            this.searchTargetTimer = null
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

    private async OnKeyDown(e: KeyboardEvent) {
        if (e.key == 'Escape') {
            await Renderer.Widget.Close()
        }
    }

    public OnDragging(e: L.DragEvent) {
        if (this.isFirstDown && this.isMouseDown) {
            const delta = {
                x: e.x - this.move.startX,
                y: e.y - this.move.startY
            }
            this.back.UpdateEraser(this.move.eraserX, this.move.eraserY, Mathf.Clamp(0, this.back.F.width - this.move.eraserX, delta.x), Mathf.Clamp(0, this.back.F.height - this.move.eraserY, delta.y))
        }
        else {

        }
    }

    public OnDragEnd(e: L.DragEvent) {
        this.back.UpdateCornerVisible(true)
    }

    private GenerateSearchTimrer() {
        if (this.searchTargetTimer) {
            clearInterval(this.searchTargetTimer)
            this.searchTargetTimer = null
        }
        this.searchTargetTimer = setInterval(async () => {
            const position = await Renderer.Automatic.GetMousePosition()
            for (let w of this.target.window) {
                if ((position.x > w.x && position.x < w.x + w.width) && (position.y > w.y && position.y < w.y + w.height)) {
                    this.back.UpdateEraser(w.x, w.y - this.current.y, w.width, w.height)
                    return
                }
            }
            for (let m of this.target.monitor) {
                if ((position.x > m.x && position.x < m.x + m.width) && (position.y > m.y && position.y < m.y + m.height)) {
                    this.back.UpdateEraser(m.x, m.y - this.current.y, m.width, m.height)
                    return
                }
            }
            const m = await Renderer.Monitor.GetCurrentMouseMonitor()
            this.back.UpdateEraser(m.x, m.y - this.current.y, m.width, m.height)
        }, 100)
    }
}

export { Suspend }