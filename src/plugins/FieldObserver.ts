import { EventSystem } from "@/libs/EventSystem"

interface IObserver {
    dom: HTMLElement,
    /**
     * 默认 true 只监听一次
     */
    once?: boolean,
    OnShow?: () => void,
    OnHide?: () => void,
}

class Observer {
    constructor(options: IObserver) {
        this.options = options
        this.CreateObserver()
    }

    private options!: IObserver

    private observer: IntersectionObserver | null = null

    private isEnter = false

    private CreateObserver() {
        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio <= 0) {
                this.Hide()
            }
            else {
                this.Show()
            }
        })
        this.observer.observe(this.options.dom)
    }

    private Show() {
        if (!this.isEnter) {
            this.isEnter = true
            this.options.OnShow && this.options.OnShow()
            if (this.options.once == undefined || this.options.once == true) {
                this.Destroy()
            }
        }

    }

    private Hide() {
        if (this.isEnter) {
            this.isEnter = false
            this.options.OnHide && this.options.OnHide()
        }
    }

    public Destroy() {
        if (this.observer) {
            this.observer.unobserve(this.options.dom)
            this.observer = null
        }
    }
}

class FieldObserver extends EventSystem {
    private constructor() { super() }

    private static instance = new FieldObserver()

    public static get Instance() { return this.instance }

    public Run() {
        if (!window.FieldObserver) {
            //@ts-ignore
            window.FieldObserver = this
        }
    }

    public Generate(options: IObserver) {
        return new Observer(options)
    }
}

export { FieldObserver }