export namespace SuspendType {
    export interface IFunctionBtn {
        icon: string,
        label: string
        type: FunctionBtnType
    }

    export enum FunctionBtnType {
        Fix
    }

    export interface IFixItem {
        id: number,
        x: number,
        y: number,
        width: number,
        height: number
    }
}