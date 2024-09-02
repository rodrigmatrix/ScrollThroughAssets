// Code by https://github.com/thx114/mioHotkeysMod
import { rif,IHotkey, Click} from "../RIF"
export const ScrollNav : IHotkey = {
    PATH:{
        up:()=>{
            const selected = rif().class('page-indicators_Z3v').class('page-indicator_zOa.selected').item
            if(!selected){return}
            const prev = selected.previousElementSibling
            if(!prev){return}
            Click(prev)
        },
        down:()=>{
            const selected = rif().class('page-indicators_Z3v').class('page-indicator_zOa.selected').item
            if(!selected){return}
            const next = selected.nextElementSibling
            if(!next){return}
            Click(next)
        }
    },
    WHEEL_EVENTS:async()=>{
        const wheel = (window as any).mioHotkeyMod.KEYS.wheel
        const hover = (window as any).mioHotkeyMod.DEBUG.target

        if (
            hover.classList.contains('item-inner_hCN')||
            hover.classList.contains('row_nrc')||
            hover.classList.contains('content_O28')
        ){
            switch (wheel){
                case 'up':
                    ScrollNav.PATH.up()
                    break
                case 'down':
                    ScrollNav.PATH.down()
                    break
            }
        }
        
    }
}