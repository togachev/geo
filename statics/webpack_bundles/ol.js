(()=>{"use strict";var e,t={6716:(e,t,n)=>{n(9789);var o=n(309),r=n(837),l=n(217),i=n(686),a=n(6841),c=n(4333),s=n(7205),p=n(2856),u=n(9090),d=n(8661),m=n(1882),f=n(5920),g=n(7494),w=n(559),h=n(7539),v=n(8958),x=n(1345),b=n(3492),y=n(1280);const Z=document.getElementById("geo-popup"),P=document.getElementById("geo-popup-content"),k=document.getElementById("geo-popup-closer"),O=document.getElementById("geo-popup-name-popup"),E=new m.Z({element:Z,autoPan:!0,autoPanAnimation:{duration:250}}),T=e=>{const t=e.getProperties();var n=["les","uch_les","uroch","kvartal","vydel","term_p_num"],o="";for(let e in n)"string"==typeof t[n[e]]?t[n[e]].length>0&&(o+=`${t[n[e]]}\n`):"number"==typeof t[n[e]]&&(o+=`${t[n[e]]}\n`);return[new h.ZP({stroke:new v.Z({color:"rgba(255, 0, 0, 1)",width:.5}),fill:new x.Z({color:"rgba(255, 255, 255, 0.5)"})}),new h.ZP({image:new b.Z({radius:5,fill:new x.Z({color:"black"}),stroke:new v.Z({color:"rgba(255,0,0,0.9)",width:1})})}),new h.ZP({text:new y.Z({text:o,font:"12px Calibri,sans-serif",overflow:!0,fill:new x.Z({color:"#000"}),stroke:new v.Z({color:"#fff",width:3})})})]},_=[];for(let e in layer_id)_.push(new c.Z({minZoom:minzoom[e],maxZoom:maxzoom[e],renderBuffer:10,updateWhileAnimating:!1,source:new s.Z({format:new o.Z({}),url:"http://192.168.14.142/geo/layer/"+layer_id[e]+"/tile/{z}/{x}/{y}"}),style:T,declutter:!0}));const L=[new p.Z({source:new a.Z({attributions:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',url:"https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"})})],z=new r.Z({interactions:(0,l.ce)({mouseWheelZoom:!1}).extend([new i.Z({constrainResolution:!0})]),controls:(0,f.ce)().extend([new g.Z]),renderer:"webgl",layers:[].concat(L,_),overlays:[E],moveTolerance:10,target:"map",view:new u.ZP({center:(0,d.mi)([70.538086,62.201629]),enableRotation:!1,zoom:6})});z.on("singleclick",(function(e){const t=e.coordinate,n=(0,d.vs)(t,"EPSG:3857","EPSG:4326"),o='<tr><td>Lon-Lat: </td><td class="popup-text">'+n[0].toFixed(6)+", "+n[1].toFixed(6)+"</td></tr>";let r=z.forEachFeatureAtPixel(e.pixel,(function(e){const t=e.getProperties();var n='<table class="popup-text-all">';const{layer:r,...l}=t,i=Object.assign({},{...l});for(let e in i)"string"==typeof t[e]?t[e].length>0&&(n+="<tr><td>"+e+'</td><td class="popup-text">'+t[e]+"</td></tr>"):"number"==typeof t[e]&&(n+="<tr><td>"+e+'</td><td class="popup-text">'+t[e]+"</td></tr>");return n+=o+"</table>"}),{hitTolerance:10}),l=z.forEachFeatureAtPixel(e.pixel,(function(e){return e.getProperties().layer}),{hitTolerance:10});r?(O.innerHTML=l,P.innerHTML=r):(O.innerHTML=null,P.innerHTML=o);E.setPosition([""[0],(""[3]-""[1])/2]),k.onclick=function(){return E.setPosition(void 0),k.blur(),!1}}));var M=z.getView().calculateExtent(z.getSize());const j=document.createElement("span");j.innerHTML=house_fill;const A=new w.Z({extent:M,label:j});z.addControl(A),z.on("pointermove",(function(e){z.getTargetElement().style.cursor=z.hasFeatureAtPixel(e.pixel,{hitTolerance:10})?"pointer":""}))}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var l=n[e]={exports:{}};return t[e].call(l.exports,l,l.exports,o),l.exports}o.m=t,e=[],o.O=(t,n,r,l)=>{if(!n){var i=1/0;for(p=0;p<e.length;p++){for(var[n,r,l]=e[p],a=!0,c=0;c<n.length;c++)(!1&l||i>=l)&&Object.keys(o.O).every((e=>o.O[e](n[c])))?n.splice(c--,1):(a=!1,l<i&&(i=l));if(a){e.splice(p--,1);var s=r();void 0!==s&&(t=s)}}return t}l=l||0;for(var p=e.length;p>0&&e[p-1][2]>l;p--)e[p]=e[p-1];e[p]=[n,r,l]},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={521:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var r,l,[i,a,c]=n,s=0;if(i.some((t=>0!==e[t]))){for(r in a)o.o(a,r)&&(o.m[r]=a[r]);if(c)var p=c(o)}for(t&&t(n);s<i.length;s++)l=i[s],o.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return o.O(p)},n=self.webpackChunkwebpack_multiple_html=self.webpackChunkwebpack_multiple_html||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var r=o.O(void 0,[932],(()=>o(6716)));r=o.O(r)})();