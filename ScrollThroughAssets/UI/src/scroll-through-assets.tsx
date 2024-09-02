// Code by https://github.com/thx114/mioHotkeysMod
import { rif, RE, Lock, delay, setNativeValue, on, editKey, editValue } from 'RIF'
import { ScrollNav } from 'Func/ScrollNav'

export const load = () => {
    (window as any)._R = rif;
    if ((window as any).mioHotkeyMod_main) { return null }


    if (typeof (window as any).mioHotkeyMod == 'undefined') {
        (window as any).mioHotkeyMod = {
            KEYS: {
                key: false,
                shift: false,
                ctrl: false,
                alt: false,
                mouse: false,
                long: false,
                wheel: false
            },
            DEBUG: {
                target: null,
                lastGreenedItembackgroundColor: null,
                lastGreenedItem: null,
            },
            loadded: true,
            addObjectTypeSave: [],
            eventsID: [],
            funcToggle: {}
        }
    };
    ; (window as any).Lock = {}
        ; (window as any).mioHotkeyMod_main = true

    console.log('MioHotkeyMod loaded');

    (function FuncS() {
        on.func('infoPanel.claerMode', false)
        on.func('transportView', false)

    })()



    let HOTKEY_ITEMS: any = []
    let KEYUP_EVENTS: any = []
    let MOUSE_EVENTS: any = []
    let DBCLICK_EVENTS: any = []
    let WHEEL_EVENTS: any = []
    let MOUSEOVER_EVENTS: any = []
    let MOUSEMOVE_EVENTS: any = []

        ; (window as any).mioHotkeyMod.EVENTS = {
            HOTKEY_ITEMS,
            KEYUP_EVENTS,
            MOUSE_EVENTS,
            DBCLICK_EVENTS,
            WHEEL_EVENTS,
            MOUSEOVER_EVENTS,
            MOUSEMOVE_EVENTS
        }

    const WheelFuncs = [ScrollNav]
    WheelFuncs.forEach((item) => { WHEEL_EVENTS.push(item.WHEEL_EVENTS) })

    const HotkeysLength = HOTKEY_ITEMS.length
    const EventsLength = (() => {
        let l = 0;
        [KEYUP_EVENTS, MOUSE_EVENTS, DBCLICK_EVENTS, WHEEL_EVENTS, MOUSEOVER_EVENTS].forEach((item) => { l += item.length })
        return l
    })()

    console.log(`${HotkeysLength} Hotkeys and ${EventsLength} Events loaded`)

  

    // mousedown
    document.addEventListener('mousedown', async function (event) {
        if (!await Lock('mousedown')) { return null };
        (window as any).mioHotkeyMod.KEYS.mousedown = event.button
        for (const func of MOUSE_EVENTS) {

            await func()
        }
    });

    // dblclick
    document.addEventListener('dblclick', async function (event) {
        if (!await Lock('dblclick')) { return null };
        for (const func of DBCLICK_EVENTS) {
            await func()
        }
    });

    // wheel
    document.addEventListener('wheel', async function (event) {
        if (!await Lock('mousedown', 10)) { return null };
        (window as any).mioHotkeyMod.KEYS.wheel = event.deltaY > 0 ? 'down' : 'up';
        for (const func of WHEEL_EVENTS) {
            await func()
        }
    });

    // mouseover
    document.addEventListener('mouseover', async function (event) {
        if (!await Lock('mouseover', 20)) { return null };
        // 获取鼠标悬停的目标元素
        const target = event.target;
        if (!target) { return null };
        (window as any).mioHotkeyMod.DEBUG.target = target;
        for (const func of MOUSEOVER_EVENTS) {
            await func()
        }
    })

    document.addEventListener('mousemove', async function (event) {
        if (!await Lock('mousemove', 10)) { return null };
        for (const func of MOUSEMOVE_EVENTS) {
            await func()
        }

    })

        ; (window as any).RE = RE
        ; (window as any).setNativeValue = setNativeValue;
    ; (window as any).rif = rif;
    ; (window as any).delay = delay;
    ; (window as any).addevent = (type: string, func: any, id: string = '') => {
        if ((window as any).mioHotkeyMod.eventsID.includes(id) && id != '') { return null }
        (window as any).mioHotkeyMod.EVENTS[type].push(func)
    }
    (window as any).mioevent = () => {
        return (window as any).mioHotkeyMod.EVENTS
    }

    (window as any).edithotkey = (ID: string, obj: any) => {
        const dir = ID.split('.');

        if(typeof obj == 'undefined'){return editKey((window as any).mioHotkeyMod.EVENTS.HOTKEY_ITEMS[dir[0]],Number(dir[1]))}

        if (obj.key) {
            return (window as any).mioHotkeyMod.EVENTS.HOTKEY_ITEMS[dir[0]] =
                editKey(
                    (window as any).mioHotkeyMod.EVENTS.HOTKEY_ITEMS[dir[0]],
                    Number(dir[1]),
                    obj.key
                )
        }
        if (obj.value) {
            return (window as any).mioHotkeyMod.EVENTS.HOTKEY_ITEMS[dir[0]] =
                editValue(
                    (window as any).mioHotkeyMod.EVENTS.HOTKEY_ITEMS[dir[0]],
                    Number(dir[1]),
                    obj.value
                )
        }
    }
    return null
}
