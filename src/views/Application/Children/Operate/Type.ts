import * as L from 'leafer-ui'
import { Frame } from './Components/Scene/Core/Base/Frame'
import { Scene } from './Components/Scene/Scene'

export namespace OperateType {

    export enum Layout {
        Scene,
        Hierarchy,
        Inspector,
        Resource
    }

    export interface IBase {
        zIndex?: number,
        name?: string,
        scene: Scene,
    }

    export interface IInner {
        frame: Frame,
    }
    export interface IEntity extends IBase {

    }

    export interface IFrame extends IEntity {
        width?: number,
        height?: number,
        x?: number,
        y?: number
        fill?: string
        overflow?: 'show' | 'hide'
    }

    export interface IBorder extends IEntity, IInner {
        color?: string,
        radiu?: number
    }

    export interface ICorner extends IEntity, IInner {
        type: CornerType
    }

    export enum CornerType {
        LT,
        RT,
        LB,
        RB
    }

    export interface IImage extends IEntity, IInner {
        url: string,
        x?: number,
        y?: number,
        OnLoad?: (e: { width: number, height: number }) => void
        OnError?: () => void
    }

    export type LeaferResizeEvent = {
        new: {
            width: number,
            height: number,
            pixelRatio: number
        },
        old: {
            width: number,
            height: number,
            pixelRatio: number
        }
    }

    export enum SuspendType {
        Draw,
        Fix,
        Edit
    }
}