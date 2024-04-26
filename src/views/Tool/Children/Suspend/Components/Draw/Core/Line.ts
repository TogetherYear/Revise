import { Mathf } from "@/libs/Mathf"
import { SuspendType } from "../../../Type"
import { Entity } from "./Entity"
import * as L from 'leafer-ui'

class Line extends Entity {
    constructor(options: SuspendType.IDrawLine) {
        super(options)
        this.Create()
    }

    private body!: L.Line

    public get O() {
        return this.options as SuspendType.IDrawLine
    }

    public override Create() {
        this.body = new L.Line({
            points: [this.O.startX, this.O.startY],
            strokeWidth: 3,
            stroke: '#22b14c',
            zIndex: 150,
        })
        this.O.back.F.add(this.body)
    }

    public override OnDrawing(e: L.DragEvent) {
        this.body.points = [this.O.startX, this.O.startY, e.x, e.y]
    }

    public override OnDrawEnd(e: L.DragEvent) {
        this.O.back.currentDraw = null
    }

    public override Destroy() {
        this.O.back.F.remove(this.body)
    }
}

export { Line }