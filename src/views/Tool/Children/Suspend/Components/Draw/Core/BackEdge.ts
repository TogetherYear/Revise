import * as L from 'leafer-ui'
import { BackFrame } from './BackFrame'
import { Mathf } from '@/libs/Mathf'

type BackEdgeOptions = {
    backFrame: BackFrame,
    type: "Top" | "Left" | "Bottom" | "Right"
}

class BackEdge {
    constructor(options: BackEdgeOptions) {
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

    private options!: BackEdgeOptions

    private rect!: L.Rect

    public get O() {
        return this.options
    }

    private Create() {
        const t = this.TransformPosition()
        this.rect = new L.Rect({
            around: 'center',
            x: t.position.x,
            y: t.position.y,
            width: t.size.width,
            height: t.size.height,
            fill: '#30aaaaff',
            zIndex: 200,
            cursor: this.TransformCursor()
        })
        this.O.backFrame.F.add(this.rect)
    }

    private ListenEvents() {
        this.rect.on_(L.DragEvent.DRAG, this.OnDragging, this)
        this.rect.on_(L.DragEvent.START, this.OnDragStart, this)
        this.rect.on_(L.DragEvent.END, this.OnDragEnd, this)
        this.rect.on_(L.PointerEvent.ENTER, this.OnEnter, this)
        this.rect.on_(L.PointerEvent.LEAVE, this.OnLeave, this)
    }

    private OnEnter(e: L.PointerEvent) {
        e.stop()
        e.stopDefault()
    }

    private OnLeave(e: L.PointerEvent) {
        e.stop()
        e.stopDefault()
    }

    private GetEraserTransformPosition(x: number, y: number) {
        return this.O.backFrame.FE.getLocalPointByInner({ x, y })
    }

    private TransformPosition() {
        if (this.O.type == 'Left') {
            return {
                size: { width: 2, height: this.O.backFrame.FE.height + 4 },
                position: this.GetEraserTransformPosition(-1, this.O.backFrame.FE.height / 2)
            }
        }
        else if (this.O.type == 'Top') {
            return {
                size: { width: this.O.backFrame.FE.width, height: 2 },
                position: this.GetEraserTransformPosition(this.O.backFrame.FE.width / 2, -1)
            }
        }
        else if (this.O.type == 'Bottom') {
            return {
                size: { width: this.O.backFrame.FE.width, height: 2 },
                position: this.GetEraserTransformPosition(this.O.backFrame.FE.width / 2, this.O.backFrame.FE.height + 1)
            }
        }
        else {
            return {
                size: { width: 2, height: this.O.backFrame.FE.height + 4 },
                position: this.GetEraserTransformPosition(this.O.backFrame.FE.width + 1, this.O.backFrame.FE.height / 2)
            }
        }
    }

    private TransformCursor() {
        if (this.O.type == 'Left') {
            return 'w-resize'
        }
        else if (this.O.type == 'Top') {
            return 'n-resize'
        }
        else if (this.O.type == 'Bottom') {
            return 's-resize'
        }
        else {
            return 'e-resize'
        }
    }

    public UpdatePosition() {
        const t = this.TransformPosition()
        this.rect.x = t.position.x
        this.rect.y = t.position.y
        this.rect.width = t.size.width
        this.rect.height = t.size.height
    }

    public OnDragging(e: L.DragEvent) {
        e.stop()
        e.stopDefault()
        const delta = {
            x: e.x - this.drag.startX,
            y: e.y - this.drag.startY,
        }
        this.UpdateErasetTransform(delta)
    }

    private UpdateErasetTransform(delta: { x: number, y: number }) {
        if (this.O.type == 'Left') {
            this.O.backFrame.UpdateEraser(Mathf.Clamp(0, this.drag.eraserX + this.drag.eraserWidth, this.drag.eraserX + delta.x), this.drag.eraserY, this.drag.eraserWidth - delta.x, this.drag.eraserHeight)
        }
        else if (this.O.type == 'Top') {
            this.O.backFrame.UpdateEraser(this.drag.eraserX, Mathf.Clamp(0, this.drag.eraserY + this.drag.eraserHeight, this.drag.eraserY + delta.y), this.drag.eraserWidth, this.drag.eraserHeight - delta.y)
        }
        else if (this.O.type == 'Right') {
            this.O.backFrame.UpdateEraser(this.drag.eraserX, this.drag.eraserY, this.drag.eraserWidth + delta.x, this.drag.eraserHeight)
        }
        else {
            this.O.backFrame.UpdateEraser(this.drag.eraserX, this.drag.eraserY, this.drag.eraserWidth, this.drag.eraserHeight + delta.y)
        }
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
    }

    public OnDragEnd(e: L.DragEvent) {
        e.stop()
        e.stopDefault()
    }
}

export { BackEdge }