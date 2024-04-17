import { EventSystem } from "@/libs/EventSystem";
import { OperateType } from "../../../Type";
import * as L from 'leafer-ui'
import { Time } from "@/libs/Time";

abstract class Entity extends EventSystem {
    protected constructor(options: OperateType.IEntity) {
        super()
        this.options = options
    }

    public id = Time.GenerateRandomUid()

    protected root!: L.UI

    public get R() {
        return this.root
    }

    protected options!: OperateType.IEntity

    protected get O() {
        return this.options
    }

    protected lisenerIds: Array<any> = []

    /**
     * 创建实现 需在构造自己调用 此处只用来未来提供拓展
     */
    public Create() {

    }

    /**
     * 显示实现
     */
    public Show() {

    }

    /**
     * 隐藏实现
     */
    public Hide() {

    }

    /**
     * 聚焦实现
     */
    public Focus() {

    }

    /**
     * 基础删除
     */
    public Delete() {
        this.root.off_(this.lisenerIds)
    }

    /**
     * 监听事件 需要自己在构造函数调用 此处用来拓展
     */
    public ListenEvents() {
        this.lisenerIds.push(this.O.area.leafer.on_(L.ResizeEvent.RESIZE, this.OnLeaferResieze, this))
        this.lisenerIds.push(this.O.area.leafer.on_(L.KeyEvent.DOWN, this.OnKeyDown, this))
        this.lisenerIds.push(this.O.area.leafer.on_(L.KeyEvent.UP, this.OnKeyUp, this))
        this.lisenerIds.push(this.root.on_(L.PointerEvent.DOWN, this.OnPointerDown, this))
        this.lisenerIds.push(this.root.on_(L.PointerEvent.UP, this.OnPointerUp, this))
        this.lisenerIds.push(this.root.on_(L.PointerEvent.LEAVE, this.OnPointerLeave, this))
        this.lisenerIds.push(this.root.on_(L.PointerEvent.ENTER, this.OnPointerEnter, this))
        this.lisenerIds.push(this.root.on_(L.PointerEvent.CLICK, this.OnPointerClick, this))
        this.lisenerIds.push(this.root.on_(L.PointerEvent.DOUBLE_CLICK, this.OnPointerDBClick, this))
        this.lisenerIds.push(this.root.on_(L.PointerEvent.MENU, this.OnPointerMenu, this))
        this.lisenerIds.push(this.root.on_(L.PointerEvent.MOVE, this.OnPointerMove, this))
        this.lisenerIds.push(this.root.on_(L.DragEvent.DRAG, this.OnDragging, this))
        this.lisenerIds.push(this.root.on_(L.DragEvent.START, this.OnDragStart, this))
        this.lisenerIds.push(this.root.on_(L.DragEvent.END, this.OnDragEnd, this))
        this.lisenerIds.push(this.root.on_(L.DragEvent.ENTER, this.OnDragEnter, this))
        this.lisenerIds.push(this.root.on_(L.DragEvent.LEAVE, this.OnDragLeave, this))
    }

    public OnKeyDown(e: L.KeyEvent) {

    }

    public OnKeyUp(e: L.KeyEvent) {

    }

    /**
     * 当leafer调整大小时触发
     */
    public OnLeaferResieze(e: L.ResizeEvent) {

    }

    /**
     * 当鼠标按下
     */
    public OnPointerDown(e: L.PointerEvent) {
        e.stop()
        e.stopDefault()
    }

    /**
     * 当鼠标松开
     */
    public OnPointerUp(e: L.PointerEvent) {
        e.stop()
        e.stopDefault()
    }

    /**
     * 当鼠标离开
     */
    public OnPointerLeave(e: L.PointerEvent) {
        e.stop()
        e.stopDefault()
    }

    /**
     * 当鼠标进入
     */
    public OnPointerEnter(e: L.PointerEvent) {
        e.stop()
        e.stopDefault()
    }

    /**
     * 当鼠标点击
     */
    public OnPointerClick(e: L.PointerEvent) {
        e.stop()
        e.stopDefault()
    }

    /**
     * 当鼠标双击
     */
    public OnPointerDBClick(e: L.PointerEvent) {
        e.stop()
        e.stopDefault()
    }

    /**
     * 当鼠标右键
     */
    public OnPointerMenu(e: L.PointerEvent) {
        e.stop()
        e.stopDefault()
    }

    /**
     * 当鼠标移动
     */
    public OnPointerMove(e: L.PointerEvent) {
        e.stop()
        e.stopDefault()
    }

    /**
     * 当拖拽中
     */
    public OnDragging(e: L.DragEvent) {
        e.stop()
        e.stopDefault()
    }

    /**
     * 当拖拽开始
     */
    public OnDragStart(e: L.DragEvent) {
        e.stop()
        e.stopDefault()
    }

    /**
     * 当拖拽结束
     */
    public OnDragEnd(e: L.DragEvent) {
        e.stop()
        e.stopDefault()
    }

    /**
     * 当拖拽元素进入
     */
    public OnDragEnter(e: L.DragEvent) {
        e.stop()
        e.stopDefault()
    }

    /**
     * 当拖拽元素离开
     */
    public OnDragLeave(e: L.DragEvent) {
        e.stop()
        e.stopDefault()
    }

}

export { Entity }