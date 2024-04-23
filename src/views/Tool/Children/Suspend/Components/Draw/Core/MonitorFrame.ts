import { Draw } from "../Draw"
import * as L from 'leafer-ui'

type MonitorFrameOptions = {
    draw: Draw,
}

class MonitorFrame {
    constructor(options: MonitorFrameOptions) {
        this.options = options
        this.Create()
        this.CreateMonitors()
    }

    private options!: MonitorFrameOptions

    public get O() {
        return this.options
    }

    private frame!: L.Frame

    public get F() {
        return this.frame
    }

    private monitors: Array<L.Image> = []

    private Create() {
        this.frame = new L.Frame({
            x: 0,
            y: 0,
            width: this.O.draw.L.width,
            height: this.O.draw.L.height,
            fill: "transparent",
            overflow: 'show',
            cursor: 'crosshair'
        })
        this.O.draw.L.add(this.frame)
    }

    private CreateMonitors() {
        for (let m of this.O.draw.target.monitor) {
            const monitor = new L.Image({
                url: m.url,
                width: m.width,
                height: m.height,
                x: m.x,
                y: m.y - this.O.draw.current.y
            })
            this.frame.add(monitor)
            this.monitors.push(monitor)
        }
    }
}

export { MonitorFrame }