import { onMounted, onUnmounted, reactive, ref } from "vue"
import { Suspend } from "../../Suspend"
import { Mathf } from "@/libs/Mathf"

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
        width: 500,
        height: 40
    })

    public InitStates() {
        return {
            isShow: this.isShow,
            transform: this.transform,
            dom: this.dom,
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

    }
}

export { Function }