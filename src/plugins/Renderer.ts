import * as A from "tauri-plugin-autostart-api";
import * as C from "@tauri-apps/api/clipboard"
import * as D from "@tauri-apps/api/dialog"
import * as E from "@tauri-apps/api/event"
import * as F from "@tauri-apps/api/fs";
import * as G from "@tauri-apps/api/globalShortcut"
import * as M from 'tauri-plugin-fs-extra-api'
import * as Pa from "@tauri-apps/api/path";
import * as Pr from '@tauri-apps/api/process'
import * as Sh from "@tauri-apps/api/shell"
import * as St from 'tauri-plugin-store-api'
import * as T from "@tauri-apps/api/tauri";
import * as U from 'tauri-plugin-upload-api'
import * as W from "@tauri-apps/api/window"
import { EventSystem } from "@/libs/EventSystem";
import { Time } from "@/libs/Time";

class Renderer extends EventSystem {
    private constructor() { super() }

    private static instance = new Renderer()

    public static get Instance() { return this.instance }

    private flashTimer: NodeJS.Timeout | null = null

    public get App() {
        return {
            IsAutostart: () => {
                return A.isEnabled()
            },
            SetAutostart: async (b: boolean) => {
                const current = await this.App.IsAutostart()
                if (current && !b) {
                    return A.disable()
                }
                else if (!current && b) {
                    return A.enable()
                }
            },
            Close: () => {
                return Pr.exit(0)
            },
            Relaunch: () => {
                return Pr.relaunch()
            },
            Invoke: (cmd: string, args?: T.InvokeArgs) => {
                return T.invoke(cmd, args)
            },
            GetAllWidgets: () => {
                return W.getAll()
            },
            GetWidgetByLabel: (label: string) => {
                const ws = this.App.GetAllWidgets()
                return ws.find(w => w.label == label)
            },
            CreateWidget: async (label: string, options?: W.WindowOptions) => {
                const exist = this.App.GetWidgetByLabel(label)
                if (exist) {
                    await exist.show()
                    await exist.setFocus()
                    return exist
                }
                else {
                    const widget = new W.WebviewWindow(label, options)
                    widget.once(E.TauriEvent.WINDOW_CREATED, (e) => {
                        E.emit(this.Event.TauriEvent.TAURI, { event: this.RendererEvent.WidgetCreate, extra: { windowLabel: label } })
                    })
                    widget.once(E.TauriEvent.WINDOW_DESTROYED, (e) => {
                        E.emit(this.Event.TauriEvent.TAURI, { event: this.RendererEvent.WidgetDestroy, extra: { windowLabel: label } })
                    })
                    return widget
                }
            }
        }
    }

    public get Dialog() {
        return {
            Message: (message: string, options?: string | D.MessageDialogOptions) => {
                return D.message(message, options)
            },
            Ask: (message: string, options?: string | D.ConfirmDialogOptions) => {
                return D.ask(message, options)
            },
            Confirm: (message: string, options?: string | D.ConfirmDialogOptions) => {
                return D.confirm(message, options)
            }
        }
    }

    public get Clipboard() {
        return {
            WriteText: (text: string) => {
                return C.writeText(text)
            },
            ReadText: () => {
                return C.readText()
            },
        }
    }

    public get Widget() {
        return {
            Min: () => {
                return W.appWindow.minimize()
            },
            Max: async () => {
                if (await W.appWindow.isFullscreen()) {
                    await W.appWindow.setFullscreen(false)
                    return W.appWindow.setResizable(true)
                }
                else {
                    await W.appWindow.setFullscreen(true)
                    return W.appWindow.setResizable(false)
                }
            },
            Hide: () => {
                return W.appWindow.hide()
            },
            Close: () => {
                return W.appWindow.close()
            },
            Show: async () => {
                await W.appWindow.show()
                return W.appWindow.setFocus()
            },
            Center: () => {
                return W.appWindow.center()
            },
            SetAlwaysOnTop: (b: boolean) => {
                return W.appWindow.setAlwaysOnTop(b)
            },
            SetSize: (w: number, h: number) => {
                return W.appWindow.setSize(new W.LogicalSize(w, h))
            },
            SetPosition: (x: number, y: number) => {
                return W.appWindow.setPosition(new W.LogicalPosition(x, y))
            },
            GetPosition: () => {
                return W.appWindow.innerPosition()
            },
            SetShadow: (enable: boolean) => {
                return T.invoke("SetShadow", { enable })
            },
            SetIgnoreCursorEvents: (ignore: boolean) => {
                return W.appWindow.setIgnoreCursorEvents(ignore)
            },
            Listen: W.appWindow.listen.bind(W.appWindow)
        }
    }

