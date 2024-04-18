declare namespace Renderer {
    /**
     * 应用
     */
    export namespace App {
        /**
         * 是否开机自启
         */
        export function IsAutostart(): Promise<boolean>

        /**
         * 设置开机自启
         */
        export function SetAutostart(b: boolean): Promise<void>

        /**
         * 关闭
         */
        export function Close(): Promise<void>

        /**
         * 重启
         */
        export function Relaunch(): Promise<void>

        /**
         * 调用Rust方法
         */
        export function Invoke(cmd: string, args?: IT.InvokeArgs): Promise<unknown>

        /**
         * 获取所有窗口
         */
        export function GetAllWidgets(): Array<unknown>

        /**
         * 根据 label 获取窗口
         */
        export function GetWidgetByLabel(label: string): unknown

        /**
         * 创建新窗口 返回值是窗口类 如果窗口已存在则返回 并且聚焦 ( 自己翻阅文档 这里不在写类型说明 )
         */
        export function CreateWidget(label: IT.WindowLabel, options?: IT.IWindowOptions): Promise<unknown>
    }

    /**
     * 系统弹窗
     */
    export namespace Dialog {
        /**
         * 消息框
         */
        export function Message(message: string, options?: IT.IMessageDialogOptions): Promise<boolean>

        /**
         * 询问框
         */
        export function Ask(message: string, options?: IT.IConfirmDialogOptions): Promise<boolean>

        /**
         * 确认框
         */
        export function Confirm(message: string, options?: IT.IConfirmDialogOptions): Promise<boolean>
    }

    /**
     * 剪切板
     */
    export namespace Clipboard {
        /**
         * 写入剪切板
         */
        export function WriteText(text: string): Promise<void>

        /**
         * 读取剪切板
         */
        export function ReadText(): Promise<string | null>
    }

    /**
     * 窗口
     */
    export namespace Widget {
        /**
         * 最小化
         */
        export function Min(): Promise<void>

        /**
         * 最大化或者恢复最大化之前状态
         */
        export function Max(): Promise<void>

        /**
         * 隐藏
         */
        export function Hide(): Promise<void>

        /**
         * 关闭
         */
        export function Close(): Promise<void>

        /**
         * 显示
         */
        export function Show(): Promise<void>

        /**
         * 居中
         */
        export function Center(): Promise<void>

        /**
         * 设置是否显示在最上层
         */
        export function SetAlwaysOnTop(b: boolean): Promise<void>

        /**
         * 设置大小
         */
        export function SetSize(width: number, height: number): Promise<void>

        /**
         * 设置位置
         */
        export function SetPosition(x: number, y: number): Promise<void>

        /**
         * 获取窗口位置
         */
        export function GetPosition(): Promise<IT.Point>

        /**
         * 设置是否显示窗口阴影
         */
        export function SetShadow(enable: boolean): Promise<void>

        /**
         * 设置是否忽略窗口鼠标事件
         */
        export function SetIgnoreCursorEvents(ignore: boolean): Promise<void>

        /**
         * 不要用 去用 AddListen
         */
        export function Listen(event: IT.EventName, handler: IT.EventCallback): Promise<IT.UnlistenFn>
    }

    /**
     * 程序窗口
     */
    export namespace Window {
        /**
         * 获取电脑上所有运行的程序窗口
         */
        export function GetAllWindows(): Promise<Array<IT.Window>>
    }

    /**
     * 资源
     */
    export namespace Resource {
        /**
         * 通过名称获取文件路径 ( 仅限 Extra 文件夹 ) 例如: Images/icon.ico ( convert 是否转换成 Webview 可使用的格式 默认 true)
         */
        export function GetPathByName(name: string, convert?: boolean): Promise<string>

        /**
         * 将真实文件地址转换为 Webview 可使用的地址
         */
        export function ConvertFileSrcToTauri(path: string): string

        /**
         * 获取桌面目录
         */
        export function GetDesktopDir(): Promise<String>

        /**
         * 从文件资源管理器选择资源
         */
        export function SelectResources(options?: IT.SelectOptions): Promise<Array<string> | string | null>

        /**
         * 从文件资源管理器选择保存资源路径
         */
        export function SaveResources(options?: IT.SaveOptions): Promise<string | null>

        /**
         * 通过名称获取文件路径 ( 仅限 Extra 文件夹 ) 例如: Images/icon.ico ( 使用本地文件服务器 )
         */
        export function GetPathByNameFromHttpServe(name: string): string

        /**
         * 获取路径的元数据 不能用Tauri转换后的地址
         */
        export function GetPathMetadata(path: string): Promise<Record<string, unknown>>

        /**
         * 从读取文件转换为字符串 不能用Tauri转换后的地址
         */
        export function ReadStringFromFile(path: string): Promise<string>

        /**
         * 将字符串写入文件 不能用Tauri转换后的地址
         */
        export function WriteStringToFile(path: string, content: string): Promise<void>

        /**
         * 从读取文件转换为字节数组 不能用Tauri转换后的地址
         */
        export function ReadBinaryFromFile(path: string): Promise<Uint8Array>

        /**
         * 将字节数组写入文件 不能用Tauri转换后的地址
         */
        export function WriteBinaryToFile(path: string, content: IT.BinaryFileContents): Promise<void>

        /**
         * 使用系统默认应用程序打开路径 ( 如果是文件夹 则会在文件资源管理器打开 ) 不能用Tauri转换后的地址
         */
        export function OpenPathDefault(path: string): Promise<void>

        /**
         * 判断文件是否存在 不能用Tauri转换后的地址
         */
        export function IsPathExists(path: string): Promise<boolean>

        /**
         * 获取文件夹里所有文件列表 不能用Tauri转换后的地址
         */
        export function ReadDirFiles(path: string): Promise<Array<{ path: string, name?: string }>>

        /**
         * 创建文件夹 不能用Tauri转换后的地址
         */
        export function CreateDir(path: string): Promise<void>

        /**
         * 删除文件夹 不能用Tauri转换后的地址
         */
        export function RemoveDir(path: string): Promise<void>

        /**
         * 删除文件 不能用Tauri转换后的地址
         */
        export function RemoveFile(path: string): Promise<void>

        /**
         * 重命名 不能用Tauri转换后的地址
         */
        export function Rename(path: string, newPath: string): Promise<void>

        /**
         * 复制文件 不能用Tauri转换后的地址
         */
        export function CopyFile(path: string, newPath: string): Promise<void>

        /**
         * 上传文件 不能用Tauri转换后的地址
         */
        export function Upload(url: string, path: string, progressHandler?: IT.ProgressHandler, headers?: Map<string, string>): Promise<void>

        /**
         * 下载文件 不能用Tauri转换后的地址
         */
        export function Download(url: string, path: string, progressHandler?: IT.ProgressHandler, headers?: Map<string, string>): Promise<void>
    }

    /**
     * 全局快捷键
     */
    export namespace GlobalShortcut {
        /**
         * 取消所有全局快捷键
         */
        export function UnregisterAll(): Promise<void>

        /**
         * 快捷键是否已注册
         */
        export function IsRegistered(shortcut: string): Promise<boolean>

        /**
         * 注册快捷键
         */
        export function Register(shortcut: string, handler: IT.ShortcutHandler): Promise<void>

        /**
         * 取消快捷键
         */
        export function Unregister(shortcut: string): Promise<void>
    }

    /**
     * 显示器
     */
    export namespace Monitor {
        /**
         * 获取所有显示器
         */
        export function GetAllMonitors(): Promise<Array<IT.Monitor>>

        /**
         * 根据点获取显示器
         */
        export function GetMonitorFromPoint(x: number, y: number): Promise<IT.Monitor>

        /**
         * 获取当前鼠标位置显示器
         */
        export function GetCurrentMouseMonitor(): Promise<IT.Monitor>

        /**
         * 获取主显示器
         */
        export function GetPrimaryMonitor(): Promise<IT.Monitor>
    }

    /**
     * 壁纸
     */
    export namespace Wallpaper {
        /**
         * 获取桌面壁纸
         */
        export function GetWallpaper(): Promise<string>

        /**
         * 设置桌面壁纸 ( 仅限 .png ) 不能用Tauri转换后的地址
         */
        export function SetWallpaper(path: string, mode?: Renderer.WallpaperMode): Promise<boolean>
    }

    /**
     * 持久化本地数据仓库
     */
    export namespace Store {
        /**
         * 创建持久化本地仓库或加载已存在的
         */
        export function Create(name: string): Promise<{
            instance: unknown;
            Set: (key: string, value: unknown) => Promise<void>,
            Get: (key: string) => Promise<unknown>,
            Has: (key: string) => Promise<boolean>,
            Delete: (key: string) => Promise<boolean>,
            Keys: () => Promise<Array<string>>,
            Values: () => Promise<Array<unknown>>,
            Entries: () => Promise<Array<[string, unknown]>>,
            Length: () => Promise<number>,
            Clear: () => Promise<void>,
            Save: () => Promise<void>,
        }>
    }

    /**
     * 自动化
     */
    export namespace Automatic {
        /**
         * 获取鼠标位置
         */
        export function GetMousePosition(): Promise<IT.Point>

        /**
         * 设置鼠标位置
         */
        export function SetMousePosition(x: number, y: number): Promise<void>

        /**
         * 点击鼠标
         */
        export function SetButtonClick(button: MouseButton): Promise<void>

        /**
         * 设置鼠标状态
         */
        export function SetButtonToggle(button: MouseButton, down: boolean): Promise<void>

        /**
         * 滑动滚轮
         */
        export function SetMouseScroll(direction: ScrollDirection, clicks: number): Promise<void>

        /**
         * 获取坐标位置的颜色
         */
        export function GetColorFromPosition(x: number, y: number): Promise<IT.Color>

        /**
         * 获取当前鼠标位置的颜色
         */
        export function GetCurrentPositionColor(): Promise<IT.Color>

        /**
         * 写入本文 ( paste:是否用复制的方式写入 )
         */
        export function WriteText(content: string, paste?: boolean): Promise<void>

        /**
         * 按顺序设置按键状态
         */
        export function SetKeysToggle(toggleKeys: Array<IT.IToggleKey>): Promise<void>

        /**
         * 按顺序点击按键
         */
        export function SetKeysClick(keys: Array<KeyboardKey>): Promise<void>
    }

    /**
     * 系统托盘
     */
    export namespace Tray {
        /**
         * 修改托盘图标 不能用Tauri转换后的地址
         */
        export function SetTrayIcon(icon: string): Promise<void>

        /**
         * 修改托盘提示文字
         */
        export function SetTrayTooltip(tooltip: string): Promise<void>

        /**
         * 托盘开始闪烁 不能用Tauri转换后的地址
         */
        export function Flash(icon: string): Promise<void>

        /**
         * 托盘停止闪烁 不能用Tauri转换后的地址
         */
        export function StopFlash(icon: string): Promise<void>
    }

    /**
     * 图片
     */
    export namespace Image {
        /**
         * 转换图片格式 不能用Tauri转换后的地址
         */
        export function ConvertImageFormat(originPath: string, convertPath: string, options?: IT.ImageOptions): Promise<void>
    }

    /**
     * 不要用 去用 AddListen
     */
    export namespace Event {
        export function Listen(event: IT.EventName, handler: IT.EventCallback): Promise<IT.UnlistenFn>
        export function Once(event: IT.EventName, handler: IT.EventCallback): Promise<IT.UnlistenFn>
        export function Emit(event: Renderer.Event.TauriEvent.TAURI, payload?: IT.IRendererSendMessage): Promise<void>
        export enum TauriEvent {
            TAURI = "tauri://tauri",
            WINDOW_RESIZED = "tauri://resize",
            WINDOW_MOVED = "tauri://move",
            WINDOW_CLOSE_REQUESTED = "tauri://close-requested",
            WINDOW_CREATED = "tauri://window-created",
            WINDOW_DESTROYED = "tauri://destroyed",
            WINDOW_FOCUS = "tauri://focus",
            WINDOW_BLUR = "tauri://blur",
            WINDOW_SCALE_FACTOR_CHANGED = "tauri://scale-change",
            WINDOW_THEME_CHANGED = "tauri://theme-changed",
            WINDOW_FILE_DROP = "tauri://file-drop",
            WINDOW_FILE_DROP_HOVER = "tauri://file-drop-hover",
            WINDOW_FILE_DROP_CANCELLED = "tauri://file-drop-cancelled",
            MENU = "tauri://menu",
            CHECK_UPDATE = "tauri://update",
            UPDATE_AVAILABLE = "tauri://update-available",
            INSTALL_UPDATE = "tauri://update-install",
            STATUS_UPDATE = "tauri://update-status",
            DOWNLOAD_PROGRESS = "tauri://update-download-progress"
        }
    }

    export enum WallpaperMode {
        Center = 0,
        Crop = 1,
        Fit = 2,
        Span = 3,
        Stretch = 4,
        Tile = 5,
    }

    export enum ImageFormat {
        Png = 0,
        Jpeg = 1,
        Gif = 2,
        WebP = 3,
        Pnm = 4,
        Tiff = 5,
        Tga = 6,
        Dds = 7,
        Bmp = 8,
        Ico = 9,
        Hdr = 10,
        OpenExr = 11,
        Farbfeld = 12,
        Avif = 13,
        Qoi = 14,
    }

    export enum ImageFilter {
        Nearest = 0,
        Triangle = 1,
        CatmullRom = 2,
        Gaussian = 3,
        Lanczos3 = 4,
    }

    export enum KeyboardKey {
        Num0 = 0,
        Num1 = 1,
        Num2 = 2,
        Num3 = 3,
        Num4 = 4,
        Num5 = 5,
        Num6 = 6,
        Num7 = 7,
        Num8 = 8,
        Num9 = 9,
        A = 10,
        B = 11,
        C = 12,
        D = 13,
        E = 14,
        F = 15,
        G = 16,
        H = 17,
        I = 18,
        J = 19,
        K = 20,
        L = 21,
        M = 22,
        N = 23,
        O = 24,
        P = 25,
        Q = 26,
        R = 27,
        S = 28,
        T = 29,
        U = 30,
        V = 31,
        W = 32,
        X = 33,
        Y = 34,
        Z = 35,
        Add = 36,
        Subtract = 37,
        Multiply = 38,
        Divide = 39,
        OEM2 = 40,
        Tab = 41,
        CapsLock = 42,
        Shift = 43,
        Control = 44,
        Alt = 45,
        Space = 46,
        Backspace = 47,
        Return = 48,
        Escape = 49,
        UpArrow = 50,
        DownArrow = 51,
        LeftArrow = 52,
        RightArrow = 53,
    }

    export enum MouseButton {
        Left = 0,
        Middle = 1,
        Right = 2,
    }

    export enum ScrollDirection {
        Down = 0,
        Up = 1,
    }

    export enum RendererEvent {
        Message = 'Message',
        SecondInstance = 'SecondInstance',
        WidgetCreate = 'WidgetCreate',
        WidgetDestroy = 'WidgetDestroy',
        WidgetEmpty = 'WidgetEmpty',
        FileDrop = 'FileDrop',
        Resize = 'Resize',
    }

    export const CaptureTempInputPath: Promise<string>

    export const CaptureTempOutputPath: Promise<string>

    /**
     * 监听事件
     */
    export function AddListen(key: RendererEvent, scope: Object, callback: IT.RendererEventCallback, once?: boolean): void

    /**
     * 取消监听事件
     */
    export function RemoveListen(key: RendererEvent, scope: Object, callback: IT.RendererEventCallback): void
}

