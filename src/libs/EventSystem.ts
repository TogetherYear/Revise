type Callback = (e: Record<string, unknown> | unknown | any) => void

class EventSystem extends Object {
    constructor() { super() }

    /**
     * 长久监听
     */
    private continue: Array<{ key: string, callbacks: Array<{ scope: Object, callback: Callback }> }> = []

    /**
     * 临时监听
     */
    private temporary: Array<{ key: string, callbacks: Array<{ scope: Object, callback: Callback }> }> = []

    /**
     * 返回长久事件集合
     */
    public get C(): Array<{ key: string, callbacks: Array<{ scope: Object, callback: Callback }> }> {
        return this.continue
    }

    /**
     * 返回临时事件集合
     */
    public get T(): Array<{ key: string, callbacks: Array<{ scope: Object, callback: Callback }> }> {
        return this.temporary
    }

    /**
     * @author Together
     * @param key 事件名称
     * @description 添加事件
     */
    public AddKey(key: string) {
        let cc = this.continue.find(ci => ci.key === key)
        let tc = this.temporary.find(ti => ti.key === key)
        if (!cc && !tc) {
            this.continue.push({ key: key, callbacks: [] })
            this.temporary.push({ key: key, callbacks: [] })
        }
        else {
            console.error("事件已存在!")
        }
    }

    /**
     * @author Together
     * @param key 事件名称
     * @description 删除事件
     */
    public RemoveKey(key: string) {
        this.ClearSingle(key)
        this.continue = this.continue.filter(item => item.key !== key)
        this.temporary = this.temporary.filter(item => item.key !== key)
    }

    /**
     * @author Together
     * @param key 事件名称
     * @param scope 执行作用域
     * @param callback 执行函数
     * @param once [ false ] 是否只监听一次
     * @description 添加监听
     */
    public AddListen(key: string, scope: Object, callback: Callback, once: boolean = false) {
        if (once) {
            let tc = this.temporary.find(ti => ti.key === key)
            if (tc) {
                tc.callbacks.push({ scope, callback })
                return
            }
        }
        else {
            let cc = this.continue.find(ci => ci.key === key)
            if (cc) {
                cc.callbacks.push({ scope, callback })
                return
            }
        }
        console.error("事件不存在!")
    }

    /**
     * @author Together
     * @param key 事件名称
     * @param scope 执行作用域
     * @param callback 执行函数
     * @description 删除监听
     */
    public RemoveListen(key: string, scope: Object, callback: Callback) {
        let cc = this.continue.find(ci => ci.key === key)
        let tc = this.temporary.find(ti => ti.key === key)
        if (cc && tc) {
            cc.callbacks = cc.callbacks.filter(item => item.callback !== callback && item.scope !== scope)
            tc.callbacks = tc.callbacks.filter(item => item.callback !== callback && item.scope !== scope)
        }
        else {
            console.error("事件不存在!")
        }
    }

    /**
     * @author Together
     * @param key 事件名称
     * @param data [ { } ] 传递参数
     * @description 触发事件 
     */
    public Emit(key: string, data: Record<string, unknown> = {}) {
        let cc = this.continue.find(ci => ci.key === key)
        let tc = this.temporary.find(ti => ti.key === key)
        if (cc && tc) {
            for (let c of cc.callbacks) {
                c.callback.call(c.scope, data)
            }
            for (let t of tc.callbacks) {
                t.callback.call(t.scope, data)
            }
            this.ClearSingleOnce(key)
        }
        else {
            console.error("事件不存在!")
        }
    }

    /**
     * @author Together 
     * @param key 事件名称
     * @description 移除掉只监听一次的监听 ( 请勿调用 我内部调用的 但我还是开出来了 你小心使用 )
     */
    public ClearSingleOnce(key: string) {
        let tc = this.temporary.find(ti => ti.key === key)
        if (tc) {
            tc.callbacks.splice(0, tc.callbacks.length)
        }
    }

    /**
     * @author Together
     * @param key 事件名称
     * @description 清空单个事件所有监听
     */
    public ClearSingle(key: string) {
        let cc = this.continue.find(ci => ci.key === key)
        let tc = this.temporary.find(ti => ti.key === key)
        if (cc && tc) {
            cc.callbacks.splice(0, cc.callbacks.length)
            tc.callbacks.splice(0, tc.callbacks.length)
        }
        else {
            console.error("事件不存在!")
        }
    }

    /**
     * @author Together
     * @description 清空所有事件和所有监听
     */
    public Clear() {
        this.continue.splice(0, this.continue.length)
        this.temporary.splice(0, this.temporary.length)
    }
}

export { EventSystem }
