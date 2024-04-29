import * as L from 'leafer-ui'
import { BackCorner } from './BackCorner'
import { Mathf } from '@/libs/Mathf'
import { BackEdge } from './BackEdge'
import { Draw } from '../Draw'
import { SuspendType } from '../../../Type'
import { Rect } from './Rect'
import { Ellipse } from './Ellipse'
import { Path } from './Path'
import { Line } from './Line'
import { Entity } from './Entity'

type BackFrameOptions = {
    draw: Draw,
}

class BackFrame {
    constructor(options: BackFrameOptions) {
        this.options = options
        this.Create()
        this.CreateRect()
        this.CreateEdge()
        this.CreateCorner()
        this.ListenEvents()
    }

    private options!: BackFrameOptions

    public get O() {
        return this.options
    }

    private frame!: L.Frame

    public get F() {
        return this.frame
    }

    private frameBack!: L.Rect

    private frameEraser!: L.Rect

    private drag = {
        startX: 0,
        startY: 0,
        eraserX: 0,
        eraserY: 0,
        eraserWidth: 0,
        eraserHeight: 0,
    }

    public get FE() {
        return this.frameEraser
    }

    private corners: {
        leftTop: BackCorner | null,
        leftCenter: BackCorner | null,
        leftBottom: BackCorner | null,
        centerTop: BackCorner | null,
        centerBottom: BackCorner | null,
        rightTop: BackCorner | null,
        rightCenter: BackCorner | null,
        rightBottom: BackCorner | null,
    } = {
            leftTop: null,
            leftCenter: null,
            leftBottom: null,
            centerTop: null,
            centerBottom: null,
            rightTop: null,
            rightCenter: null,
            rightBottom: null,
        }

    private edges: {
        left: BackEdge | null,
        right: BackEdge | null,
        top: BackEdge | null,
        bottom: BackEdge | null,
    } = {
            left: null,
            right: null,
            top: null,
            bottom: null,
        }

    public currentDraw: Entity | null = null

    public hasDraws: Array<Entity> = []

    private areaDirection = SuspendType.AreaDirection.None

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

    private CreateRect() {
        this.frameBack = new L.Rect({
            x: 0,
            y: 0,
            width: this.frame.width,
            height: this.frame.height,
            fill: 'rgba(0,0,0,0.5)',
            zIndex: 0,
        })
        this.frameEraser = new L.Rect({
            x: 0,
            y: 0,
            width: this.frame.width,
            height: this.frame.height,
            eraser: true,
            fill: 'black',
            zIndex: 100
        })
        this.frame.add(this.frameBack)
        this.frame.add(this.frameEraser)
    }

    private ListenEvents() {
        this.frameBack.on_(L.DragEvent.DRAG, this.OnAreaDragging, this)
        this.frameBack.on_(L.DragEvent.START, this.OnAreaDragStart, this)
        this.frameBack.on_(L.DragEvent.END, this.OnAreaDragEnd, this)
        this.frameEraser.on_(L.DragEvent.DRAG, this.OnDragging, this)
        this.frameEraser.on_(L.DragEvent.START, this.OnDragStart, this)
        this.frameEraser.on_(L.DragEvent.END, this.OnDragEnd, this)
        this.frameBack.on_(L.PointerEvent.MOVE, this.OnMove, this)
    }

    private CreateEdge() {
        this.edges.left = new BackEdge({
            backFrame: this,
            type: 'Left'
        })
        this.edges.right = new BackEdge({
            backFrame: this,
            type: 'Right'
        })
        this.edges.top = new BackEdge({
            backFrame: this,
            type: 'Top'
        })
        this.edges.bottom = new BackEdge({
            backFrame: this,
            type: 'Bottom'
        })
    }

