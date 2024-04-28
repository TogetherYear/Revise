import { onMounted, onUnmounted, ref } from "vue"
import * as L from 'leafer-ui'
import { Mathf } from "@/libs/Mathf"
import { BackFrame } from "./Core/BackFrame"
import { MonitorFrame } from "./Core/MonitorFrame"
import { Function } from "./Components/Function/Function"
import { Tooltip } from "./Components/Tooltip/Tooltip"

class Draw {
    public constructor() {

    }

    private isSearchMonitor = true

    private isMouseDown = false

    public isFirstDown = true

    private searchTargetTimer: NodeJS.Timeout | null = null

    public func = new Function(this)

    public tooltip = new Tooltip(this)

    public current!: {
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

    public back!: BackFrame

    public monitor!: MonitorFrame

    public target: {
        monitor: Array<IT.Monitor & { url: string }>,
        window: Array<IT.Window>,
    } = {
            monitor: [],
            window: [],
        }

    public get L() {
        return this.leafer
    }

    private moveMouse = {
        w: false,
        s: false,
        a: false,
        d: false
    }

    private moveFrame = {
        w: false,
        s: false,
        a: false,
        d: false
    }

    private isShowFunc = ref<boolean>(true)

    private isCtrl = false

    public InitStates() {
        return {
            dom: this.dom,
            isShowFunc: this.isShowFunc,
        }
    }

    public InitHooks() {

    }

    public Run() {
        onMounted(async () => {
            await this.SetDefaultTransform()
            await this.SetDefaultTarget()
            this.CreateLeafer()
            await this.SetSearchTarget()
            this.ListenEvents()
            this.GenerateSearchTimrer()
            this.FrameUpdate()
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
        await Renderer.Widget.SetAlwaysOnTop(true)
        await Renderer.Widget.Show()
    }

    private async SetDefaultTarget() {
        const ms = (await Renderer.Monitor.GetAllMonitors()).sort((a, b) => a.x - b.x)
        for (let m of ms) {
            this.target.monitor.push({
                ...m,
                url: await m.Capture(`Images/${m.id}.webp`)
            })
        }
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
            this.monitor = new MonitorFrame({
                draw: this
            })
            this.back = new BackFrame({
                draw: this,
            })
        }
    }

    private ListenEvents() {
        this.leafer.on_(L.PointerEvent.DOWN, this.OnMouseDown, this)
        this.leafer.on_(L.PointerEvent.UP, this.OnMouseUp, this)
        this.leafer.on_(L.DragEvent.DRAG, this.OnDragging, this)
        window.addEventListener('keydown', (e) => {
            this.OnKeyDown(e)
        })
        window.addEventListener('keyup', (e) => {
            this.OnKeyUp(e)
        })
    }

    private OnKeyDown(e: KeyboardEvent) {
        if (e.key == 'w' || e.key == 'W') {
            this.moveMouse.w = true
        }
        else if (e.key == 'Control') {
            this.isCtrl = true
        }
        else if (e.key == 'ArrowUp') {
            this.moveFrame.w = true
        }
        else if (e.key == 's' || e.key == 'S') {
            this.moveMouse.s = true
        }
        else if (e.key == 'ArrowDown') {
            this.moveFrame.s = true
        }
        else if (e.key == 'a' || e.key == 'A') {
            this.moveMouse.a = true
        }
        else if (e.key == 'ArrowLeft') {
            this.moveFrame.a = true
        }
        else if (e.key == 'd' || e.key == 'D') {
            this.moveMouse.d = true
        }
        else if (e.key == 'ArrowRight') {
            this.moveFrame.d = true
        }
    }

    private OnKeyUp(e: KeyboardEvent) {
        if (e.key == 'w' || e.key == 'W') {
            this.moveMouse.w = false
        }
        else if (e.key == 'Control') {
            this.isCtrl = false
        }
        else if (e.key == 'z' || e.key == 'Z') {
            if (this.isCtrl) {
                this.back.UndoDraw()
            }
        }
        else if (e.key == 'ArrowUp') {
            this.moveFrame.w = false
        }
        else if (e.key == 's' || e.key == 'S') {
            this.moveMouse.s = false
        }
        else if (e.key == 'ArrowDown') {
            this.moveFrame.s = false
        }
        else if (e.key == 'a' || e.key == 'A') {
            this.moveMouse.a = false
        }
        else if (e.key == 'ArrowLeft') {
            this.moveFrame.a = false
        }
        else if (e.key == 'd' || e.key == 'D') {
            this.moveMouse.d = false
        }
        else if (e.key == 'ArrowRight') {
            this.moveFrame.d = false
        }
        else if (e.key == 'Tab') {
            this.isShowFunc.value = !this.isShowFunc.value
        }
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
        this.func.isShow.value = true
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

    private GenerateSearchTimrer() {
        if (this.searchTargetTimer) {
            clearInterval(this.searchTargetTimer)
            this.searchTargetTimer = null
        }
        this.searchTargetTimer = setInterval(async () => {
            await this.SetSearchTarget()
        }, 100)
    }

    public async GetSearchTargetTransform() {
        const position = await Renderer.Automatic.GetMousePosition()
        for (let w of this.target.window) {
            if ((position.x > w.x && position.x < w.x + w.width) && (position.y > w.y && position.y < w.y + w.height)) {
                this.back.UpdateEraser(w.x, w.y - this.current.y, w.width, w.height)
                return {
                    x: w.x,
                    y: w.y - this.current.y,
                    width: w.width,
                    height: w.height
                }
            }
        }
        for (let m of this.target.monitor) {
            if ((position.x > m.x && position.x < m.x + m.width) && (position.y > m.y && position.y < m.y + m.height)) {
                this.back.UpdateEraser(m.x, m.y - this.current.y, m.width, m.height)
                return {
                    x: m.x,
                    y: m.y - this.current.y,
                    width: m.width,
                    height: m.height
                }
            }
        }
        const m = await Renderer.Monitor.GetCurrentMouseMonitor()
        return {
            x: m.x,
            y: m.y - this.current.y,
            width: m.width,
            height: m.height
        }
    }

    private async SetSearchTarget() {
        const t = await this.GetSearchTargetTransform()
        this.back.UpdateEraser(t.x, t.y, t.width, t.height)
    }

    public GetEraserTransform() {
        return {
            x: this.back.FE.x,
            y: this.back.FE.y,
            width: this.back.FE.width,
            height: this.back.FE.height,
        }
    }

    private FrameUpdate() {
        requestAnimationFrame(async () => {
            if (!this.isCtrl) {
                if (this.moveMouse.w || this.moveMouse.s || this.moveMouse.a || this.moveMouse.d) {
                    let deltaX = 0
                    let deltaY = 0
                    deltaX += this.moveMouse.a ? -1 : 0
                    deltaX += this.moveMouse.d ? 1 : 0
                    deltaY += this.moveMouse.w ? -1 : 0
                    deltaY += this.moveMouse.s ? 1 : 0
                    const position = await Renderer.Automatic.GetMousePosition()
                    await Renderer.Automatic.SetMousePosition(position.x + deltaX, position.y + deltaY)
                }
                if (this.moveFrame.w || this.moveFrame.s || this.moveFrame.a || this.moveFrame.d) {
                    let deltaX = 0
                    let deltaY = 0
                    deltaX += this.moveFrame.a ? -1 : 0
                    deltaX += this.moveFrame.d ? 1 : 0
                    deltaY += this.moveFrame.w ? -1 : 0
                    deltaY += this.moveFrame.s ? 1 : 0
                    const position = {
                        x: this.back.FE.x,
                        y: this.back.FE.y
                    }
                    this.back.UpdateEraser(position.x + deltaX, position.y + deltaY, this.back.FE.width, this.back.FE.height)
                }
            }
            else {
                if (this.moveMouse.w || this.moveMouse.s || this.moveMouse.a || this.moveMouse.d) {
                    let deltaX = 0
                    let deltaY = 0
                    deltaX += this.moveMouse.a ? -1 : 0
                    deltaX += this.moveMouse.d ? 1 : 0
                    deltaY += this.moveMouse.w ? -1 : 0
                    deltaY += this.moveMouse.s ? 1 : 0
                    const t = this.GetEraserTransform()
                    this.back.UpdateEraser(deltaX > 0 ? t.x : t.x + deltaX, deltaY > 0 ? t.y : t.y + deltaY, deltaX > 0 ? t.width + deltaX : t.width - deltaX, deltaY > 0 ? t.height + deltaY : t.height - deltaY)
                }
                if (this.moveFrame.w || this.moveFrame.s || this.moveFrame.a || this.moveFrame.d) {
                    let deltaX = 0
                    let deltaY = 0
                    deltaX += this.moveFrame.a ? -1 : 0
                    deltaX += this.moveFrame.d ? 1 : 0
                    deltaY += this.moveFrame.w ? -1 : 0
                    deltaY += this.moveFrame.s ? 1 : 0
                    const t = this.GetEraserTransform()
                    this.back.UpdateEraser(deltaX < 0 ? t.x : t.x + deltaX, deltaY < 0 ? t.y : t.y + deltaY, deltaX < 0 ? t.width + deltaX : t.width - deltaX, deltaY < 0 ? t.height + deltaY : t.height - deltaY)
                }
            }
            this.FrameUpdate()
        })
    }
}

export { Draw }