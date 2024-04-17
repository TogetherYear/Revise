import { onMounted, onUnmounted } from 'vue'
import { AActor } from '@/libs/AActor'
import { App } from '@/App'

class HeaderBar extends AActor {
    public constructor() {
        super()
    }

    public async OnOptionClick(btn: string, type: string) {
        if (btn == 'Min') {
            await Renderer.Widget.Min()
        }
        else if (btn == 'Max') {
            App.Instance.isMax.value = !App.Instance.isMax.value
            await Renderer.Widget.Max()
        }
        else if (btn == 'Close') {
            if (type == 'main') {
                await Renderer.Widget.Hide()
            }
            else {
                await Renderer.Widget.Close()
            }

        }
    }

    public InitStates() {
        return {

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
}

export { HeaderBar }
