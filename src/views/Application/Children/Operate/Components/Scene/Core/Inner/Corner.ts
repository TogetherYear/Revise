import { OperateType } from "../../../../Type";
import { Entity } from "../Base/Entity";
import * as L from 'leafer-ui'
import cornerIcon from '@/assets/images/corner.png'
import { Mathf } from "@/libs/Mathf";

class Corner extends Entity {
    constructor(options: OperateType.ICorner) {
        super(options)
        this.Create()
        this.ListenEvents()
    }

    declare protected root: L.Image

    protected get O() {
        return this.options as OperateType.ICorner
    }

    private dragDelta = {
        originX: 0,
        originY: 0,
        originWidth: 0,
        originHeight: 0,
        dragX: 0,
        dragY: 0
    }

    public Create() {
        super.Create()
        const t = this.GetCornerTransform()
        this.root = new L.Image({
            url: cornerIcon,
            rotation: t.rotation,
            x: t.x,
            y: t.y,
            around: 'center',
            cursor: 'grab'
        })
        this.O.frame.R.add(this.root)
    }

    public override ListenEvents() {
        super.ListenEvents()
    }

    private GetCornerTransform() {
        if (this.O.type == OperateType.CornerType.LT) {
            return {
                rotation: 180,
                x: 8,
                y: 8
            }
        }
        else if (this.O.type == OperateType.CornerType.RT) {
            return {
                rotation: -90,
                x: this.O.frame.R.width - 8,
                y: 8
            }
        }
        else if (this.O.type == OperateType.CornerType.LB) {
            return {
                rotation: 90,
                x: 8,
                y: this.O.frame.R.height - 8
            }
        }
        else {
            return {
                rotation: 0,
                x: this.O.frame.R.width - 8,
                y: this.O.frame.R.height - 8
            }
        }
    }

    public Show() {
        super.Show()
        this.R.opacity = 1
    }

    public Hide() {
        super.Hide()
        this.R.opacity = 0
    }

    public OnPointerDown(e: L.PointerEvent): void {
        super.OnPointerDown(e)
        this.root.cursor = 'grabbing'
    }

    public override OnDragStart(e: L.DragEvent): void {
        super.OnDragStart(e)
        this.dragDelta.originX = this.O.frame.R.x
        this.dragDelta.originY = this.O.frame.R.y
        this.dragDelta.dragX = e.x
        this.dragDelta.dragY = e.y
        this.dragDelta.originWidth = this.O.frame.R.width
        this.dragDelta.originHeight = this.O.frame.R.height
    }

    public override OnDragging(e: L.DragEvent) {
        super.OnDragging(e)
        if (this.O.type == OperateType.CornerType.LT) {
            this.O.frame.R.x = Mathf.Clamp(-Number.MAX_SAFE_INTEGER, this.dragDelta.originX + this.dragDelta.originWidth - 32, this.dragDelta.originX + (e.x - this.dragDelta.dragX) / (this.O.scene.leafer.scale as number))
            this.O.frame.R.width = Mathf.Clamp(32, Number.MAX_SAFE_INTEGER, this.dragDelta.originWidth - (e.x - this.dragDelta.dragX) / (this.O.scene.leafer.scale as number))
            this.O.frame.R.y = Mathf.Clamp(-Number.MAX_SAFE_INTEGER, this.dragDelta.originY + this.dragDelta.originHeight - 32, this.dragDelta.originY + (e.y - this.dragDelta.dragY) / (this.O.scene.leafer.scale as number))
            this.O.frame.R.height = Mathf.Clamp(32, Number.MAX_SAFE_INTEGER, this.dragDelta.originHeight - (e.y - this.dragDelta.dragY) / (this.O.scene.leafer.scale as number))
        }
        else if (this.O.type == OperateType.CornerType.LB) {
            this.O.frame.R.x = Mathf.Clamp(-Number.MAX_SAFE_INTEGER, this.dragDelta.originX + this.dragDelta.originWidth - 32, this.dragDelta.originX + (e.x - this.dragDelta.dragX) / (this.O.scene.leafer.scale as number))
            this.O.frame.R.width = Mathf.Clamp(32, Number.MAX_SAFE_INTEGER, this.dragDelta.originWidth - (e.x - this.dragDelta.dragX) / (this.O.scene.leafer.scale as number))
            this.O.frame.R.height = Mathf.Clamp(32, Number.MAX_SAFE_INTEGER, this.dragDelta.originHeight + (e.y - this.dragDelta.dragY) / (this.O.scene.leafer.scale as number))
        }
        else if (this.O.type == OperateType.CornerType.RT) {
            this.O.frame.R.width = Mathf.Clamp(32, Number.MAX_SAFE_INTEGER, this.dragDelta.originWidth + (e.x - this.dragDelta.dragX) / (this.O.scene.leafer.scale as number))
            this.O.frame.R.y = Mathf.Clamp(-Number.MAX_SAFE_INTEGER, this.dragDelta.originY + this.dragDelta.originHeight - 32, this.dragDelta.originY + (e.y - this.dragDelta.dragY) / (this.O.scene.leafer.scale as number))
            this.O.frame.R.height = Mathf.Clamp(32, Number.MAX_SAFE_INTEGER, this.dragDelta.originHeight - (e.y - this.dragDelta.dragY) / (this.O.scene.leafer.scale as number))
        }
        else {
            this.O.frame.R.width = Mathf.Clamp(32, Number.MAX_SAFE_INTEGER, this.dragDelta.originWidth + (e.x - this.dragDelta.dragX) / (this.O.scene.leafer.scale as number))
            this.O.frame.R.height = Mathf.Clamp(32, Number.MAX_SAFE_INTEGER, this.dragDelta.originHeight + (e.y - this.dragDelta.dragY) / (this.O.scene.leafer.scale as number))
        }
        this.O.frame.OnResize()
    }

    public override OnDragEnd(e: L.DragEvent) {
        super.OnDragEnd(e)
        this.root.cursor = 'grab'
    }

    public FixPosition() {
        if (this.O.type == OperateType.CornerType.LT) {
            this.root.x = 8
            this.root.y = 8
        }
        else if (this.O.type == OperateType.CornerType.RT) {
            this.root.x = this.O.frame.R.width - 8
            this.root.y = 8
        }
        else if (this.O.type == OperateType.CornerType.LB) {
            this.root.x = 8
            this.root.y = this.O.frame.R.height - 8
        }
        else {
            this.root.x = this.O.frame.R.width - 8
            this.root.y = this.O.frame.R.height - 8
        }
    }

    public override OnPointerEnter(e: L.PointerEvent) {

    }

    public override OnPointerLeave(e: L.PointerEvent) {

    }

}

export { Corner }