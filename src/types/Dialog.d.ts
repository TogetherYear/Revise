declare namespace Dialog {
    export function destroyAll(): void

    export function create(...args: Array<unknown>): void

    export function success(...args: Array<unknown>): void

    export function warning(...args: Array<unknown>): void

    export function error(...args: Array<unknown>): void

    export function info(...args: Array<unknown>): void
}