import { onMounted, onUnmounted, ref } from "vue"
import { Operate } from "../Operate"
import * as L from 'leafer-ui'
import { Frame } from "./Core/Frame"
import { Image } from "./Core/Image"

class Area {
    public constructor(parent: Operate) {
        this.parent = parent
    }

    private parent!: Operate

    private dom = ref<HTMLSpanElement | null>(null)

    public leafer!: L.Leafer

    public frames = new Map<string, Frame>()

    public InitStates() {
        return {
            dom: this.dom,
        }
    }

    public InitHooks() {

    }

    public Run() {
        onMounted(() => {
            this.CreateLeafer()
            this.ListenEvents()
            this.Test()
        })

        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {

    }

    private CreateLeafer() {
        if (this.dom.value) {
            this.leafer = new L.Leafer({
                view: this.dom.value,
                wheel: { zoomMode: true },
                zoom: { max: 50, min: 0.02 },
                // type: 'draw',
            })

            this.leafer.on_(L.PointerEvent.CLICK, () => {
                Debug.Log(this.leafer.getWorldPointByPage(this.leafer.cursorPoint).x)
            }, this)
        }
    }

    private ListenEvents() {
        Renderer.AddListen(Renderer.RendererEvent.FileDrop, this, this.OnFileDrop)
    }

    public GetCurrentCUrsorPositionInLeafer() {
        return this.leafer.getPagePoint(this.leafer.cursorPoint)
    }

    private async OnFileDrop(e: IT.IRendererSendMessage) {
        if (e.extra && e.extra.files) {
            const files: Array<{ path: string }> = e.extra.files as Array<{ path: string }>
            const position = this.GetCurrentCUrsorPositionInLeafer()
            for (let f of files) {
                if (this.IsImage(f.path)) {
                    const imageFrame = new Frame({
                        area: this,
                        width: 500,
                        height: 500,
                        x: position.x,
                        y: position.y,
                    })
                    imageFrame.AddChild(new Image({
                        area: this,
                        frame: imageFrame,
                        url: Renderer.Resource.ConvertFileSrcToTauri(f.path),
                        OnLoad: (e) => {
                            imageFrame.R.width = e.width
                            imageFrame.R.height = e.height
                            imageFrame.B.R.width = e.width
                            imageFrame.B.R.height = e.height
                        },
                        OnError: () => {
                            Message.error(`图片加载失败：${f.path.split('\\').splice(-1)[0]}`)
                            imageFrame.Delete()
                        }
                    }))
                }
            }
        }
        await Renderer.Widget.Show()
    }

    private IsImage(path: string) {
        const ext = path.split('.').slice(-1)[0].toLowerCase()
        return ['jpg', 'ico', 'png', 'webp'].indexOf(ext) != -1
    }

    private Test() {
        const f1 = new Frame({
            area: this,
            width: 500,
            height: 500,
            fill: "#cc000022"
        })

        const f2 = new Frame({
            area: this,
            width: 500,
            height: 500,
            x: 200,
            y: 200,
            fill: "#00cc0022"
        })

        f2.AddChild(new Image({
            area: this,
            frame: f2,
            url: Renderer.Resource.ConvertFileSrcToTauri("D:/Web/New/Revise/src-tauri/Extra/Images/icon.ico"),
        }))
    }
}

export { Area }