var Se=Object.defineProperty,Re=Object.defineProperties;var Be=Object.getOwnPropertyDescriptors;var ke=Object.getOwnPropertySymbols;var Xe=Object.prototype.hasOwnProperty,Je=Object.prototype.propertyIsEnumerable;var ve=(s,e,t)=>e in s?Se(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,ae=(s,e)=>{for(var t in e||(e={}))Xe.call(e,t)&&ve(s,t,e[t]);if(ke)for(var t of ke(e))Je.call(e,t)&&ve(s,t,e[t]);return s},ge=(s,e)=>Re(s,Be(e));import{a as Pe,S as $,i as ee,s as te,e as v,t as G,b as L,c,d as ne,f as oe,g as re,h as b,j as d,l as Z,k as K,m as Q,n as p,D as be,o as B,p as pe,q as ce,r as de,u as X,v as qe,w as he,x as Y,y as fe,z as ie,A as se,B as Ye,C as ye,E as Ae,F as we,G as Ue,H as ze,I as Ve}from"./vendor.e1aa00de.js";const Ze=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerpolicy&&(l.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?l.credentials="include":i.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(i){if(i.ep)return;i.ep=!0;const l=t(i);fetch(i.href,l)}};Ze();const ue=async(s,e={},t=0,n=0)=>{if(!s||typeof s!="string")throw Error(`Provide an URL string as the first argument. You provided: ${s} which is a ${typeof s}`);const i=10*1e3,l=1;if(n===0)n=Date.now();else if(Date.now()-n>=i||t>=l)throw Error("Did not receive data from endpoint within acceptable time");const a=ae({baseURL:"https://gbfs.urbansharing.com/oslobysykkel.no/",headers:{"Client-Identifier":"foobar"},url:s,method:"get",timeout:1500},e);try{return await Pe.request(a)}catch{return t=t+1,await ue(s,e,t,n)}},Ne=(s,e,t)=>{const n={ttl:t,data:e};localStorage.setItem(s,JSON.stringify(n))},Me=s=>{const e=JSON.parse(localStorage.getItem(s));return e&&e.ttl>Date.now()?e.data:null},Ke=async()=>{const s="station_information",e=Date.now()+5*60*1e3,t=Me(s);if(!t){const n=await ue("station_information.json");if(n&&n.data&&n.data.data&&Array.isArray(n.data.data.stations))return Ne(s,n.data.data.stations,e),n.data.data.stations;throw Error("Unexpected response from service endpoint")}return t},Fe=async()=>{const s=10,e="station_status",t=Me(e);if(!t){const n=await ue("station_status.json");if(n&&n.data&&n.data.data&&Array.isArray(n.data.data.stations)){const l=(new Date().getTime()/1e3+s)*1e3;return Ne(e,n.data.data.stations,l),n.data.data.stations}else throw Error("Unexpected response from service endpoint")}return t},Qe=async()=>{const s=[],e=await Ke();return e.forEach(n=>{s.push(n)}),(await Fe()).forEach(n=>{const i=e.findIndex(a=>a.station_id===n.station_id);s[i].status&&s.status.last_reported===n.last_reported||(s[i]=ge(ae({},s[i]),{status:n}))}),s};var xe="/haakonsbr.github.io/assets/oops.4dfb3605.png",$e="/haakonsbr.github.io/assets/bike-loader.b528e818.gif",et="/haakonsbr.github.io/assets/arrow.bf70118e.svg",tt="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABpCAAAAABw7wDjAAAABGdBTUEAAYagMeiWXwAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAJ5UlEQVRo3p1a6YKzqBL1/Z/u68zSM18vIqIiZjNmNca6BzQGFJOey6+OJgeo9VRVB8pdUlIbDZ+iPW2EerHihnbM+hwVRA1d4zyYfHNDh/s3M0UX9hL6RqX7pVQQXXDACbZiF1om3Z/4TvwSuqXNeP+Y2g/lw8Yb6rC/a8LRn64c26+j0cOkJJX7sY3IWZwtr3QLn0PLhGjFx085kdku8MgTIr9Sv5L0CXSWEhUTqaUbWkqDXcfSJ/L2WAJ4SZTzp9BqqpCoP7YKiOT0NYvY55FWizf8ejtnKWkG6KmFZitadVoKYIwbz6/Tgk6LxeItvNHRf/JE4ljJ9DmO3f8gSJOWznE++SXR50Kvf450Ex5rETlR5lGGLGjTP4adRAd8a3Q31lC66NYfG5xvcnWh/NCKDcc2NshWsCRHLnxH5VuPvXiT49cwJYgy9dl+rqhMLGyVQGW2VGHh178WjwWD3TsOwmFAifRAK3Z7uHLnOzk/UfswZXhmuLDXx0XHnoe61kQi90GrnCrhYisVQqpFfzZ2JrVw1587iPd+1wjfnYmO0NPjzeDzMaRaGfBoR4dfI+zFmxr2ZiXd5kKYpEM8xVZS1NQkWj9E/y6mC4LaaXC2o2YOmtVkWbwdq3AguDiuRds3D/jXlc5csYrq2TCQOibhxEGOI5db2jeUe7AXf+9hHXsT9v0rOpNt8m6MzQQOTRxBWfjAf8H06DwLDWd2Xo7jN6S6UTIdG+FDo7fvWWh+JMedRtiIriXyQaKo/e0D/03HZBZbUM3msaGoyrzmG7r89R+x4z25rupgixXVvcDCPVW//hu2oIbNYmfSyusw1fWbD5vJGeiKRmHAxk7ItnxodWqJX9TuN0UmeBTyUbACcWCz2LylPHW3mliioGHVx3IpEx6xyKSOO3GwsYe9YPhrx5e1iKI76Pv75+cnC5ckcd5lebw+NmlOehOdqETqoAe7Xnk6Qo3uJJbUhCy17hKfKJZYaRyFjIus2B5qe5PdOscrxmKzSUAn3uPUE4fDfkdnPySsUNorFdG3FkqxaagdNrmdqzV8PDhQI6TOND7qx05U2jsKOnDpXd8NfeqbqHV1vvVbBGyLzKeZZ+pLJLwh5zMVfmgZ0bU7BITCIi5SbBIojrS6upHyJe0cGrJCBIKgmMEWtBsB5GnQkRjaeGMyrmObJcTNZrALmv5a23d4pD6MjBa4dWEnxhgxdObYlSeD6nMX1NR0mR6cX0cWL8H0/NhhQ5EHW4Iyxihs2jHhiC6ukai0BCl5oUoXGzLNpOEQmRPi2JH2LrWPcLgfq1Jj4weFxtS5srDkglB+GumAI/bPqtJjwcGRyg4xgWw2w0Gj7TTnZrSdkYlXldrn76eT4kaHHi9eUTNWrtzQjCb9qlTBzXqIUFgbwxCFJwTwy6y4vapUgXMXCJlArdLcR/giuv0dxvGPVakC1/AYGKrkmTe6JFT1ofxjvIVXlVN+giNrzjrl7fmSMjsFWVv4VTmtXVPwHso9yfz7Rl8eVqG3+GyI/QRbhVd/Zcbu1dV0/TVmDzPYMbimj5ZJcEE+g/1Jx5/IBAno5g23DClLzWBz2sgfYMcOR7H1QGfazWBLr5l4uGbhxY5OJKl+82Nv/OdxsbWw/eU7omXZ0p9+7CPxl9ha2H7mni9N5o690G83rwmOapI5YSsEI55daO8VyowJOtiftxlha38/xgocxFtN/INmwwts3TOoM69Mkp2hEpJOb/8XtmZ/SPjnxKOXvpWDgtlmth8/xTbEnidnooOYfDOnTdaJpvljgA5l/P4z7KSLq1EGYloJ14WR8bsHcfXg+yYEvv8EG8S+Z21MosYsYzvWx0PuhNt2Z33vA7g++gts+OOD5jDVahI3hPBsM/h0su6qoPchNwD891Ns5DLbH3OGfEmrSDqaNOvLRNp3JxE/xbZqv37JCH0mKpg5b0a7wezhutXbxzgTz2NrE5kYXoryldoct4mPtre+X2lM759hJ35XT9ARo6tkHFXP4ykTdA5/jB27JNtaAmU0Xaq+vdqvD0RbZ2Xfs9jRZcSE7RUncNVRlBN0c2ghwu8MNtv7ef19cV04uvvtqEgf0Lg2XR7YFvkI1q/a/uH43Ka/PUCj2qos7shLqxdGxJ9C627iCBsOtLn7DpyuuoCL9QrDTo/OYUDJc2hdmYzjLqhKj41S6XSj+g4O6NIwyg5bvpgoqPgyuZnM0UM10JXG3X5lHbiG1i7dN4GDl+MbcZpg5+BemuWjAEANjJIjNeAG2jSvc4MavIJWyWFKxVF/XcIcBUCri2rV9fBl0w169N9mCvEaO6082Ci0pG6Bo3TsNKcB7zOkLOkGM4F4Je+snKo7h8O0uHvfwe3Bh/FULlrdrgsofzF6QpkziQi5EiWZMGzdj1sfMGOrWOAfZdhrRb6raRlk84aA4ugI7L47M7u8BQdEil7Kk19BI8EZ88Dn06fcgw3vaVp6ar+sCiK0CYyNzgucivEjiLP+nT8/uGKBdqYDjUeQrmRX+QR6+6XCmp5d954byutgqD7RjqoCDW2chOpnc8JI+w6C+xIJJp2JWoLKzAet+IHyfBaanTW27krpUmkZzWBXqQ9av2nne/gnMj6ve+lZNtNYgszs3nH0gFZiS6sZkUdH2Lf5KwWLSHmNAZGn3uJ0Howti52hI5/LLOyA/kYfqxLdHWA7r6tFj8EIz93MnC2p9Bk5kvCZDXFQdzWEnqyvJ6pn1NwHVuhTHhxrZ14HAgV0Zug6GMd6aHcNJ9hdYzvnZ4wyuduRk3ScqBP3NxTwEb/B0a5c92XH4aVP9HpftIXgx3bgRC4eRzKMoK4GInCeXWAsLWiTK2+T6LW89BQT1aDzNqWra12Y5PWUwpl5VZq7irHuTaKPqruehZ58WW/3br8e179P8px5AwRSf2Fw7ja9keijuKZadNdhV3dvQTbH4GuoTU2wdf674l8y0PQubI9Aoi/6GaDR3soVSrKh9WOquqTx3NU81sQCk5dtFLudMCT6x9zUHPTkpMHoAacxPLNRvjKECBF3zXJHP3roaMcxfHaEkhW068CNk+QTbLbpH+PQy++KtrGOYWmUZAnojWM4cj1KRGCM4i7UxHrVY4floALoRoUtZbkhjjvk88soBwhd3Du70Snq4obTix7qtGFOayJuog1RY+um23LkHvg/BtcXUYtnxspS54IGG1HLmtOaiLsGm4Rhf+IHYI+uM1n15l3d1HzLSVdRYyOMn+yD6LotuZD6t6W2vdE6H88SEtT8zgPU4tW0YRkYmnJw76glB72cujENAsEo0SP6uT/IYYcDv7ew4+s032hjghLP3wyLTxJ9tnWkJE2RfpokrUDcfPwh1mUxbUUvgnH7L6H9IxXpKEb7dspI/wfYxSC6PqFOlQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMC0yOFQxMTo1Njo0MiswMDowMPb5zdkAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMTAtMjhUMTE6NTY6NDIrMDA6MDCHpHVlAAAAAElFTkSuQmCC";function je(s){let e,t,n,i,l,a=(s[3]?s[2]:0)+"",o,r,u,h=(s[4]?s[1]:0)+"",A,k,y,w,D,f,E,N,j,H,J,F,S,U,P,g,C,R,q,M=(!s[3]||!s[4])&&Ce(s),T=s[7]&&De(s);return{c(){e=v("div"),t=v("div"),n=v("div"),i=v("div"),l=v("div"),o=G(a),r=L(),u=v("div"),A=G(h),k=L(),y=v("div"),w=G(s[0]),D=L(),f=v("div"),M&&M.c(),E=L(),T&&T.c(),N=L(),j=v("div"),H=v("img"),F=L(),S=v("div"),U=G(s[10]),P=L(),g=v("div"),C=v("i"),c(l,"class","bikes border-radius-5 svelte-kea5dm"),ne(l,"is_not_renting",!s[3]),c(u,"class","docks border-radius-5 svelte-kea5dm"),ne(u,"is_not_returning",!s[4]),c(i,"class","availability svelte-kea5dm"),c(y,"class","station-name svelte-kea5dm"),c(n,"class","top svelte-kea5dm"),c(f,"class","bottom svelte-kea5dm"),c(t,"class","info svelte-kea5dm"),c(H,"class","arrow svelte-kea5dm"),oe(H.src,J=et)||c(H,"src",J),re(H,"transform","rotate("+s[8]+"deg)"),c(H,"alt","Direction"),c(S,"class","distance svelte-kea5dm"),c(j,"class","navigator svelte-kea5dm"),c(C,"class","fa fa-map-marker fa-2x svelte-kea5dm"),c(C,"aria-hidden","true"),c(g,"title","\xC5pne stasjonen i Google Maps"),c(g,"class","map svelte-kea5dm"),re(g,"background-image","url("+tt+")"),c(e,"class","station border-radius-5 svelte-kea5dm")},m(_,O){b(_,e,O),d(e,t),d(t,n),d(n,i),d(i,l),d(l,o),d(i,r),d(i,u),d(u,A),d(n,k),d(n,y),d(y,w),d(t,D),d(t,f),M&&M.m(f,null),d(f,E),T&&T.m(f,null),d(e,N),d(e,j),d(j,H),d(j,F),d(j,S),d(S,U),d(e,P),d(e,g),d(g,C),R||(q=Z(g,"click",s[12]),R=!0)},p(_,O){O&12&&a!==(a=(_[3]?_[2]:0)+"")&&K(o,a),O&8&&ne(l,"is_not_renting",!_[3]),O&18&&h!==(h=(_[4]?_[1]:0)+"")&&K(A,h),O&16&&ne(u,"is_not_returning",!_[4]),O&1&&K(w,_[0]),!_[3]||!_[4]?M?M.p(_,O):(M=Ce(_),M.c(),M.m(f,E)):M&&(M.d(1),M=null),_[7]?T?T.p(_,O):(T=De(_),T.c(),T.m(f,null)):T&&(T.d(1),T=null),O&256&&re(H,"transform","rotate("+_[8]+"deg)"),O&1024&&K(U,_[10])},d(_){_&&p(e),M&&M.d(),T&&T.d(),R=!1,q()}}}function Ce(s){let e,t,n,i=!s[3]&&Le(s),l=!s[4]&&Ie();return{c(){e=G(`This station is currently not
        `),i&&i.c(),t=L(),l&&l.c(),n=Q()},m(a,o){b(a,e,o),i&&i.m(a,o),b(a,t,o),l&&l.m(a,o),b(a,n,o)},p(a,o){a[3]?i&&(i.d(1),i=null):i?i.p(a,o):(i=Le(a),i.c(),i.m(t.parentNode,t)),a[4]?l&&(l.d(1),l=null):l||(l=Ie(),l.c(),l.m(n.parentNode,n))},d(a){a&&p(e),i&&i.d(a),a&&p(t),l&&l.d(a),a&&p(n)}}}function Le(s){let e,t,n=!s[4]&&Ee();return{c(){e=G(`renting out bikes 
          `),n&&n.c(),t=Q()},m(i,l){b(i,e,l),n&&n.m(i,l),b(i,t,l)},p(i,l){i[4]?n&&(n.d(1),n=null):n||(n=Ee(),n.c(),n.m(t.parentNode,t))},d(i){i&&p(e),n&&n.d(i),i&&p(t)}}}function Ee(s){let e;return{c(){e=G("or")},m(t,n){b(t,e,n)},d(t){t&&p(e)}}}function Ie(s){let e;return{c(){e=G("accepting returns")},m(t,n){b(t,e,n)},d(t){t&&p(e)}}}function De(s){let e,t=be.fromSeconds(s[7]).setLocale("no").toRelative("minutes")+"",n;return{c(){e=G("Sist oppdatert "),n=G(t)},m(i,l){b(i,e,l),b(i,n,l)},p(i,l){l&128&&t!==(t=be.fromSeconds(i[7]).setLocale("no").toRelative("minutes")+"")&&K(n,t)},d(i){i&&p(e),i&&p(n)}}}function nt(s){let e,t=(!s[9]||s[9]==="docks"&&s[1]>0||s[9]==="bikes"&&s[2]>0)&&je(s);return{c(){t&&t.c(),e=Q()},m(n,i){t&&t.m(n,i),b(n,e,i)},p(n,[i]){!n[9]||n[9]==="docks"&&n[1]>0||n[9]==="bikes"&&n[2]>0?t?t.p(n,i):(t=je(n),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i:B,o:B,d(n){t&&t.d(n),n&&p(e)}}}function it(s,e,t){let n,{name:i}=e,{docks_available:l}=e,{bike_available:a}=e,{is_renting:o}=e,{is_returning:r}=e,{latitude:u}=e,{longitude:h}=e,{last_status:A}=e,{distance:k}=e,{direction:y}=e,{filterBy:w}=e;const D=()=>window.open(`http://www.google.com/maps/place/${u},${h}`);return s.$$set=f=>{"name"in f&&t(0,i=f.name),"docks_available"in f&&t(1,l=f.docks_available),"bike_available"in f&&t(2,a=f.bike_available),"is_renting"in f&&t(3,o=f.is_renting),"is_returning"in f&&t(4,r=f.is_returning),"latitude"in f&&t(5,u=f.latitude),"longitude"in f&&t(6,h=f.longitude),"last_status"in f&&t(7,A=f.last_status),"distance"in f&&t(11,k=f.distance),"direction"in f&&t(8,y=f.direction),"filterBy"in f&&t(9,w=f.filterBy)},s.$$.update=()=>{s.$$.dirty&2048&&t(10,n=k>1e3?Math.ceil(k/1e3)+" km":k+" meter")},[i,l,a,o,r,u,h,A,y,w,n,k,D]}class st extends ${constructor(e){super();ee(this,e,it,nt,te,{name:0,docks_available:1,bike_available:2,is_renting:3,is_returning:4,latitude:5,longitude:6,last_status:7,distance:11,direction:8,filterBy:9})}}function lt(s){let e;return{c(){e=v("div"),e.textContent="Laster kartet ...",c(e,"id","map"),c(e,"class","svelte-12ylyh3")},m(t,n){b(t,e,n)},p:B,i:B,o:B,d(t){t&&p(e)}}}const at="pk.eyJ1IjoiaHJhbnVtIiwiYSI6ImNrdnpjODR1azA0YngycXBxZHdsb2VoNWkifQ.HDk5Dp_1C7jidRvKIYkz0w";function ot(s,e,t){let{latitude:n}=e,{longitude:i}=e,{stations:l}=e,a;const o=(k,y)=>{mapboxgl.accessToken=at,t(3,a=new mapboxgl.Map({container:"map",style:"mapbox://styles/mapbox/light-v10",center:[k,y],zoom:14})),h(k,y)},r=new Map;let u;const h=(k,y)=>{if(u)u.setLngLat([k,y]);else{const w=document.createElement("div");w.className="dot";const D=document.createElement("div");D.className="device-location",D.appendChild(w),u=new mapboxgl.Marker(D).setLngLat([k,y]).addTo(a)}},A=(k,y,w,D)=>{let f=r.get(k);if(!f){const E=document.createElement("span");E.className="bikes",E.textContent=y;const N=document.createElement("span");N.className="docks",N.textContent=w;const j=document.createElement("div");j.className="marker",j.title=k,j.appendChild(E),j.appendChild(N);const H=new mapboxgl.Marker(j).setLngLat(D).addTo(a);f={markerEl:j,bikesEl:E,docksEl:N,mapMarker:H},r.set(k,f)}f.bikesEl.textContent=y,f.docksEl.textContent=w};return pe(async()=>{o(i,n)}),s.$$set=k=>{"latitude"in k&&t(0,n=k.latitude),"longitude"in k&&t(1,i=k.longitude),"stations"in k&&t(2,l=k.stations)},s.$$.update=()=>{s.$$.dirty&12&&l.length>0&&l.map(k=>{a&&A(k.name,k.status.num_bikes_available,k.status.num_docks_available,[k.lon,k.lat])}),s.$$.dirty&11&&a&&a.loaded()&&h(i,n)},[n,i,l,a]}class rt extends ${constructor(e){super();ee(this,e,ot,lt,te,{latitude:0,longitude:1,stations:2})}}const{Map:ct}=ze;function Te(s,e,t){const n=s.slice();return n[23]=e[t],n}function Ge(s){let e,t,n,i;return t=new rt({props:{stations:s[2],latitude:s[0],longitude:s[1]}}),{c(){e=v("div"),ce(t.$$.fragment)},m(l,a){b(l,e,a),de(t,e,null),i=!0},p(l,a){s=l;const o={};a&4&&(o.stations=s[2]),a&1&&(o.latitude=s[0]),a&2&&(o.longitude=s[1]),t.$set(o)},i(l){i||(X(t.$$.fragment,l),qe(()=>{n||(n=he(e,we,{delay:250,duration:300,easing:Ae},!0)),n.run(1)}),i=!0)},o(l){Y(t.$$.fragment,l),n||(n=he(e,we,{delay:250,duration:300,easing:Ae},!1)),n.run(0),i=!1},d(l){l&&p(e),fe(t),l&&n&&n.end()}}}function dt(s){let e;return{c(){e=G("Lukk kartet")},m(t,n){b(t,e,n)},d(t){t&&p(e)}}}function ft(s){let e;return{c(){e=G("\xC5pne kartet")},m(t,n){b(t,e,n)},d(t){t&&p(e)}}}function He(s){let e,t,n;return{c(){e=v("div"),t=v("p"),n=G(s[5]),c(t,"class","svelte-125kr5n"),c(e,"id","error-container"),c(e,"class","svelte-125kr5n")},m(i,l){b(i,e,l),d(e,t),d(t,n)},p(i,l){l&32&&K(n,i[5])},d(i){i&&p(e)}}}function ut(s){let e,t,n,i;const l=[kt,_t],a=[];function o(r,u){return r[2].length>0?0:1}return t=o(s),n=a[t]=l[t](s),{c(){e=v("div"),n.c(),c(e,"id","stations")},m(r,u){b(r,e,u),a[t].m(e,null),i=!0},p(r,u){let h=t;t=o(r),t===h?a[t].p(r,u):(ie(),Y(a[h],1,1,()=>{a[h]=null}),se(),n=a[t],n?n.p(r,u):(n=a[t]=l[t](r),n.c()),X(n,1),n.m(e,null))},i(r){i||(X(n),i=!0)},o(r){Y(n),i=!1},d(r){r&&p(e),a[t].d()}}}function mt(s){let e,t,n,i,l,a;return{c(){e=v("div"),t=v("img"),i=L(),l=v("p"),a=G(s[4]),oe(t.src,n=xe)||c(t,"src",n),c(t,"alt","Error illustration"),c(l,"class","svelte-125kr5n"),c(e,"id","error-container"),c(e,"class","svelte-125kr5n")},m(o,r){b(o,e,r),d(e,t),d(e,i),d(e,l),d(l,a)},p(o,r){r&16&&K(a,o[4])},i:B,o:B,d(o){o&&p(e)}}}function _t(s){let e,t,n,i,l;return{c(){e=v("div"),t=v("img"),i=L(),l=v("p"),l.textContent="Laster inn sykler og stativer :-)",oe(t.src,n=$e)||c(t,"src",n),c(t,"alt","Loading gif"),c(t,"class","svelte-125kr5n"),c(e,"class","loader svelte-125kr5n")},m(a,o){b(a,e,o),d(e,t),d(e,i),d(e,l)},p:B,i:B,o:B,d(a){a&&p(e)}}}function kt(s){let e=[],t=new ct,n,i,l=s[8].sort(We);const a=o=>o[23].station_id;for(let o=0;o<l.length;o+=1){let r=Te(s,l,o),u=a(r);t.set(u,e[o]=Oe(u,r))}return{c(){for(let o=0;o<e.length;o+=1)e[o].c();n=Q()},m(o,r){for(let u=0;u<e.length;u+=1)e[u].m(o,r);b(o,n,r),i=!0},p(o,r){r&320&&(l=o[8].sort(We),ie(),e=Ue(e,r,a,1,o,l,t,n.parentNode,Ve,Oe,n,Te),se())},i(o){if(!i){for(let r=0;r<l.length;r+=1)X(e[r]);i=!0}},o(o){for(let r=0;r<e.length;r+=1)Y(e[r]);i=!1},d(o){for(let r=0;r<e.length;r+=1)e[r].d(o);o&&p(n)}}}function Oe(s,e){let t,n,i;return n=new st({props:{name:e[23].name,direction:e[23].direction,distance:e[23].distance,is_renting:e[23].status.is_renting===1,is_returning:e[23].status.is_returning===1,bike_available:e[23].status.num_bikes_available,docks_available:e[23].status.num_docks_available,latitude:e[23].lat,longitude:e[23].lon,last_status:e[23].status.last_reported,filterBy:e[6]}}),{key:s,first:null,c(){t=Q(),ce(n.$$.fragment),this.first=t},m(l,a){b(l,t,a),de(n,l,a),i=!0},p(l,a){e=l;const o={};a&256&&(o.name=e[23].name),a&256&&(o.direction=e[23].direction),a&256&&(o.distance=e[23].distance),a&256&&(o.is_renting=e[23].status.is_renting===1),a&256&&(o.is_returning=e[23].status.is_returning===1),a&256&&(o.bike_available=e[23].status.num_bikes_available),a&256&&(o.docks_available=e[23].status.num_docks_available),a&256&&(o.latitude=e[23].lat),a&256&&(o.longitude=e[23].lon),a&256&&(o.last_status=e[23].status.last_reported),a&64&&(o.filterBy=e[6]),n.$set(o)},i(l){i||(X(n.$$.fragment,l),i=!0)},o(l){Y(n.$$.fragment,l),i=!1},d(l){l&&p(t),fe(n,l)}}}function vt(s){let e,t,n,i,l,a,o,r,u,h,A,k,y=(s[3]?"P\xE5sl\xE5tt":"Avsl\xE5tt")+"",w,D,f,E,N,j,H,J,F,S,U,P,g,C,R,q,M,T,_=s[7]&&Ge(s);function O(m,I){return m[7]?dt:ft}let x=O(s),z=x(s),W=s[5]&&He(s);const me=[mt,ut],V=[];function _e(m,I){return m[4]?0:1}return g=_e(s),C=V[g]=me[g](s),{c(){e=v("div"),t=v("h1"),t.textContent="Simulerings verkt\xF8y",n=L(),i=v("div"),l=v("button"),l.textContent="G\xE5 til Majorstua",a=L(),o=v("button"),o.textContent="G\xE5 til Glassmagasinet",r=L(),u=v("button"),u.textContent="G\xE5 til Brynseng",h=L(),A=v("button"),k=G("Feil ved henting av data ("),w=G(y),D=G(")"),f=L(),_&&_.c(),E=L(),N=v("div"),j=v("div"),j.textContent="Vis meg ledige sykler",H=L(),J=v("div"),J.textContent="Vis meg ledige stativ",F=L(),S=v("div"),z.c(),U=L(),W&&W.c(),P=L(),C.c(),R=Q(),c(t,"class","svelte-125kr5n"),c(l,"type","button"),c(l,"class","svelte-125kr5n"),c(o,"type","button"),c(o,"class","svelte-125kr5n"),c(u,"type","button"),c(u,"class","svelte-125kr5n"),c(A,"type","button"),c(A,"class","svelte-125kr5n"),c(i,"class","buttons svelte-125kr5n"),c(e,"id","debug-panel"),c(e,"class","svelte-125kr5n"),c(j,"class","button bike svelte-125kr5n"),c(J,"class","button dock svelte-125kr5n"),c(S,"class","button toggle-map svelte-125kr5n"),c(N,"id","navigation"),c(N,"class","svelte-125kr5n")},m(m,I){b(m,e,I),d(e,t),d(e,n),d(e,i),d(i,l),d(i,a),d(i,o),d(i,r),d(i,u),d(i,h),d(i,A),d(A,k),d(A,w),d(A,D),b(m,f,I),_&&_.m(m,I),b(m,E,I),b(m,N,I),d(N,j),d(N,H),d(N,J),d(N,F),d(N,S),z.m(S,null),b(m,U,I),W&&W.m(m,I),b(m,P,I),V[g].m(m,I),b(m,R,I),q=!0,M||(T=[Z(l,"click",s[10]),Z(o,"click",s[11]),Z(u,"click",s[12]),Z(A,"click",s[13]),Z(j,"click",s[14]),Z(J,"click",s[15]),Z(S,"click",s[16])],M=!0)},p(m,[I]){(!q||I&8)&&y!==(y=(m[3]?"P\xE5sl\xE5tt":"Avsl\xE5tt")+"")&&K(w,y),m[7]?_?(_.p(m,I),I&128&&X(_,1)):(_=Ge(m),_.c(),X(_,1),_.m(E.parentNode,E)):_&&(ie(),Y(_,1,1,()=>{_=null}),se()),x!==(x=O(m))&&(z.d(1),z=x(m),z&&(z.c(),z.m(S,null))),m[5]?W?W.p(m,I):(W=He(m),W.c(),W.m(P.parentNode,P)):W&&(W.d(1),W=null);let le=g;g=_e(m),g===le?V[g].p(m,I):(ie(),Y(V[le],1,1,()=>{V[le]=null}),se(),C=V[g],C?C.p(m,I):(C=V[g]=me[g](m),C.c()),X(C,1),C.m(R.parentNode,R))},i(m){q||(X(_),X(C),q=!0)},o(m){Y(_),Y(C),q=!1},d(m){m&&p(e),m&&p(f),_&&_.d(m),m&&p(E),m&&p(N),z.d(),m&&p(U),W&&W.d(m),m&&p(P),V[g].d(m),m&&p(R),M=!1,Ye(T)}}}const We=(s,e)=>s.distance-e.distance;function gt(s,e,t){let n,i=[{type:"generic",message:"Ojsann her skjedde det en feil. Last inn siden p\xE5 nytt. Hvis det ikke hjelper ..."},{message:"Ojsann, det skjedde en feil ved innhenting av sykler og stativer. Vi pr\xF8ver igjen straks!"}],l=!1,a=!1,o,r,u=59.922883,h=10.758241,A,k,y,w=[],D=!1;const f=()=>{if(!l)try{navigator.geolocation.getCurrentPosition(g=>{t(5,k=null),t(0,u=g.coords.latitude),t(1,h=g.coords.longitude)},g=>{g.message==="User denied Geolocation"&&t(5,k=`Vi f\xE5r desverre ikke vist deg de n\xE6rmeste stasjonene fordi du ikke har 
              godkjent at vi kan se din posisjon! Her f\xE5r du likevel se alle stasjoner med utgangspunkt fra Olaf Ryes Plass!`)})}catch{t(4,A=i[0].message)}},E=(g,C)=>{l=!0,clearInterval(o);const R=(u-g)/20,q=(h-C)/20;for(let M=0;M<20;M++)setTimeout(()=>{t(0,u=u-R),t(1,h=h-q)},50*M)},N=async()=>{try{if(a)throw Error();t(2,w=await Qe())}catch{clearInterval(r),t(4,A=i[1].message),setTimeout(()=>{t(4,A=null),t(2,w=[]),r=setInterval(N,3*1e3)},5e3)}};pe(async()=>{N(),f(),r=setInterval(N,10*1e3),o=setInterval(f,10*1e3)});const j=()=>E(59.928992,10.714949),H=()=>E(59.913017,10.745386),J=()=>E(59.909158,10.814618),F=()=>t(3,a=!a),S=()=>t(6,y="bikes"),U=()=>t(6,y="docks"),P=()=>t(7,D=!D);return s.$$.update=()=>{s.$$.dirty&7&&t(8,n=w.length>0?w.map(g=>{const C=[{latitude:u,longitude:h},{latitude:g.lat,longitude:g.lon}];try{g.distance=ye.getDistance(...C),g.direction=ye.getRhumbLineBearing(...C)}catch{}finally{return g}}):[])},[u,h,w,a,A,k,y,D,n,E,j,H,J,F,S,U,P]}class bt extends ${constructor(e){super();ee(this,e,gt,vt,te,{})}}function pt(s){let e,t,n;return t=new bt({}),{c(){e=v("main"),ce(t.$$.fragment),c(e,"class","svelte-1nofuoe")},m(i,l){b(i,e,l),de(t,e,null),n=!0},p:B,i(i){n||(X(t.$$.fragment,i),n=!0)},o(i){Y(t.$$.fragment,i),n=!1},d(i){i&&p(e),fe(t)}}}class ht extends ${constructor(e){super();ee(this,e,null,pt,te,{})}}new ht({target:document.getElementById("app")});
