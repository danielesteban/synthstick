!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";var i,r="object"==typeof Reflect?Reflect:null,o=r&&"function"==typeof r.apply?r.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};i=r&&"function"==typeof r.ownKeys?r.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var s=Number.isNaN||function(e){return e!=e};function a(){a.init.call(this)}e.exports=a,e.exports.once=function(e,t){return new Promise((function(n,i){function r(){void 0!==o&&e.removeListener("error",o),n([].slice.call(arguments))}var o;"error"!==t&&(o=function(n){e.removeListener(t,r),i(n)},e.once("error",o)),e.once(t,r)}))},a.EventEmitter=a,a.prototype._events=void 0,a.prototype._eventsCount=0,a.prototype._maxListeners=void 0;var l=10;function c(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function u(e){return void 0===e._maxListeners?a.defaultMaxListeners:e._maxListeners}function d(e,t,n,i){var r,o,s,a;if(c(n),void 0===(o=e._events)?(o=e._events=Object.create(null),e._eventsCount=0):(void 0!==o.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),o=e._events),s=o[t]),void 0===s)s=o[t]=n,++e._eventsCount;else if("function"==typeof s?s=o[t]=i?[n,s]:[s,n]:i?s.unshift(n):s.push(n),(r=u(e))>0&&s.length>r&&!s.warned){s.warned=!0;var l=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");l.name="MaxListenersExceededWarning",l.emitter=e,l.type=t,l.count=s.length,a=l,console&&console.warn&&console.warn(a)}return e}function p(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function h(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=p.bind(i);return r.listener=n,i.wrapFn=r,r}function f(e,t,n){var i=e._events;if(void 0===i)return[];var r=i[t];return void 0===r?[]:"function"==typeof r?n?[r.listener||r]:[r]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(r):y(r,r.length)}function m(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function y(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}Object.defineProperty(a,"defaultMaxListeners",{enumerable:!0,get:function(){return l},set:function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");l=e}}),a.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},a.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},a.prototype.getMaxListeners=function(){return u(this)},a.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var i="error"===e,r=this._events;if(void 0!==r)i=i&&void 0===r.error;else if(!i)return!1;if(i){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var a=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw a.context=s,a}var l=r[e];if(void 0===l)return!1;if("function"==typeof l)o(l,this,t);else{var c=l.length,u=y(l,c);for(n=0;n<c;++n)o(u[n],this,t)}return!0},a.prototype.addListener=function(e,t){return d(this,e,t,!1)},a.prototype.on=a.prototype.addListener,a.prototype.prependListener=function(e,t){return d(this,e,t,!0)},a.prototype.once=function(e,t){return c(t),this.on(e,h(this,e,t)),this},a.prototype.prependOnceListener=function(e,t){return c(t),this.prependListener(e,h(this,e,t)),this},a.prototype.removeListener=function(e,t){var n,i,r,o,s;if(c(t),void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(r=-1,o=n.length-1;o>=0;o--)if(n[o]===t||n[o].listener===t){s=n[o].listener,r=o;break}if(r<0)return this;0===r?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,r),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,s||t)}return this},a.prototype.off=a.prototype.removeListener,a.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var r,o=Object.keys(n);for(i=0;i<o.length;++i)"removeListener"!==(r=o[i])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},a.prototype.listeners=function(e){return f(this,e,!0)},a.prototype.rawListeners=function(e){return f(this,e,!1)},a.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):m.call(e,t)},a.prototype.listenerCount=m,a.prototype.eventNames=function(){return this._eventsCount>0?i(this._events):[]}},function(e,t,n){"use strict";n.r(t);const i={on(e,t){if("clock"!==e)throw new Error;const n=()=>{requestAnimationFrame(n),t(void 0,new Date/1e3)};n()}};class r{constructor({context:e,filters:t,gain:n=1,muted:i=!1}){this.context=e,this.output=e.createGain(),this.output.gain.setValueAtTime(i?0:n,e.currentTime),t?(this.filters=t.map(({type:t,amount:n,detune:i,frequency:o,gain:s,Q:a})=>{let l;switch(t){case"analyser":l=e.createAnalyser(),l.fftSize=1024,l.buffer=new Uint8Array(l.fftSize);break;case"distortion":l=e.createWaveShaper(),l.curve=r.getDistortionCurve(n),l.oversample="4x";break;default:l=e.createBiquadFilter(),l.type=t,void 0!==i&&l.detune.setValueAtTime(i,e.currentTime),void 0!==o&&l.frequency.setValueAtTime(o,e.currentTime),void 0!==s&&l.gain.setValueAtTime(s,e.currentTime),void 0!==a&&l.Q.setValueAtTime(a,e.currentTime)}return l}),this.filters.forEach((e,t)=>{t>0?this.filters[t-1].connect(e):this.input=e,t===this.filters.length-1&&e.connect(this.output)})):this.input=this.output,this._gain=n,this._muted=i}get gain(){return this._gain}set gain(e){this._gain!==e&&(this._gain=e,this.updateGain())}get muted(){return this._muted}set muted(e){this._muted!==e&&(this._muted=e,this.updateGain())}updateGain(){const{context:e,gain:t,muted:n,output:i}=this,r=n?0:t;i.gain.cancelScheduledValues(0),i.gain.linearRampToValueAtTime(r,e.currentTime+.01)}static getDistortionCurve(e){const{distortionCurves:t}=r;let n=t.get(e);if(!n){const i=Math.PI/180,r=44100;n=new Float32Array(r);for(let t=0;t<r;t+=1){const o=2*t/r-1;n[t]=(3+e)*o*20*i/(Math.PI+e*Math.abs(o))}t.set(e,n)}return n}}r.analyserBands=[2,4,8,16,32,64,128,256,512],r.distortionCurves=new Map;var o=r,s=n(0);class a extends s.EventEmitter{constructor(){super(),this.cache=new Map}update(){const{cache:e}=this,t=navigator.getGamepads(),n=t.length;for(let i=0;i<n;i+=1){const n=t[i];if(n){const{id:t}=n,i=n.axes.map(e=>Math.abs(e)<a.deadZone?0:e),r=n.buttons.map(({pressed:e})=>e);let o=e.get(t);o&&(i.forEach((e,n)=>{o.axes[n]!==e&&this.emit("change",{type:"axis",gamepad:t,index:n,value:e})}),r.forEach((e,n)=>{o.buttons[n]!==e&&this.emit("change",{type:"button",gamepad:t,index:n,value:e?1:-1})})),e.set(t,{axes:i,buttons:r})}}}}a.deadZone=.1;var l=a;class c{constructor({context:e,waves:t}){this.context=e,this.output=e.createGain(),this.output.gain.setValueAtTime(1,e.currentTime),this.waves=t,this.updateWaves()}get note(){return this._note}set note(e){this._note!==e&&(this._note=e,this.updateFrequencies())}updateWaves(){const{context:e,oscillators:t,output:n,waves:i}=this;t&&t.forEach(t=>{t.output.disconnect(n),t.disconnect(t.output),t.stop(e.currentTime)});const r=i.filter(({enabled:e})=>!!e);this.oscillators=r.map(({type:t,offset:i})=>{const o=e.createGain();o.gain.setValueAtTime(1/r.length*.5,e.currentTime),o.connect(n);const s=e.createOscillator();return s.offset=i,s.type=t,s.output=o,s.connect(o),s.start(e.currentTime),s}),void 0!==this.note&&this.updateFrequencies()}updateFrequencies(){const{context:e,note:t,oscillators:n}=this;n.forEach(({frequency:n,offset:i})=>{n.cancelScheduledValues(0),n.exponentialRampToValueAtTime(c.frequencies[t+i],e.currentTime+.01)})}}c.frequencies=(()=>{const e=[];for(let t=24;t<96;t+=1)e.push(2**((t-69)/12)*440);return e})();var u=c;var d=class{constructor({dom:e,output:t}){const n=document.createElement("div");n.style.background="#000",n.style.display="flex",n.style.padding="0.25rem",e.appendChild(n);const i=document.createElement("input");i.type="range",i.min=0,i.max=1,i.step=.01,i.value=t.gain,i.style.boxSizing="border-box",i.style.width="100%",i.style.outline="none",i.addEventListener("input",({target:{value:e}})=>{t.gain=parseFloat(e)}),n.appendChild(i)}};class p{constructor({context:e,dom:t,gamepads:n,output:i}){this.context=e,this.channel=new o({context:e,filters:[{type:"highpass",frequency:512},{type:"distortion",amount:1024}],gain:1,muted:!0}),this.voice=new u({context:e,waves:[{enabled:!0,type:"sine",offset:0},{enabled:!0,type:"triangle",offset:7},{type:"sawtooth",offset:12},{type:"square",offset:14}]}),this.voice.output.connect(this.channel.input),this.channel.output.connect(i.input),this.controls={},this.mappings=new Map;const r=document.createElement("div");r.style.padding="0.5rem",t.appendChild(r),p.controls.forEach(e=>{const t=document.createElement("div");t.style.display="flex",t.style.justifyContent="space-between",t.style.padding="0.25rem 0";const i=document.createElement("label");i.style.position="relative",i.style.flexGrow="1",i.style.padding="0 0.25rem",i.style.marginRight="0.25rem",i.style.border="1px solid #000",t.appendChild(i);const o=document.createElement("span");o.style.position="absolute",o.style.top="0px",o.style.left="0px",o.style.width="0%",o.style.height="100%",o.style.background="#393",i.appendChild(o);const s=document.createElement("span");s.style.position="relative",s.innerText=e,i.appendChild(s);const a={bar:o,mapping:localStorage.getItem("synthstick:mapping:"+e)||void 0,centered:localStorage.getItem(`synthstick:modifier:${e}:centered`)||!1,enabled:localStorage.getItem(`synthstick:modifier:${e}:enabled`)||!1,inverted:localStorage.getItem(`synthstick:modifier:${e}:inverted`)||!1,value:0};a.mapping&&this.mappings.set(a.mapping,e),this.controls[e]=a,p.modifiers.forEach(n=>{const i=document.createElement("button");i.style.background=a[n]?"#393":"#333",i.style.width="20px",i.style.border="1px solid #000",i.style.color="#eee",i.style.fontFamily="inherit",i.style.padding="0",i.style.outline="none",i.innerText=n.substr(0,1).toUpperCase(),i.addEventListener("click",()=>{a[n]=!a[n],i.style.background=a[n]?"#393":"#333",a[n]?localStorage.setItem(`synthstick:modifier:${e}:${n}`,!0):localStorage.removeItem(`synthstick:modifier:${e}:${n}`)}),t.appendChild(i)});const l=document.createElement("button");l.style.background="#111",l.style.border="1px solid #000",l.style.color="#eee",l.style.fontFamily="inherit",l.style.fontSize="0.8em",l.style.outline="none",l.innerText="MAP",l.addEventListener("click",()=>{l.style.background="#393",n.prependOnceListener("change",({type:t,gamepad:n,index:i})=>{l.style.background="#222",a.mapping&&this.mappings.get(a.mapping)===e&&this.mappings.delete(a.mapping),a.mapping=`${t}:${n}:${i}`,this.mappings.set(a.mapping,e),localStorage.setItem("synthstick:mapping:"+e,a.mapping)})}),t.appendChild(l),r.appendChild(t)}),n.on("change",this.onGamepad.bind(this));const s=document.createElement("div");s.style.background="#000",s.style.display="flex",s.style.justifyContent="space-between",s.style.padding="0.5rem",t.appendChild(s),this.bpm=120;const a=document.createElement("input");a.type="number",a.min=0,a.value=120,a.style.background="#222",a.style.border="1px solid #000",a.style.color="#eee",a.style.outline="none",a.style.width="30%",a.addEventListener("change",({target:{value:e}})=>{this.bpm=parseInt(e,10)}),s.appendChild(a),this.root=p.roots[0];const l=document.createElement("select");l.style.background="#222",l.style.border="1px solid #000",l.style.color="#eee",l.style.outline="none",l.style.width="30%",l.addEventListener("change",({target:{value:e}})=>{this.root=e,this.updateNotes()}),s.appendChild(l),p.roots.forEach(e=>{const t=document.createElement("option");t.innerText=e,l.appendChild(t)}),this.scale=Object.keys(p.scales)[0];const c=document.createElement("select");c.style.background="#222",c.style.border="1px solid #000",c.style.color="#eee",c.style.outline="none",c.style.width="30%",c.addEventListener("change",({target:{value:e}})=>{this.scale=e,this.updateNotes()}),s.appendChild(c),Object.keys(p.scales).forEach(e=>{const t=document.createElement("option");t.innerText=e,c.appendChild(t)});const d=document.createElement("div");d.style.padding="0.25rem 0.5rem",t.appendChild(d),this.voice.waves.forEach((e,t)=>{const n=document.createElement("div");n.style.display="flex",n.style.justifyContent="space-between",n.style.padding="0.125rem 0";const i=document.createElement("input");i.type="checkbox",i.checked=!!e.enabled,i.addEventListener("change",({target:{checked:t}})=>{e.enabled=t,this.voice.updateWaves()}),n.appendChild(i);const r=document.createElement("select");r.style.background="#111",r.style.border="1px solid #000",r.style.color="#eee",r.style.outline="none",r.style.width="40%",r.addEventListener("change",({target:{value:t}})=>{e.type=t,this.voice.updateWaves()}),["Sine","Square","Sawtooth","Triangle"].forEach(e=>{const t=document.createElement("option");t.innerText=e,t.value=e.toLowerCase(),r.appendChild(t)}),r.value=e.type,n.appendChild(r);const o=document.createElement("input");o.type="number",o.min=0,o.value=e.offset,o.style.background="#111",o.style.border="1px solid #000",o.style.color="#eee",o.style.outline="none",o.style.width="40%",o.addEventListener("change",({target:{value:t}})=>{e.offset=parseInt(t,10),this.voice.updateWaves()}),n.appendChild(o),d.appendChild(n)}),this.updateNotes()}onGamepad({type:e,gamepad:t,index:n,value:i}){const{channel:r,context:o,controls:s,mappings:a,notes:l,voice:c}=this,u=a.get(`${e}:${t}:${n}`);if(!u)return;const d=s[u];if(d.value=d.centered&&"button"!==e?Math.abs(i):.5*(i+1),d.inverted&&(d.value=1-d.value),d.bar.style.width=100*d.value+"%",d.enabled)switch(u){case"Pitch":c.note=l[Math.floor((l.length-7)*d.value)];break;case"Gain":r.gain=d.value;break;case"HiPass":r.filters[0].frequency.cancelScheduledValues(0),r.filters[0].frequency.linearRampToValueAtTime(512+2048*d.value**2,o.currentTime+.01)}}onTick(e){const{bpm:t,channel:n,controls:i}=this,r=2**(1+Math.floor(4*(1-i.CutOff.value)));n.muted=i.CutOff.enabled&&Math.floor(e/(60/t)*32)%(2*r)>=r}updateNotes(){const{scales:e,roots:t,octave:n}=p,i=t.indexOf(this.root),r=e[this.scale],o=[];for(let e=0;e<3;e+=1){let t=12*(n+e)+i;o.push(t),r.forEach(e=>{t+=e,o.push(t)})}this.notes=o,this.voice.note=o[Math.floor((o.length-7)*this.controls.Pitch.value)]}}p.controls=["Pitch","CutOff","HiPass","Gain"],p.modifiers=["enabled","centered","inverted"],p.octave=1,p.roots=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],p.scales={Aeolian:[2,1,2,2,1,2],Locrian:[1,2,2,1,2,2],Ionian:[2,2,1,2,2,2],Dorian:[2,1,2,2,2,1],Phrygian:[1,2,2,2,1,2],Lydian:[2,2,2,1,2,2],Mixolydian:[2,2,1,2,2,1],"Melodic ascending minor":[2,1,2,2,2,2],"Phrygian raised sixth":[1,2,2,2,2,2],"Lydian raised fifth":[2,2,2,2,1,2],"Major minor":[2,2,1,2,1,2],Altered:[1,2,1,2,2,2],Eastern:[1,2,2,2,1,3]};var h=p;var f=class{constructor({analyser:e,dom:t}){this.analyser=e;const n=document.createElement("canvas");n.width=250,n.height=92,n.style.verticalAlign="middle",t.appendChild(n),this.canvas=n,this.ctx=n.getContext("2d"),this.ctx.fillStyle="#111",this.ctx.lineWidth=2,this.ctx.strokeStyle="#393",this.animate=this.animate.bind(this),this.animate()}animate(){requestAnimationFrame(this.animate);const{analyser:e,canvas:t,ctx:n}=this;e.getByteTimeDomainData(e.buffer),n.fillRect(0,0,t.width,t.height);const i=e.buffer.length,r=1*t.width/i;n.beginPath();for(let o=0,s=0;o<i;o+=1,s+=r){const i=e.buffer[o]/128*t.height/2;0===o?n.moveTo(s,i):n.lineTo(s,i)}n.lineTo(t.width,t.height/2),n.stroke()}};const m=new AudioContext;window.addEventListener("mousedown",()=>{"running"!==m.state&&m.resume()});const y=new o({context:m,filters:[{type:"analyser"}],gain:0});y.output.connect(m.destination),document.body.style.margin="0";const v=document.getElementById("app");v.style.background="linear-gradient(#333, #151515)",v.style.color="#eee",v.style.fontFamily="sans-serif",v.style.fontSize="0.8rem";const g=new l,b=(new f({analyser:y.filters[0],dom:v}),new h({context:m,dom:v,gamepads:g,output:y}));new d({dom:v,output:y});i.on("clock",(e,t)=>{g.update(),b.onTick(t)})}]);