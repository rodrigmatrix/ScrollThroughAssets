// Code by https://github.com/thx114/mioHotkeysMod
type infoType  = 'error'|'warning'|'info'|'success'

if (!document.getElementById('infoBoxContainer')) {
    let infoBoxContainer = document.createElement("div")
    infoBoxContainer.id = 'infoBoxContainer'
    infoBoxContainer.classList.add('social-panel-layout_JFt')
    Object.assign(infoBoxContainer.style, {
        bottom:'150rem',
        left:'0rem',
        right:'auto',
    })

    document.body.appendChild(infoBoxContainer)
}
let UpdateInfo
(()=>{
    function createInfoBox(message:string, type:infoType,style:object):Element{
        const box = document.createElement('div');
        let infosytle
        switch (type) {
            case 'error': infosytle = `background-color: rgb(244,204,204); color: rgb(175,0,0)`;break;
            case 'success': infosytle = `background-color: rgb(204,244,204); color: rgb(0,175,0)`;break;
            case 'warning': infosytle = `background-color: rgb(255, 220, 180); color: rgb(245,120,0)`;break;
            default: infosytle = `background-color: rgb(244,244,244); color: rgb(0,0,0)`;break;
        }
        const divStyle = `display: flex;justify-content: center; align-items: center;`
        box.innerHTML = `<div class="content__Ej content_AD7 child-opacity-transition_nkS" style="padding:10rem;${infosytle}"><div style="${divStyle}">${message}</div></div>`
        Object.assign(box.style, {
            padding:'10rem',
            width:'400rem',
            opacity: '0',
            transform: 'scale(0.5)',
            transition: 'opacity 0.5s, transform 0.5s',
            ...style
        })
        box.classList.add('panel_YqS','INFOBOX')
        return box;
    }

    function displayInfo(message: string |false, type: infoType = 'info', infoStyle: object = {}, time = 5000): void {
        const container = document.getElementById('infoBoxContainer') as any;
        if(message===false){
            for (const i of container?.children as any){
                i.style.opacity = '0'; 
                i.style.transform = 'scale(0)'; 
                setTimeout(() => {container.removeChild(i);},1000)
            }
            return
        }
        if (!container) {
          console.error('InfoBoxContainer not found');
          return;
        }
        const box = createInfoBox(message, type,infoStyle) as any;
        container.appendChild(box);

        setTimeout(() => {
            box.style.opacity = '1'; 
            box.style.transform = 'scale(1)'; 
  

          }, 50);

        if(time === -1){return}
      
        setTimeout(() => {
            box.style.opacity = '0'; 
            box.style.transform = 'scale(0)'; 
  
            setTimeout(() => {container.removeChild(box);},1000)

          }, time+500);
      }
    UpdateInfo = displayInfo;
})();
(window as any).UpdateInfo = UpdateInfo;
export const info = UpdateInfo

