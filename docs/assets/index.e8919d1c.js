var Ne=Object.defineProperty,Le=Object.defineProperties;var Ce=Object.getOwnPropertyDescriptors;var ne=Object.getOwnPropertySymbols;var De=Object.prototype.hasOwnProperty,Ge=Object.prototype.propertyIsEnumerable;var ae=(l,e,t)=>e in l?Ne(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t,F=(l,e)=>{for(var t in e||(e={}))De.call(e,t)&&ae(l,t,e[t]);if(ne)for(var t of ne(e))Ge.call(e,t)&&ae(l,t,e[t]);return l},oe=(l,e)=>Le(l,Ce(e));import{a as Ie,S as Q,i as x,s as $,e as _,t as T,b as w,c as f,d as Z,f as ee,g as te,h as v,j as c,l as U,k as J,m as V,n as g,D as re,o as q,p as se,q as Y,r as ie,u as z,v as Te,w as Me,x as ce,y as fe,z as de,A as ue,B as Oe,C as We}from"./vendor.e9643ca6.js";const Ee=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerpolicy&&(n.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?n.credentials="include":i.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}};Ee();const le=async(l,e={},t=0,s=0)=>{if(!l||typeof l!="string")throw Error(`Provide an URL string as the first argument. You provided: ${l} which is a ${typeof l}`);const i=10*1e3,n=1;if(s===0)s=Date.now();else if(Date.now()-s>=i||t>=n)throw Error("Did not receive data from endpoint within acceptable time");const a=F({baseURL:"https://gbfs.urbansharing.com/oslobysykkel.no/",headers:{"Client-Identifier":"foobar"},url:l,method:"get",timeout:1500},e);try{return await Ie.request(a)}catch{return t=t+1,await le(l,e,t,s)}},me=(l,e,t)=>{const s={ttl:t,data:e};localStorage.setItem(l,JSON.stringify(s))},_e=l=>{const e=JSON.parse(localStorage.getItem(l));return e&&e.ttl>Date.now()?e.data:null},He=async()=>{const l="station_information",e=Date.now()+5*60*1e3,t=_e(l);if(!t){const s=await le("station_information.json");if(s&&s.data&&s.data.data&&Array.isArray(s.data.data.stations))return me(l,s.data.data.stations,e),s.data.data.stations;throw Error("Unexpected response from service endpoint")}return t},Se=async()=>{const l=10*60,e="station_status",t=_e(e);if(!t){const s=await le("station_status.json");if(s&&s.data&&s.data.data&&Array.isArray(s.data.data.stations)){const n=(new Date().getTime()/1e3+l)*1e3;return me(e,s.data.data.stations,n),s.data.data.stations}else throw Error("Unexpected response from service endpoint")}return t},Re=async()=>{const l=[],e=await He();return e.forEach(s=>{l.push(s)}),(await Se()).forEach(s=>{const i=e.findIndex(a=>a.station_id===s.station_id);l[i].status&&l.status.last_reported===s.last_reported||(l[i]=oe(F({},l[i]),{status:s}))}),l};var Be="/haakonsbr.github.io/assets/oops.4dfb3605.png",Xe="/haakonsbr.github.io/assets/bike-loader.b528e818.gif",Pe="/haakonsbr.github.io/assets/arrow.bf70118e.svg",Je="data:image/png;base64,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";function ke(l){let e,t,s,i,n,a=(l[3]?l[2]:0)+"",o,r,m,h=(l[4]?l[1]:0)+"",A,M,L,C,X,u,I,H,E,D,P,S,y,k,W,G,R,B,j,N=(!l[3]||!l[4])&&ve(l),b=l[7]&&he(l);return{c(){e=_("div"),t=_("div"),s=_("div"),i=_("div"),n=_("div"),o=T(a),r=w(),m=_("div"),A=T(h),M=w(),L=_("div"),C=T(l[0]),X=w(),u=_("div"),N&&N.c(),I=w(),b&&b.c(),H=w(),E=_("div"),D=_("img"),S=w(),y=_("div"),k=T(l[10]),W=w(),G=_("div"),R=_("i"),f(n,"class","bikes border-radius-5 svelte-kea5dm"),Z(n,"is_not_renting",!l[3]),f(m,"class","docks border-radius-5 svelte-kea5dm"),Z(m,"is_not_returning",!l[4]),f(i,"class","availability svelte-kea5dm"),f(L,"class","station-name svelte-kea5dm"),f(s,"class","top svelte-kea5dm"),f(u,"class","bottom svelte-kea5dm"),f(t,"class","info svelte-kea5dm"),f(D,"class","arrow svelte-kea5dm"),ee(D.src,P=Pe)||f(D,"src",P),te(D,"transform","rotate("+l[8]+"deg)"),f(D,"alt","Direction"),f(y,"class","distance svelte-kea5dm"),f(E,"class","navigator svelte-kea5dm"),f(R,"class","fa fa-map-marker fa-2x svelte-kea5dm"),f(R,"aria-hidden","true"),f(G,"title","\xC5pne stasjonen i Google Maps"),f(G,"class","map svelte-kea5dm"),te(G,"background-image","url("+Je+")"),f(e,"class","station border-radius-5 svelte-kea5dm")},m(p,d){v(p,e,d),c(e,t),c(t,s),c(s,i),c(i,n),c(n,o),c(i,r),c(i,m),c(m,A),c(s,M),c(s,L),c(L,C),c(t,X),c(t,u),N&&N.m(u,null),c(u,I),b&&b.m(u,null),c(e,H),c(e,E),c(E,D),c(E,S),c(E,y),c(y,k),c(e,W),c(e,G),c(G,R),B||(j=U(G,"click",l[12]),B=!0)},p(p,d){d&12&&a!==(a=(p[3]?p[2]:0)+"")&&J(o,a),d&8&&Z(n,"is_not_renting",!p[3]),d&18&&h!==(h=(p[4]?p[1]:0)+"")&&J(A,h),d&16&&Z(m,"is_not_returning",!p[4]),d&1&&J(C,p[0]),!p[3]||!p[4]?N?N.p(p,d):(N=ve(p),N.c(),N.m(u,I)):N&&(N.d(1),N=null),p[7]?b?b.p(p,d):(b=he(p),b.c(),b.m(u,null)):b&&(b.d(1),b=null),d&256&&te(D,"transform","rotate("+p[8]+"deg)"),d&1024&&J(k,p[10])},d(p){p&&g(e),N&&N.d(),b&&b.d(),B=!1,j()}}}function ve(l){let e,t,s,i=!l[3]&&ge(l),n=!l[4]&&pe();return{c(){e=T(`This station is currently not
        `),i&&i.c(),t=w(),n&&n.c(),s=V()},m(a,o){v(a,e,o),i&&i.m(a,o),v(a,t,o),n&&n.m(a,o),v(a,s,o)},p(a,o){a[3]?i&&(i.d(1),i=null):i?i.p(a,o):(i=ge(a),i.c(),i.m(t.parentNode,t)),a[4]?n&&(n.d(1),n=null):n||(n=pe(),n.c(),n.m(s.parentNode,s))},d(a){a&&g(e),i&&i.d(a),a&&g(t),n&&n.d(a),a&&g(s)}}}function ge(l){let e,t,s=!l[4]&&be();return{c(){e=T(`renting out bikes 
          `),s&&s.c(),t=V()},m(i,n){v(i,e,n),s&&s.m(i,n),v(i,t,n)},p(i,n){i[4]?s&&(s.d(1),s=null):s||(s=be(),s.c(),s.m(t.parentNode,t))},d(i){i&&g(e),s&&s.d(i),i&&g(t)}}}function be(l){let e;return{c(){e=T("or")},m(t,s){v(t,e,s)},d(t){t&&g(e)}}}function pe(l){let e;return{c(){e=T("accepting returns")},m(t,s){v(t,e,s)},d(t){t&&g(e)}}}function he(l){let e,t=re.fromSeconds(l[7]).setLocale("no").toRelative("minutes")+"",s;return{c(){e=T("Sist oppdatert "),s=T(t)},m(i,n){v(i,e,n),v(i,s,n)},p(i,n){n&128&&t!==(t=re.fromSeconds(i[7]).setLocale("no").toRelative("minutes")+"")&&J(s,t)},d(i){i&&g(e),i&&g(s)}}}function qe(l){let e,t=(!l[9]||l[9]==="docks"&&l[1]>0||l[9]==="bikes"&&l[2]>0)&&ke(l);return{c(){t&&t.c(),e=V()},m(s,i){t&&t.m(s,i),v(s,e,i)},p(s,[i]){!s[9]||s[9]==="docks"&&s[1]>0||s[9]==="bikes"&&s[2]>0?t?t.p(s,i):(t=ke(s),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i:q,o:q,d(s){t&&t.d(s),s&&g(e)}}}function Ue(l,e,t){let s,{name:i}=e,{docks_available:n}=e,{bike_available:a}=e,{is_renting:o}=e,{is_returning:r}=e,{latitude:m}=e,{longitude:h}=e,{last_status:A}=e,{distance:M}=e,{direction:L}=e,{filterBy:C}=e;const X=()=>window.open(`http://www.google.com/maps/place/${m},${h}`);return l.$$set=u=>{"name"in u&&t(0,i=u.name),"docks_available"in u&&t(1,n=u.docks_available),"bike_available"in u&&t(2,a=u.bike_available),"is_renting"in u&&t(3,o=u.is_renting),"is_returning"in u&&t(4,r=u.is_returning),"latitude"in u&&t(5,m=u.latitude),"longitude"in u&&t(6,h=u.longitude),"last_status"in u&&t(7,A=u.last_status),"distance"in u&&t(11,M=u.distance),"direction"in u&&t(8,L=u.direction),"filterBy"in u&&t(9,C=u.filterBy)},l.$$.update=()=>{l.$$.dirty&2048&&t(10,s=M>1e3?Math.ceil(M/1e3)+" km":M+" meter")},[i,n,a,o,r,m,h,A,L,C,s,M,X]}class Ye extends Q{constructor(e){super();x(this,e,Ue,qe,$,{name:0,docks_available:1,bike_available:2,is_renting:3,is_returning:4,latitude:5,longitude:6,last_status:7,distance:11,direction:8,filterBy:9})}}function Ae(l,e,t){const s=l.slice();return s[21]=e[t],s}function ye(l){let e,t,s;return{c(){e=_("div"),t=_("p"),s=T(l[3]),f(t,"class","svelte-k92s6o"),f(e,"id","error-container"),f(e,"class","svelte-k92s6o")},m(i,n){v(i,e,n),c(e,t),c(t,s)},p(i,n){n&8&&J(s,i[3])},d(i){i&&g(e)}}}function ze(l){let e,t,s,i;const n=[Ke,Ze],a=[];function o(r,m){return r[0].length>0?0:1}return t=o(l),s=a[t]=n[t](l),{c(){e=_("div"),s.c(),f(e,"id","stations")},m(r,m){v(r,e,m),a[t].m(e,null),i=!0},p(r,m){let h=t;t=o(r),t===h?a[t].p(r,m):(se(),Y(a[h],1,1,()=>{a[h]=null}),ie(),s=a[t],s?s.p(r,m):(s=a[t]=n[t](r),s.c()),z(s,1),s.m(e,null))},i(r){i||(z(s),i=!0)},o(r){Y(s),i=!1},d(r){r&&g(e),a[t].d()}}}function Ve(l){let e,t,s,i,n,a;return{c(){e=_("div"),t=_("img"),i=w(),n=_("p"),a=T(l[2]),ee(t.src,s=Be)||f(t,"src",s),f(t,"alt","Error illustration"),f(n,"class","svelte-k92s6o"),f(e,"id","error-container"),f(e,"class","svelte-k92s6o")},m(o,r){v(o,e,r),c(e,t),c(e,i),c(e,n),c(n,a)},p(o,r){r&4&&J(a,o[2])},i:q,o:q,d(o){o&&g(e)}}}function Ze(l){let e,t,s,i,n;return{c(){e=_("div"),t=_("img"),i=w(),n=_("p"),n.textContent="Laster inn sykler og stativer :-)",ee(t.src,s=Xe)||f(t,"src",s),f(t,"alt","Loading gif"),f(t,"class","svelte-k92s6o"),f(e,"class","loader svelte-k92s6o")},m(a,o){v(a,e,o),c(e,t),c(e,i),c(e,n)},p:q,i:q,o:q,d(a){a&&g(e)}}}function Ke(l){let e=[],t=new Map,s,i,n=l[5].sort(je);const a=o=>o[21].station_id;for(let o=0;o<n.length;o+=1){let r=Ae(l,n,o),m=a(r);t.set(m,e[o]=we(m,r))}return{c(){for(let o=0;o<e.length;o+=1)e[o].c();s=V()},m(o,r){for(let m=0;m<e.length;m+=1)e[m].m(o,r);v(o,s,r),i=!0},p(o,r){r&48&&(n=o[5].sort(je),se(),e=Oe(e,r,a,1,o,n,t,s.parentNode,We,we,s,Ae),ie())},i(o){if(!i){for(let r=0;r<n.length;r+=1)z(e[r]);i=!0}},o(o){for(let r=0;r<e.length;r+=1)Y(e[r]);i=!1},d(o){for(let r=0;r<e.length;r+=1)e[r].d(o);o&&g(s)}}}function we(l,e){let t,s,i;return s=new Ye({props:{name:e[21].name,direction:e[21].direction,distance:e[21].distance,is_renting:e[21].status.is_renting===1,is_returning:e[21].status.is_returning===1,bike_available:e[21].status.num_bikes_available,docks_available:e[21].status.num_docks_available,latitude:e[21].lat,longitude:e[21].lon,last_status:e[21].status.last_reported,filterBy:e[4]}}),{key:l,first:null,c(){t=V(),fe(s.$$.fragment),this.first=t},m(n,a){v(n,t,a),de(s,n,a),i=!0},p(n,a){e=n;const o={};a&32&&(o.name=e[21].name),a&32&&(o.direction=e[21].direction),a&32&&(o.distance=e[21].distance),a&32&&(o.is_renting=e[21].status.is_renting===1),a&32&&(o.is_returning=e[21].status.is_returning===1),a&32&&(o.bike_available=e[21].status.num_bikes_available),a&32&&(o.docks_available=e[21].status.num_docks_available),a&32&&(o.latitude=e[21].lat),a&32&&(o.longitude=e[21].lon),a&32&&(o.last_status=e[21].status.last_reported),a&16&&(o.filterBy=e[4]),s.$set(o)},i(n){i||(z(s.$$.fragment,n),i=!0)},o(n){Y(s.$$.fragment,n),i=!1},d(n){n&&g(t),ue(s,n)}}}function Fe(l){let e,t,s,i,n,a,o,r,m,h,A,M,L=(l[1]?"P\xE5sl\xE5tt":"Avsl\xE5tt")+"",C,X,u,I,H,E,D,P,S,y,k,W,G,R,B,j=l[3]&&ye(l);const N=[Ve,ze],b=[];function p(d,O){return d[2]?0:1}return y=p(l),k=b[y]=N[y](l),{c(){e=_("div"),t=_("h1"),t.textContent="Simulerings verkt\xF8y",s=w(),i=_("div"),n=_("button"),n.textContent="G\xE5 til Majorstua",a=w(),o=_("button"),o.textContent="G\xE5 til Glassmagasinet",r=w(),m=_("button"),m.textContent="G\xE5 til Brynseng",h=w(),A=_("button"),M=T("Feil ved henting av data ("),C=T(L),X=T(")"),u=w(),I=_("div"),H=_("div"),H.textContent="Vis meg ledige sykler",E=w(),D=_("div"),D.textContent="Vis meg ledige stativ",P=w(),j&&j.c(),S=w(),k.c(),W=V(),f(t,"class","svelte-k92s6o"),f(n,"type","button"),f(n,"class","svelte-k92s6o"),f(o,"type","button"),f(o,"class","svelte-k92s6o"),f(m,"type","button"),f(m,"class","svelte-k92s6o"),f(A,"type","button"),f(A,"class","svelte-k92s6o"),f(i,"class","buttons svelte-k92s6o"),f(e,"id","debug-panel"),f(e,"class","svelte-k92s6o"),f(H,"class","button bike svelte-k92s6o"),f(D,"class","button dock svelte-k92s6o"),f(I,"id","navigation"),f(I,"class","svelte-k92s6o")},m(d,O){v(d,e,O),c(e,t),c(e,s),c(e,i),c(i,n),c(i,a),c(i,o),c(i,r),c(i,m),c(i,h),c(i,A),c(A,M),c(A,C),c(A,X),v(d,u,O),v(d,I,O),c(I,H),c(I,E),c(I,D),v(d,P,O),j&&j.m(d,O),v(d,S,O),b[y].m(d,O),v(d,W,O),G=!0,R||(B=[U(n,"click",l[9]),U(o,"click",l[10]),U(m,"click",l[11]),U(A,"click",l[12]),U(H,"click",l[13]),U(D,"click",l[14])],R=!0)},p(d,[O]){(!G||O&2)&&L!==(L=(d[1]?"P\xE5sl\xE5tt":"Avsl\xE5tt")+"")&&J(C,L),d[3]?j?j.p(d,O):(j=ye(d),j.c(),j.m(S.parentNode,S)):j&&(j.d(1),j=null);let K=y;y=p(d),y===K?b[y].p(d,O):(se(),Y(b[K],1,1,()=>{b[K]=null}),ie(),k=b[y],k?k.p(d,O):(k=b[y]=N[y](d),k.c()),z(k,1),k.m(W.parentNode,W))},i(d){G||(z(k),G=!0)},o(d){Y(k),G=!1},d(d){d&&g(e),d&&g(u),d&&g(I),d&&g(P),j&&j.d(d),d&&g(S),b[y].d(d),d&&g(W),R=!1,Te(B)}}}const je=(l,e)=>l.distance-e.distance;function Qe(l,e,t){let s,i=[{type:"generic",message:"Ojsann her skjedde det en feil. Last inn siden p\xE5 nytt. Hvis det ikke hjelper ..."},{message:"Ojsann, det skjedde en feil ved innhenting av sykler og stativer. Vi pr\xF8ver igjen straks!"}],n=!1,a=!1,o,r,m=59.922883,h=10.758241,A,M,L,C=[];const X=()=>{if(!n)try{navigator.geolocation.getCurrentPosition(k=>{t(7,m=k.coords.latitude),t(8,h=k.coords.longitude)},k=>{k.message==="User denied Geolocation"&&t(3,M=`Vi f\xE5r desverre ikke vist deg de n\xE6rmeste stasjonene fordi du ikke har 
              godkjent at vi kan se din posisjon! Her f\xE5r du likevel se alle stasjoner med utgangspunkt fra Olaf Ryes Plass!`)})}catch{t(2,A=i[0].message)}},u=(k,W)=>{n=!0,clearInterval(o);const G=(m-k)/20,R=(h-W)/20;for(let B=0;B<20;B++)setTimeout(()=>{t(7,m=m-G),t(8,h=h-R)},50*B)},I=async()=>{try{if(a)throw Error();t(0,C=await Re())}catch{clearInterval(r),t(2,A=i[1].message),setTimeout(()=>{t(2,A=null),t(0,C=[]),r=setInterval(I,3*1e3)},5e3)}};Me(async()=>{r=setInterval(I,3*1e3),o=setInterval(X,1e3)});const H=()=>u(59.928992,10.714949),E=()=>u(59.913017,10.745386),D=()=>u(59.909158,10.814618),P=()=>t(1,a=!a),S=()=>t(4,L="bikes"),y=()=>t(4,L="docks");return l.$$.update=()=>{l.$$.dirty&385&&t(5,s=C.length>0?C.map(k=>{const W=[{latitude:m,longitude:h},{latitude:k.lat,longitude:k.lon}];try{k.distance=ce.getDistance(...W),k.direction=ce.getRhumbLineBearing(...W)}catch{}finally{return k}}):[])},[C,a,A,M,L,s,u,m,h,H,E,D,P,S,y]}class xe extends Q{constructor(e){super();x(this,e,Qe,Fe,$,{})}}function $e(l){let e,t,s;return t=new xe({}),{c(){e=_("main"),fe(t.$$.fragment),f(e,"class","svelte-1nofuoe")},m(i,n){v(i,e,n),de(t,e,null),s=!0},p:q,i(i){s||(z(t.$$.fragment,i),s=!0)},o(i){Y(t.$$.fragment,i),s=!1},d(i){i&&g(e),ue(t)}}}class et extends Q{constructor(e){super();x(this,e,null,$e,$,{})}}new et({target:document.getElementById("app")});
