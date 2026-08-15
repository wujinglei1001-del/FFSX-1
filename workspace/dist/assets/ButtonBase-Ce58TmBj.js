import{n as e,s as t,t as n}from"./jsx-runtime-D8nDyRPw.js";import{D as r,E as i,a,m as o,r as s,tt as c}from"./createSimplePaletteValueFilter-CUkqyX6u.js";import{a as l,i as u}from"./Box-DAUfMJQR.js";import{r as d}from"./Typography-BLP_GLWb.js";import{t as f}from"./useTheme-CORJJI5K.js";var p=t(e(),1);function m(...e){let t=p.useRef(void 0),n=p.useCallback(t=>{let n=e.map(e=>{if(e==null)return null;if(typeof e==`function`){let n=e,r=n(t);return typeof r==`function`?r:()=>{n(null)}}return e.current=t,()=>{e.current=null}});return()=>{n.forEach(e=>e?.())}},e);return p.useMemo(()=>e.every(e=>e==null)?null:e=>{t.current&&=(t.current(),void 0),e!=null&&(t.current=n(e))},e)}function h(e){let t=p.useRef(e);return d(()=>{t.current=e}),p.useRef((...e)=>(0,t.current)(...e)).current}var g=m,_=h;function v(e){try{return e.matches(`:focus-visible`)}catch{}return!1}function y(e){let{focusableWhenDisabled:t,disabled:n,composite:r=!1,tabIndex:i=0,isNativeButton:a}=e,o=r&&t!==!1,s=r&&t===!1;return p.useMemo(()=>{let e={onKeyDown(e){n&&t&&e.key!==`Tab`&&e.preventDefault()}};return r||(e.tabIndex=i,!a&&n&&(e.tabIndex=t?i:-1)),(a&&(t||o)||!a&&n)&&(e[`aria-disabled`]=n),a&&(!t||s)&&(e.disabled=n),e},[r,n,t,o,s,a,i])}var b={};function x(e){let{nativeButton:t,nativeButtonProp:n,internalNativeButton:r=t,allowInferredHostMismatch:i=!1,disabled:a,type:o,hasFormAction:s=!1,tabIndex:c=0,focusableWhenDisabled:l,stopEventPropagation:u=!1,onBeforeKeyDown:d,onBeforeKeyUp:f}=e,m=p.useRef(null),h=l===!0,g=y({focusableWhenDisabled:h,disabled:a,isNativeButton:t,tabIndex:c}),_=p.useCallback(()=>{let e=m.current;return e==null?t:e.tagName===`BUTTON`||!!(e.tagName===`A`&&e.href)},[t]),v=p.useMemo(()=>{let e=h?{}:{tabIndex:a?-1:c};return t?(e.type=o===void 0&&!s?`button`:o,h||(e.disabled=a)):(e.role=`button`,!h&&a&&(e[`aria-disabled`]=a)),h?{...e,...g}:e},[a,h,g,s,t,c,o]);return{getButtonProps:p.useCallback((e=b)=>{let{onClick:t,onKeyDown:n,onKeyUp:r,...i}=e,o=e=>{if(u&&e.stopPropagation(),a){e.preventDefault();return}t?.(e)},s=e=>{if(h&&g.onKeyDown(e),!a&&(d?.(e),n?.(e),!(e.target!==e.currentTarget||_()))){if(e.key===` `){e.preventDefault();return}e.key===`Enter`&&(e.preventDefault(),e.currentTarget.click())}},c=e=>{a||(f?.(e),r?.(e),e.target===e.currentTarget&&!_()&&e.key===` `&&!e.defaultPrevented&&e.currentTarget.click())};return{...v,...i,onClick:o,onKeyDown:s,onKeyUp:c}},[v,a,h,g,_,d,f,u]),rootRef:m}}var S={};function C(e,t){let n=p.useRef(S);return n.current===S&&(n.current=e(t)),n}var w=class e{static create(){return new e}static use(){let t=C(e.create).current,[n,r]=p.useState(!1);return t.shouldMount=n,t.setShouldMount=r,p.useEffect(t.mountEffect,[n]),t}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=E(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())};start(...e){this.mount().then(()=>this.ref.current?.start(...e))}stop(...e){this.mount().then(()=>this.ref.current?.stop(...e))}pulsate(...e){this.mount().then(()=>this.ref.current?.pulsate(...e))}};function T(){return w.use()}function E(){let e,t,n=new Promise((n,r)=>{e=n,t=r});return n.resolve=e,n.reject=t,n}var D=[];function O(e){p.useEffect(e,D)}var k=class e{static create(){return new e}currentId=null;start(e,t){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,t()},e)}clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)};disposeEffect=()=>this.clear};function A(){let e=C(k.create).current;return O(e.disposeEffect),e}var j=n();function M(e){let{className:t,classes:n,pulsate:r=!1,rippleX:i,rippleY:a,rippleSize:o,in:s,onExited:l,timeout:u}=e,[d,f]=p.useState(!1),m=A(),h=p.useRef(!1),g=p.useRef(l);g.current=l;let _=l!=null,v=c(t,n.ripple,n.rippleVisible,r&&n.ripplePulsate),y={width:o,height:o,top:-(o/2)+a,left:-(o/2)+i},b=c(n.child,d&&n.childLeaving,r&&n.childPulsate);return!s&&!d&&f(!0),p.useEffect(()=>{!s&&_?h.current||(h.current=!0,m.start(u,()=>{h.current=!1,g.current?.()})):(h.current=!1,m.clear())},[m,_,s,u]),(0,j.jsx)(`span`,{className:v,style:y,children:(0,j.jsx)(`span`,{className:b})})}var N=i(`MuiTouchRipple`,[`root`,`ripple`,`rippleVisible`,`ripplePulsate`,`child`,`childLeaving`,`childPulsate`]),P=`(prefers-reduced-motion: reduce)`,ee=0,F=`0ms`,te=()=>{},I=()=>!1,ne=()=>!0,re=()=>te;function L(e){let[t,n]=p.useState(()=>({enabled:e,matches:e?null:!1})),r=t.matches;return t.enabled!==e&&(r=null,e||(r=!1)),d(()=>{let r=t=>{n(n=>n.enabled===e&&n.matches===t?n:{enabled:e,matches:t})};if(!e){t.enabled&&r(!1);return}if(typeof window>`u`||typeof window.matchMedia!=`function`){r(!1);return}let i=window.matchMedia(P),a=()=>{r(i.matches)};return a(),i.addEventListener(`change`,a),()=>{i.removeEventListener(`change`,a)}},[e,t.enabled]),r}var R={...p}.useSyncExternalStore;function ie(e){let t=e?ne:I,[n,r]=p.useMemo(()=>{if(!e||typeof window>`u`||typeof window.matchMedia!=`function`)return[I,re];let t=window.matchMedia(P);return[()=>t.matches,e=>(t.addEventListener(`change`,e),()=>{t.removeEventListener(`change`,e)})]},[e]);return R(r,n,t)}var z=R===void 0?L:ie;function B(e,t){let n=z(!t&&e===`system`),r=!t&&(e===`always`||e===`system`&&n!==!1);return p.useMemo(()=>({shouldReduceMotion:r,getTransitionTiming(e){return r?{duration:ee,delay:F}:e}}),[r])}var V=550,H={},U=[],W=()=>{};function G(e,t){let n=new Set(t),r=new Map,i=[];for(let t of e)n.has(t)?i.length>0&&(r.set(t,i),i=[]):i.push(t);let a=[];for(let e of t){let t=r.get(e);t&&a.push(...t),a.push(e)}return a.push(...i),a}function K({event:e,element:t,center:n}){let r=t?t.getBoundingClientRect():{width:0,height:0,left:0,top:0},i,a;if(n||e===void 0||e.clientX===0&&e.clientY===0||!e.clientX&&!e.touches)i=Math.round(r.width/2),a=Math.round(r.height/2);else{let{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;i=Math.round(t-r.left),a=Math.round(n-r.top)}let o;if(n)o=Math.sqrt((2*r.width**2+r.height**2)/3),o%2==0&&(o+=1);else{let e=Math.max(Math.abs((t?t.clientWidth:0)-i),i)*2+2,n=Math.max(Math.abs((t?t.clientHeight:0)-a),a)*2+2;o=Math.sqrt(e**2+n**2)}return{rippleX:i,rippleY:a,rippleSize:o}}var ae=l`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,q=l`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,J=l`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;function oe(e){if(e.motion.reducedMotion===`always`)return null;let t=u`
    &.${N.rippleVisible} {
      animation-name: ${ae};
      animation-duration: ${V}ms;
      animation-timing-function: ${e.transitions.easing.easeInOut};
    }

    &.${N.ripplePulsate} {
      animation-duration: ${e.transitions.duration.shorter}ms;
    }

    & .${N.childLeaving} {
      animation-name: ${q};
      animation-duration: ${V}ms;
      animation-timing-function: ${e.transitions.easing.easeInOut};
    }

    & .${N.childPulsate} {
      animation-name: ${J};
      animation-duration: 2500ms;
      animation-timing-function: ${e.transitions.easing.easeInOut};
      animation-iteration-count: infinite;
      animation-delay: 200ms;
    }
  `;return e.motion.reducedMotion===`system`?u`
      @media (prefers-reduced-motion: no-preference) {
        ${t}
      }
    `:t}var se=a(`span`,{name:`MuiTouchRipple`,slot:`Root`})({overflow:`hidden`,pointerEvents:`none`,position:`absolute`,zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:`inherit`}),ce=a(M,{name:`MuiTouchRipple`,slot:`Ripple`})`
  opacity: 0;
  position: absolute;

  &.${N.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
  }

  /*
   * Order matters: 'child', 'childLeaving' and 'childPulsate' apply to the same
   * element with equal specificity, so the later rule wins. 'child' must come
   * before 'childLeaving' so the leaving 'opacity: 0' takes precedence. A focus
   * (pulsate) ripple keeps 'pulsateKeyframe' (no opacity animation) on exit, so
   * it relies on this static 'opacity: 0' to disappear on blur instead of
   * lingering until removal.
   */
  & .${N.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${N.childLeaving} {
    opacity: 0;
  }

  & .${N.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
  }

  ${({theme:e})=>oe(e)}
`,le=p.forwardRef(function(e,t){let n=s({props:e,name:`MuiTouchRipple`}),r=B(f().motion.reducedMotion,!1),{center:i=!1,classes:a=H,className:o,...l}=n,[u,d]=p.useState({items:U,order:U}),m=u.items,h=p.useRef(0),g=p.useRef(null),v=p.useRef(!1);O(()=>(v.current=!0,()=>{v.current=!1})),p.useEffect(()=>{g.current&&=(g.current(),null)},[m]);let y=p.useRef(!1),b=A(),x=p.useRef(null),S=p.useRef(null),C=_(e=>{v.current&&d(t=>{let n=t.items.filter(t=>t.key!==e);return{items:n,order:G(t.order.filter(t=>t!==e),n.filter(e=>!e.exiting).map(e=>e.key))}})}),w=_(e=>{let{pulsate:t,rippleX:n,rippleY:r,rippleSize:i,cb:a}=e,o=h.current;h.current+=1,d(e=>{let a=[...e.items,{key:o,pulsate:t,rippleX:n,rippleY:r,rippleSize:i,exiting:!1}];return{items:a,order:G(e.order,a.filter(e=>!e.exiting).map(e=>e.key))}}),g.current=a}),T=_((e=H,t=H,n=W)=>{let{pulsate:r=!1,center:a=i||t.pulsate,fakeElement:o=!1}=t;if(e?.type===`mousedown`&&y.current){y.current=!1;return}e?.type===`touchstart`&&(y.current=!0);let{rippleX:s,rippleY:c,rippleSize:l}=K({event:e,element:o?null:S.current,center:a});e?.touches?x.current===null&&(x.current=()=>{w({pulsate:r,rippleX:s,rippleY:c,rippleSize:l,cb:n})},b.start(80,()=>{x.current&&=(x.current(),null)})):w({pulsate:r,rippleX:s,rippleY:c,rippleSize:l,cb:n})}),E=_(()=>{T(H,{pulsate:!0})}),D=_((e,t)=>{if(b.clear(),e?.type===`touchend`&&x.current){x.current(),x.current=null,b.start(0,()=>{D(e,t)});return}x.current=null,d(e=>{let t=e.items.findIndex(e=>!e.exiting);if(t===-1)return e;let n=e.items.slice();return n[t]={...n[t],exiting:!0},{items:n,order:G(e.order,n.filter(e=>!e.exiting).map(e=>e.key))}}),g.current=t});p.useImperativeHandle(t,()=>({pulsate:E,start:T,stop:D}),[E,T,D]);let k=new Map(m.map(e=>[e.key,e])),M=u.order.map(e=>k.get(e)).filter(Boolean);return(0,j.jsx)(se,{className:c(N.root,a.root,o),ref:S,...l,children:M.map(e=>(0,j.jsx)(ce,{classes:{ripple:c(a.ripple,N.ripple),rippleVisible:c(a.rippleVisible,N.rippleVisible),ripplePulsate:c(a.ripplePulsate,N.ripplePulsate),child:c(a.child,N.child),childLeaving:c(a.childLeaving,N.childLeaving),childPulsate:c(a.childPulsate,N.childPulsate)},timeout:r.shouldReduceMotion?0:V,pulsate:e.pulsate,rippleX:e.rippleX,rippleY:e.rippleY,rippleSize:e.rippleSize,in:!e.exiting,onExited:()=>C(e.key)},e.key))})});function Y(e){return r(`MuiButtonBase`,e)}var X=i(`MuiButtonBase`,[`root`,`disabled`,`focusVisible`]),ue=e=>{let{disabled:t,focusVisible:n,focusVisibleClassName:r,suppressFocusVisible:i,classes:a}=e,s=o({root:[`root`,t&&`disabled`,n&&!i&&`focusVisible`]},Y,a);return n&&!i&&r&&(s.root+=` ${r}`),s},de=a(`button`,{name:`MuiButtonBase`,slot:`Root`})({display:`inline-flex`,alignItems:`center`,justifyContent:`center`,position:`relative`,boxSizing:`border-box`,WebkitTapHighlightColor:`transparent`,backgroundColor:`transparent`,outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:`pointer`,userSelect:`none`,verticalAlign:`middle`,MozAppearance:`none`,WebkitAppearance:`none`,textDecoration:`none`,color:`inherit`,"&::-moz-focus-inner":{borderStyle:`none`},[`&.${X.disabled}`]:{pointerEvents:`none`,cursor:`default`},"@media print":{colorAdjust:`exact`}}),Z=p.forwardRef(function(e,t){let n=s({props:e,name:`MuiButtonBase`}),{action:r,centerRipple:i=!1,children:a,className:o,component:l=`button`,disabled:u=!1,disableRipple:d=!1,disableTouchRipple:f=!1,focusRipple:m=!1,focusVisibleClassName:h,focusableWhenDisabled:y,suppressFocusVisible:b=!1,internalNativeButton:S,LinkComponent:C=`a`,nativeButton:w,onBlur:E,onClick:D,onContextMenu:O,onDragLeave:k,onFocus:A,onFocusVisible:M,onKeyDown:N,onKeyUp:P,onMouseDown:ee,onMouseLeave:F,onMouseUp:te,onTouchEnd:I,onTouchMove:ne,onTouchStart:re,tabIndex:L=0,TouchRippleProps:R,touchRippleRef:ie,type:z,...B}=n,V=!!(B.href||B.to),H=!!B.formAction,U=l;U===`button`&&V&&(U=C);let W=typeof U==`string`?U===`button`:S??!1,G=w??W,K=T(),ae=g(K.ref,ie),[q,J]=p.useState(!1);(u||b)&&q&&J(!1);let oe=_(e=>{m&&!e.repeat&&q&&e.key===` `&&K.stop(e,()=>{K.start(e)})}),se=_(e=>{m&&e.key===` `&&q&&!e.defaultPrevented&&K.stop(e,()=>{K.pulsate(e)})}),{getButtonProps:ce,rootRef:Y}=x({nativeButton:G,nativeButtonProp:w,internalNativeButton:W,allowInferredHostMismatch:V||typeof U==`string`,disabled:u,type:z,hasFormAction:H,tabIndex:L,onBeforeKeyDown:oe,onBeforeKeyUp:se}),{onClick:X,onKeyDown:Z,onKeyUp:fe,...pe}=ce({onClick:D,onKeyDown:N,onKeyUp:P});p.useImperativeHandle(r,()=>({focusVisible:()=>{J(!0),Y.current.focus()}}),[Y]);let me=K.shouldMount&&!d&&!u;p.useEffect(()=>{q&&m&&!d&&K.pulsate()},[d,m,q,K]);let he=Q(K,`start`,ee,f),ge=Q(K,`stop`,O,f),_e=Q(K,`stop`,k,f),ve=Q(K,`stop`,te,f),ye=Q(K,`stop`,e=>{q&&e.preventDefault(),F&&F(e)},f),be=Q(K,`start`,re,f),xe=Q(K,`stop`,I,f),Se=Q(K,`stop`,ne,f),Ce=Q(K,`stop`,e=>{v(e.target)||J(!1),E&&E(e)},!1),we=_(e=>{Y.current||=e.currentTarget,!b&&v(e.target)&&(J(!0),M&&M(e)),A&&A(e)}),$={};V&&($.tabIndex=u?-1:L,u&&($[`aria-disabled`]=u),$.type=z);let Te=g(t,Y),Ee={...n,centerRipple:i,component:l,disabled:u,disableRipple:d,disableTouchRipple:f,focusRipple:m,suppressFocusVisible:b,tabIndex:L,focusVisible:q},De=ue(Ee);return(0,j.jsxs)(de,{as:U,className:c(De.root,o),ownerState:Ee,onBlur:Ce,onClick:X,onContextMenu:ge,onFocus:we,onKeyDown:Z,onKeyUp:fe,onMouseDown:he,onMouseLeave:ye,onMouseUp:ve,onDragLeave:_e,onTouchEnd:xe,onTouchMove:Se,onTouchStart:be,ref:Te,...V?$:pe,...B,children:[a,me?(0,j.jsx)(le,{ref:ae,center:i,...R}):null]})});function Q(e,t,n,r=!1){return _(i=>(n&&n(i),r||e[t](i),!0))}export{A as a,v as c,h as d,m as f,k as i,_ as l,X as n,O as o,B as r,C as s,Z as t,g as u};