    private CreateCorner() {
        this.corners.leftTop = new BackCorner({
            backFrame: this,
            type: 'LeftTop'
        })
        this.corners.leftCenter = new BackCorner({
            backFrame: this,
            type: 'LeftCenter'
        })
        this.corners.leftBottom = new BackCorner({
            backFrame: this,
            type: 'LeftBottom'
        })
        this.corners.centerTop = new BackCorner({
            backFrame: this,
            type: 'CenterTop'
        })
        this.corners.centerBottom = new BackCorner({
            backFrame: this,
            type: 'CenterBottom'
        })
        this.corners.rightTop = new BackCorner({
            backFrame: this,
            type: 'RightTop'
        })
        this.corners.rightCenter = new BackCorner({
            backFrame: this,
            type: 'RightCenter'
        })
        this.corners.rightBottom = new BackCorner({
            backFrame: this,
            type: 'RightBottom'
        })
    }

    public UpdateEraser(x: number, y: number, width: number, height: number) {
        this.frameEraser.x = Mathf.Clamp(0, this.F.width - this.FE.width, x)
        this.frameEraser.y = Mathf.Clamp(0, this.F.height - this.FE.height, y)
        this.frameEraser.width = Mathf.Clamp(0, this.F.width - this.frameEraser.x, width)
        this.frameEraser.height = Mathf.Clamp(0, this.F.height - this.frameEraser.y, height)
        this.corners.leftTop?.UpdatePosition()
        this.corners.leftCenter?.UpdatePosition()
        this.corners.leftBottom?.UpdatePosition()
        this.corners.centerTop?.UpdatePosition()
        this.corners.centerBottom?.UpdatePosition()
        this.corners.rightTop?.UpdatePosition()
        this.corners.rightCenter?.UpdatePosition()
        this.corners.rightBottom?.UpdatePosition()
        this.edges.left?.UpdatePosition()
        this.edges.right?.UpdatePosition()
        this.edges.top?.UpdatePosition()
        this.edges.bottom?.UpdatePosition()
        this.O.draw.func.UpdateTransform()
        this.O.draw.tooltip.UpdateSizeTransform()
        if (this.FE.width < 300 || this.FE.height < 300) {
            this.UpdateCornerVisible(false)
        }
        else {
            this.UpdateCornerVisible(true)
        }
    }

    private OnDragging(e: L.DragEvent) {
        if (this.O.draw.isFirstDown) {

        }
        else {
            e.stop()
            e.stopDefault()
            if (this.O.draw.func.currentDrawType.value == SuspendType.DrawType.None) {
                const delta = {
                    x: e.x - this.drag.startX,
                    y: e.y - this.drag.startY,
                }
                this.UpdateEraser(this.drag.eraserX + delta.x, this.drag.eraserY + delta.y, this.drag.eraserWidth, this.drag.eraserHeight)
            }
            else {
                this.OnDrawDragging(e)
            }
        }
    }

    private OnDragStart(e: L.DragEvent) {
        if (this.O.draw.isFirstDown) {

        }
        else {
            e.stop()
            e.stopDefault()
            if (this.O.draw.func.currentDrawType.value == SuspendType.DrawType.None) {
                this.drag.startX = e.x
                this.drag.startY = e.y
                this.drag.eraserX = this.FE.x
                this.drag.eraserY = this.FE.y
                this.drag.eraserWidth = this.FE.width
                this.drag.eraserHeight = this.FE.height
            }
            else {
                this.OnDrawDragStart(e)
            }
        }
    }

    private OnDragEnd(e: L.DragEvent) {
        if (this.O.draw.isFirstDown) {

        }
        else {
            e.stop()
            e.stopDefault()
            if (this.O.draw.func.currentDrawType.value == SuspendType.DrawType.None) {

            }
            else {
                this.OnDrawDragEnd(e)
            }
        }
    }

    public OnMove(e: L.PointerEvent) {
        if (e.x < this.FE.x) {
            if (e.y < this.FE.y) {
                this.frameBack.cursor = 'nw-resize'
            }
            else if (e.y > this.FE.y + this.FE.height) {
                this.frameBack.cursor = 'sw-resize'
            }
            else {
                this.frameBack.cursor = 'w-resize'
            }
        }
        else if (e.x > this.FE.x + this.FE.width) {
            if (e.y < this.FE.y) {
                this.frameBack.cursor = 'ne-resize'
            }
            else if (e.y > this.FE.y + this.FE.height) {
                this.frameBack.cursor = 'se-resize'
            }
            else {
                this.frameBack.cursor = 'e-resize'
            }
        }
        else {
            if (e.y < this.FE.y) {
                this.frameBack.cursor = 'n-resize'
            }
            else if (e.y > this.FE.y + this.FE.height) {
                this.frameBack.cursor = 's-resize'
            }
            else {
                this.frameBack.cursor = 'default'
            }
        }
    }

