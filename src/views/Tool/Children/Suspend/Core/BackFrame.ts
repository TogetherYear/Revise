import * as L from 'leafer-ui'
import { Suspend } from '../Suspend'
import { BackCorner } from './BackCorner'
import { Mathf } from '@/libs/Mathf'

type BackFrameOptions = {
    suspend: Suspend,
}

class BackFrame {
    constructor(options: BackFrameOptions) {
        this.options = options
        this.Create()
        this.CreateRect()
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

    private Create() {
        this.frame = new L.Frame({
            x: 0,
            y: 0,
            width: this.O.suspend.L.width,
            height: this.O.suspend.L.height,
            fill: "transparent",
            overflow: 'show'
        })
        this.O.suspend.L.add(this.frame)
    }

    private CreateRect() {
        this.frameBack = new L.Rect({
            x: 0,
            y: 0,
            width: this.frame.width,
            height: this.frame.height,
            fill: 'rgba(0,0,0,0.4)',
        })
        this.frameEraser = new L.Rect({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            eraser: true,
            fill: 'black'
        })
        this.frame.add(this.frameBack)
        this.frame.add(this.frameEraser)
    }

    private ListenEvents() {
        this.frameEraser.on_(L.DragEvent.DRAG, this.OnDragging, this)
        this.frameEraser.on_(L.DragEvent.START, this.OnDragStart, this)
        this.frameEraser.on_(L.DragEvent.END, this.OnDragEnd, this)
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
        if (this.FE.width < 300 || this.FE.height < 300) {
            this.UpdateCornerVisible(false)
        }
        else {
            this.UpdateCornerVisible(true)
        }
    }

    public OnDragging(e: L.DragEvent) {
        if (this.O.suspend.isFirstDown) {

        }
        else {
            e.stop()
            e.stopDefault()
            const delta = {
                x: e.x - this.drag.startX,
                y: e.y - this.drag.startY,
            }
            this.UpdateEraser(this.drag.eraserX + delta.x, this.drag.eraserY + delta.y, this.drag.eraserWidth, this.drag.eraserHeight)
        }
    }

    public OnDragStart(e: L.DragEvent) {
        if (this.O.suspend.isFirstDown) {

        }
        else {
            e.stop()
            e.stopDefault()
            this.drag.startX = e.x
            this.drag.startY = e.y
            this.drag.eraserX = this.FE.x
            this.drag.eraserY = this.FE.y
            this.drag.eraserWidth = this.FE.width
            this.drag.eraserHeight = this.FE.height
            this.UpdateCornerVisible(true)
        }
    }

    public OnDragEnd(e: L.DragEvent) {
        if (this.O.suspend.isFirstDown) {

        }
        else {
            e.stop()
            e.stopDefault()
            this.UpdateCornerVisible(true)
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
}

export { BackFrame }