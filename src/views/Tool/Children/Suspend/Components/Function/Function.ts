import { onMounted, onUnmounted, reactive, ref } from "vue"
import { Suspend } from "../../Suspend"
import { Mathf } from "@/libs/Mathf"
import fixIcon from '@/assets/images/fix.png'
import { SuspendType } from '../../Type'

class Function {
    public constructor(parent: Suspend) {
        this.parent = parent
    }

    private parent!: Suspend

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
        const t = this.parent.draw.GetEraserTransform()
        this.transform.left = t.x + t.width - this.transform.width - 10
        this.transform.top = t.y + t.height - this.transform.height - 10
    }

    public OnClickBtn(e: SuspendType.IFunctionBtn) {
        if (e.type == SuspendType.FunctionBtnType.Fix) {
            this.ToFix()
        }
    }

    private async ToFix() {
        const t = this.parent.draw.GetEraserTransform()
        const ms = this.parent.draw.target.monitor.sort((a, b) => a.x - b.x)
        const need: Array<SuspendType.IFixItem> = []
        let w = t.x + t.width
        if (ms.length == 1) {
            need.push({
                id: ms[0].id,
                x: t.x,
                y: t.y + this.parent.draw.current.y - ms[0].y,
                width: t.width,
                height: t.height
            })
        }
        else if (ms.length == 2) {
            for (let m of ms) {
                if (w > m.width) {
                    need.push({
                        id: m.id,
                        x: t.x,
                        y: t.y + this.parent.draw.current.y - m.y,
                        width: m.width - t.x,
                        height: t.height
                    })
                    w -= m.width
                }
                else {
                    if (w > 0) {
                        need.push({
                            id: m.id,
                            x: 0,
                            y: t.y + this.parent.draw.current.y - m.y,
                            width: w,
                            height: t.height
                        })
                        w = -1
                    }
                }
            }
        }
        else {

        }
    }
}

export { Function }