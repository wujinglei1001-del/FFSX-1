import{n as e,s as t,t as n}from"./jsx-runtime-CB_p5Kcx.js";import{D as r,O as i,Z as a,h as o,i as s,o as c}from"./Stack-DAOfRNRq.js";import{a as l,i as u}from"./Box-Dim3KBfX.js";import{t as d}from"./useEnhancedEffect--GBrN_d-.js";import{t as f}from"./useId-DjI3zKZa.js";import{t as p}from"./useTheme-anxZ809w.js";var m=t(e(),1);function h(...e){let t=m.useRef(void 0),n=m.useCallback(t=>{let n=e.map(e=>{if(e==null)return null;if(typeof e==`function`){let n=e,r=n(t);return typeof r==`function`?r:()=>{n(null)}}return e.current=t,()=>{e.current=null}});return()=>{n.forEach(e=>e?.())}},e);return m.useMemo(()=>e.every(e=>e==null)?null:e=>{t.current&&=(t.current(),void 0),e!=null&&(t.current=n(e))},e)}function g(e){let t=m.useRef(e);return d(()=>{t.current=e}),m.useRef((...e)=>(0,t.current)(...e)).current}var _=h,v=f,y=g;function b(e){try{return e.matches(`:focus-visible`)}catch{}return!1}function x(e){let{focusableWhenDisabled:t,disabled:n,composite:r=!1,tabIndex:i=0,isNativeButton:a}=e,o=r&&t!==!1,s=r&&t===!1;return m.useMemo(()=>{let e={onKeyDown(e){n&&t&&e.key!==`Tab`&&e.preventDefault()}};return r||(e.tabIndex=i,!a&&n&&(e.tabIndex=t?i:-1)),(a&&(t||o)||!a&&n)&&(e[`aria-disabled`]=n),a&&(!t||s)&&(e.disabled=n),e},[r,n,t,o,s,a,i])}var S={};function ee(e){let{nativeButton:t,nativeButtonProp:n,internalNativeButton:r=t,allowInferredHostMismatch:i=!1,disabled:a,type:o,hasFormAction:s=!1,tabIndex:c=0,focusableWhenDisabled:l,stopEventPropagation:u=!1,onBeforeKeyDown:d,onBeforeKeyUp:f}=e,p=m.useRef(null),h=l===!0,g=x({focusableWhenDisabled:h,disabled:a,isNativeButton:t,tabIndex:c}),_=m.useCallback(()=>{let e=p.current;return e==null?t:e.tagName===`BUTTON`||!!(e.tagName===`A`&&e.href)},[t]),v=m.useMemo(()=>{let e=h?{}:{tabIndex:a?-1:c};return t?(e.type=o===void 0&&!s?`button`:o,h||(e.disabled=a)):(e.role=`button`,!h&&a&&(e[`aria-disabled`]=a)),h?{...e,...g}:e},[a,h,g,s,t,c,o]);return{getButtonProps:m.useCallback((e=S)=>{let{onClick:t,onKeyDown:n,onKeyUp:r,...i}=e,o=e=>{if(u&&e.stopPropagation(),a){e.preventDefault();return}t?.(e)},s=e=>{if(h&&g.onKeyDown(e),!a&&(d?.(e),n?.(e),!(e.target!==e.currentTarget||_()))){if(e.key===` `){e.preventDefault();return}e.key===`Enter`&&(e.preventDefault(),e.currentTarget.click())}},c=e=>{a||(f?.(e),r?.(e),e.target===e.currentTarget&&!_()&&e.key===` `&&!e.defaultPrevented&&e.currentTarget.click())};return{...v,...i,onClick:o,onKeyDown:s,onKeyUp:c}},[v,a,h,g,_,d,f,u]),rootRef:p}}var C={};function w(e,t){let n=m.useRef(C);return n.current===C&&(n.current=e(t)),n}var T=class e{static create(){return new e}static use(){let t=w(e.create).current,[n,r]=m.useState(!1);return t.shouldMount=n,t.setShouldMount=r,m.useEffect(t.mountEffect,[n]),t}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=D(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())};start(...e){this.mount().then(()=>this.ref.current?.start(...e))}stop(...e){this.mount().then(()=>this.ref.current?.stop(...e))}pulsate(...e){this.mount().then(()=>this.ref.current?.pulsate(...e))}};function E(){return T.use()}function D(){let e,t,n=new Promise((n,r)=>{e=n,t=r});return n.resolve=e,n.reject=t,n}var O=[];function k(e){m.useEffect(e,O)}var A=class e{static create(){return new e}currentId=null;start(e,t){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,t()},e)}clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)};disposeEffect=()=>this.clear};function j(){let e=w(A.create).current;return k(e.disposeEffect),e}var M=n();function te(e){let{className:t,classes:n,pulsate:r=!1,rippleX:i,rippleY:o,rippleSize:s,in:c,onExited:l,timeout:u}=e,[d,f]=m.useState(!1),p=j(),h=m.useRef(!1),g=m.useRef(l);g.current=l;let _=l!=null,v=a(t,n.ripple,n.rippleVisible,r&&n.ripplePulsate),y={width:s,height:s,top:-(s/2)+o,left:-(s/2)+i},b=a(n.child,d&&n.childLeaving,r&&n.childPulsate);return!c&&!d&&f(!0),m.useEffect(()=>{!c&&_?h.current||(h.current=!0,p.start(u,()=>{h.current=!1,g.current?.()})):(h.current=!1,p.clear())},[p,_,c,u]),(0,M.jsx)(`span`,{className:v,style:y,children:(0,M.jsx)(`span`,{className:b})})}var N=r(`MuiTouchRipple`,[`root`,`ripple`,`rippleVisible`,`ripplePulsate`,`child`,`childLeaving`,`childPulsate`]),P=`(prefers-reduced-motion: reduce)`,ne=0,F=`0ms`,I=()=>{},L=()=>!1,R=()=>!0,re=()=>I;function ie(e){let[t,n]=m.useState(()=>({enabled:e,matches:e?null:!1})),r=t.matches;return t.enabled!==e&&(r=null,e||(r=!1)),d(()=>{let r=t=>{n(n=>n.enabled===e&&n.matches===t?n:{enabled:e,matches:t})};if(!e){t.enabled&&r(!1);return}if(typeof window>`u`||typeof window.matchMedia!=`function`){r(!1);return}let i=window.matchMedia(P),a=()=>{r(i.matches)};return a(),i.addEventListener(`change`,a),()=>{i.removeEventListener(`change`,a)}},[e,t.enabled]),r}var z={...m}.useSyncExternalStore;function B(e){let t=e?R:L,[n,r]=m.useMemo(()=>{if(!e||typeof window>`u`||typeof window.matchMedia!=`function`)return[L,re];let t=window.matchMedia(P);return[()=>t.matches,e=>(t.addEventListener(`change`,e),()=>{t.removeEventListener(`change`,e)})]},[e]);return z(r,n,t)}var V=z===void 0?ie:B;function H(e,t){let n=V(!t&&e===`system`),r=!t&&(e===`always`||e===`system`&&n!==!1);return m.useMemo(()=>({shouldReduceMotion:r,getTransitionTiming(e){return r?{duration:ne,delay:F}:e}}),[r])}var U=550,W={},G=[],K=()=>{};function q(e,t){let n=new Set(t),r=new Map,i=[];for(let t of e)n.has(t)?i.length>0&&(r.set(t,i),i=[]):i.push(t);let a=[];for(let e of t){let t=r.get(e);t&&a.push(...t),a.push(e)}return a.push(...i),a}function J({event:e,element:t,center:n}){let r=t?t.getBoundingClientRect():{width:0,height:0,left:0,top:0},i,a;if(n||e===void 0||e.clientX===0&&e.clientY===0||!e.clientX&&!e.touches)i=Math.round(r.width/2),a=Math.round(r.height/2);else{let{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;i=Math.round(t-r.left),a=Math.round(n-r.top)}let o;if(n)o=Math.sqrt((2*r.width**2+r.height**2)/3),o%2==0&&(o+=1);else{let e=Math.max(Math.abs((t?t.clientWidth:0)-i),i)*2+2,n=Math.max(Math.abs((t?t.clientHeight:0)-a),a)*2+2;o=Math.sqrt(e**2+n**2)}return{rippleX:i,rippleY:a,rippleSize:o}}var Y=l`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,ae=l`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,oe=l`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;function se(e){if(e.motion.reducedMotion===`always`)return null;let t=u`
    &.${N.rippleVisible} {
      animation-name: ${Y};
      animation-duration: ${U}ms;
      animation-timing-function: ${e.transitions.easing.easeInOut};
    }

    &.${N.ripplePulsate} {
      animation-duration: ${e.transitions.duration.shorter}ms;
    }

    & .${N.childLeaving} {
      animation-name: ${ae};
      animation-duration: ${U}ms;
      animation-timing-function: ${e.transitions.easing.easeInOut};
    }

    & .${N.childPulsate} {
      animation-name: ${oe};
      animation-duration: 2500ms;
      animation-timing-function: ${e.transitions.easing.easeInOut};
      animation-iteration-count: infinite;
      animation-delay: 200ms;
    }
  `;return e.motion.reducedMotion===`system`?u`
      @media (prefers-reduced-motion: no-preference) {
        ${t}
      }
    `:t}var X=c(`span`,{name:`MuiTouchRipple`,slot:`Root`})({overflow:`hidden`,pointerEvents:`none`,position:`absolute`,zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:`inherit`}),ce=c(te,{name:`MuiTouchRipple`,slot:`Ripple`})`
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

  ${({theme:e})=>se(e)}
`,le=m.forwardRef(function(e,t){let n=s({props:e,name:`MuiTouchRipple`}),r=H(p().motion.reducedMotion,!1),{center:i=!1,classes:o=W,className:c,...l}=n,[u,d]=m.useState({items:G,order:G}),f=u.items,h=m.useRef(0),g=m.useRef(null),_=m.useRef(!1);k(()=>(_.current=!0,()=>{_.current=!1})),m.useEffect(()=>{g.current&&=(g.current(),null)},[f]);let v=m.useRef(!1),b=j(),x=m.useRef(null),S=m.useRef(null),ee=y(e=>{_.current&&d(t=>{let n=t.items.filter(t=>t.key!==e);return{items:n,order:q(t.order.filter(t=>t!==e),n.filter(e=>!e.exiting).map(e=>e.key))}})}),C=y(e=>{let{pulsate:t,rippleX:n,rippleY:r,rippleSize:i,cb:a}=e,o=h.current;h.current+=1,d(e=>{let a=[...e.items,{key:o,pulsate:t,rippleX:n,rippleY:r,rippleSize:i,exiting:!1}];return{items:a,order:q(e.order,a.filter(e=>!e.exiting).map(e=>e.key))}}),g.current=a}),w=y((e=W,t=W,n=K)=>{let{pulsate:r=!1,center:a=i||t.pulsate,fakeElement:o=!1}=t;if(e?.type===`mousedown`&&v.current){v.current=!1;return}e?.type===`touchstart`&&(v.current=!0);let{rippleX:s,rippleY:c,rippleSize:l}=J({event:e,element:o?null:S.current,center:a});e?.touches?x.current===null&&(x.current=()=>{C({pulsate:r,rippleX:s,rippleY:c,rippleSize:l,cb:n})},b.start(80,()=>{x.current&&=(x.current(),null)})):C({pulsate:r,rippleX:s,rippleY:c,rippleSize:l,cb:n})}),T=y(()=>{w(W,{pulsate:!0})}),E=y((e,t)=>{if(b.clear(),e?.type===`touchend`&&x.current){x.current(),x.current=null,b.start(0,()=>{E(e,t)});return}x.current=null,d(e=>{let t=e.items.findIndex(e=>!e.exiting);if(t===-1)return e;let n=e.items.slice();return n[t]={...n[t],exiting:!0},{items:n,order:q(e.order,n.filter(e=>!e.exiting).map(e=>e.key))}}),g.current=t});m.useImperativeHandle(t,()=>({pulsate:T,start:w,stop:E}),[T,w,E]);let D=new Map(f.map(e=>[e.key,e])),O=u.order.map(e=>D.get(e)).filter(Boolean);return(0,M.jsx)(X,{className:a(N.root,o.root,c),ref:S,...l,children:O.map(e=>(0,M.jsx)(ce,{classes:{ripple:a(o.ripple,N.ripple),rippleVisible:a(o.rippleVisible,N.rippleVisible),ripplePulsate:a(o.ripplePulsate,N.ripplePulsate),child:a(o.child,N.child),childLeaving:a(o.childLeaving,N.childLeaving),childPulsate:a(o.childPulsate,N.childPulsate)},timeout:r.shouldReduceMotion?0:U,pulsate:e.pulsate,rippleX:e.rippleX,rippleY:e.rippleY,rippleSize:e.rippleSize,in:!e.exiting,onExited:()=>ee(e.key)},e.key))})});function ue(e){return i(`MuiButtonBase`,e)}var Z=r(`MuiButtonBase`,[`root`,`disabled`,`focusVisible`]),de=e=>{let{disabled:t,focusVisible:n,focusVisibleClassName:r,suppressFocusVisible:i,classes:a}=e,s=o({root:[`root`,t&&`disabled`,n&&!i&&`focusVisible`]},ue,a);return n&&!i&&r&&(s.root+=` ${r}`),s},fe=c(`button`,{name:`MuiButtonBase`,slot:`Root`})({display:`inline-flex`,alignItems:`center`,justifyContent:`center`,position:`relative`,boxSizing:`border-box`,WebkitTapHighlightColor:`transparent`,backgroundColor:`transparent`,outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:`pointer`,userSelect:`none`,verticalAlign:`middle`,MozAppearance:`none`,WebkitAppearance:`none`,textDecoration:`none`,color:`inherit`,"&::-moz-focus-inner":{borderStyle:`none`},[`&.${Z.disabled}`]:{pointerEvents:`none`,cursor:`default`},"@media print":{colorAdjust:`exact`}}),pe=m.forwardRef(function(e,t){let n=s({props:e,name:`MuiButtonBase`}),{action:r,centerRipple:i=!1,children:o,className:c,component:l=`button`,disabled:u=!1,disableRipple:d=!1,disableTouchRipple:f=!1,focusRipple:p=!1,focusVisibleClassName:h,focusableWhenDisabled:g,suppressFocusVisible:v=!1,internalNativeButton:x,LinkComponent:S=`a`,nativeButton:C,onBlur:w,onClick:T,onContextMenu:D,onDragLeave:O,onFocus:k,onFocusVisible:A,onKeyDown:j,onKeyUp:te,onMouseDown:N,onMouseLeave:P,onMouseUp:ne,onTouchEnd:F,onTouchMove:I,onTouchStart:L,tabIndex:R=0,TouchRippleProps:re,touchRippleRef:ie,type:z,...B}=n,V=!!(B.href||B.to),H=!!B.formAction,U=l;U===`button`&&V&&(U=S);let W=typeof U==`string`?U===`button`:x??!1,G=C??W,K=E(),q=_(K.ref,ie),[J,Y]=m.useState(!1);(u||v)&&J&&Y(!1);let ae=y(e=>{p&&!e.repeat&&J&&e.key===` `&&K.stop(e,()=>{K.start(e)})}),oe=y(e=>{p&&e.key===` `&&J&&!e.defaultPrevented&&K.stop(e,()=>{K.pulsate(e)})}),{getButtonProps:se,rootRef:X}=ee({nativeButton:G,nativeButtonProp:C,internalNativeButton:W,allowInferredHostMismatch:V||typeof U==`string`,disabled:u,type:z,hasFormAction:H,tabIndex:R,onBeforeKeyDown:ae,onBeforeKeyUp:oe}),{onClick:ce,onKeyDown:ue,onKeyUp:Z,...pe}=se({onClick:T,onKeyDown:j,onKeyUp:te});m.useImperativeHandle(r,()=>({focusVisible:()=>{Y(!0),X.current.focus()}}),[X]);let me=K.shouldMount&&!d&&!u;m.useEffect(()=>{J&&p&&!d&&K.pulsate()},[d,p,J,K]);let he=Q(K,`start`,N,f),ge=Q(K,`stop`,D,f),_e=Q(K,`stop`,O,f),ve=Q(K,`stop`,ne,f),ye=Q(K,`stop`,e=>{J&&e.preventDefault(),P&&P(e)},f),be=Q(K,`start`,L,f),xe=Q(K,`stop`,F,f),Se=Q(K,`stop`,I,f),Ce=Q(K,`stop`,e=>{b(e.target)||Y(!1),w&&w(e)},!1),we=y(e=>{X.current||=e.currentTarget,!v&&b(e.target)&&(Y(!0),A&&A(e)),k&&k(e)}),$={};V&&($.tabIndex=u?-1:R,u&&($[`aria-disabled`]=u),$.type=z);let Te=_(t,X),Ee={...n,centerRipple:i,component:l,disabled:u,disableRipple:d,disableTouchRipple:f,focusRipple:p,suppressFocusVisible:v,tabIndex:R,focusVisible:J},De=de(Ee);return(0,M.jsxs)(fe,{as:U,className:a(De.root,c),ownerState:Ee,onBlur:Ce,onClick:ce,onContextMenu:ge,onFocus:we,onKeyDown:ue,onKeyUp:Z,onMouseDown:he,onMouseLeave:ye,onMouseUp:ve,onDragLeave:_e,onTouchEnd:xe,onTouchMove:Se,onTouchStart:be,ref:Te,...V?$:pe,...B,children:[o,me?(0,M.jsx)(le,{ref:q,center:i,...re}):null]})});function Q(e,t,n,r=!1){return y(i=>(n&&n(i),r||e[t](i),!0))}export{j as a,b as c,_ as d,g as f,A as i,y as l,Z as n,k as o,h as p,H as r,w as s,pe as t,v as u};