    public get Window() {
        return {
            GetAllWindows: async () => {
                return (await T.invoke("GetAllWindows") as Array<Record<string, unknown>>).map(w => this.Window.TransformWindow(w))
            },
            TransformWindow: (window: Record<string, unknown>) => {
                return {
                    ...window,
                    monitor: this.Monitor.TransformMonitor(window.monitor as Record<string, unknown>),
                    Capture: async () => {
                        const time = Time.GetTime(null, true, '-', '-').replaceAll(' ', '_')
                        if (await T.invoke("CaptureWindow", { id: window.id, path: await this.Resource.GetPathByName(`Images/Capture-${time}.webp`, false) })) {
                            return await this.Resource.GetPathByName(`Images/Capture-${time}.webp`, true)
                        }
                        return Promise.resolve("")
                    },
                }
            }
        }
    }

    public get Resource() {
        return {
            GetPathByName: async (name: string, convert: boolean = true) => {
                const base = (await Pa.join(await Pa.resourceDir(), '/Extra/', name)).replace('\\\\?\\', '').replaceAll('\\', '/').replaceAll('//', '/')
                const path = convert ? T.convertFileSrc(base) : base
                return path
            },
            ConvertFileSrcToTauri: (path: string) => {
                return T.convertFileSrc(path)
            },
            GetDesktopDir: () => {
                return Pa.desktopDir()
            },
            SelectResources: async (options: Record<string, unknown> = {}) => {
                return D.open({
                    title: (options.title as string) || undefined,
                    multiple: (options.multiple as boolean) || false,
                    defaultPath: (options.defaultPath as string) || await Pa.resourceDir(),
                    directory: (options.directory as boolean) || false,
                    filters: (options.filters as Array<D.DialogFilter>) || undefined
                })
            },
            SaveResources: async (options: Record<string, unknown>) => {
                return D.save({
                    title: (options.title as string) || undefined,
                    defaultPath: (options.defaultPath as string) || await Pa.resourceDir(),
                    filters: (options.filters as Array<D.DialogFilter>) || undefined
                })
            },
            GetPathByNameFromHttpServe: (name: string) => {
                return `http://localhost:8676/${name}`
            },
            GetPathMetadata: (path: string) => {
                return M.metadata(path)
            },
            ReadStringFromFile: (path: string) => {
                return F.readTextFile(path)
            },
            WriteStringToFile: async (path: string, content: string) => {
                const file = path.split('/').slice(-1)[0]
                const dir = path.replace(file, '')
                await this.Resource.CreateDir(dir)
                return F.writeTextFile(path, content)
            },
            ReadBinaryFromFile: (path: string) => {
                return F.readBinaryFile(path)
            },
            WriteBinaryToFile: async (path: string, content: F.BinaryFileContents) => {
                const file = path.split('/').slice(-1)[0]
                const dir = path.replace(file, '')
                await this.Resource.CreateDir(dir)
                return F.writeBinaryFile(path, content)
            },
            OpenPathDefault: (path: string) => {
                return Sh.open(path)
            },
            IsPathExists: (path: string) => {
                return F.exists(path)
            },
            ReadDirFiles: (path: string) => {
                return F.readDir(path)
            },
            CreateDir: async (path: string) => {
                if (!(await this.Resource.IsPathExists(path))) {
                    return F.createDir(path)
                }
            },
            RemoveDir: async (path: string) => {
                if (await this.Resource.IsPathExists(path)) {
                    return F.removeDir(path)
                }
            },
            RemoveFile: async (path: string) => {
                if (await this.Resource.IsPathExists(path)) {
                    return F.removeFile(path)
                }
            },
            Rename: async (path: string, newPath: string) => {
                if (await this.Resource.IsPathExists(path)) {
                    return F.renameFile(path, newPath)
                }
            },
            CopyFile: async (path: string, newPath: string) => {
                if (await this.Resource.IsPathExists(path)) {
                    return F.copyFile(path, newPath)
                }
            },
            Upload: (url: string, path: string, progressHandler?: (progress: number, total: number) => void, headers?: Map<string, string>) => {
                return U.upload(url, path, progressHandler, headers)
            },
            Download: (url: string, path: string, progressHandler?: (progress: number, total: number) => void, headers?: Map<string, string>) => {
                return U.download(url, path, progressHandler, headers)
            }
        }
    }