    private OnAreaDragging(e: L.DragEvent) {
        e.stop()
        e.stopDefault()
        const delta = {
            x: e.x - this.drag.startX,
            y: e.y - this.drag.startY,
        }
        if (this.areaDirection == SuspendType.AreaDirection.LeftTop) {
            const width = this.drag.eraserX - this.drag.startX + this.drag.eraserWidth - delta.x
            const height = this.drag.eraserY - this.drag.startY + this.drag.eraserHeight - delta.y
            if (e.x < this.drag.eraserX + this.drag.eraserWidth && e.y < this.drag.eraserY + this.drag.eraserHeight) {
                this.UpdateEraser(e.x, e.y, width, height)
            }
            else {
                this.UpdateEraser(this.drag.eraserX + this.drag.eraserWidth, this.drag.eraserY + this.drag.eraserHeight, 0, 0)
            }
        }
        else if (this.areaDirection == SuspendType.AreaDirection.LeftCenter) {
            const width = this.drag.eraserX - this.drag.startX + this.drag.eraserWidth - delta.x
            if (e.x < this.drag.eraserX + this.drag.eraserWidth) {
                this.UpdateEraser(e.x, this.drag.eraserY, width, this.drag.eraserHeight)
            }
            else {
                this.UpdateEraser(this.drag.eraserX + this.drag.eraserWidth, this.drag.eraserY, 0, this.drag.eraserHeight)
            }
        }
        else if (this.areaDirection == SuspendType.AreaDirection.LeftBottom) {
            const width = this.drag.eraserX - this.drag.startX + this.drag.eraserWidth - delta.x
            const height = e.y - this.drag.eraserY
            if (e.x < this.drag.eraserX + this.drag.eraserWidth) {
                this.UpdateEraser(e.x, this.drag.eraserY, width, height)
            }
            else {
                this.UpdateEraser(this.drag.eraserX + this.drag.eraserWidth, this.drag.eraserY, 0, 0)
            }
        }
        else if (this.areaDirection == SuspendType.AreaDirection.CenterTop) {
            const height = this.drag.eraserY - e.y + this.drag.eraserHeight
            if (e.y < this.drag.eraserY + this.drag.eraserHeight) {
                this.UpdateEraser(this.drag.eraserX, e.y, this.drag.eraserWidth, height)
            }
            else {
                this.UpdateEraser(this.drag.eraserX, this.drag.eraserY + this.drag.eraserHeight, this.drag.eraserWidth, 0)
            }
        }
        else if (this.areaDirection == SuspendType.AreaDirection.CenterBottom) {
            const height = e.y - this.drag.eraserY
            this.UpdateEraser(this.drag.eraserX, this.drag.eraserY, this.drag.eraserWidth, height)
        }
        else if (this.areaDirection == SuspendType.AreaDirection.RightTop) {
            const width = e.x - this.drag.eraserX
            const height = this.drag.eraserY - this.drag.startY + this.drag.eraserHeight - delta.y
            if (e.y < this.drag.eraserY + this.drag.eraserHeight) {
                this.UpdateEraser(this.drag.eraserX, e.y, width, height)
            }
            else {
                this.UpdateEraser(this.drag.eraserX, this.drag.eraserY + this.drag.eraserHeight, 0, 0)
            }
        }
        else if (this.areaDirection == SuspendType.AreaDirection.RightCenter) {
            const width = e.x - this.drag.eraserX
            this.UpdateEraser(this.drag.eraserX, this.drag.eraserY, width, this.drag.eraserHeight)
        }
        else if (this.areaDirection == SuspendType.AreaDirection.RightBottom) {
            const width = e.x - this.drag.eraserX
            const height = e.y - this.drag.eraserY
            this.UpdateEraser(this.drag.eraserX, this.drag.eraserY, width, height)
        }
    }

