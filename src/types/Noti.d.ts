declare namespace Noti {
    export function info(options: Record<string, unknown>): void

    export function success(options: Record<string, unknown>): void

    export function warning(options: Record<string, unknown>): void

    export function error(options: Record<string, unknown>): void

    export function destroyAll(): void

}