(()=>{"use strict";var e,t={492:(e,t,n)=>{n(9789);var o,r=n(2971),i=n(5487),l=n(9515),a=n(5818),s=(o=function(e,t){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},o(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});const c=function(e){function t(t){var n=e.call(this)||this;if(n.on,n.once,n.un,n.id_=void 0,n.geometryName_="geometry",n.style_=null,n.styleFunction_=void 0,n.geometryChangeKey_=null,n.addChangeListener(n.geometryName_,n.handleGeometryChanged_),t)if("function"==typeof t.getSimplifiedGeometry){var o=t;n.setGeometry(o)}else{var r=t;n.setProperties(r)}return n}return s(t,e),t.prototype.clone=function(){var e=new t(this.hasProperties()?this.getProperties():null);e.setGeometryName(this.getGeometryName());var n=this.getGeometry();n&&e.setGeometry(n.clone());var o=this.getStyle();return o&&e.setStyle(o),e},t.prototype.getGeometry=function(){return this.get(this.geometryName_)},t.prototype.getId=function(){return this.id_},t.prototype.getGeometryName=function(){return this.geometryName_},t.prototype.getStyle=function(){return this.style_},t.prototype.getStyleFunction=function(){return this.styleFunction_},t.prototype.handleGeometryChange_=function(){this.changed()},t.prototype.handleGeometryChanged_=function(){this.geometryChangeKey_&&((0,a.bN)(this.geometryChangeKey_),this.geometryChangeKey_=null);var e=this.getGeometry();e&&(this.geometryChangeKey_=(0,a.oL)(e,i.Z.CHANGE,this.handleGeometryChange_,this)),this.changed()},t.prototype.setGeometry=function(e){this.set(this.geometryName_,e)},t.prototype.setStyle=function(e){this.style_=e,this.styleFunction_=e?function(e){if("function"==typeof e)return e;var t;Array.isArray(e)?t=e:((0,l.h)("function"==typeof e.getZIndex,41),t=[e]);return function(){return t}}(e):void 0,this.changed()},t.prototype.setId=function(e){this.id_=e,this.changed()},t.prototype.setGeometryName=function(e){this.removeChangeListener(this.geometryName_,this.handleGeometryChanged_),this.geometryName_=e,this.addChangeListener(this.geometryName_,this.handleGeometryChanged_),this.handleGeometryChanged_()},t}(r.Z);var p=n(309),u=n(8661),d=n(4333),y=n(7205),m=n(8734),g=n(2856),h=n(217),f=n(686),v=n(6841),b=function(){var e=function(t,n){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},e(t,n)};return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();const _=function(e){function t(t){var n,o=t||{},r=void 0===o.imageSmoothing||o.imageSmoothing;void 0!==o.interpolate&&(r=o.interpolate),n=void 0!==o.attributions?o.attributions:['&#169; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors.'];var i=void 0!==o.crossOrigin?o.crossOrigin:"anonymous",l=void 0!==o.url?o.url:"https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png";return e.call(this,{attributions:n,attributionsCollapsible:!1,cacheSize:o.cacheSize,crossOrigin:i,interpolate:r,maxZoom:void 0!==o.maxZoom?o.maxZoom:19,opaque:void 0===o.opaque||o.opaque,reprojectionErrorThreshold:o.reprojectionErrorThreshold,tileLoadFunction:o.tileLoadFunction,transition:o.transition,url:l,wrapX:o.wrapX,zDirection:o.zDirection})||this}return b(t,e),t}(v.Z);var w=n(9090),Z=n(7539),E=n(8958),x=n(1345),C=n(3492),O=n(1280),k=n(6121),P=n(1882),G=n(2017),I=n(2657),L=n(8775),S=n(559),T=n(7494);document.getElementById("selection_object"),document.getElementById("selection_object_id");const B=document.getElementById("geo-popup");B.style.display="block"==B.style.display?"none":"block";const N=document.getElementById("geo-popup-content"),j=document.getElementById("geo-popup-coords_data"),H=document.getElementById("geo-popup-closer"),M=(document.getElementById("geo-name-popup"),document.getElementById("geo-popup-name-popup")),z=(document.getElementById("geo-obj-list"),document.getElementById("geo-select-list")),F=document.getElementById("geo-layer-panel"),A=(document.getElementById("geo-layer-name-panel"),document.getElementById("geo-layer")),K=document.getElementById("geo-layer-closer");let W={};var q=document.createElement("button");q.className="button",q.innerHTML=close_button,H.appendChild(q);const V=new P.Z({element:B,autoPan:!0,autoPanAnimation:{duration:250,stopEvent:!1}}),D=e=>{const t=e.getProperties();var n=["les","uch_les","uroch","kvartal","vydel","term_p_num"],o="";for(let e in n)"string"==typeof t[n[e]]?t[n[e]].length>0&&(o+=`${t[n[e]]}\n`):"number"==typeof t[n[e]]&&(o+=`${t[n[e]]}\n`);return[new Z.ZP({stroke:new E.Z({color:"rgba(255, 0, 0, 1)",width:.5}),fill:new x.Z({color:"rgba(255, 255, 255, 0)"})}),new Z.ZP({image:new C.Z({radius:5,fill:new x.Z({color:"black"}),stroke:new E.Z({color:"rgba(0,134,255,0.9)",width:1})})}),new Z.ZP({text:new O.Z({text:o,font:"12px Calibri,sans-serif",overflow:!0,fill:new x.Z({color:"#000"}),stroke:new E.Z({color:"#fff",width:2})})})]},X=new Z.ZP({stroke:new E.Z({color:"rgba(255,255,0,1)",width:1.5}),image:new C.Z({radius:7,fill:new x.Z({color:"rgb(255,255,0)"}),stroke:new E.Z({color:"rgba(255,255,0,1)",width:2})})});var R=[];for(let e in layer_id)R.push(new d.Z({declutter:!0,minZoom:minzoom[e],maxZoom:maxzoom[e],renderBuffer:200,renderOrder:null,renderMode:"vector",preload:0,useInterimTilesOnError:!1,source:new y.Z({format:new p.Z({featureClass:c}),url:"/geo/layer/"+layer_id[e]+"/tile/{z}/{x}/{y}"}),style:D}));const J=new g.Z({source:new _}),Q=new I.Z({collapsible:!1});var U='<table class="popup-text-all">';for(let e in layer_id)U+='<tr><td><td class="popup-text">'+layer_name[e]+"</td></tr>";U+="</table>";var Y=new u.Z({interactions:(0,h.ce)({mouseWheelZoom:!1}).extend([new f.Z({constrainResolution:!0})]),controls:(0,G.ce)({attribution:!1}).extend([new function(){const e=document.createElement("button");e.innerHTML=layer_fill;const t=document.createElement("div");t.className="ol-layer-data ol-unselectable ol-control",t.appendChild(e),t.appendChild(F);const n=new L.Z({element:t}),o=document.createElement("button");return o.className="button",o.innerHTML=close_button,K.appendChild(o),A.innerHTML=U,e.addEventListener("click",(e=>{B.style.display="none"==B.style.display?"block":"none",console.log(F.scrollHeight),F.style.display="block"==F.style.display?"none":"block",F.style.maxHeight=F.scrollHeight+"px",W={},ie.changed()})),K.addEventListener("click",(e=>{F.style.display="none"})),n},Q]),renderer:"webgl",layers:[J,new m.Z({layers:R})],overlays:[V],moveTolerance:10,target:"map",loadTilesWhileAnimating:!0,loadTilesWhileInteracting:!0,view:new w.ZP({center:(0,k.mi)([70.538086,62.201629]),maxZoom:18,zoom:6,multiWorld:!0})});function ee(){const e=Y.getSize()[0]<600;Q.setCollapsible(e),Q.setCollapsed(e)}!function e(t,n){n.getLayers().forEach((function(n,o){console.log(t,o);const r=t+o;!function(e,t){const n=$(e+" input.visible");n.on("change",(function(){t.setVisible(this.checked)})),n.prop("checked",t.getVisible());const o=$(e+" input.opacity");o.on("input change",(function(){t.setOpacity(parseFloat(this.value))})),o.val(String(t.getOpacity()))}(r,n),n instanceof m.Z&&e(r,n)}))}("#layer",Y.getLayerGroup()),$("#layertree li > span").click((function(){$(this).siblings("fieldset").toggle()})).siblings("fieldset").hide(),window.addEventListener("resize",ee),ee();var te=Y.getView().calculateExtent(Y.getSize());const ne=document.createElement("span");ne.innerHTML=house_fill;const oe=new S.Z({extent:te,label:ne}),re=new T.Z({units:"metric",steps:2,dpi:96});Y.addControl(oe),Y.addControl(re);const ie=new d.Z({map:Y,declutter:!0,renderOrder:null,renderBuffer:200,renderMode:"vector",preload:0,useInterimTilesOnError:!1});Y.on(["click"],(function(e){if("pointermove"===e.type)return;!function(e,t){B.style.display="block";const n=(0,k.vs)(t,"EPSG:3857","EPSG:4326"),o='<td class="popup-text">'+n[0].toFixed(6)+", "+n[1].toFixed(6)+"</td></tr>";var r=Y.getFeaturesAtPixel(e,(function(e){}),{hitTolerance:10}),i=r[0];if(r.length>0)for(let e in layer_id)i.getProperties().layer==layer_name[e]&&(l(e,i,r),a(r));if(!r.length)return M.innerHTML="Координаты",N.style.display="none",j.innerHTML=o,F.style.display="none",W={},void ie.changed();function l(e,t,n){a(n);const o=t.get("id");W={},W[o]=t,ie.setSource(R[e].getSource()),ie.setStyle((function(e){if(e.get("id")in W)return X})),ie.changed()}function a(e){var t=document.getElementById("geo-select-list-option");t&&(console.log(t),function(e){for(;z.options.length>0;)z.remove(0)}());for(let t of e){var n=document.createElement("option");n.id="geo-select-list-option",n.value=t.getProperties().id,n.text=t.getProperties().layer,z.appendChild(n)}N.style.display="block";const r=i.getProperties();var l='<table class="popup-text-all">';const{layer:a,...s}=r,c=Object.assign({},{...s});for(let e in c)"string"==typeof r[e]?r[e].length>0&&(l+="<tr><td>"+e+'</td><td class="popup-text">'+r[e]+"</td></tr>"):"number"==typeof r[e]&&(l+="<tr><td>"+e+'</td><td class="popup-text">'+r[e]+"</td></tr>");l+="</table>",M.innerHTML=r.layer,N.innerHTML=l,j.innerHTML=o,F.style.display="none"}}(e.pixel,e.coordinate);V.setPosition([""[0],(""[3]-""[1])/2]),H.onclick=function(){return V.setPosition(void 0),W={},ie.changed(),H.blur(),!1}}))}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var i=n[e]={exports:{}};return t[e].call(i.exports,i,i.exports,o),i.exports}o.m=t,e=[],o.O=(t,n,r,i)=>{if(!n){var l=1/0;for(p=0;p<e.length;p++){for(var[n,r,i]=e[p],a=!0,s=0;s<n.length;s++)(!1&i||l>=i)&&Object.keys(o.O).every((e=>o.O[e](n[s])))?n.splice(s--,1):(a=!1,i<l&&(l=i));if(a){e.splice(p--,1);var c=r();void 0!==c&&(t=c)}}return t}i=i||0;for(var p=e.length;p>0&&e[p-1][2]>i;p--)e[p]=e[p-1];e[p]=[n,r,i]},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={735:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var r,i,[l,a,s]=n,c=0;if(l.some((t=>0!==e[t]))){for(r in a)o.o(a,r)&&(o.m[r]=a[r]);if(s)var p=s(o)}for(t&&t(n);c<l.length;c++)i=l[c],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(p)},n=self.webpackChunkwebpack_multiple_html=self.webpackChunkwebpack_multiple_html||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var r=o.O(void 0,[299,978],(()=>o(492)));r=o.O(r)})();