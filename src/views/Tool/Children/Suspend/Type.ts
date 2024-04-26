export namespace SuspendType {
    export interface IFunctionBtn {
        icon: string,
        label: string
        type: FunctionBtnType
    }

    export interface IDraw {
        icon: string,
        label: string,
        type: DrawType
    }

    export enum DrawType {
        None,
        Rect,
        Ellipse,
        Path,
        Line
    }

    export enum FunctionBtnType {
        Fix,
        Save,
        Copy,
        Draw,
        Gray,
        Eraser,
        Print,
        Cut
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