declare namespace FieldObserver {
    export interface IObserver {
        dom: HTMLElement,
        /**
         * 默认 true 只监听一次
         */
        once?: boolean,
        OnShow?: () => void,
        OnHide?: () => void,
    }

    export class Observer {
        Destroy(): void
    }

    export function Generate(options: IObserver): Observer;
}