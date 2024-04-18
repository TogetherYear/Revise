import { onMounted, onUnmounted } from "vue"
import { Scene } from "./Components/Scene/Scene"
import { Hierarchy } from "./Components/Hierarchy/Hierarchy"
import { Inspector } from "./Components/Inspector/Inspector"
import { Resource } from "./Components/Resource/Resource"

class Operate {
    public constructor() {

    }

    public scene = new Scene(this)

    public hierarchy = new Hierarchy(this)

    public inspector = new Inspector(this)

    public resource = new Resource(this)

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

export { Operate }