import { OperateType } from "../../../../Type";
import { Entity } from "../Base/Entity";
import * as L from 'leafer-ui'

class Border extends Entity {
    constructor(options: OperateType.IBorder) {
        super(options)
        this.Create()
    }

    declare protected root: L.Rect

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

    public Show() {
        super.Show()
        this.root.stroke = this.O.color || '#ff0000ff'
    }

    public Hide() {
        super.Hide()
        this.root.stroke = 'transparent'
    }

}

export { Border }