    public get GlobalShortcut() {
        return {
            UnregisterAll: () => {
                return G.unregisterAll()
            },
            IsRegistered: (shortcut: string) => {
                return G.isRegistered(shortcut)
            },
            Register: (shortcut: string, handler: G.ShortcutHandler) => {
                return G.register(shortcut, handler)
            },
            Unregister: (shortcut: string) => {
                return G.unregister(shortcut)
            },
        }
    }

    public get Monitor() {
        return {
            GetAllMonitors: async () => {
                return (await T.invoke("GetAllMonitors") as Array<Record<string, unknown>>).map(m => this.Monitor.TransformMonitor(m))
            },
            GetMonitorFromPoint: async (x: number, y: number) => {
                return this.Monitor.TransformMonitor(await T.invoke("GetMonitorFromPoint", { x, y }))
            },
            GetCurrentMouseMonitor: async () => {
                return this.Monitor.TransformMonitor(await T.invoke("GetCurrentMouseMonitor"))
            },
            GetPrimaryMonitor: async () => {
                return this.Monitor.TransformMonitor(await T.invoke("GetPrimaryMonitor"))
            },
            TransformMonitor: (monitor: Record<string, unknown>) => {
                return {
                    ...monitor,
                    Capture: async () => {
                        const time = Time.GetTime(null, true, '-', '-').replaceAll(' ', '_')
                        if (await T.invoke("CaptureMonitor", { id: monitor.id, path: await this.Resource.GetPathByName(`Images/Capture-${time}.webp`, false) })) {
                            return await this.Resource.GetPathByName(`Images/Capture-${time}.webp`, false)
                        }
                        return Promise.resolve("")
                    }
                }
            }
        }
    }

    public get Wallpaper() {
        return {
            GetWallpaper: () => {
                return T.invoke("GetWallpaper")
            },
            SetWallpaper: async (path: string, mode: number = 1) => {
                if (await this.Resource.IsPathExists(path) && path.indexOf('.png') != -1) {
                    await T.invoke("SetWallpaper", { path, mode })
                    return Promise.resolve(true)
                }
                else {
                    return Promise.resolve(false)
                }
            }
        }
    }

    public get Store() {
        return {
            Create: async (name: string) => {
                const path = await this.Resource.GetPathByName(`Data/${name}.dat`, false)
                const store = new St.Store(path)
                if (await this.Resource.IsPathExists(path)) {
                    await store.load()
                }
                return {
                    instance: store,
                    Set: (key: string, value: unknown) => {
                        return store.set(key, value)
                    },
                    Get: (key: string) => {
                        return store.get(key)
                    },
                    Has: (key: string) => {
                        return store.has(key)
                    },
                    Delete: (key: string) => {
                        return store.delete(key)
                    },
                    Keys: () => {
                        return store.keys()
                    },
                    Values: () => {
                        return store.values()
                    },
                    Entries: () => {
                        return store.entries()
                    },
                    Length: () => {
                        return store.length()
                    },
                    Clear: () => {
                        return store.clear()
                    },
                    Save: () => {
                        return store.save()
                    }
                }
            },
        }
    }

    public get Image() {
        return {
            ConvertImageFormat: (originPath: string, convertPath: String, options: Record<string, unknown> = {}) => {
                const o = {
                    format: options.format || this.ImageFormat.WebP,
                    keepAspectRatio: options.keepAspectRatio == false ? false : true,
                    width: options.width || 0,
                    height: options.height || 0,
                    filter: options.filter || this.ImageFilter.Nearest,
                }
                return T.invoke("ConvertImageFormat", { originPath, convertPath, options: o })
            }
        }
    }

