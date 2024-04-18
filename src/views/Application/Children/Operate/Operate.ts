import { onMounted, onUnmounted, reactive, ref } from "vue"
import { Scene } from "./Components/Scene/Scene"
import { Hierarchy } from "./Components/Hierarchy/Hierarchy"
import { Inspector } from "./Components/Inspector/Inspector"
import { Resource } from "./Components/Resource/Resource"
import { OperateType } from "./Type"
import { Mathf } from "@/libs/Mathf"

class Operate {
    public constructor() {

    }

    private operateDom = ref<HTMLSpanElement | null>(null)

    private get OD() {
        return this.operateDom.value as HTMLSpanElement
    }

    public scene = new Scene(this)

    private sceneDom = ref<HTMLSpanElement | null>(null)

    private get SD() {
        return this.sceneDom.value as HTMLSpanElement
    }

    public hierarchy = new Hierarchy(this)

    private hierarchyDom = ref<HTMLSpanElement | null>(null)

    private get HD() {
        return this.hierarchyDom.value as HTMLSpanElement
    }

    public inspector = new Inspector(this)

    private inspectorDom = ref<HTMLSpanElement | null>(null)

    private get ID() {
        return this.inspectorDom.value as HTMLSpanElement
    }

    public resource = new Resource(this)

    private resourceDom = ref<HTMLSpanElement | null>(null)

    private get RD() {
        return this.resourceDom.value as HTMLSpanElement
    }

    private positions = reactive({
        scene: {
            width: 'calc(100% - 520px)',
            height: 'calc(100% - 200px)',
            left: '260px',
        },
        hierarchy: {
            width: '260px',
            height: 'calc(100% - 200px)',
        },
        inspector: {
            width: '260px',
            height: 'calc(100% - 200px)',
        },
        resource: {
            height: '200px',
        },
    })

    public InitStates() {
        return {
            positions: this.positions,
            operateDom: this.operateDom,
            sceneDom: this.sceneDom,
            hierarchyDom: this.hierarchyDom,
            inspectorDom: this.inspectorDom,
            resourceDom: this.resourceDom,
        }
    }

    public InitHooks() {

    }

    public Run() {
        onMounted(() => {
            this.ListenEvents()
        })

        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {
        Renderer.RemoveListen(Renderer.RendererEvent.Resize, this, this.OnResize)
    }

    private ListenEvents() {
        Renderer.AddListen(Renderer.RendererEvent.Resize, this, this.OnResize)
    }

    private OnResize(e: IT.IRendererSendMessage) {
        this.positions.inspector.height = `${this.OD.offsetHeight - this.RD.offsetHeight}px`
        this.positions.hierarchy.height = `${this.OD.offsetHeight - this.RD.offsetHeight}px`
        this.positions.scene.width = `${this.OD.offsetWidth - this.HD.offsetWidth - this.ID.offsetWidth}px`
        this.positions.scene.height = `${this.OD.offsetHeight - this.RD.offsetHeight}px`
    }

    public OnLayoutResize(delta: { x: number, y: number }, layout: OperateType.Layout) {
        if (layout == OperateType.Layout.Hierarchy) {
            this.positions.hierarchy.width = `${Mathf.Clamp(100, Mathf.Clamp(100, this.OD.offsetWidth, this.OD.offsetWidth - this.ID.offsetWidth - 100), this.HD.offsetWidth + delta.x)}px`
        }
        else if (layout == OperateType.Layout.Inspector) {
            this.positions.inspector.width = `${Mathf.Clamp(100, Mathf.Clamp(100, this.OD.offsetWidth, this.OD.offsetWidth - this.HD.offsetWidth - 100), this.ID.offsetWidth - delta.x)}px`
        }
        else if (layout == OperateType.Layout.Resource) {
            this.positions.resource.height = `${Mathf.Clamp(100, Mathf.Clamp(100, this.OD.offsetHeight, this.OD.offsetHeight - 100), this.RD.offsetHeight - delta.y)}px`
            this.positions.hierarchy.height = `${this.OD.offsetHeight - this.RD.offsetHeight}px`
            this.positions.inspector.height = `${this.OD.offsetHeight - this.RD.offsetHeight}px`
        }
        this.CalculateSceneSize()
    }

    private CalculateSceneSize() {
        this.positions.scene.width = `${this.OD.offsetWidth - this.HD.offsetWidth - this.ID.offsetWidth}px`
        this.positions.scene.height = `${this.OD.offsetHeight - this.RD.offsetHeight}px`
        this.positions.scene.left = `${this.HD.offsetWidth}px`
    }
}

export { Operate }