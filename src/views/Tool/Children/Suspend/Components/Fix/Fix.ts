import { onMounted, onUnmounted, ref } from "vue"
import { Suspend } from "../../Suspend"
import { SuspendType } from "../../Type"
import { Mathf } from "@/libs/Mathf"

class Fix {
    public constructor() {

    }

    private dom = ref<HTMLSpanElement | null>(null)

    private currentScale = ref<number>(1.0)

    public InitStates() {
        return {
            dom: this.dom,
        }
    }

    public InitHooks() {

    }

    public Run() {
        onMounted(async () => {
            await this.SetTransform()
            this.ListenEvents()
        })

        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {

    }

    private async SetTransform() {
        if (this.dom.value) {
            this.dom.value.appendChild(Suspend.Instance.currentImage)
        }
        await Renderer.Widget.SetPosition(Suspend.Instance.currentTransform.x - 10, Suspend.Instance.currentTransform.y - 10)
        await Renderer.Widget.SetSize(Suspend.Instance.currentTransform.width + 20, Suspend.Instance.currentTransform.height + 20)
        await Renderer.Widget.SetAlwaysOnTop(true)
        await Renderer.Widget.Show()
    }

    private ListenEvents() {
        if (this.dom.value) {
            this.dom.value.addEventListener('wheel', async (e) => {
                await this.OnWheel(e.deltaY > 0 ? SuspendType.WheelDirection.Down : SuspendType.WheelDirection.Up)
            })
        }
    }

    private async OnWheel(type: SuspendType.WheelDirection) {
        this.currentScale.value = Mathf.Clamp(0.1, 10, this.currentScale.value - (type == SuspendType.WheelDirection.Down ? 0.1 : -0.1))
        const newSize = {
            width: Suspend.Instance.currentTransform.width * this.currentScale.value,
            height: Suspend.Instance.currentTransform.height * this.currentScale.value,
        }
        await Renderer.Widget.SetSize(newSize.width, newSize.height)
    }
}

export { Fix }