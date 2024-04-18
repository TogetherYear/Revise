import { OperateType } from "../../../../Type";
import { Border } from "../Inner/Border";
import { Corner } from "../Inner/Corner";
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

    protected corners: {
        lt: Corner | null,
        rt: Corner | null,
        lb: Corner | null,
        rb: Corner | null
    } = {
            lt: null,
            rt: null,
            lb: null,
            rb: null,
        }

    public get B() {
        return this.border
    }

    public get Cs() {
        return this.corners as {
            lt: Corner,
            rt: Corner,
            lb: Corner
            rb: Corner
        }
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
            width: this.O.width || this.O.scene.leafer.width,
            height: this.O.height || this.O.scene.leafer.height,
            fill: this.O.fill || 'transparent',
            overflow: this.O.overflow || 'hide',
            zIndex: this.O.zIndex,
            x: this.O.x || 0,
            y: this.O.y || 0,
        })
        this.O.scene.leafer.add(this.root)

        this.CreateBorder()
        this.CreateCorners()

        this.O.scene.frames.set(this.id, this)
    }

    private CreateBorder() {
        this.border = new Border({
            scene: this.O.scene,
            frame: this
        })
    }

    private CreateCorners() {
        this.corners.lt = new Corner({
            scene: this.O.scene,
            frame: this,
            type: OperateType.CornerType.LT
        })
        this.corners.lb = new Corner({
            scene: this.O.scene,
            frame: this,
            type: OperateType.CornerType.LB
        })
        this.corners.rt = new Corner({
            scene: this.O.scene,
            frame: this,
            type: OperateType.CornerType.RT
        })
        this.corners.rb = new Corner({
            scene: this.O.scene,
            frame: this,
            type: OperateType.CornerType.RB
        })
    }

    public override ListenEvents() {
        super.ListenEvents()
    }

    public override Focus() {

    }

    public override Delete() {
        super.Delete()
        this.O.scene.leafer.remove(this.root)
        this.O.scene.frames.delete(this.id)
        this.border.Delete()
        this.corners.lt?.Delete()
        this.corners.lb?.Delete()
        this.corners.rt?.Delete()
        this.corners.rb?.Delete()
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
        this.corners.lt?.Show()
        this.corners.lb?.Show()
        this.corners.rt?.Show()
        this.corners.rb?.Show()
    }

    public override OnPointerLeave(e: L.PointerEvent): void {
        super.OnPointerLeave(e)
        this.border.Hide()
        this.corners.lt?.Hide()
        this.corners.lb?.Hide()
        this.corners.rt?.Hide()
        this.corners.rb?.Hide()
    }

    public override OnDragging(e: L.DragEvent): void {
        super.OnDragging(e)
        this.root.x = this.dragStartOrigin.frameX + (e.x - this.dragStartOrigin.dragX) / (this.O.scene.leafer.scale as number)
        this.root.y = this.dragStartOrigin.frameY + (e.y - this.dragStartOrigin.dragY) / (this.O.scene.leafer.scale as number)
    }

    public override OnDragStart(e: L.DragEvent) {
        super.OnDragStart(e)
        this.dragStartOrigin.frameX = this.root.x
        this.dragStartOrigin.frameY = this.root.y
        this.dragStartOrigin.dragX = e.x
        this.dragStartOrigin.dragY = e.y
    }

    public OnResize() {
        this.border.FixPosition()
        this.corners.lt?.FixPosition()
        this.corners.lb?.FixPosition()
        this.corners.rt?.FixPosition()
        this.corners.rb?.FixPosition()
    }
}

export { Frame }