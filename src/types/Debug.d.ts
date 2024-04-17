declare namespace Debug {
    /**
     * 模式 0:开发 1:生产
     */
    export const mode: number

    export const IsProd: boolean

    /**
     * 不要调用
     */
    export function Run(): void;

    export function Clear(): void;

    export function Log(...args: Array<unknown>): void;

    export function Warn(...args: Array<unknown>): void;

    export function Error(...args: Array<unknown>): void;
}