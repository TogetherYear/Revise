import * as L from 'leafer-ui'
import { BackFrame } from './BackFrame'

type BackCornerOptions = {
    backFrame: BackFrame,
    type: 'LeftTop' | 'LeftCenter' | 'LeftBottom' | 'CenterTop' | 'CenterBottom' | 'RightTop' | 'RightCenter' | 'RightBottom'
}

class BackCorner {
    constructor(options: BackCornerOptions) {
        this.options = options
        this.Create()
        this.ListenEvents()
    }

    private drag = {
        startX: 0,
        startY: 0,
        eraserX: 0,
        eraserY: 0,
        eraserWidth: 0,
        eraserHeight: 0,
    }

    private options!: BackCornerOptions

    private circle!: L.Ellipse

    public get O() {
        return this.options
    }

    private Create() {
        const position = this.TransformPosition()
        this.circle = new L.Ellipse({
            width: 14,
            height: 14,
            x: position.x,
            y: position.y,
            fill: '#000000ff',
            stroke: '#eeeeeeff',
            strokeWidth: 2,
            around: 'center',
            cursor: 'grab'
        })
        this.O.backFrame.F.add(this.circle)
    }

    private ListenEvents() {
        this.circle.on_(L.DragEvent.DRAG, this.OnDragging, this)
        this.circle.on_(L.DragEvent.START, this.OnDragStart, this)
        this.circle.on_(L.DragEvent.END, this.OnDragEnd, this)
    }

    private GetEraserTransformPosition(x: number, y: number) {
        return this.O.backFrame.FE.getLocalPointByInner({ x, y })
    }

    private TransformPosition() {
        if (this.O.type == 'LeftTop') {
            return this.GetEraserTransformPosition(0, 0)
        }
        else if (this.O.type == 'LeftCenter') {
            return this.GetEraserTransformPosition(0, this.O.backFrame.FE.height / 2)
        }
        else if (this.O.type == 'LeftBottom') {
            return this.GetEraserTransformPosition(0, this.O.backFrame.FE.height)
        }
        else if (this.O.type == 'CenterTop') {
            return this.GetEraserTransformPosition(this.O.backFrame.FE.width / 2, 0)
        }
        else if (this.O.type == 'CenterBottom') {
            return this.GetEraserTransformPosition(this.O.backFrame.FE.width / 2, this.O.backFrame.FE.height)
        }
        else if (this.O.type == 'RightTop') {
            return this.GetEraserTransformPosition(this.O.backFrame.FE.width, 0)
        }
        else if (this.O.type == 'RightCenter') {
            return this.GetEraserTransformPosition(this.O.backFrame.FE.width, this.O.backFrame.FE.height / 2)
        }
        else {
            return this.GetEraserTransformPosition(this.O.backFrame.FE.width, this.O.backFrame.FE.height)
        }
    }

    public UpdatePosition() {
        const position = this.TransformPosition()
        this.circle.x = position.x
        this.circle.y = position.y
    }

    public OnDragging(e: L.DragEvent) {
        e.stop()
        e.stopDefault()
        const delta = {
            x: e.x - this.drag.startX,
            y: e.y - this.drag.startY,
        }
        this.UpdateErasetTransform(delta)
        this.UpdateVisibility()
    }

    private UpdateErasetTransform(delta: { x: number, y: number }) {
        if (this.O.type == 'LeftTop') {
            this.O.backFrame.UpdateEraser(this.drag.eraserX + delta.x, this.drag.eraserY + delta.y, this.drag.eraserWidth - delta.x, this.drag.eraserHeight - delta.y)
        }
        else if (this.O.type == 'LeftCenter') {
            this.O.backFrame.UpdateEraser(this.drag.eraserX + delta.x, this.drag.eraserY, this.drag.eraserWidth - delta.x, this.drag.eraserHeight)
        }
        else if (this.O.type == 'LeftBottom') {
            this.O.backFrame.UpdateEraser(this.drag.eraserX + delta.x, this.drag.eraserY, this.drag.eraserWidth - delta.x, this.drag.eraserHeight + delta.y)
        }
        else if (this.O.type == 'CenterTop') {
            this.O.backFrame.UpdateEraser(this.drag.eraserX, this.drag.eraserY + delta.y, this.drag.eraserWidth, this.drag.eraserHeight - delta.y)
        }
        else if (this.O.type == 'CenterBottom') {
            this.O.backFrame.UpdateEraser(this.drag.eraserX, this.drag.eraserY, this.drag.eraserWidth, this.drag.eraserHeight + delta.y)
        }
        else if (this.O.type == 'RightTop') {
            this.O.backFrame.UpdateEraser(this.drag.eraserX, this.drag.eraserY + delta.y, this.drag.eraserWidth + delta.x, this.drag.eraserHeight - delta.y)
        }
        else if (this.O.type == 'RightCenter') {
            this.O.backFrame.UpdateEraser(this.drag.eraserX, this.drag.eraserY, this.drag.eraserWidth + delta.x, this.drag.eraserHeight)
        }
        else {
            this.O.backFrame.UpdateEraser(this.drag.eraserX, this.drag.eraserY, this.drag.eraserWidth + delta.x, this.drag.eraserHeight + delta.y)
        }
    }

    private UpdateVisibility() {
        if (this.O.backFrame.FE.width < 300 || this.O.backFrame.FE.height < 300) {
            this.O.backFrame.UpdateCornerVisible(false)
        }
        else {
            this.O.backFrame.UpdateCornerVisible(true)
        }
    }

    public Hide() {
        this.circle.visible = false
    }

    public Show() {
        this.circle.visible = true
    }

    public OnDragStart(e: L.DragEvent) {
        e.stop()
        e.stopDefault()
        this.drag.startX = e.x
        this.drag.startY = e.y
        this.drag.eraserX = this.O.backFrame.FE.x
        this.drag.eraserY = this.O.backFrame.FE.y
        this.drag.eraserWidth = this.O.backFrame.FE.width
        this.drag.eraserHeight = this.O.backFrame.FE.height
        this.O.backFrame.UpdateCornerVisible(true)
    }

    public OnDragEnd(e: L.DragEvent) {
        e.stop()
        e.stopDefault()
        this.O.backFrame.UpdateCornerVisible(true)
    }
}

export { BackCorner }