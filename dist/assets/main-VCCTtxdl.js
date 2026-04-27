import{n as e,r as t,t as n}from"./dist--ngpHRUZ.js";/* empty css              */import{n as r,r as i,t as a}from"./lenis-B1cd2kmr.js";(function(){function e(){for(var e=arguments.length,t=0;t<e;t++){var n=t<0||arguments.length<=t?void 0:arguments[t];n.nodeType===1||n.nodeType===11?this.appendChild(n):this.appendChild(document.createTextNode(String(n)))}}function t(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function n(){var e=this.parentNode,t=[...arguments],n=t.length;if(e)for(n||e.removeChild(this);n--;){var r=t[n];typeof r==`object`?r.parentNode&&r.parentNode.removeChild(r):r=this.ownerDocument.createTextNode(r),n?e.insertBefore(this.previousSibling,r):e.replaceChild(r,this)}}typeof Element<`u`&&(Element.prototype.append||(Element.prototype.append=e,DocumentFragment.prototype.append=e),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=t,DocumentFragment.prototype.replaceChildren=t),Element.prototype.replaceWith||(Element.prototype.replaceWith=n,DocumentFragment.prototype.replaceWith=n))})();function o(e,t){if(!(e instanceof t))throw TypeError(`Cannot call a class as a function`)}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,`value`in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e,t,n){return t&&s(e.prototype,t),n&&s(e,n),e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?u(Object(n),!0).forEach(function(t){l(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function f(e,t){return h(e)||ee(e,t)||_(e,t)||ne()}function p(e){return m(e)||g(e)||_(e)||te()}function m(e){if(Array.isArray(e))return v(e)}function h(e){if(Array.isArray(e))return e}function g(e){if(typeof Symbol<`u`&&Symbol.iterator in Object(e))return Array.from(e)}function ee(e,t){if(!(typeof Symbol>`u`||!(Symbol.iterator in Object(e)))){var n=[],r=!0,i=!1,a=void 0;try{for(var o=e[Symbol.iterator](),s;!(r=(s=o.next()).done)&&(n.push(s.value),!(t&&n.length===t));r=!0);}catch(e){i=!0,a=e}finally{try{!r&&o.return!=null&&o.return()}finally{if(i)throw a}}return n}}function _(e,t){if(e){if(typeof e==`string`)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`)return Array.from(e);if(n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return v(e,t)}}function v(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function te(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ne(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function y(e,t){return Object.getOwnPropertyNames(Object(e)).reduce(function(n,r){return Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(Object(t),r)||Object.getOwnPropertyDescriptor(Object(e),r))},{})}function b(e){return typeof e==`string`}function x(e){return Array.isArray(e)}function S(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=y(e),n;return t.types===void 0?t.split!==void 0&&(n=t.split):n=t.types,n!==void 0&&(t.types=(b(n)||x(n)?String(n):``).split(`,`).map(function(e){return String(e).trim()}).filter(function(e){return/((line)|(word)|(char))/i.test(e)})),(t.absolute||t.position)&&(t.absolute=t.absolute||/absolute/.test(e.position)),t}function C(e){var t=b(e)||x(e)?String(e):``;return{none:!t,lines:/line/i.test(t),words:/word/i.test(t),chars:/char/i.test(t)}}function w(e){return typeof e==`object`&&!!e}function re(e){return w(e)&&/^(1|3|11)$/.test(e.nodeType)}function ie(e){return typeof e==`number`&&e>-1&&e%1==0}function ae(e){return w(e)&&ie(e.length)}function T(e){return x(e)?e:e==null?[]:ae(e)?Array.prototype.slice.call(e):[e]}function oe(e){var t=e;return b(e)&&(t=/^(#[a-z]\w+)$/.test(e.trim())?document.getElementById(e.trim().slice(1)):document.querySelectorAll(e)),T(t).reduce(function(e,t){return[].concat(p(e),p(T(t).filter(re)))},[])}var se=Object.entries,E=`_splittype`,D={},ce=0;function O(e,t,n){if(!w(e))return console.warn(`[data.set] owner is not an object`),null;var r=e[E]||(e[E]=++ce),i=D[r]||(D[r]={});return n===void 0?t&&Object.getPrototypeOf(t)===Object.prototype&&(D[r]=d(d({},i),t)):t!==void 0&&(i[t]=n),n}function k(e,t){var n=w(e)?e[E]:null,r=n&&D[n]||{};return t===void 0?r:r[t]}function le(e){var t=e&&e[E];t&&(delete e[t],delete D[t])}function ue(){Object.keys(D).forEach(function(e){delete D[e]})}function de(){se(D).forEach(function(e){var t=f(e,2),n=t[0],r=t[1],i=r.isRoot,a=r.isSplit;(!i||!a)&&(D[n]=null,delete D[n])})}function fe(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:` `;return(e?String(e):``).trim().replace(/\s+/g,` `).split(t)}var A=`\\ud800-\\udfff`,pe=`\\u0300-\\u036f\\ufe20-\\ufe23`,me=`\\u20d0-\\u20f0`,he=`\\ufe0e\\ufe0f`,ge=`[${A}]`,j=`[${pe}${me}]`,M=`\\ud83c[\\udffb-\\udfff]`,_e=`(?:${j}|${M})`,N=`[^${A}]`,P=`(?:\\ud83c[\\udde6-\\uddff]){2}`,F=`[\\ud800-\\udbff][\\udc00-\\udfff]`,I=`\\u200d`,ve=`${_e}?`,ye=`[${he}]?`,be=`(?:`+I+`(?:`+[N,P,F].join(`|`)+`)`+ye+ve+`)*`,xe=ye+ve+be,Se=`(?:${[`${N}${j}?`,j,P,F,ge].join(`|`)}
)`,Ce=RegExp(`${M}(?=${M})|${Se}${xe}`,`g`),we=RegExp(`[${[I,A,pe,me,he].join(``)}]`);function Te(e){return e.split(``)}function Ee(e){return we.test(e)}function De(e){return e.match(Ce)||[]}function Oe(e){return Ee(e)?De(e):Te(e)}function ke(e){return e==null?``:String(e)}function Ae(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:``;return e=ke(e),e&&b(e)&&!t&&Ee(e)?Oe(e):e.split(t)}function L(e,t){var n=document.createElement(e);return t&&Object.keys(t).forEach(function(e){var r=t[e],i=b(r)?r.trim():r;i===null||i===``||(e===`children`?n.append.apply(n,p(T(i))):n.setAttribute(e,i))}),n}var R={splitClass:``,lineClass:`line`,wordClass:`word`,charClass:`char`,types:[`lines`,`words`,`chars`],absolute:!1,tagName:`div`};function je(e,t){t=y(R,t);var n=C(t.types),r=t.tagName,i=e.nodeValue,a=document.createDocumentFragment(),o=[],s=[];return/^\s/.test(i)&&a.append(` `),o=fe(i).reduce(function(e,i,o,c){var l,u;return n.chars&&(u=Ae(i).map(function(e){var n=L(r,{class:`${t.splitClass} ${t.charClass}`,style:`display: inline-block;`,children:e});return O(n,`isChar`,!0),s=[].concat(p(s),[n]),n})),n.words||n.lines?(l=L(r,{class:`${t.wordClass} ${t.splitClass}`,style:`display: inline-block; ${n.words&&t.absolute?`position: relative;`:``}`,children:n.chars?u:i}),O(l,{isWord:!0,isWordStart:!0,isWordEnd:!0}),a.appendChild(l)):u.forEach(function(e){a.appendChild(e)}),o<c.length-1&&a.append(` `),n.words?e.concat(l):e},[]),/\s$/.test(i)&&a.append(` `),e.replaceWith(a),{words:o,chars:s}}function Me(e,t){var n=e.nodeType,r={words:[],chars:[]};if(!/(1|3|11)/.test(n))return r;if(n===3&&/\S/.test(e.nodeValue))return je(e,t);var i=T(e.childNodes);if(i.length&&(O(e,`isSplit`,!0),!k(e).isRoot)){e.style.display=`inline-block`,e.style.position=`relative`;var a=e.nextSibling,o=e.previousSibling,s=e.textContent||``,c=a?a.textContent:` `,l=o?o.textContent:` `;O(e,{isWordEnd:/\s$/.test(s)||/^\s/.test(c),isWordStart:/^\s/.test(s)||/\s$/.test(l)})}return i.reduce(function(e,n){var r=Me(n,t),i=r.words,a=r.chars;return{words:[].concat(p(e.words),p(i)),chars:[].concat(p(e.chars),p(a))}},r)}function Ne(e,t,n,r){if(!n.absolute)return{top:t?e.offsetTop:null};var i=e.offsetParent,a=f(r,2),o=a[0],s=a[1],c=0,l=0;if(i&&i!==document.body){var u=i.getBoundingClientRect();c=u.x+o,l=u.y+s}var d=e.getBoundingClientRect(),p=d.width,m=d.height,h=d.x;return{width:p,height:m,top:d.y+s-l,left:h+o-c}}function Pe(e){k(e).isWord?(le(e),e.replaceWith.apply(e,p(e.childNodes))):T(e.children).forEach(function(e){return Pe(e)})}var Fe=function(){return document.createDocumentFragment()};function Ie(e,t,n){var r=C(t.types),i=t.tagName,a=e.getElementsByTagName(`*`),o=[],s=[],c=null,l,u,d,f=[],p=e.parentElement,m=e.nextElementSibling,h=Fe(),g=window.getComputedStyle(e),ee=g.textAlign,_=parseFloat(g.fontSize)*.2;return t.absolute&&(d={left:e.offsetLeft,top:e.offsetTop,width:e.offsetWidth},u=e.offsetWidth,l=e.offsetHeight,O(e,{cssWidth:e.style.width,cssHeight:e.style.height})),T(a).forEach(function(i){var a=i.parentElement===e,l=Ne(i,a,t,n),u=l.width,d=l.height,f=l.top,p=l.left;/^br$/i.test(i.nodeName)||(r.lines&&a&&((c===null||f-c>=_)&&(c=f,o.push(s=[])),s.push(i)),t.absolute&&O(i,{top:f,left:p,width:u,height:d}))}),p&&p.removeChild(e),r.lines&&(f=o.map(function(e){var n=L(i,{class:`${t.splitClass} ${t.lineClass}`,style:`display: block; text-align: ${ee}; width: 100%;`});O(n,`isLine`,!0);var r={height:0,top:1e4};return h.appendChild(n),e.forEach(function(e,t,i){var a=k(e),o=a.isWordEnd,s=a.top,c=a.height,l=i[t+1];r.height=Math.max(r.height,c),r.top=Math.min(r.top,s),n.appendChild(e),o&&k(l).isWordStart&&n.append(` `)}),t.absolute&&O(n,{height:r.height,top:r.top}),n}),r.words||Pe(h),e.replaceChildren(h)),t.absolute&&(e.style.width=`${e.style.width||u}px`,e.style.height=`${l}px`,T(a).forEach(function(e){var t=k(e),n=t.isLine,r=t.top,i=t.left,a=t.width,o=t.height,s=k(e.parentElement),c=!n&&s.isLine;e.style.top=`${c?r-s.top:r}px`,e.style.left=n?`${d.left}px`:`${i-(c?d.left:0)}px`,e.style.height=`${o}px`,e.style.width=n?`${d.width}px`:`${a}px`,e.style.position=`absolute`})),p&&(m?p.insertBefore(e,m):p.appendChild(e)),f}var z=y(R,{}),Le=function(){c(e,null,[{key:`clearData`,value:function(){ue()}},{key:`setDefaults`,value:function(e){return z=y(z,S(e)),R}},{key:`revert`,value:function(e){oe(e).forEach(function(e){var t=k(e),n=t.isSplit,r=t.html,i=t.cssWidth,a=t.cssHeight;n&&(e.innerHTML=r,e.style.width=i||``,e.style.height=a||``,le(e))})}},{key:`create`,value:function(t,n){return new e(t,n)}},{key:`data`,get:function(){return D}},{key:`defaults`,get:function(){return z},set:function(e){z=y(z,S(e))}}]);function e(t,n){o(this,e),this.isSplit=!1,this.settings=y(z,S(n)),this.elements=oe(t),this.split()}return c(e,[{key:`split`,value:function(e){var t=this;this.revert(),this.elements.forEach(function(e){O(e,`html`,e.innerHTML)}),this.lines=[],this.words=[],this.chars=[];var n=[window.pageXOffset,window.pageYOffset];e!==void 0&&(this.settings=y(this.settings,S(e)));var r=C(this.settings.types);r.none||(this.elements.forEach(function(e){O(e,`isRoot`,!0);var n=Me(e,t.settings),r=n.words,i=n.chars;t.words=[].concat(p(t.words),p(r)),t.chars=[].concat(p(t.chars),p(i))}),this.elements.forEach(function(e){if(r.lines||t.settings.absolute){var i=Ie(e,t.settings,n);t.lines=[].concat(p(t.lines),p(i))}}),this.isSplit=!0,window.scrollTo(n[0],n[1]),de())}},{key:`revert`,value:function(){this.isSplit&&=(this.lines=null,this.words=null,this.chars=null,!1),e.revert(this.elements)}}]),e}();t(),e(),i.registerPlugin(r);var B=n(`https://nojgcsocmocwegfxtxse.supabase.co`,`sb_publishable_jYg3PjN-4vZJlaOvWHIr1w_dh8ubWlD`);async function Re(){try{let{data:e,error:t}=await B.from(`site_settings`).select(`*`).eq(`id`,1).single();if(t&&t.code!==`PGRST116`)throw t;if(e){if(e.site_title&&(document.title=e.site_title),e.site_description){let t=document.querySelector(`meta[name="description"]`);t&&t.setAttribute(`content`,e.site_description)}let t=document.getElementById(`footer-email`);t&&e.contact_email&&(t.href=`mailto:${e.contact_email}`,t.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          ${e.contact_email}
        `);let n=document.getElementById(`footer-phone`);n&&e.contact_phone&&(n.href=`tel:${e.contact_phone.replace(/\s+/g,``)}`,n.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          ${e.contact_phone}
        `)}}catch(e){console.error(`Error loading site settings:`,e)}}var ze=new a({duration:1.2,easing:e=>Math.min(1,1.001-2**(-10*e)),smooth:!0});ze.on(`scroll`,r.update),i.ticker.add(e=>{ze.raf(e*1e3)}),i.ticker.lagSmoothing(0);var V=document.getElementById(`bg-canvas`);if(V){let e=V.getContext(`2d`);V.width=window.innerWidth,V.height=window.innerHeight;class t{constructor(){this.x=Math.random()*V.width,this.y=Math.random()*V.height,this.size=Math.random()*2+.5,this.speedX=Math.random()*.5-.25,this.speedY=Math.random()*.5-.25,this.alpha=Math.random()*.5+.2}update(){this.x+=this.speedX,this.y+=this.speedY,this.x>V.width&&(this.x=0),this.x<0&&(this.x=V.width),this.y>V.height&&(this.y=0),this.y<0&&(this.y=V.height)}draw(){e.globalAlpha=this.alpha,e.fillStyle=`#b8e11e`,e.beginPath(),e.arc(this.x,this.y,this.size,0,Math.PI*2),e.fill()}}let n=[],r=window.innerWidth<768?15:40;for(let e=0;e<r;e++)n.push(new t);let i;function a(){e.clearRect(0,0,V.width,V.height);for(let e=0;e<n.length;e++)n[e].update(),n[e].draw();i=requestAnimationFrame(a)}document.addEventListener(`visibilitychange`,()=>{document.hidden?cancelAnimationFrame(i):a()}),a(),window.addEventListener(`resize`,()=>{V.width=window.innerWidth,V.height=window.innerHeight})}var H=document.getElementById(`entrance`),U=document.getElementById(`brand-name`),W=document.getElementById(`dustCanvas`);if(H&&U&&W){let e=W.getContext(`2d`);W.width=window.innerWidth,W.height=window.innerHeight;class t{constructor(){this.x=Math.random()*W.width,this.y=Math.random()*W.height,this.size=Math.random()*3+1,this.speedX=Math.random()*2-1,this.speedY=Math.random()*2-1,this.alpha=Math.random()*.5+.3}update(){this.x+=this.speedX,this.y+=this.speedY,this.alpha-=.005}draw(){e.globalAlpha=this.alpha,e.fillStyle=`#b8e11e`,e.beginPath(),e.arc(this.x,this.y,this.size,0,Math.PI*2),e.fill()}}let n=[],r=window.innerWidth<768?80:200;for(let e=0;e<r;e++)n.push(new t);function a(){e.clearRect(0,0,W.width,W.height),n.forEach((e,t)=>{e.update(),e.draw(),e.alpha<=0&&n.splice(t,1)}),n.length>0&&requestAnimationFrame(a)}sessionStorage.getItem(`hasSeenIntro`)?(H.style.display=`none`,Be()):i.timeline().to(U,{opacity:1,scale:1,duration:.6,ease:`power2.out`,onStart:a}).to(U,{scale:1.05,duration:.2,ease:`power1.inOut`}).to(H,{opacity:0,duration:.4,ease:`power2.inOut`,onComplete:()=>{H.style.display=`none`,sessionStorage.setItem(`hasSeenIntro`,`true`),Be()}})}function Be(){let e=document.querySelectorAll(`.hero-el`);e.forEach(e=>e.style.willChange=`transform, opacity`),i.to(e,{opacity:1,y:0,duration:1,stagger:.2,ease:`power3.out`,onComplete:()=>{e.forEach(e=>e.style.willChange=`auto`)}})}var G=document.getElementById(`mobile-menu-toggle`),Ve=document.getElementById(`mobile-menu`),He=document.querySelectorAll(`.mobile-nav-link`),Ue=document.getElementById(`mobile-menu-close`);if(G&&Ve){let e=!1,t=t=>{e=t,i.to(Ve,{x:e?`0%`:`100%`,duration:.5,ease:`power3.inOut`});let n=G.querySelectorAll(`span`);e?(i.to(n[0],{rotation:45,y:8,duration:.3}),i.to(n[1],{opacity:0,duration:.3}),i.to(n[2],{rotation:-45,y:-8,duration:.3})):(i.to(n[0],{rotation:0,y:0,duration:.3}),i.to(n[1],{opacity:1,duration:.3}),i.to(n[2],{rotation:0,y:0,duration:.3}))};G.addEventListener(`click`,()=>t(!e)),Ue?.addEventListener(`click`,()=>t(!1)),He.forEach(e=>e.addEventListener(`click`,()=>t(!1)))}i.utils.toArray(`.fade-up`).forEach(e=>{i.from(e,{scrollTrigger:{trigger:e,start:`top 85%`,toggleActions:`play none none reverse`,fastScrollEnd:!0},opacity:0,y:30,duration:.8,ease:`power2.out`})});var K=document.getElementById(`portfolio-grid`),q=document.querySelectorAll(`.filter-btn`),J=[];async function We(){try{let{data:e,error:t}=await B.from(`projects`).select(`*`).eq(`published`,!0).order(`created_at`,{ascending:!1});if(t)throw t;J=e||[],Ge(J)}catch(e){console.error(`Error:`,e),K&&(K.innerHTML=`<div class="col-span-full text-center py-12"><p class="text-red-500 font-bold mb-2">Database Error: ${e.message}</p><p class="text-slate-500 text-sm">Please ensure you have run the supabase-schema.sql script.</p></div>`)}}function Ge(e){if(K){if(e.length===0){K.innerHTML=`<div class="col-span-full text-center py-12"><p class="text-slate-500">No projects to show yet. Check back soon!</p></div>`;return}K.innerHTML=e.map(e=>{let t=(e.tags||[]).map(e=>`<span class="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold rounded-full capitalize">${e}</span>`).join(``),n=Object.entries(e.metrics||{}).slice(0,3).map(([e,t])=>`<div><div class="text-xl md:text-2xl font-bold text-brand-mid">${t}</div><div class="text-[10px] md:text-xs text-slate-500 uppercase tracking-wide truncate">${e}</div></div>`).join(``),r=e.description||(e.challenge?e.challenge.substring(0,100)+`...`:`No description available.`);return`
      <div class="case-study-card group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer" data-project-slug="${e.slug}">
        <div class="relative h-56 md:h-72 overflow-hidden">
          <img src="${e.hero_image}" alt="${e.title}" class="case-study-image w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" width="800" height="600">
          <div class="absolute top-4 right-4 flex gap-2 flex-wrap justify-end">${t}</div>
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div class="p-5 md:p-6 space-y-3 md:space-y-4">
          <h3 class="text-xl md:text-2xl font-heading font-bold text-slate-950 group-hover:text-brand-mid transition-colors">${e.title}</h3>
          <p class="text-slate-600 text-sm md:text-base line-clamp-2">${r}</p>
          <div class="grid grid-cols-3 gap-2 md:gap-4 pt-4 border-t border-slate-100">${n}</div>
          <button class="w-full mt-4 py-3 bg-slate-950 text-white rounded-xl font-semibold hover:bg-accent hover:text-slate-950 transition-all shadow-sm">View Case Study</button>
        </div>
      </div>`}).join(``),document.querySelectorAll(`.case-study-card`).forEach(e=>{e.addEventListener(`click`,()=>{qe(e.dataset.projectSlug)})})}}var Y=document.getElementById(`case-study-modal`),Ke=document.getElementById(`close-case-study`),X=document.getElementById(`modal-project-content`),Z=document.getElementById(`modal-loader`);async function qe(e){if(Y){Y.classList.add(`active`),Z.style.display=`flex`,X.innerHTML=``,X.classList.add(`hidden`),document.body.style.overflow=`hidden`;try{let{data:t,error:n}=await B.from(`projects`).select(`*`).eq(`slug`,e).single();if(n)throw n;t&&Je(t)}catch(e){console.error(`Error fetching project:`,e),X.innerHTML=`
      <div class="p-12 text-center">
        <h3 class="text-2xl font-bold text-white mb-4">Error loading project</h3>
        <p class="text-white/60 mb-8">${e.message}</p>
        <button onclick="closeModal()" class="px-8 py-3 bg-accent text-slate-950 font-bold rounded-full">Close</button>
      </div>
    `,Z.style.display=`none`,X.classList.remove(`hidden`)}}}function Je(e){let t=Object.entries(e.metrics||{}).map(([e,t])=>`
    <div class="metric-item border-b border-white/10 pb-6 last:border-0 last:pb-0">
      <div class="text-4xl md:text-5xl font-bold text-accent mb-1">${t}</div>
      <div class="text-xs text-white/50 uppercase tracking-widest font-semibold">${e}</div>
    </div>
  `).join(``),n=(e.gallery||[]).map(e=>`
    <div class="modal-gallery-item overflow-hidden rounded-2xl md:rounded-3xl border border-white/5 shadow-2xl">
      <img src="${e}" alt="Gallery image" class="w-full h-auto object-cover" loading="lazy">
    </div>
  `).join(``);X.innerHTML=`
    <!-- Hero Section -->
    <div class="relative w-full min-h-[60vh] md:min-h-[70vh] flex flex-col justify-end p-8 md:p-16 overflow-hidden">
      ${e.youtube_id?`
    <div class="absolute inset-0 z-0">
      <iframe 
        class="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40 mix-blend-screen object-cover"
        src="https://www.youtube.com/embed/${e.youtube_id}?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=${e.youtube_id}" 
        frameborder="0" allow="autoplay; encrypted-media"></iframe>
      <div class="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-brand-dark"></div>
    </div>
  `:`
    <div class="absolute inset-0 z-0">
      <img src="${e.hero_image}" class="w-full h-full object-cover opacity-40">
      <div class="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-brand-dark"></div>
    </div>
  `}
      <div class="relative z-10 space-y-4">
        <span class="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-accent">
          ${e.category.replace(`-`,` `)}
        </span>
        <h2 class="modal-title text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight tracking-tight max-w-4xl">
          ${e.title}
        </h2>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 md:p-16">
      <div class="lg:col-span-7 space-y-16">
        <div class="narrative-block">
          <h4 class="flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-6">
            <span class="w-8 h-[1px] bg-accent"></span> The Challenge
          </h4>
          <p class="text-xl md:text-2xl text-white/80 font-light leading-relaxed whitespace-pre-wrap">${e.challenge}</p>
        </div>

        <div class="narrative-block">
          <h4 class="flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-6">
            <span class="w-8 h-[1px] bg-accent"></span> The Solution
          </h4>
          <p class="text-xl md:text-2xl text-white/80 font-light leading-relaxed whitespace-pre-wrap">${e.solution}</p>
        </div>

        <div class="narrative-block">
          <h4 class="flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-6">
            <span class="w-8 h-[1px] bg-accent"></span> The Results
          </h4>
          <p class="text-xl md:text-2xl text-white/80 font-light leading-relaxed whitespace-pre-wrap">${e.results}</p>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="lg:col-span-5">
        <div class="sticky top-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 space-y-10">
          <div>
            <h4 class="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Performance Data</h4>
            <div class="space-y-8">
              ${t}
            </div>
          </div>
          
          ${e.client_quote?`
            <div class="pt-10 border-t border-white/10">
              <blockquote class="text-xl italic text-white/90 leading-relaxed mb-6">
                "${e.client_quote}"
              </blockquote>
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  ${e.client_name?e.client_name.charAt(0):`C`}
                </div>
                <div>
                  <div class="font-bold text-white">${e.client_name||`Client`}</div>
                  <div class="text-xs text-white/50">${e.client_role||``}</div>
                </div>
              </div>
            </div>
          `:``}
        </div>
      </aside>
    </div>

    <!-- Gallery -->
    <div class="p-8 md:p-16 space-y-8 md:space-y-16">
      <h4 class="text-center text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">Project Showcase</h4>
      <div class="space-y-12 md:space-y-24 max-w-6xl mx-auto">
        ${n}
      </div>
    </div>

    <!-- CTA -->
    <div class="bg-accent p-12 md:p-24 text-center">
      <h3 class="text-3xl md:text-5xl font-heading font-bold text-slate-950 mb-8 tracking-tight">Ready for similar impact?</h3>
      <button onclick="closeModalAndScrollToContact()" class="px-10 py-5 bg-slate-950 text-white font-bold rounded-full text-xl hover:scale-105 transition-transform">
        Start Your Project
      </button>
    </div>
  `,Z.style.display=`none`,X.classList.remove(`hidden`),i.from(`.modal-title`,{y:50,opacity:0,duration:1,ease:`power4.out`,delay:.2}),i.from(`.narrative-block`,{y:30,opacity:0,duration:.8,stagger:.2,ease:`power3.out`,delay:.4}),i.from(`.metric-item`,{scale:.9,opacity:0,duration:.8,stagger:.1,ease:`back.out(1.7)`,delay:.6})}function Q(){Y.classList.remove(`active`),document.body.style.overflow=``}window.closeModalAndScrollToContact=()=>{Q(),setTimeout(()=>{let e=document.getElementById(`contact`);e&&e.scrollIntoView({behavior:`smooth`})},400)},Ke&&Ke.addEventListener(`click`,Q),Y?.addEventListener(`click`,e=>{e.target===Y&&Q()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&Y.classList.contains(`active`)&&Q()}),q.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.filter;q.forEach(e=>{e.classList.remove(`active`,`bg-white`,`text-slate-950`,`shadow-sm`),e.classList.add(`text-slate-500`)}),e.classList.add(`active`,`bg-white`,`text-slate-950`,`shadow-sm`),Ge(t===`all`?J:J.filter(e=>e.category===t))})});var $=document.getElementById(`contact-form`);if($&&$.addEventListener(`submit`,async e=>{e.preventDefault();let t=$.querySelector(`button[type="submit"]`),n=t.innerHTML;t.disabled=!0,t.innerHTML=`<span class="flex items-center justify-center gap-2"><svg class="animate-spin h-5 w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...</span>`;let r={first_name:document.getElementById(`contact-first-name`).value,last_name:document.getElementById(`contact-last-name`).value,email:document.getElementById(`contact-email`).value,phone:document.getElementById(`contact-phone`).value,company:document.getElementById(`contact-company`).value,role:document.getElementById(`contact-role`).value,message:document.getElementById(`contact-message`).value,created_at:new Date().toISOString()};try{let{error:e}=await B.from(`contact_submissions`).insert([r]);if(e)throw e;alert(`Thank you! We'll be in touch soon.`),$.reset()}catch(e){console.error(`Error:`,e),alert(`Error submitting form. Please try again.`)}finally{t.disabled=!1,t.innerHTML=n}}),window.matchMedia(`(hover: hover) and (pointer: fine)`).matches&&document.querySelectorAll(`.magnetic-btn`).forEach(e=>{e.addEventListener(`mousemove`,t=>{let n=e.getBoundingClientRect(),r=(t.clientX-n.left-n.width/2)*.3,a=(t.clientY-n.top-n.height/2)*.3;i.to(e,{x:r,y:a,duration:.3,ease:`power2.out`})}),e.addEventListener(`mouseleave`,()=>{i.to(e,{x:0,y:0,duration:.5,ease:`elastic.out(1, 0.3)`})})}),document.querySelector(`.split-heading`)){let e=new Le(`.split-heading`,{types:`chars`});i.from(e.chars,{scrollTrigger:{trigger:`.split-heading`,start:`top 80%`},opacity:0,y:20,stagger:.05,duration:.8,ease:`power3.out`})}window.requestIdleCallback?requestIdleCallback(()=>{Re(),We()}):setTimeout(()=>{Re(),We()},100);