import { onMounted, onUnmounted, ref } from "vue"
import { Suspend } from "../../Suspend"
import { SuspendType } from "../../Type"
import { Mathf } from "@/libs/Mathf"

class Fix {
    public constructor() {

    }

    private container = ref<HTMLSpanElement | null>(null)

    private dom = ref<HTMLSpanElement | null>(null)

    private currentScale = ref<number>(1.0)

    private scaleTimer: NodeJS.Timeout | null = null

    private isShowInfo = ref<boolean>(false)

    private currentOpacity = ref<number>(1.0)

    private isCtrl = false

    private move = {
        w: false,
        s: false,
        a: false,
        d: false
    }

    public InitStates() {
        return {
            dom: this.dom,
            currentScale: this.currentScale,
            container: this.container,
            isShowInfo: this.isShowInfo,
            currentOpacity: this.currentOpacity,
        }
    }

    public InitHooks() {

    }

    public Run() {
        onMounted(async () => {
            await this.SetTransform()
            this.ListenEvents()
            this.FrameUpdate()
        })

        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {

    }

    private async SetTransform() {
        if (this.container.value) {
            this.container.value.appendChild(Suspend.Instance.currentImage)
        }
        await Renderer.Widget.SetPosition(Suspend.Instance.currentTransform.x - 10, Suspend.Instance.currentTransform.y - 10)
        await Renderer.Widget.SetSize(Suspend.Instance.currentTransform.width + 20, Suspend.Instance.currentTransform.height + 20)
        await Renderer.Widget.SetAlwaysOnTop(true)
        await Renderer.Widget.Show()
    }

    private ListenEvents() {
        window.addEventListener('keydown', (e) => {
            this.OnKeyDown(e)
        })
        window.addEventListener('keyup', (e) => {
            this.OnKeyUp(e)
        })
        if (this.dom.value) {
            this.dom.value.addEventListener('wheel', async (e) => {
                await this.OnWheel(e.deltaY > 0 ? SuspendType.WheelDirection.Down : SuspendType.WheelDirection.Up)
            })
        }
    }

    private OnKeyDown(e: KeyboardEvent) {
        if (e.key == 'Control') {
            this.isCtrl = true
        }
        else if (e.key == 'w' || e.key == 'W' || e.key == 'ArrowUp') {
            this.move.w = true
        }
        else if (e.key == 's' || e.key == 'S' || e.key == 'ArrowDown') {
            this.move.s = true
        }
        else if (e.key == 'a' || e.key == 'A' || e.key == 'ArrowLeft') {
            this.move.a = true
        }
        else if (e.key == 'd' || e.key == 'D' || e.key == 'ArrowRight') {
            this.move.d = true
        }
    }

    private OnKeyUp(e: KeyboardEvent) {
        if (e.key == 'Control') {
            this.isCtrl = false
        }
        else if (e.key == 'w' || e.key == 'W' || e.key == 'ArrowUp') {
            this.move.w = false
        }
        else if (e.key == 's' || e.key == 'S' || e.key == 'ArrowDown') {
            this.move.s = false
        }
        else if (e.key == 'a' || e.key == 'A' || e.key == 'ArrowLeft') {
            this.move.a = false
        }
        else if (e.key == 'd' || e.key == 'D' || e.key == 'ArrowRight') {
            this.move.d = false
        }
    }

    private async OnWheel(type: SuspendType.WheelDirection) {
        this.isShowInfo.value = true

        if (this.isCtrl) {
            this.currentOpacity.value = Mathf.Clamp(0.1, 1.0, this.currentOpacity.value - (type == SuspendType.WheelDirection.Down ? 0.05 : -0.05))
        }
        else {
            this.currentScale.value = Mathf.Clamp(0.1, 10, this.currentScale.value - (type == SuspendType.WheelDirection.Down ? 0.1 : -0.1))
            const newSize = {
                width: Suspend.Instance.currentTransform.width * this.currentScale.value,
                height: Suspend.Instance.currentTransform.height * this.currentScale.value,
            }
            await Renderer.Widget.SetSize(newSize.width, newSize.height)
        }
        if (this.scaleTimer) {
            clearTimeout(this.scaleTimer)
        }
        this.scaleTimer = setTimeout(() => {
            this.isShowInfo.value = false
        }, 1000);

    }

    private FrameUpdate() {
        requestAnimationFrame(async () => {
            if (this.move.w || this.move.s || this.move.a || this.move.d) {
                let deltaX = 0
                let deltaY = 0
                deltaX += this.move.a ? -1 : 0
                deltaX += this.move.d ? 1 : 0
                deltaY += this.move.w ? -1 : 0
                deltaY += this.move.s ? 1 : 0
                const position = await Renderer.Widget.GetPosition()
                await Renderer.Widget.SetPosition(position.x + deltaX, position.y + deltaY)
            }
            this.FrameUpdate()
        })
    }
}

export { Fix }