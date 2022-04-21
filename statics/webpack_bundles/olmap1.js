(()=>{"use strict";var e,t={8059:(e,t,n)=>{n(9789);var o=n(1090),l=n(188),r=n(309),i=n(8661),a=n(3065),s=n(7358),d=n(6333),c=n(1762),u=n(8734),p=n(2856),m=n(217),y=n(686),g=n(8266),f=n(9090),v=n(1345),b=n(8958),w=n(3492),h=n(7539),E=n(6121),Z=n(1882),x=n(2657),k=n(8775),L=n(2017),_=n(559),I=n(7494);document.getElementById("selection_object"),document.getElementById("selection_object_id");const P=document.getElementById("geo-popup");P.style.display="block"==P.style.display?"none":"block";const S=document.getElementById("geo-popup-content"),B=document.getElementById("geo-popup-coords_data"),T=document.getElementById("geo-popup-closer"),O=(document.getElementById("geo-name-popup"),document.getElementById("geo-popup-name-popup")),H=document.getElementById("geo-obj-list"),M=document.getElementById("geo-select-list"),C=document.getElementById("geo-layer-panel"),z=(document.getElementById("geo-layer-name-panel"),document.getElementById("geo-layer")),G=document.getElementById("geo-layer-closer"),j=document.getElementById("inputForm");let F={};var N=document.createElement("button");N.className="button",N.innerHTML=close_button,T.appendChild(N);const W=new Z.Z({element:P,autoPan:!0,autoPanAnimation:{duration:250,stopEvent:!1}}),A=new v.Z({color:[255,255,255,0]}),V=new b.Z({color:[255,0,0,1],width:.5}),J=new w.Z({radius:5,fill:new v.Z({color:[0,0,0,1]}),stroke:new b.Z({color:[0,134,255,.9],width:1})}),R=new h.ZP({stroke:new b.Z({color:"rgba(255,255,0,1)",width:1.5}),image:new w.Z({radius:7,fill:new v.Z({color:"rgb(255,255,0)"}),stroke:new b.Z({color:"rgba(255,255,0,1)",width:2})})});var q=[];for(let e in layer_id)q.push(new a.Z({declutter:!0,minZoom:minzoom[e],maxZoom:maxzoom[e],renderBuffer:200,renderOrder:null,renderMode:"hybrid",preload:0,useInterimTilesOnError:!1,updateWhileAnimating:!0,source:new s.Z({format:new r.Z({featureClass:o.Z}),url:"/geo/layer/"+layer_id[e]+"/tile/{z}/{x}/{y}"}),style:new h.ZP({fill:A,stroke:V,image:J})}));const D=new p.Z({source:new g.Z}),K=new x.Z({collapsible:!1});var Q='<table class="popup-text-all">';for(let e in layer_id)Q+='<tr><td><td class="popup-text">'+layer_name[e]+"</td></tr>";Q+="</table>";var U=new i.Z({interactions:(0,m.ce)({mouseWheelZoom:!1}).extend([new y.Z({constrainResolution:!0})]),controls:(0,L.ce)({attribution:!1}).extend([new function(){const e=document.createElement("button");e.innerHTML=layer_fill;const t=document.createElement("div");t.className="ol-layer-data ol-unselectable ol-control",t.appendChild(e),t.appendChild(C);const n=new k.Z({element:t}),o=document.createElement("button");return o.className="button",o.innerHTML=close_button,G.appendChild(o),z.innerHTML=Q,e.addEventListener("click",(e=>{P.style.display="none"==P.style.display?"block":"none",console.log(C.scrollHeight),C.style.display="block"==C.style.display?"none":"block",C.style.maxHeight=C.scrollHeight+"px",F={},oe.changed()})),G.addEventListener("click",(e=>{C.style.display="none"})),n},new function(){const e=document.createElement("button");e.innerHTML=zoom_coords;const t=document.createElement("div");t.className="ol-zoom-coords ol-unselectable ol-control",t.title="Поиск по координатам",t.appendChild(e),t.appendChild(j);const n=new k.Z({element:t});return e.addEventListener("click",(e=>{j.style.display="block"==j.style.display?"none":"block"})),n},K]),renderer:"webgl",layers:[D,new u.Z({layers:q})],overlays:[W],moveTolerance:10,target:"map",loadTilesWhileAnimating:!0,loadTilesWhileInteracting:!0,view:new f.ZP({center:(0,E.mi)([70.538086,62.201629]),enableRotation:!1,maxZoom:18,zoom:6,multiWorld:!0})});function X(){const e=U.getSize()[0]<600;K.setCollapsible(e),K.setCollapsed(e)}window.addEventListener("resize",X),X();var Y=U.getView().calculateExtent(U.getSize());const $=document.createElement("span");$.innerHTML=house_fill;const ee=new _.Z({extent:Y,label:$}),te=new I.Z({units:"metric",steps:2,dpi:96});document.getElementById("btn_addmarker").addEventListener("click",(function(){var e,t,n,r,i=document.getElementById("latitude").value,a=document.getElementById("longitude").value;console.log(a,i),U.removeLayer(ne),e=a,t=i,n=new o.Z({geometry:new l.Z((0,E.vs)([e,t],"EPSG:4326","EPSG:3857"))}),r=new c.Z({features:[n]}),ne.setSource(r),ne.setStyle(R),U.addLayer(ne),U.getView().setCenter((0,E.vs)([e,t],"EPSG:4326","EPSG:3857")),U.getView().setZoom(8)}));var ne=new d.Z;U.addControl(ee),U.addControl(te);const oe=new a.Z({map:U,declutter:!0,renderOrder:null,renderBuffer:200,renderMode:"vector",preload:0,useInterimTilesOnError:!1,updateWhileAnimating:!0});U.on("moveend",(function(e){var t=U.getView().calculateExtent(U.getSize());document.getElementById("geo-map-center").innerHTML=function(e){var t=e[0]+(e[2]-e[0])/2,n=e[1]+(e[3]-e[1])/2;const o=(0,E.vs)([t,n],"EPSG:3857","EPSG:4326");return o[0].toFixed(6)+", "+o[1].toFixed(6)}(t)})),U.on("singleclick",(function(e){U.removeLayer(ne),function(e){var t=U.getFeaturesAtPixel(e.pixel,(function(e){}),{hitTolerance:10}),n=t[0];function o(){if(t.length>0){M.options.length=0;for(let e of t)M.options.add(new Option(e.getProperties().layer,JSON.stringify(e)))}}!function(){P.style.display="block";const l=(0,E.vs)(e.coordinate,"EPSG:3857","EPSG:4326"),r='<td class="popup-text">'+l[0].toFixed(6)+", "+l[1].toFixed(6)+"</td></tr>";if(!t.length)return O.innerHTML="Координаты",H.style.display="none",S.style.display="none",B.innerHTML=r,C.style.display="none",j.style.display="none",F={},void oe.changed();if(t.length>0){H.style.display="block",j.style.display="none",o(),S.style.display="block";const e=n.getProperties();var i='<table class="popup-text-all">';const{layer:t,...l}=e,a=Object.assign({},{...l});for(let t in a)"string"==typeof e[t]?e[t].length>0&&(i+="<tr><td>"+t+'</td><td class="popup-text">'+e[t]+"</td></tr>"):"number"==typeof e[t]&&(i+="<tr><td>"+t+'</td><td class="popup-text">'+e[t]+"</td></tr>");i+="</table>",O.innerHTML=e.layer,S.innerHTML=i,B.innerHTML=r}}(),o(),function(){if(t.length>0)for(let t in layer_id)if(n.getProperties().layer==layer_name[t]){var e=t;const o=n.get("id");F={},F[o]=n,oe.setSource(q[e].getSource()),oe.setStyle((function(e){if(e.get("id")in F)return R})),oe.changed()}}(),document.getElementById("geo-select-list").addEventListener("change",(function(){const t=JSON.parse(this.value);for(let r in layer_id)if(t.values_.layer==layer_name[r]){var o=r;const i=t.values_.id;console.log(i,this.text),F={},F[i]=n,oe.setSource(q[o].getSource()),oe.setStyle((function(e){if(e.get("id")in F)return R})),oe.changed(),P.style.display="block";const a=(0,E.vs)(e.coordinate,"EPSG:3857","EPSG:4326"),s='<td class="popup-text">'+a[0].toFixed(6)+", "+a[1].toFixed(6)+"</td></tr>";B.innerHTML=s,H.style.display="block",S.style.display="block";const d=t.values_;var l='<table class="popup-text-all">';const{layer:c,...u}=d,p=Object.assign({},{...u});for(let e in p)"string"==typeof d[e]?d[e].length>0&&(l+="<tr><td>"+e+'</td><td class="popup-text">'+d[e]+"</td></tr>"):"number"==typeof d[e]&&(l+="<tr><td>"+e+'</td><td class="popup-text">'+d[e]+"</td></tr>");l+="</table>",O.innerHTML=d.layer,S.innerHTML=l,B.innerHTML=s}}))}(e);W.setPosition([""[0],(""[3]-""[1])/2]),T.onclick=function(){return W.setPosition(void 0),F={},oe.changed(),T.blur(),!1}}))}},n={};function o(e){var l=n[e];if(void 0!==l)return l.exports;var r=n[e]={exports:{}};return t[e].call(r.exports,r,r.exports,o),r.exports}o.m=t,e=[],o.O=(t,n,l,r)=>{if(!n){var i=1/0;for(c=0;c<e.length;c++){for(var[n,l,r]=e[c],a=!0,s=0;s<n.length;s++)(!1&r||i>=r)&&Object.keys(o.O).every((e=>o.O[e](n[s])))?n.splice(s--,1):(a=!1,r<i&&(i=r));if(a){e.splice(c--,1);var d=l();void 0!==d&&(t=d)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[n,l,r]},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={882:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var l,r,[i,a,s]=n,d=0;if(i.some((t=>0!==e[t]))){for(l in a)o.o(a,l)&&(o.m[l]=a[l]);if(s)var c=s(o)}for(t&&t(n);d<i.length;d++)r=i[d],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(c)},n=self.webpackChunkwebpack_multiple_html=self.webpackChunkwebpack_multiple_html||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var l=o.O(void 0,[760,358,461],(()=>o(8059)));l=o.O(l)})();