    public get Automatic() {
        return {
            GetMousePosition: () => {
                return T.invoke("GetMousePosition")
            },
            SetMousePosition: (x: number, y: number) => {
                return T.invoke("SetMousePosition", { x, y })
            },
            SetButtonClick: (button: number) => {
                return T.invoke("SetButtonClick", { button })
            },
            SetButtonToggle: (button: number, down: boolean) => {
                return T.invoke("SetButtonToggle", { button, down })
            },
            SetMouseScroll: (direction: number, clicks: number) => {
                return T.invoke("SetMouseScroll", { direction, clicks })
            },
            GetColorFromPosition: (x: number, y: number) => {
                return T.invoke("GetColorFromPosition", { x, y })
            },
            GetCurrentPositionColor: () => {
                return T.invoke("GetCurrentPositionColor")
            },
            WriteText: async (content: string, paste: boolean = false) => {
                await this.Clipboard.WriteText(content)
                return T.invoke("WriteText", { content, paste })
            },
            SetKeysToggle: (toggleKeys: Array<{ key: number, down: boolean }>) => {
                return T.invoke("SetKeysToggle", { toggleKeys })
            },
            SetKeysClick: (keys: Array<number>) => {
                return T.invoke("SetKeysClick", { keys })
            }
        }
    }

    public get Tray() {
        return {
            SetTrayIcon: (icon: string) => {
                return T.invoke("SetTrayIcon", { icon })
            },
            SetTrayTooltip: (tooltip: string) => {
                return T.invoke("SetTrayTooltip", { tooltip })
            },
            Flash: async (icon: string) => {
                let show = true
                const emptyIcon = await this.Resource.GetPathByName("Images/empty.ico", false)
                this.flashTimer = setInterval(() => {
                    if (show) {
                        T.invoke("SetTrayIcon", { icon: emptyIcon })
                    }
                    else {
                        T.invoke("SetTrayIcon", { icon })
                    }
                    show = !show
                }, 700)
            },
            StopFlash: (icon: string) => {
                if (this.flashTimer) {
                    clearInterval(this.flashTimer)
                    this.flashTimer = null
                }
                return T.invoke("SetTrayIcon", { icon })
            },
        }
    }

    public get Event() {
        return {
            Listen: E.listen,
            Once: E.once,
            Emit: E.emit,
            TauriEvent: {
                ...E.TauriEvent,
                TAURI: "tauri://tauri"
            }
        }
    }

    public get KeyboardKey() {
        return {
            Num0: 0,
            Num1: 1,
            Num2: 2,
            Num3: 3,
            Num4: 4,
            Num5: 5,
            Num6: 6,
            Num7: 7,
            Num8: 8,
            Num9: 9,
            A: 10,
            B: 11,
            C: 12,
            D: 13,
            E: 14,
            F: 15,
            G: 16,
            H: 17,
            I: 18,
            J: 19,
            K: 20,
            L: 21,
            M: 22,
            N: 23,
            O: 24,
            P: 25,
            Q: 26,
            R: 27,
            S: 28,
            T: 29,
            U: 30,
            V: 31,
            W: 32,
            X: 33,
            Y: 34,
            Z: 35,
            Add: 36,
            Subtract: 37,
            Multiply: 38,
            Divide: 39,
            OEM2: 40,
            Tab: 41,
            CapsLock: 42,
            Shift: 43,
            Control: 44,
            Alt: 45,
            Space: 46,
            Backspace: 47,
            Return: 48,
            Escape: 49,
            UpArrow: 50,
            DownArrow: 51,
            LeftArrow: 52,
            RightArrow: 53,
        }
    }

    public get WallpaperMode() {
        return {
            Center: 0,
            Crop: 1,
            Fit: 2,
            Span: 3,
            Stretch: 4,
            Tile: 5,
        }
    }

    public get MouseButton() {
        return {
            Left: 0,
            Middle: 1,
            Right: 2
        }
    }

    public get ImageFormat() {
        return {
            Png: 0,
            Jpeg: 1,
            Gif: 2,
            WebP: 3,
            Pnm: 4,
            Tiff: 5,
            Tga: 6,
            Dds: 7,
            Bmp: 8,
            Ico: 9,
            Hdr: 10,
            OpenExr: 11,
            Farbfeld: 12,
            Avif: 13,
            Qoi: 14,
        }
    }

    public get ImageFilter() {
        return {
            Nearest: 0,
            Triangle: 1,
            CatmullRom: 2,
            Gaussian: 3,
            Lanczos3: 4,
        }
    }

    public get ScrollDirection() {
        return {
            Down: 0,
            Up: 1,
        }
    }

