import { onMounted, onUnmounted, reactive, ref } from "vue"
import { Mathf } from "@/libs/Mathf"
import fixIcon from '@/assets/images/fix.png'
import saveIcon from '@/assets/images/save.png'
import copyIcon from '@/assets/images/copy.png'
import pathIcon from '@/assets/images/path.png'
import grayIcon from '@/assets/images/gray.png'
import eraserIcon from '@/assets/images/eraser.png'
import printIcon from '@/assets/images/print.png'
import cutIcon from '@/assets/images/cut.png'
import { Draw } from "../../Draw"
import { SuspendType } from "../../../../Type"
import { Suspend } from "../../../../Suspend"
import { Time } from "@/libs/Time"

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
        width: 256,
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
        {
            icon: pathIcon,
            label: "暂无",
            type: SuspendType.FunctionBtnType.Path
        },
        {
            icon: grayIcon,
            label: "暂无",
            type: SuspendType.FunctionBtnType.Path
        },
        {
            icon: eraserIcon,
            label: "暂无",
            type: SuspendType.FunctionBtnType.Eraser
        },
        {
            icon: printIcon,
            label: "暂无",
            type: SuspendType.FunctionBtnType.Print
        },
        {
            icon: cutIcon,
            label: "暂无",
            type: SuspendType.FunctionBtnType.Cut
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
        this.transform.left = Mathf.Clamp(10, Number.MAX_SAFE_INTEGER, t.x + t.width - this.transform.width - 10)
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
        else if (e.type == SuspendType.FunctionBtnType.Path) {

        }
        else if (e.type == SuspendType.FunctionBtnType.Gray) {

        }
        else if (e.type == SuspendType.FunctionBtnType.Eraser) {

        }
        else if (e.type == SuspendType.FunctionBtnType.Print) {

        }
        else if (e.type == SuspendType.FunctionBtnType.Cut) {

        }
    }

    private ToGetCanvasBase64(callback: (url: string, t: SuspendType.FixTransform) => void) {
        this.parent.back.UpdateCornerVisible(false)
        this.parent.L.nextRender(() => {
            const t = this.parent.GetEraserTransform()
            const canvas = document.createElement('canvas')
            canvas.width = t.width
            canvas.height = t.height
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
            const originImageData = (this.parent.L.canvas.context.canvas.getContext('2d') as CanvasRenderingContext2D).getImageData(t.x, t.y, t.width, t.height)
            ctx.putImageData(originImageData, 0, 0)
            const base64 = canvas.toDataURL('image/webp', 1.0)
            callback(base64, t)
        })
    }

    private async ToFix() {
        this.ToGetCanvasBase64((base64, t) => {
            const image = new Image()
            image.className = "FixImage"
            image.src = base64
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
        this.ToGetCanvasBase64(async (base64, t) => {
            const path = await Renderer.Resource.GetPathByName(`Images/Revise_${Time.GetTime(null, true, '-', '-')}.webp`, false)
            const result = await Renderer.Resource.GetSaveResources({
                title: "选择保存图片路径",
                defaultPath: path,
                filters: [
                    {
                        name: '去码头整点薯条',
                        extensions: ['webp']
                    }
                ]
            })
            if (result) {
                await Renderer.Event.Emit(Renderer.Event.TauriEvent.TAURI, { event: Renderer.RendererEvent.Suspend, extra: { type: 'save', format: 'file', url: result } })
                await Renderer.Image.SaveFileFromBase64(base64, result)
                await Renderer.Widget.SetSize(0, 0)
                await Renderer.Widget.Close()
            }
        })
    }

    private async ToCopy() {
        this.ToGetCanvasBase64(async (base64, t) => {
            await Renderer.Event.Emit(Renderer.Event.TauriEvent.TAURI, { event: Renderer.RendererEvent.Suspend, extra: { type: 'copy', format: 'base64', url: base64 } })
            await Renderer.Clipboard.WriteText(base64)
            await Renderer.Widget.SetSize(0, 0)
            await Renderer.Widget.Close()
        })
    }
}

export { Function }