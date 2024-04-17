import { EventSystem } from "./EventSystem";

abstract class AActor extends EventSystem {
    constructor() { super() }

    public abstract InitStates(): Record<string, unknown>

    public abstract InitHooks(): void

    public abstract Run(...args: Array<unknown>): void

    protected abstract Destroy(...args: Array<unknown>): void
}

export { AActor }