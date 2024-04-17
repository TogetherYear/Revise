import { OperateType } from "../../../Type";
import { Entity } from "./Entity";
import * as L from 'leafer-ui'

class Image extends Entity {
    constructor(options: OperateType.IImage) {
        super(options)
        this.Create()
        this.ListenEvents()
    }

    declare protected root: L.Image

    private effect = false

    private dragStartOrigin = {
        frameX: 0,
        frameY: 0,
        dragX: 0,
        dragY: 0
    }

    protected get O() {
        return this.options as OperateType.IImage
    }

    public override Create() {
        super.Create()
        this.root = new L.Image({
            url: this.O.url,
            x: this.O.x || 0,
            y: this.O.y || 0,
        })
        this.root.once(L.ImageEvent.LOADED, (e: L.Image) => {
            this.O.OnLoad && this.O.OnLoad({ width: e.image.width, height: e.image.height })
        })
        this.root.once(L.ImageEvent.ERROR, () => {
            this.O.OnError && this.O.OnError()
        })
    }

    public override ListenEvents() {
        super.ListenEvents()
    }

    public override OnDragging(e: L.DragEvent): void {
        if (this.effect) {
            this.O.frame.OnDragging(e)
        }
        else {
            super.OnDragging(e)
            this.root.x = this.dragStartOrigin.frameX + (e.x - this.dragStartOrigin.dragX) / (this.O.area.leafer.scale as number)
            this.root.y = this.dragStartOrigin.frameY + (e.y - this.dragStartOrigin.dragY) / (this.O.area.leafer.scale as number)
        }

    }

    public override OnDragStart(e: L.DragEvent) {
        if (this.effect) {
            this.O.frame.OnDragStart(e)
        }
        else {
            super.OnDragStart(e)
            this.dragStartOrigin.frameX = this.root.x
            this.dragStartOrigin.frameY = this.root.y
            this.dragStartOrigin.dragX = e.x
            this.dragStartOrigin.dragY = e.y
        }
    }

    public override OnPointerEnter(e: L.PointerEvent) {

    }

    public override OnPointerLeave(e: L.PointerEvent) {

    }

    public override OnKeyDown(e: L.KeyEvent) {
        if (e.key == 'Control') {
            this.effect = true
        }
    }

    public override OnKeyUp(e: L.KeyEvent) {
        if (e.key == 'Control') {
            this.effect = false
        }
    }
}

export { Image }