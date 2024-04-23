import { onMounted, onUnmounted, reactive, ref } from "vue"
import { Mathf } from "@/libs/Mathf"
import fixIcon from '@/assets/images/fix.png'
import { Draw } from "../../Draw"
import { SuspendType } from "../../../../Type"
import { Suspend } from "../../../../Suspend"

class Function {
    public constructor(parent: Draw) {
        this.parent = parent
    }

    private parent!: Draw

    public isShow = ref<boolean>(false)

    private dom = ref<HTMLSpanElement | null>(null)

    private transform = reactive({
        left: 0,
        top: 0,
        width: 96,
        height: 32
    })

    private btns = ref<Array<SuspendType.IFunctionBtn>>([
        {
            icon: fixIcon,
            label: "粘贴到屏幕上",
            type: SuspendType.FunctionBtnType.Fix
        }
    ])

    public InitStates() {
        return {
            isShow: this.isShow,
            transform: this.transform,
            dom: this.dom,
            btns: this.btns,
        }
    }

    public InitHooks() {

    }

    public Run() {
        onMounted(() => {

        })

        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {

    }

    public UpdateTransform() {
        const t = this.parent.GetEraserTransform()
        this.transform.left = t.x + t.width - this.transform.width - 10
        this.transform.top = t.y + t.height - this.transform.height - 10
    }

    public OnClickBtn(e: SuspendType.IFunctionBtn) {
        if (e.type == SuspendType.FunctionBtnType.Fix) {
            this.ToFix()
        }
    }

    private async ToFix() {
        this.parent.back.UpdateCornerVisible(false)
        this.parent.L.nextRender(() => {
            const t = this.parent.GetEraserTransform()
            const canvas = document.createElement('canvas')
            canvas.width = t.width
            canvas.height = t.height
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
            const originImageData = (this.parent.L.canvas.context.canvas.getContext('2d') as CanvasRenderingContext2D).getImageData(t.x, t.y, t.width, t.height)
            ctx.putImageData(originImageData, 0, 0)
            const image = new Image()
            image.style.position = 'absolute'
            image.style.width = '100%'
            image.style.height = '100%'
            image.style.left = '0px'
            image.style.top = '0px'
            image.style.pointerEvents = 'none'
            image.src = canvas.toDataURL('image/webp', 1.0)
            image.onload = () => {
                Suspend.Instance.OnNeedFix({
                    x: t.x,
                    y: t.y + this.parent.current.y,
                    width: t.width,
                    height: t.height
                }, image)
            }
        })

    }
}

export { Function }