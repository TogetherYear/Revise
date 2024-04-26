import { SuspendType } from "../../../Type"
import { Entity } from "./Entity"
import * as L from 'leafer-ui'

class Path extends Entity {
    constructor(options: SuspendType.IDrawPath) {
        super(options)
        this.Create()
    }

    private body!: L.Line

    public get O() {
        return this.options as SuspendType.IDrawPath
    }

    public override Create() {
        this.body = new L.Line({
            points: [this.O.startX, this.O.startY],
            strokeWidth: 3,
            stroke: '#22b14c',
            zIndex: 150,
            curve: true
        })
        this.O.back.F.add(this.body)
    }

    public override OnDrawing(e: L.DragEvent) {
        this.body.points = this.body.points.concat(e.x, e.y)
    }

    public override OnDrawEnd(e: L.DragEvent) {
        this.O.back.currentDraw = null
        this.OptimizePoints()
    }

    private OptimizePoints() {
        const result: Array<number> = []
        const points: Array<{ x: number, y: number }> = []
        for (let i = 0; i < this.body.points.length; i += 2) {
            points.push({ x: this.body.points[i], y: this.body.points[i + 1] })
        }
        result.push(points[0].x, points[0].y)
        let current = points[0]
        for (let i = 1; i < points.length - 1; i++) {
            if (Math.pow(points[i].x - current.x, 2) + Math.pow(points[i].y - current.y, 2) > 4) {
                result.push(points[i].x, points[i].y)
                current = points[i]
            }
        }
        result.push(...this.body.points.slice(-2))
        this.body.points = result
    }

    public override Destroy() {
        this.O.back.F.remove(this.body)
    }
}

export { Path }