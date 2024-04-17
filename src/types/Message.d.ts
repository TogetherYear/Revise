declare namespace Message {
    export function info(content: string, ...args: Array<unknown>): void

    export function success(content: string, ...args: Array<unknown>): void

    export function warning(content: string, ...args: Array<unknown>): void

    export function error(content: string, ...args: Array<unknown>): void

    export function loading(content: string, ...args: Array<unknown>): void

    export function destroyAll(): void

}