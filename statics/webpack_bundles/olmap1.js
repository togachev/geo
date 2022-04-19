(()=>{"use strict";var e,t={4834:(e,t,o)=>{o(9789);var n,r=o(2971),i=o(5487),l=o(9515),a=o(5818),s=(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)});const c=function(e){function t(t){var o=e.call(this)||this;if(o.on,o.once,o.un,o.id_=void 0,o.geometryName_="geometry",o.style_=null,o.styleFunction_=void 0,o.geometryChangeKey_=null,o.addChangeListener(o.geometryName_,o.handleGeometryChanged_),t)if("function"==typeof t.getSimplifiedGeometry){var n=t;o.setGeometry(n)}else{var r=t;o.setProperties(r)}return o}return s(t,e),t.prototype.clone=function(){var e=new t(this.hasProperties()?this.getProperties():null);e.setGeometryName(this.getGeometryName());var o=this.getGeometry();o&&e.setGeometry(o.clone());var n=this.getStyle();return n&&e.setStyle(n),e},t.prototype.getGeometry=function(){return this.get(this.geometryName_)},t.prototype.getId=function(){return this.id_},t.prototype.getGeometryName=function(){return this.geometryName_},t.prototype.getStyle=function(){return this.style_},t.prototype.getStyleFunction=function(){return this.styleFunction_},t.prototype.handleGeometryChange_=function(){this.changed()},t.prototype.handleGeometryChanged_=function(){this.geometryChangeKey_&&((0,a.bN)(this.geometryChangeKey_),this.geometryChangeKey_=null);var e=this.getGeometry();e&&(this.geometryChangeKey_=(0,a.oL)(e,i.Z.CHANGE,this.handleGeometryChange_,this)),this.changed()},t.prototype.setGeometry=function(e){this.set(this.geometryName_,e)},t.prototype.setStyle=function(e){this.style_=e,this.styleFunction_=e?function(e){if("function"==typeof e)return e;var t;Array.isArray(e)?t=e:((0,l.h)("function"==typeof e.getZIndex,41),t=[e]);return function(){return t}}(e):void 0,this.changed()},t.prototype.setId=function(e){this.id_=e,this.changed()},t.prototype.setGeometryName=function(e){this.removeChangeListener(this.geometryName_,this.handleGeometryChanged_),this.geometryName_=e,this.addChangeListener(this.geometryName_,this.handleGeometryChanged_),this.handleGeometryChanged_()},t}(r.Z);var u=o(309),p=o(8661),d=o(4333),y=o(7205),m=o(8734),g=o(2856),h=o(217),f=o(686),v=o(6841),_=function(){var e=function(t,o){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])},e(t,o)};return function(t,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function n(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();const b=function(e){function t(t){var o,n=t||{},r=void 0===n.imageSmoothing||n.imageSmoothing;void 0!==n.interpolate&&(r=n.interpolate),o=void 0!==n.attributions?n.attributions:['&#169; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors.'];var i=void 0!==n.crossOrigin?n.crossOrigin:"anonymous",l=void 0!==n.url?n.url:"https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png";return e.call(this,{attributions:o,attributionsCollapsible:!1,cacheSize:n.cacheSize,crossOrigin:i,interpolate:r,maxZoom:void 0!==n.maxZoom?n.maxZoom:19,opaque:void 0===n.opaque||n.opaque,reprojectionErrorThreshold:n.reprojectionErrorThreshold,tileLoadFunction:n.tileLoadFunction,transition:n.transition,url:l,wrapX:n.wrapX,zDirection:n.zDirection})||this}return _(t,e),t}(v.Z);var w=o(9090),Z=o(7539),E=o(8958),x=o(1345),C=o(3492),O=o(1280),k=o(6121),P=o(1882),G=o(2017),I=o(2657),L=o(8775),S=o(559),T=o(7494);document.getElementById("selection_object"),document.getElementById("selection_object_id");const B=document.getElementById("geo-popup");B.style.display="block"==B.style.display?"none":"block";const N=document.getElementById("geo-popup-content"),j=document.getElementById("geo-popup-coords_data"),H=document.getElementById("geo-popup-closer"),M=(document.getElementById("geo-name-popup"),document.getElementById("geo-popup-name-popup")),z=document.getElementById("geo-obj-list"),A=document.getElementById("geo-select-list"),F=document.getElementById("geo-layer-panel"),W=(document.getElementById("geo-layer-name-panel"),document.getElementById("geo-layer")),K=document.getElementById("geo-layer-closer");let q={};var D=document.createElement("button");D.className="button",D.innerHTML=close_button,H.appendChild(D);const X=new P.Z({element:B,autoPan:!0,autoPanAnimation:{duration:250,stopEvent:!1}}),$=e=>{const t=e.getProperties();var o=["les","uch_les","uroch","kvartal","vydel","term_p_num"],n="";for(let e in o)"string"==typeof t[o[e]]?t[o[e]].length>0&&(n+=`${t[o[e]]}\n`):"number"==typeof t[o[e]]&&(n+=`${t[o[e]]}\n`);return[new Z.ZP({stroke:new E.Z({color:"rgba(255, 0, 0, 1)",width:.5}),fill:new x.Z({color:"rgba(255, 255, 255, 0)"})}),new Z.ZP({image:new C.Z({radius:5,fill:new x.Z({color:"black"}),stroke:new E.Z({color:"rgba(0,134,255,0.9)",width:1})})}),new Z.ZP({text:new O.Z({text:n,font:"12px Calibri,sans-serif",overflow:!0,fill:new x.Z({color:"#000"}),stroke:new E.Z({color:"#fff",width:2})})})]},R=new Z.ZP({stroke:new E.Z({color:"rgba(255,255,0,1)",width:1.5}),image:new C.Z({radius:7,fill:new x.Z({color:"rgb(255,255,0)"}),stroke:new E.Z({color:"rgba(255,255,0,1)",width:2})})});var V=[];for(let e in layer_id)V.push(new d.Z({declutter:!0,minZoom:minzoom[e],maxZoom:maxzoom[e],renderBuffer:200,renderOrder:null,renderMode:"vector",preload:0,useInterimTilesOnError:!1,updateWhileAnimating:!0,source:new y.Z({format:new u.Z({featureClass:c}),url:"/geo/layer/"+layer_id[e]+"/tile/{z}/{x}/{y}"}),style:$}));const J=new g.Z({source:new b}),Q=new I.Z({collapsible:!1});var U='<table class="popup-text-all">';for(let e in layer_id)U+='<tr><td><td class="popup-text">'+layer_name[e]+"</td></tr>";U+="</table>";var Y=new p.Z({interactions:(0,h.ce)({mouseWheelZoom:!1}).extend([new f.Z({constrainResolution:!0})]),controls:(0,G.ce)({attribution:!1}).extend([new function(){const e=document.createElement("button");e.innerHTML=layer_fill;const t=document.createElement("div");t.className="ol-layer-data ol-unselectable ol-control",t.appendChild(e),t.appendChild(F);const o=new L.Z({element:t}),n=document.createElement("button");return n.className="button",n.innerHTML=close_button,K.appendChild(n),W.innerHTML=U,e.addEventListener("click",(e=>{B.style.display="none"==B.style.display?"block":"none",console.log(F.scrollHeight),F.style.display="block"==F.style.display?"none":"block",F.style.maxHeight=F.scrollHeight+"px",q={},ie.changed()})),K.addEventListener("click",(e=>{F.style.display="none"})),o},Q]),renderer:"webgl",layers:[J,new m.Z({layers:V})],overlays:[X],moveTolerance:10,target:"map",loadTilesWhileAnimating:!0,loadTilesWhileInteracting:!0,view:new w.ZP({center:(0,k.mi)([70.538086,62.201629]),maxZoom:18,zoom:6,multiWorld:!0})});function ee(){const e=Y.getSize()[0]<600;Q.setCollapsible(e),Q.setCollapsed(e)}window.addEventListener("resize",ee),ee();var te=Y.getView().calculateExtent(Y.getSize());const oe=document.createElement("span");oe.innerHTML=house_fill;const ne=new S.Z({extent:te,label:oe}),re=new T.Z({units:"metric",steps:2,dpi:96});Y.addControl(ne),Y.addControl(re);const ie=new d.Z({map:Y,declutter:!0,renderOrder:null,renderBuffer:200,renderMode:"vector",preload:0,useInterimTilesOnError:!1,updateWhileAnimating:!0});Y.on(["click"],(function(e){if("pointermove"===e.type)return;!function(e){var t=Y.getFeaturesAtPixel(e.pixel,(function(e){}),{hitTolerance:10}),o=t[0];!function(t){B.style.display="block";const n=(0,k.vs)(e.coordinate,"EPSG:3857","EPSG:4326"),r='<td class="popup-text">'+n[0].toFixed(6)+", "+n[1].toFixed(6)+"</td></tr>";if(M.innerHTML="Координаты",z.style.display="none",N.style.display="none",j.innerHTML=r,F.style.display="none",t.length>0){z.style.display="block",A.options.length=0,N.style.display="block";const e=o.getProperties();var i='<table class="popup-text-all">';const{layer:t,...n}=e,l=Object.assign({},{...n});for(let t in l)"string"==typeof e[t]?e[t].length>0&&(i+="<tr><td>"+t+'</td><td class="popup-text">'+e[t]+"</td></tr>"):"number"==typeof e[t]&&(i+="<tr><td>"+t+'</td><td class="popup-text">'+e[t]+"</td></tr>");i+="</table>",M.innerHTML=e.layer,N.innerHTML=i,j.innerHTML=r}}(t),function(){for(let e of t)A.options.add(new Option(e.getProperties().layer,e.getProperties().id))}(),function(){for(let t in layer_id)if(o.getProperties().layer==layer_name[t]){var e=t;const n=o.get("id");console.log(n),q={},q[n]=o,ie.setSource(V[e].getSource()),ie.setStyle((function(e){if(e.get("id")in q)return R})),ie.changed()}}(),document.getElementById("geo-select-list").addEventListener("change",(function(){console.log("Выбор по списку: "+this.value)}))}(e);X.setPosition([""[0],(""[3]-""[1])/2]),H.onclick=function(){return X.setPosition(void 0),q={},ie.changed(),H.blur(),!1}}))}},o={};function n(e){var r=o[e];if(void 0!==r)return r.exports;var i=o[e]={exports:{}};return t[e].call(i.exports,i,i.exports,n),i.exports}n.m=t,e=[],n.O=(t,o,r,i)=>{if(!o){var l=1/0;for(u=0;u<e.length;u++){for(var[o,r,i]=e[u],a=!0,s=0;s<o.length;s++)(!1&i||l>=i)&&Object.keys(n.O).every((e=>n.O[e](o[s])))?o.splice(s--,1):(a=!1,i<l&&(l=i));if(a){e.splice(u--,1);var c=r();void 0!==c&&(t=c)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[o,r,i]},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={882:0};n.O.j=t=>0===e[t];var t=(t,o)=>{var r,i,[l,a,s]=o,c=0;if(l.some((t=>0!==e[t]))){for(r in a)n.o(a,r)&&(n.m[r]=a[r]);if(s)var u=s(n)}for(t&&t(o);c<l.length;c++)i=l[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(u)},o=self.webpackChunkwebpack_multiple_html=self.webpackChunkwebpack_multiple_html||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var r=n.O(void 0,[299,978],(()=>n(4834)));r=n.O(r)})();