import * as L from 'leafer-ui'
import { Frame } from './Area/Core/Frame'
import { Area } from './Area/Area'

export namespace OperateType {
    export interface IEntity {
        area: Area,
        zIndex?: number,
        name?: string
    }

    export interface IFrame extends IEntity {
        width?: number,
        height?: number,
        x?: number,
        y?: number
        fill?: string
        overflow?: 'show' | 'hide'
    }

    export interface IBorder extends IEntity {
        frame: Frame,
        color?: string,
        radiu?: number
    }

    export interface IImage extends IEntity {
        url: string,
        frame: Frame,
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
}