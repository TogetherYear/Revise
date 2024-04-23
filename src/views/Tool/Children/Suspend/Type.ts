export namespace SuspendType {
    export interface IFunctionBtn {
        icon: string,
        label: string
        type: FunctionBtnType
    }

    export enum FunctionBtnType {
        Fix,
        Save,
        Copy
    }

    export interface IFixItem {
        id: number,
        x: number,
        y: number,
        width: number,
        height: number
    }

    export enum WidgetType {
        Draw,
        Fix,
        Edit
    }

    export enum WheelDirection {
        Up,
        Down
    }

    export type FixTransform = {
        x: number,
        y: number,
        width: number,
        height: number
    }
}