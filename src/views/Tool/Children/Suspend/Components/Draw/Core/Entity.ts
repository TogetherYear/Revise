import { SuspendType } from "../../../Type";
import * as L from 'leafer-ui'

abstract class Entity {
    constructor(options: SuspendType.IDrawEntity) {
        this.options = options
    }

    protected options!: SuspendType.IDrawEntity

    public abstract Create(): void;

    public abstract OnDrawing(e: L.DragEvent): void;

    public abstract OnDrawEnd(e: L.DragEvent): void;

    public abstract Destroy(): void;

    protected GetGlobalPosition(x: number, y: number) {
        return this.options.back.FE.getLocalPointByInner({ x, y })
    }
}

export { Entity }