import { onMounted, onUnmounted, ref } from "vue"
import { Suspend } from "../../Suspend"

class Fix {
    public constructor() {

    }

    private dom = ref<HTMLSpanElement | null>(null)

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
            this.ToSetFix()
        })

        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {

    }

    private async SetTransform() {
        await Renderer.Widget.SetPosition(Suspend.Instance.currentTransform.x, Suspend.Instance.currentTransform.y)
        await Renderer.Widget.SetSize(Suspend.Instance.currentTransform.width, Suspend.Instance.currentTransform.height)
        await Renderer.Widget.SetShadow(true)
        await Renderer.Widget.Show()
    }

    private ToSetFix() {
        if (this.dom.value) {
            this.dom.value.appendChild(Suspend.Instance.currentImage)
        }
    }
}

export { Fix }