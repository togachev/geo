(()=>{"use strict";var e,t={6716:(e,t,o)=>{o(9789);var r=o(309),n=o(837),l=o(217),i=o(686),a=o(6841),s=o(4333),c=o(7205),p=o(2856),u=o(9090),d=o(8661),f=o(1882),m=o(5920),w=o(7494),g=o(559),v=o(7539),h=o(8958),b=o(1345),x=o(3492),y=o(1280);const Z=document.getElementById("geo-popup"),P=document.getElementById("geo-popup-content"),k=document.getElementById("geo-popup-closer"),O=new f.Z({element:Z,autoPan:!0,autoPanAnimation:{duration:250}}),E=e=>{const t=e.getProperties();var o=["les","uch_les","uroch","kvartal","vydel"],r="";for(let e in o)"string"==typeof t[o[e]]?t[o[e]].length>0&&(r+=`${t[o[e]]}\n`):"number"==typeof t[o[e]]&&(r+=`${t[o[e]]}\n`);return[new v.ZP({stroke:new h.Z({color:"rgba(255, 0, 0, 1)",width:.5}),fill:new b.Z({color:"rgba(255, 255, 255, 0.5)"})}),new v.ZP({image:new x.Z({radius:5,fill:new b.Z({color:"black"}),stroke:new h.Z({color:"rgba(255,0,0,0.9)",width:3})})}),new v.ZP({text:new y.Z({text:r,font:"12px Calibri,sans-serif",overflow:!0,fill:new b.Z({color:"#000"}),stroke:new h.Z({color:"#fff",width:3})})})]},_=[];for(let e in layer_id)_.push(new s.Z({minZoom:minzoom[e],maxZoom:maxzoom[e],renderBuffer:50,updateWhileAnimating:!0,source:new c.Z({format:new r.Z({}),url:"http://192.168.14.142/geo/layer/"+layer_id[e]+"/tile/{z}/{x}/{y}"}),style:E,declutter:!0}));const z=[new p.Z({source:new a.Z({attributions:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',url:"https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"})})],$=new n.Z({interactions:(0,l.ce)({mouseWheelZoom:!1}).extend([new i.Z({constrainResolution:!0})]),controls:(0,m.ce)().extend([new w.Z]),layers:[].concat(z,_),overlays:[O],renderer:"webgl",moveTolerance:1,target:"map",view:new u.ZP({center:(0,d.mi)([70.538086,62.201629]),enableRotation:!1,zoom:6})});$.on("singleclick",(function(e){const t=e.coordinate,o=(0,d.vs)(t,"EPSG:3857","EPSG:4326"),r='<tr><td>Lon-Lat: </td><td class="popup-text">'+o[0].toFixed(6)+", "+o[1].toFixed(6)+"</td></tr>",n='<div id="geo-popup-closer" class="geo-popup-closer">';let l=$.forEachFeatureAtPixel(e.pixel,(function(e){const t=e.getProperties();var o=n+t.layer+"</div><table>";delete t.layer;for(let e in t)"string"==typeof t[e]?t[e].length>0&&(o+=`<tr><td>${e}</td><td class="popup-text">${t[e]}</td></tr>`):"number"==typeof t[e]&&(o+=`<tr><td>${e}</td><td class="popup-text">${t[e]}</td></tr>`);return o+=r+"</table>"}));P.innerHTML=l||n+"</div>"+r;O.setPosition([""[0],(""[3]-""[1])/2]),k.onclick=function(){return O.setPosition(void 0),k.blur(),!1}}));var j=$.getView().calculateExtent($.getSize());const A=document.createElement("span");A.innerHTML=house_fill;const B=new g.Z({extent:j,label:A});$.addControl(B),$.on("pointermove",(function(e){$.getTargetElement().style.cursor=$.hasFeatureAtPixel(e.pixel)?"pointer":""}))}},o={};function r(e){var n=o[e];if(void 0!==n)return n.exports;var l=o[e]={exports:{}};return t[e].call(l.exports,l,l.exports,r),l.exports}r.m=t,e=[],r.O=(t,o,n,l)=>{if(!o){var i=1/0;for(p=0;p<e.length;p++){for(var[o,n,l]=e[p],a=!0,s=0;s<o.length;s++)(!1&l||i>=l)&&Object.keys(r.O).every((e=>r.O[e](o[s])))?o.splice(s--,1):(a=!1,l<i&&(i=l));if(a){e.splice(p--,1);var c=n();void 0!==c&&(t=c)}}return t}l=l||0;for(var p=e.length;p>0&&e[p-1][2]>l;p--)e[p]=e[p-1];e[p]=[o,n,l]},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={521:0};r.O.j=t=>0===e[t];var t=(t,o)=>{var n,l,[i,a,s]=o,c=0;if(i.some((t=>0!==e[t]))){for(n in a)r.o(a,n)&&(r.m[n]=a[n]);if(s)var p=s(r)}for(t&&t(o);c<i.length;c++)l=i[c],r.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return r.O(p)},o=self.webpackChunkwebpack_multiple_html=self.webpackChunkwebpack_multiple_html||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var n=r.O(void 0,[932],(()=>r(6716)));n=r.O(n)})();