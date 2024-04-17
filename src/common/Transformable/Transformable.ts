
import { AActor } from "@render/libs/AActor"
import { onMounted, onUnmounted, ref } from "vue"

class Transformable extends AActor {
    public constructor(x: number, y: number) {
        super()
        this.originX = x
        this.originY = y
    }

    private originX = 0
    private originY = 0

    private dom = ref<HTMLSpanElement | null>(null)

    private isMoveable = ref<boolean>(false)

    private lastPoint = {
        x: 0,
        y: 0
    }

    private delta = {
        x: 0,
        y: 0
    }

    private result = {
        x: 0,
        y: 0
    }

    private scale = 1

    private minScale = 0.1

    private maxScale = 10

    public InitStates() {
        return {
            dom: this.dom,
        }
    }

    public InitHooks() {

    }

    public Run() {
        onMounted(() => {
            this.ListenEvents()
            this.SetDefault()
        })

        onUnmounted(() => {
            this.Destroy()
        })
    }

    protected Destroy() {

    }


    private ListenEvents() {
        if (this.dom.value) {
            this.dom.value.addEventListener('wheel', (ev) => {
                this.OnWheel(ev)
            })

            this.dom.value.onmousedown = (ev: MouseEvent) => {
                this.OnMouseDown(ev)
            }
            this.dom.value.onmouseup = (ev: MouseEvent) => {
                this.OnMouseUp(ev)
            }
            this.dom.value.onmousemove = (ev: MouseEvent) => {
                this.OnMouseMove(ev)
            }

            this.dom.value.onmouseleave = (ev: MouseEvent) => {
                this.isMoveable.value = false
            }
        }
    }

    private OnWheel(e: WheelEvent) {
        // 下面这段 别问我 我可能已经忘了 ......
        if (this.dom.value) {
            let ratio = 1.1;
            // 缩小
            if (e.deltaY > 0) {
                ratio = 1 / 1.1;
            }
            const _scale = this.scale * ratio;
            if (_scale > this.maxScale) {
                ratio = this.maxScale / this.scale;
                this.scale = this.maxScale;
            }
            else if (_scale < this.minScale) {
                ratio = this.minScale / this.scale;
                this.scale = this.minScale;
            }
            else {
                this.scale = _scale;
            }
            // this.dom.value.offsetWidth  this.dom.value.offsetHeight 可能会有问题
            const origin = {
                x: (ratio - 1) * this.dom.value.offsetWidth * 0.5,
                y: (ratio - 1) * this.dom.value.offsetHeight * 0.5
            };
            // 计算偏移量
            this.result.x -= (ratio - 1) * (e.clientX - this.result.x) - origin.x;
            this.result.y -= (ratio - 1) * (e.clientY - this.result.y) - origin.y;
            this.dom.value.style.transform = 'translate3d(' + this.result.x + 'px, ' + this.result.y + 'px, 0) scale(' + this.scale + ')';
        }
    }

    public OnMouseDown(ev: MouseEvent) {
        if (this.dom.value) {
            this.isMoveable.value = true
            this.lastPoint.x = ev.clientX
            this.lastPoint.y = ev.clientY
        }
    }

    public OnMouseUp(ev: MouseEvent) {
        if (this.dom.value) {
            this.isMoveable.value = false
        }
    }

    public OnMouseMove(ev: MouseEvent) {
        if (this.isMoveable.value && this.dom.value) {

            const c = { x: ev.clientX, y: ev.clientY };
            this.delta.x = c.x - this.lastPoint.x;
            this.delta.y = c.y - this.lastPoint.y;
            this.lastPoint.x = c.x
            this.lastPoint.y = c.y
            this.result.x += this.delta.x;
            this.result.y += this.delta.y;

            this.dom.value.style.transform = 'translate3d(' + this.result.x + 'px, ' + this.result.y + 'px, 0) scale(' + this.scale + ')';
        }
    }

    private SetDefault() {
        if (this.dom.value) {
            this.delta.x = this.originX - this.lastPoint.x;
            this.delta.y = this.originY - this.lastPoint.y;
            this.lastPoint.x = this.originX
            this.lastPoint.y = this.originY
            this.result.x += this.delta.x;
            this.result.y += this.delta.y;
            this.dom.value.style.transform = 'translate3d(' + this.result.x + 'px, ' + this.result.y + 'px, 0) scale(' + this.scale + ')';
        }
    }
}

export { Transformable }