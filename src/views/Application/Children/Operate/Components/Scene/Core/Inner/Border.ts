import { OperateType } from "../../../../Type";
import { Entity } from "../Base/Entity";
import * as L from 'leafer-ui'

class Border extends Entity {
    constructor(options: OperateType.IBorder) {
        super(options)
        this.Create()
    }

    declare protected root: L.Rect

    protected cornerLT!: L.Image

    protected cornerLB!: L.Image

    protected cornerRT!: L.Image

    protected cornerRB!: L.Image

    protected get O() {
        return this.options as OperateType.IBorder
    }

    public Create() {
        super.Create()
        this.root = new L.Rect({
            width: this.O.frame.R.width,
            height: this.O.frame.R.height,
            fill: 'transparent',
            strokeWidth: 2,
            stroke: this.O.color || '#ff0000ff',
            cornerRadius: this.O.radiu || 0,
            x: 0,
            y: 0
        })
        this.O.frame.R.add(this.root)
        this.Hide()
    }

    public Delete() {
        super.Delete()
        this.O.frame.R.remove(this.root)
    }

    public Show() {
        super.Show()
        this.R.opacity = 1
    }

    public Hide() {
        super.Hide()
        this.R.opacity = 0
    }

    public FixPosition() {
        this.root.width = this.O.frame.R.width
        this.root.height = this.O.frame.R.height
    }

    public override OnPointerEnter(e: L.PointerEvent) {

    }

    public override OnPointerLeave(e: L.PointerEvent) {

    }

}

export { Border }