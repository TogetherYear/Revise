import { BackFrame } from "./Components/Draw/Core/BackFrame"

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

    export enum AreaDirection {
        None,
        LeftTop,
        LeftCenter,
        LeftBottom,
        CenterTop,
        CenterBottom,
        RightTop,
        RightCenter,
        RightBottom
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

    export interface IDrawEntity {
        startX: number,
        startY: number,
        back: BackFrame
    }

    export interface IDrawRect extends IDrawEntity {

    }

    export interface IDrawEllipse extends IDrawEntity {

    }

    export interface IDrawPath extends IDrawEntity {

    }

    export interface IDrawLine extends IDrawEntity {

    }
}