    public get RendererEvent() {
        return {
            Message: 'Message',
            SecondInstance: 'SecondInstance',
            WidgetCreate: 'WidgetCreate',
            WidgetDestroy: 'WidgetDestroy',
            WidgetEmpty: 'WidgetEmpty',
            FileDrop: 'FileDrop',
            Resize: 'Resize',
        }
    }

    public async Run() {
        if (!window.Renderer) {
            //@ts-ignore
            window.Renderer = this
        }
        this.CreateEvents()
        this.ListenEvents()
        await this.Limit()
        await this.Process()
        await this.State()
    }

    private CreateEvents() {
        this.AddKey(this.RendererEvent.Message)
        this.AddKey(this.RendererEvent.SecondInstance)
        this.AddKey(this.RendererEvent.WidgetCreate)
        this.AddKey(this.RendererEvent.WidgetDestroy)
        this.AddKey(this.RendererEvent.WidgetEmpty)
        this.AddKey(this.RendererEvent.FileDrop)
        this.AddKey(this.RendererEvent.Resize)
    }

    private ListenEvents() {
        this.Event.Listen<Record<string, unknown>>(this.Event.TauriEvent.TAURI, (e) => {
            const r = e.payload
            if (r.event == this.RendererEvent.SecondInstance) {
                this.Emit(this.RendererEvent.SecondInstance, r)
            }
            else if (r.event == this.RendererEvent.WidgetCreate) {
                this.Emit(this.RendererEvent.WidgetCreate, r)
            }
            else if (r.event == this.RendererEvent.WidgetDestroy) {
                this.Emit(this.RendererEvent.WidgetDestroy, r)
            }
            else if (r.event == this.RendererEvent.WidgetEmpty) {
                this.Emit(this.RendererEvent.WidgetEmpty, r)
            }
            this.Emit(this.RendererEvent.Message, r)
        })
        this.Event.Listen<Array<string>>(this.Event.TauriEvent.WINDOW_FILE_DROP, async (e) => {
            this.Emit(this.RendererEvent.FileDrop, {
                event: this.RendererEvent.FileDrop,
                extra: {
                    files: await Promise.all(e.payload.map(async (c) => {
                        return {
                            ...await this.Resource.GetPathMetadata(c),
                            path: c
                        }
                    }))
                }
            })
        })
    }

    private async Limit() {
        const path = await this.Resource.GetPathByName(`Configs/${import.meta.env.PROD ? 'Production' : 'Development'}.json`, false)
        const json = JSON.parse(await this.Resource.ReadStringFromFile(path))
        if (!json.debug) {
            window.addEventListener('contextmenu', (e) => {
                e.preventDefault()
            })
        }

    }

    private async Process() {
        const dir = this.GetHrefDir()
        const p = await this.Resource.GetPathByName(`Scripts/${dir}`, false)
        if (await this.Resource.IsPathExists(p)) {
            const files = await this.Resource.ReadDirFiles(p)
            for (let f of files) {
                if (f.name?.indexOf('.js') != -1) {
                    let script = document.createElement("script");
                    script.type = "module";
                    script.src = await this.Resource.GetPathByName(`Scripts/${dir}/${f.name}`);
                    document.body.appendChild(script);
                }
            }
        }
    }

    private GetHrefDir() {
        const href = location.href
        if (href.indexOf("Application") != -1) {
            return 'Application'
        }
        else if (href.indexOf("Tray") != -1) {
            return 'Tray'
        }
        else {
            return 'Application'
        }
    }

    private async State() {
        if (W.appWindow.label == "Application") {
            W.appWindow.onCloseRequested((e) => {
                W.appWindow.hide()
                e.preventDefault()
            })
            let isStart = true
            W.appWindow.onResized(async (e) => {
                if (isStart) {
                    isStart = false
                    await this.Widget.SetSize(parseInt(localStorage.getItem("width") || '1000'), parseInt(localStorage.getItem("height") || '560'))
                    await this.Widget.Center()
                }
                else {
                    localStorage.setItem("width", `${e.payload.width}`)
                    localStorage.setItem("height", `${e.payload.height}`)
                    this.Emit(this.RendererEvent.Resize, {
                        event: this.RendererEvent.Resize,
                        extra: {
                            width: e.payload.width,
                            height: e.payload.height,
                        }
                    })
                }
            })
        }
    }
}

export { Renderer }