declare namespace IT {
    export interface IWindowOptions {
        url?: string,
        center?: boolean,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        minWidth?: number,
        minHeight?: number,
        maxWidth?: number,
        maxHeight?: number,
        resizable?: boolean,
        title?: string,
        fullscreen?: boolean,
        focus?: boolean,
        transparent?: boolean,
        maximized?: boolean,
        visible?: boolean,
        decorations?: boolean,
        alwaysOnTop?: boolean,
        contentProtected?: boolean,
        skipTaskbar?: boolean,
        fileDropEnabled?: boolean,
        tabbingIdentifier?: string,
        userAgent?: string,
        maximizable?: boolean,
        minimizable?: boolean,
        closable?: boolean
    }

    export type WindowLabel = string;

    export interface IRendererSendMessage {
        event: Renderer.RendererEvent,
        extra?: Record<string, unknown>
    }

    export type RendererEventCallback = (e: IRendererSendMessage) => void

    export type BinaryFileContents = Iterable<number> | ArrayLike<number> | ArrayBuffer;

    /**
     * 调用此函数可以取消事件的监听
     */
    export type UnlistenFn = () => void;

    export interface IMessageDialogOptions {
        title?: string,
        type?: 'info' | 'warning' | 'error',
        okLabel?: string
    }

    export interface IConfirmDialogOptions {
        title?: string,
        type?: 'info' | 'warning' | 'error',
        okLabel?: string,
        cancelLabel?: string
    }