    private OnAreaDragStart(e: L.DragEvent) {
        e.stop()
        e.stopDefault()
        this.CalculateAreaDirection(e)
        this.drag.startX = e.x
        this.drag.startY = e.y
        this.drag.eraserX = this.FE.x
        this.drag.eraserY = this.FE.y
        this.drag.eraserWidth = this.FE.width
        this.drag.eraserHeight = this.FE.height
    }

    private OnAreaDragEnd(e: L.DragEvent) {
        e.stop()
        e.stopDefault()
        this.areaDirection = SuspendType.AreaDirection.None
    }

    private CalculateAreaDirection(e: L.DragEvent) {
        if (e.x < this.FE.x) {
            if (e.y < this.FE.y) {
                this.areaDirection = SuspendType.AreaDirection.LeftTop
            }
            else if (e.y > this.FE.y + this.FE.height) {
                this.areaDirection = SuspendType.AreaDirection.LeftBottom
            }
            else {
                this.areaDirection = SuspendType.AreaDirection.LeftCenter
            }
        }
        else if (e.x > this.FE.x + this.FE.width) {
            if (e.y < this.FE.y) {
                this.areaDirection = SuspendType.AreaDirection.RightTop
            }
            else if (e.y > this.FE.y + this.FE.height) {
                this.areaDirection = SuspendType.AreaDirection.RightBottom
            }
            else {
                this.areaDirection = SuspendType.AreaDirection.RightCenter
            }
        }
        else {
            if (e.y < this.FE.y) {
                this.areaDirection = SuspendType.AreaDirection.CenterTop
            }
            else if (e.y > this.FE.y + this.FE.height) {
                this.areaDirection = SuspendType.AreaDirection.CenterBottom
            }
            else {
                this.areaDirection = SuspendType.AreaDirection.None
            }
        }
    }

    public UpdateCornerVisible(show: boolean) {
        if (show) {
            this.corners.leftTop?.Show()
            this.corners.leftCenter?.Show()
            this.corners.leftBottom?.Show()
            this.corners.centerTop?.Show()
            this.corners.centerBottom?.Show()
            this.corners.rightTop?.Show()
            this.corners.rightCenter?.Show()
            this.corners.rightBottom?.Show()
        }
        else {
            this.corners.leftTop?.Hide()
            this.corners.leftCenter?.Hide()
            this.corners.leftBottom?.Hide()
            this.corners.centerTop?.Hide()
            this.corners.centerBottom?.Hide()
            this.corners.rightTop?.Hide()
            this.corners.rightCenter?.Hide()
            this.corners.rightBottom?.Hide()
        }
    }

    public UndoDraw() {
        if (this.hasDraws.length != 0) {
            this.hasDraws[this.hasDraws.length - 1].Destroy()
            this.hasDraws.splice(this.hasDraws.length - 1, 1)
        }
    }

    private OnDrawDragStart(e: L.DragEvent) {
        if (this.O.draw.func.currentDrawType.value == SuspendType.DrawType.Rect) {
            this.currentDraw = new Rect({
                startX: e.x,
                startY: e.y,
                back: this,
            })
            this.hasDraws.push(this.currentDraw)
        }
        else if (this.O.draw.func.currentDrawType.value == SuspendType.DrawType.Ellipse) {
            this.currentDraw = new Ellipse({
                startX: e.x,
                startY: e.y,
                back: this,
            })
            this.hasDraws.push(this.currentDraw)
        }
        else if (this.O.draw.func.currentDrawType.value == SuspendType.DrawType.Path) {
            this.currentDraw = new Path({
                startX: e.x,
                startY: e.y,
                back: this,
            })
            this.hasDraws.push(this.currentDraw)
        }
        else if (this.O.draw.func.currentDrawType.value == SuspendType.DrawType.Line) {
            this.currentDraw = new Line({
                startX: e.x,
                startY: e.y,
                back: this,
            })
            this.hasDraws.push(this.currentDraw)
        }
    }

    private OnDrawDragging(e: L.DragEvent) {
        if (this.currentDraw) {
            this.currentDraw.OnDrawing(e)
        }
    }

    private OnDrawDragEnd(e: L.DragEvent) {
        if (this.currentDraw) {
            this.currentDraw.OnDrawEnd(e)
        }
    }
}

export { BackFrame }