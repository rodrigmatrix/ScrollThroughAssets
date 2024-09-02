// Code by https://github.com/thx114/mioHotkeysMod
interface rifSettings {
    math: 'full' | 'inc'
    mode: 'text' | 'html'
    afterFunc: Function[]
}
export const setNativeValue = function setNativeValue(element: Element, value: any) {
    const valueSetter = (Object.getOwnPropertyDescriptor(element, 'value') as any).set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = (Object.getOwnPropertyDescriptor(prototype, 'value') as any).set;

    if (valueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter.call(element, value);
    } else {
        valueSetter.call(element, value);
    }
    element.dispatchEvent(new Event('input', { bubbles: true }));
}
export class RIF {
    math: 'full' | 'inc' = `full`
    mode: 'text' | 'html' = `text`
    afterFunc: Function[] = []
    items: Element[] = [document.body]

    constructor(settings: rifSettings | Element | Element[] | RIF = { math: 'full', mode: 'text', afterFunc: [] }) {
        if (settings instanceof Element) { this.items = [settings] }
        else if (settings instanceof Array) { this.items = settings }
        else if (settings instanceof RIF) { this.items = settings.items }
        else{
        this.math = settings.math = this.math
        this.mode = settings.mode = this.mode
        this.afterFunc = settings.afterFunc || []
        }
    }
    class(className: string) {
        this.items = this.items
            .filter(item => item)
            .map(item => Array.from(item.querySelectorAll(`.${className}`)))
            .reduce((acc, children) => acc.concat(children), []);
        return this
    }
    valueOf() {
        return Boolean(this.items.length); // 返回布尔值
    }
    get item() { return this.items[0] }
}
export const rif = function rif(...args: any) {
    return new RIF(...args)
}

export const RE = function RE(...args: any) {
    return args.reduce((result: any, value: any, index: number, array: any) => {
        if (index % 2 === 0) {
            const key = array[index];
            const val = array[index + 1];
            result.set(key, val);
        }
        return result;
    }, new Map());
}

export interface IHotkey {
    PATH: any
    LOC?: any
    HOTKEYS?: any
    KEYUP_EVENTS?: Function
    MOUSE_EVENTS?: Function
    WHEEL_EVENTS?: Function
    MOUSEOVER_EVENTS?: Function
    DBCLICK_EVENTS?: Function
    startFunc?: Function
    MOUSEMOVE_EVENTS?: Function
}

export const delay = function delay(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function _Lock(name: string, time = 0) {
    if (typeof ((window as any).Lock[name]) == 'undefined') { (window as any).Lock[name] = false }
    if ((!(window as any).Lock[name]) && time === 0) { (window as any).Lock[name] = true; return true }
    else if ((window as any).Lock[name] && time > 0) { await delay(time); (window as any).Lock[name] = false }
    else { return false }
}

export const Lock = async function Lock(name: string, time = 50) {
    if (await _Lock(name)) { _Lock(name, time); return true }
    else { return false }
}

export const Click = (item: any,returnFunc=false):undefined|{reactItem: any,prop: string,onClickMethod: Function} => {
    const allProps = Object.keys(item);
    for (const prop of allProps) {
        if (typeof prop === 'string' && prop.startsWith('__reactProps')) {
            const onClickMethod = (item as any)[prop]?.onClick;
            if (typeof onClickMethod === 'function') {
                if (returnFunc) { return {reactItem: item,prop: prop,onClickMethod: onClickMethod} }
                try {
                    onClickMethod({ stopPropagation: () => { } });
                } catch (error) {
                    console.error('Error calling onClick method:', error);
                }
                return undefined
            }
        }
    }

}

export const on = {
    func(Fname:string,value?:null|boolean|'r'){
        if(typeof((window as any).mioHotkeyMod.funcToggle[Fname]) =='undefined'){
            (window as any).mioHotkeyMod.funcToggle[Fname] = true}
        if(typeof value === "undefined") {
            return (window as any).mioHotkeyMod.funcToggle[Fname];
        }
        else if(value === 'r'){
            (window as any).mioHotkeyMod.funcToggle[Fname] = !(window as any).mioHotkeyMod.funcToggle[Fname]
        }else{
            (window as any).mioHotkeyMod.funcToggle[Fname] = value;
        }
        return (window as any).mioHotkeyMod.funcToggle[Fname]
    }
}

export const editKey=(map: Map<string[], Function>, index: number, key?: any)=>{
    let keys = Array.from(map.keys())
    let values = Array.from(map.values())
    if(typeof key === 'undefined') return [keys,values];
    keys[index] = key
    return new Map(keys.map((key, index_) => [key, values[index_]]))
}
export const editValue=(map: Map<string[], Function>, index: number, value: any)=>{
    let keys = Array.from(map.keys())
    let values = Array.from(map.values())
    if(typeof value === 'undefined') return [keys,values];
    values[index] = value
    return new Map(keys.map((key, index_) => [key, values[index_]]))
}