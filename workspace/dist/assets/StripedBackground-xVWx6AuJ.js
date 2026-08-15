import{a as e}from"./i18nInstance-truXiXW9.js";import{a as t}from"./createSimplePaletteValueFilter-k5yBtt5A.js";import{t as n}from"./Box-CBygiLu4.js";import{r}from"./useTranslation-BNZGuT7d.js";import{t as i}from"./Stack-xf5DXsfp.js";import{t as a}from"./useTheme-D8e8D15P.js";import{n as o}from"./SettingsProvider-DN0IwX-n.js";import{i as s}from"./utils-CkDLEHTu.js";import{h as c}from"./index-5LYSzE6M.js";var l=e(),u=({orientation:e=`horizontal`,gradientOrientation:t=`center`,gradient:r,thickness:i=`1px`,...o})=>{let s=a(),c=e===`horizontal`,u=s.vars.palette.divider,d=()=>{if(r||t===`none`)return;let e={ltr:`linear-gradient(to ${c?`right`:`bottom`}, black 0%, black 65%, transparent 100%)`,rtl:`linear-gradient(to ${c?`right`:`bottom`}, transparent 0%, black 35%, black 100%)`,center:`linear-gradient(to ${c?`right`:`bottom`}, transparent 0%, black 10%, black 90%, transparent 100%)`};return e[t]||e.center},f=()=>`repeating-linear-gradient(${c?`90deg`:`0deg`}, black 0, black 4px, transparent 4px, transparent 8px)`,p=()=>{let e=d(),n=f();return r||t===`none`?n:`${n}, ${e}`},m=()=>r||u;return(0,l.jsx)(n,{...o,sx:[{position:`relative`,"&::before":{content:`""`,position:`absolute`,zIndex:10,top:c?`50%`:0,left:c?0:`50%`,width:c?1:i,height:c?i:1,background:m(),maskImage:p(),WebkitMaskImage:p(),maskComposite:`intersect`,WebkitMaskComposite:`source-in`}},...Array.isArray(o.sx)?o.sx:[o.sx]]})},d=({title:e,subtitle:t,sx:n,...o})=>{let{direction:s}=a();return(0,l.jsxs)(i,{...o,sx:[{gap:1,textAlign:`center`},...Array.isArray(n)?n:n==null?[]:[n]],children:[(0,l.jsx)(c,{delay:.2,children:(0,l.jsx)(r,{variant:`overline`,sx:{color:`text.disabled`,fontWeight:700},children:e})}),(0,l.jsx)(c,{children:(0,l.jsx)(r,{variant:`h4`,children:t})})]},s)},f=t(n,{shouldForwardProp:e=>e!==`direction`&&e!==`stripeColor`&&e!==`baseColor`&&e!==`fadeWidth`})(({theme:e,direction:t=`-45deg`,baseColor:n=`transparent`,fadeWidth:r=`20%`})=>{let{config:{textDirection:i}}=o();return{position:`relative`,"&::before":{content:`""`,position:`absolute`,top:0,left:0,right:0,bottom:0,background:`repeating-linear-gradient(
        ${i===`rtl`?t.replace(`-`,``):t},
        ${n},
        ${n} 5px,
        ${s(e.vars.palette.dividerChannel,.4)} 5px,
        ${s(e.vars.palette.dividerChannel,.4)} 7px
      )`,maskImage:`linear-gradient(
        to right,
        transparent 0,
        black ${r},
        black calc(100% - ${r}),
        transparent 100%
      )`,WebkitMaskImage:`linear-gradient(
        to right,
        transparent 0,
        black ${r},
        black calc(100% - ${r}),
        transparent 100%
      )`,maskSize:`100% 100%`,WebkitMaskSize:`100% 100%`,maskRepeat:`no-repeat`,WebkitMaskRepeat:`no-repeat`}}});export{d as n,u as r,f as t};