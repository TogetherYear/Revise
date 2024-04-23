import { onMounted, onUnmounted, reactive, ref } from "vue"
import { Mathf } from "@/libs/Mathf"
import fixIcon from '@/assets/images/fix.png'
import saveIcon from '@/assets/images/save.png'
import copyIcon from '@/assets/images/copy.png'
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
        },
        {
            icon: saveIcon,
            label: "保存为文件",
            type: SuspendType.FunctionBtnType.Save
        },
        {
            icon: copyIcon,
            label: "复制为base64",
            type: SuspendType.FunctionBtnType.Copy
        },
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
        else if (e.type == SuspendType.FunctionBtnType.Save) {
            this.ToSave()
        }
        else if (e.type == SuspendType.FunctionBtnType.Copy) {
            this.ToCopy()
        }
    }

    private ToGetUrl(callback: (url: string, t: SuspendType.FixTransform) => void) {
        this.parent.back.UpdateCornerVisible(false)
        this.parent.L.nextRender(() => {
            const t = this.parent.GetEraserTransform()
            const canvas = document.createElement('canvas')
            canvas.width = t.width
            canvas.height = t.height
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
            const originImageData = (this.parent.L.canvas.context.canvas.getContext('2d') as CanvasRenderingContext2D).getImageData(t.x, t.y, t.width, t.height)
            ctx.putImageData(originImageData, 0, 0)
            const url = canvas.toDataURL('image/webp', 1.0)
            callback(url, t)
        })
    }

    private async ToFix() {
        this.ToGetUrl((url, t) => {
            const image = new Image()
            image.className = "FixImage"
            image.src = url
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

    private async ToSave() {

    }

    private async ToCopy() {
        this.ToGetUrl(async (url, t) => {
            await Renderer.Clipboard.WriteText(url)
            await Renderer.Widget.SetSize(0, 0)
            await Renderer.Widget.Close()
        })
    }
}

export { Function }