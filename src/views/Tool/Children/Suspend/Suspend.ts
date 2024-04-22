import { onMounted, onUnmounted, ref } from "vue"
import * as L from 'leafer-ui'
import { BackFrame } from "./Core/BackFrame"

class Suspend {
    public constructor() {

    }

    private isSearchMonitor = true

    private searchMonitorTimer: NodeJS.Timeout | null = null

    private current!: {
        x: number,
        y: number,
        width: number,
        height: number
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
    }

    private async OnMouseDown(e: L.PointerEvent) {
        if (this.isSearchMonitor && this.searchMonitorTimer) {
            clearInterval(this.searchMonitorTimer)
            this.searchMonitorTimer = null
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