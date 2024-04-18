import { OperateType } from "../../../Type";
import { Border } from "./Border";
import { Entity } from "./Entity";
import * as L from 'leafer-ui'

class Frame extends Entity {
    constructor(options: OperateType.IFrame) {
        super(options)
        this.Create()
        this.ListenEvents()
    }

    declare protected root: L.Frame

    protected children = new Map<string, Entity>()

    protected border!: Border

    public get B() {
        return this.border
    }

    protected get O() {
        return this.options as OperateType.IFrame
    }

    private dragStartOrigin = {
        frameX: 0,
        frameY: 0,
        dragX: 0,
        dragY: 0
    }

    public override Create() {
        super.Create()
        this.root = new L.Box({
            width: this.O.width || this.O.area.leafer.width,
            height: this.O.height || this.O.area.leafer.height,
            fill: this.O.fill || 'transparent',
            overflow: this.O.overflow || 'hide',
            zIndex: this.O.zIndex,
            x: this.O.x || 0,
            y: this.O.y || 0,
        })
        this.O.area.leafer.add(this.root)

        this.border = new Border({
            area: this.O.area,
            frame: this
        })
        this.O.area.frames.set(this.id, this)
    }

    public override ListenEvents() {
        super.ListenEvents()
    }

    public override Focus() {

    }

    public override Delete() {
        super.Delete()
        this.O.area.leafer.remove(this.root)
        this.O.area.frames.delete(this.id)
        for (let c of this.children) {
            c[1].Delete()
        }
    }

    public AddChild(child: Entity) {
        this.children.set(child.id, child)
        this.root.add(child.R)
    }

    public RemoveChild(child: Entity) {
        const current = this.children.get(child.id)
        if (child) {
            this.root.remove(child.R)
            child.Delete()
            this.children.delete(child.id)
        }
    }

    public override OnPointerEnter(e: L.PointerEvent): void {
        super.OnPointerEnter(e)
        this.border.Show()
    }

    public override OnPointerLeave(e: L.PointerEvent): void {
        super.OnPointerLeave(e)
        this.border.Hide()
    }

    public override OnDragging(e: L.DragEvent): void {
        super.OnDragging(e)
        this.root.x = this.dragStartOrigin.frameX + (e.x - this.dragStartOrigin.dragX) / (this.O.area.leafer.scale as number)
        this.root.y = this.dragStartOrigin.frameY + (e.y - this.dragStartOrigin.dragY) / (this.O.area.leafer.scale as number)
    }

    public override OnDragStart(e: L.DragEvent) {
        super.OnDragStart(e)
        this.dragStartOrigin.frameX = this.root.x
        this.dragStartOrigin.frameY = this.root.y
        this.dragStartOrigin.dragX = e.x
        this.dragStartOrigin.dragY = e.y
    }
}

export { Frame }