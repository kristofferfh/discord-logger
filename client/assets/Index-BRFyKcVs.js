import{i as l,j as c,o as t,c as a,a as e,F as u,r as i,t as _}from"./index-CFuO2PVA.js";const p=e("h1",null,"users",-1),h=["href"],y={__name:"Index",setup(d){const n=l(null),o=async()=>{const r=await fetch("http://localhost:2000/get/users/");n.value=await r.json()};return c(async()=>{o()}),(r,f)=>(t(),a("main",null,[p,e("ul",null,[(t(!0),a(u,null,i(n.value,s=>(t(),a("li",{key:s._id},[e("span",null,[e("a",{href:"/users/"+s._id},_(s.user_name),9,h)])]))),128))])]))}};export{y as default};