    export type InvokeArgs = Record<string, unknown>;

    export interface IEvent {
        /**
         * 自己仔细看文档 事件是如何触发的
         */
        event: EventName;
        windowLabel: string | null;
        id: number;
        payload: unknown;
    }

    export type EventCallback = (event: IEvent) => void;

    export type ProgressHandler = (progress: number, total: number) => void;

    export type ShortcutHandler = (shortcut: string) => void;

    export type SelectOptions = {
        title?: string,
        multiple?: boolean,
        defaultPath?: string,
        directory?: boolean,
        filters?: Array<{
            name: string,
            extensions: Array<string>
        }>
    }

    export type SaveOptions = {
        title?: string,
        defaultPath?: string,
        filters?: Array<{
            name: string,
            extensions: Array<string>
        }>
    }

    export type Color = {
        r: number;
        g: number;
        b: number;
        a: number;
    }

    export type Point = {
        x: number,
        y: number
    }

    export type Monitor = {
        id: number,
        name: String,
        x: number,
        y: number,
        width: number,
        height: number,
        rotation: number,
        scaleFactor: number,
        frequency: number,
        isPrimary: boolean,
        /**
         * 获取截屏
         */
        Capture: () => Promise<string>
    }

    export interface IToggleKey {
        key: Renderer.KeyboardKey,
        down: boolean
    }

    export type Window = {
        id: number,
        title: string,
        appName: string,
        x: number,
        y: number,
        width: number,
        height: number,
        isMinimized: boolean,
        isMaximized: boolean,
        monitor: Monitor
        /**
         * 获取截屏 最小化的窗口无法截取
         */
        Capture: () => Promise<string>
    }

    export type ImageOptions = {
        format?: Renderer.ImageFormat,
        keepAspectRatio?: boolean,
        width?: number,
        height?: number,
        filter?: Renderer.ImageFilter,
    }

    export type EventName = `${Renderer.Event.TauriEvent}` | (string & Record<never, never>);
}
