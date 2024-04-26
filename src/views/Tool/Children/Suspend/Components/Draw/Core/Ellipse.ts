import { Mathf } from "@/libs/Mathf"
import { SuspendType } from "../../../Type"
import { Entity } from "./Entity"
import * as L from 'leafer-ui'

class Ellipse extends Entity {
    constructor(options: SuspendType.IDrawEllipse) {
        super(options)
        this.Create()
    }

    private body!: L.Ellipse

    public get O() {
        return this.options as SuspendType.IDrawEllipse
    }

    public override Create() {
        this.body = new L.Ellipse({
            x: this.O.startX,
            y: this.O.startY,
            stroke: '#22b14c',
            strokeWidth: 3,
            width: 0,
            height: 0,
            zIndex: 150
        })
        this.O.back.F.add(this.body)
    }

    public override OnDrawing(e: L.DragEvent) {
        const delta = {
            width: e.x - this.O.startX,
            height: e.y - this.O.startY,
        }
        this.body.width = Mathf.Clamp(0, Number.MAX_SAFE_INTEGER, delta.width)
        this.body.height = Mathf.Clamp(0, Number.MAX_SAFE_INTEGER, delta.height)
    }

    public override OnDrawEnd(e: L.DragEvent) {
        this.O.back.currentDraw = null
    }

    public override Destroy() {
        this.O.back.F.remove(this.body)
    }
}

export { Ellipse }