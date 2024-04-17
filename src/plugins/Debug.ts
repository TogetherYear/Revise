/**
 * 调试信息
 */
class Debug {
    private constructor() { }

    private static instance = new Debug()

    public static get Instance() { return this.instance }

    public mode = import.meta.env.MODE == 'development' ? 0 : 1

    public get IsProd() { return this.mode == 1 }

    public Run() {
        if (!window.Debug) {
            window.Debug = this
        }
    }

    public Log(...args: Array<unknown>) {
        if (this.mode == 0) {
            console.log("%c Log: ", 'color:#80ff80;font-size:14px;line-height:20px;background:rgba(255,255,255,0.1);border-radius:2px;', ...args)
        }
    }

    public Warn(...args: Array<unknown>) {
        if (this.mode == 0) {
            console.log("%c Warn: ", 'color:#ffff80;font-size:14px;line-height:20px;background:rgba(255,255,255,0.1);border-radius:2px;', ...args)
        }
    }

    public Error(...args: Array<unknown>) {
        if (this.mode == 0) {
            console.log("%c Error: ", 'color:#ff8080;font-size:14px;line-height:20px;background:rgba(255,255,255,0.1);border-radius:2px;', ...args)
        }
    }

    public Clear() {
        if (this.mode == 0) {
            console.clear()
        }
    }

}

export { Debug }