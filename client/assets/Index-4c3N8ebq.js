import{B as K,U as x,D as p,s as C,a as k,R as O,b as _}from"./ripple.esm-BDDKMXt2.js";import{m as d,o as s,c as l,F as A,r as I,a as u,b as f,d as v,t as m,e as y,f as S,w as P,g as j,v as N,T as F,h as B,i as M,j as U,u as w}from"./index-CFuO2PVA.js";const $="/loading.gif";var L={root:"p-accordion p-component",tab:{root:function(e){var n=e.instance,a=e.index;return["p-accordion-tab",{"p-accordion-tab-active":n.isTabActive(a)}]},header:function(e){var n=e.instance,a=e.tab,c=e.index;return["p-accordion-header",{"p-highlight":n.isTabActive(c),"p-disabled":n.getTabProp(a,"disabled")}]},headerAction:"p-accordion-header-link p-accordion-header-action",headerIcon:"p-accordion-toggle-icon",headerTitle:"p-accordion-header-text",toggleableContent:"p-toggleable-content",content:"p-accordion-content"}},R=K.extend({name:"accordion",classes:L}),z={name:"BaseAccordion",extends:_,props:{multiple:{type:Boolean,default:!1},activeIndex:{type:[Number,Array],default:null},lazy:{type:Boolean,default:!1},expandIcon:{type:String,default:void 0},collapseIcon:{type:String,default:void 0},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1}},style:R,provide:function(){return{$parentInstance:this}}},E={name:"Accordion",extends:z,inheritAttrs:!1,emits:["update:activeIndex","tab-open","tab-close","tab-click"],data:function(){return{id:this.$attrs.id,d_activeIndex:this.activeIndex}},watch:{"$attrs.id":function(e){this.id=e||x()},activeIndex:function(e){this.d_activeIndex=e}},mounted:function(){this.id=this.id||x()},methods:{isAccordionTab:function(e){return e.type.name==="AccordionTab"},isTabActive:function(e){return this.multiple?this.d_activeIndex&&this.d_activeIndex.includes(e):this.d_activeIndex===e},getTabProp:function(e,n){return e.props?e.props[n]:void 0},getKey:function(e,n){return this.getTabProp(e,"header")||n},getTabHeaderActionId:function(e){return"".concat(this.id,"_").concat(e,"_header_action")},getTabContentId:function(e){return"".concat(this.id,"_").concat(e,"_content")},getTabPT:function(e,n,a){var c=this.tabs.length,r={props:e.props||{},parent:{instance:this,props:this.$props,state:this.$data},context:{index:a,count:c,first:a===0,last:a===c-1,active:this.isTabActive(a)}};return d(this.ptm("tab.".concat(n),{tab:r}),this.ptm("accordiontab.".concat(n),{accordiontab:r}),this.ptm("accordiontab.".concat(n),r),this.ptmo(this.getTabProp(e,"pt"),n,r))},onTabClick:function(e,n,a){this.changeActiveIndex(e,n,a),this.$emit("tab-click",{originalEvent:e,index:a})},onTabKeyDown:function(e,n,a){switch(e.code){case"ArrowDown":this.onTabArrowDownKey(e);break;case"ArrowUp":this.onTabArrowUpKey(e);break;case"Home":this.onTabHomeKey(e);break;case"End":this.onTabEndKey(e);break;case"Enter":case"NumpadEnter":case"Space":this.onTabEnterKey(e,n,a);break}},onTabArrowDownKey:function(e){var n=this.findNextHeaderAction(e.target.parentElement.parentElement);n?this.changeFocusedTab(e,n):this.onTabHomeKey(e),e.preventDefault()},onTabArrowUpKey:function(e){var n=this.findPrevHeaderAction(e.target.parentElement.parentElement);n?this.changeFocusedTab(e,n):this.onTabEndKey(e),e.preventDefault()},onTabHomeKey:function(e){var n=this.findFirstHeaderAction();this.changeFocusedTab(e,n),e.preventDefault()},onTabEndKey:function(e){var n=this.findLastHeaderAction();this.changeFocusedTab(e,n),e.preventDefault()},onTabEnterKey:function(e,n,a){this.changeActiveIndex(e,n,a),e.preventDefault()},findNextHeaderAction:function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,a=n?e:e.nextElementSibling,c=p.findSingle(a,'[data-pc-section="header"]');return c?p.getAttribute(c,"data-p-disabled")?this.findNextHeaderAction(c.parentElement):p.findSingle(c,'[data-pc-section="headeraction"]'):null},findPrevHeaderAction:function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,a=n?e:e.previousElementSibling,c=p.findSingle(a,'[data-pc-section="header"]');return c?p.getAttribute(c,"data-p-disabled")?this.findPrevHeaderAction(c.parentElement):p.findSingle(c,'[data-pc-section="headeraction"]'):null},findFirstHeaderAction:function(){return this.findNextHeaderAction(this.$el.firstElementChild,!0)},findLastHeaderAction:function(){return this.findPrevHeaderAction(this.$el.lastElementChild,!0)},changeActiveIndex:function(e,n,a){if(!this.getTabProp(n,"disabled")){var c=this.isTabActive(a),r=c?"tab-close":"tab-open";this.multiple?c?this.d_activeIndex=this.d_activeIndex.filter(function(i){return i!==a}):this.d_activeIndex?this.d_activeIndex.push(a):this.d_activeIndex=[a]:this.d_activeIndex=this.d_activeIndex===a?null:a,this.$emit("update:activeIndex",this.d_activeIndex),this.$emit(r,{originalEvent:e,index:a})}},changeFocusedTab:function(e,n){if(n&&(p.focus(n),this.selectOnFocus)){var a=parseInt(n.parentElement.parentElement.dataset.pcIndex,10),c=this.tabs[a];this.changeActiveIndex(e,c,a)}}},computed:{tabs:function(){var e=this;return this.$slots.default().reduce(function(n,a){return e.isAccordionTab(a)?n.push(a):a.children&&a.children instanceof Array&&a.children.forEach(function(c){e.isAccordionTab(c)&&n.push(c)}),n},[])}},components:{ChevronDownIcon:C,ChevronRightIcon:k},directives:{ripple:O}};function T(t){"@babel/helpers - typeof";return T=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},T(t)}function H(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(c){return Object.getOwnPropertyDescriptor(t,c).enumerable})),n.push.apply(n,a)}return n}function b(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?H(Object(n),!0).forEach(function(a){V(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):H(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function V(t,e,n){return e=q(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function q(t){var e=G(t,"string");return T(e)=="symbol"?e:String(e)}function G(t,e){if(T(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var a=n.call(t,e||"default");if(T(a)!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var J=["data-pc-index","data-p-active"],Q=["data-p-highlight","data-p-disabled"],W=["id","tabindex","aria-disabled","aria-expanded","aria-controls","onClick","onKeydown"],X=["id","aria-labelledby"];function Y(t,e,n,a,c,r){return s(),l("div",d({class:t.cx("root")},t.ptmi("root")),[(s(!0),l(A,null,I(r.tabs,function(i,o){return s(),l("div",d({key:r.getKey(i,o),class:t.cx("tab.root",{tab:i,index:o})},r.getTabPT(i,"root",o),{"data-pc-name":"accordiontab","data-pc-index":o,"data-p-active":r.isTabActive(o)}),[u("div",d({style:r.getTabProp(i,"headerStyle"),class:[t.cx("tab.header",{tab:i,index:o}),r.getTabProp(i,"headerClass")]},b(b({},r.getTabProp(i,"headerProps")),r.getTabPT(i,"header",o)),{"data-p-highlight":r.isTabActive(o),"data-p-disabled":r.getTabProp(i,"disabled")}),[u("a",d({id:r.getTabHeaderActionId(o),class:t.cx("tab.headerAction"),tabindex:r.getTabProp(i,"disabled")?-1:t.tabindex,role:"button","aria-disabled":r.getTabProp(i,"disabled"),"aria-expanded":r.isTabActive(o),"aria-controls":r.getTabContentId(o),onClick:function(g){return r.onTabClick(g,i,o)},onKeydown:function(g){return r.onTabKeyDown(g,i,o)}},b(b({},r.getTabProp(i,"headeractionprops")),r.getTabPT(i,"headeraction",o))),[i.children&&i.children.headericon?(s(),f(v(i.children.headericon),{key:0,isTabActive:r.isTabActive(o),active:r.isTabActive(o),index:o},null,8,["isTabActive","active","index"])):r.isTabActive(o)?(s(),f(v(t.$slots.collapseicon?t.$slots.collapseicon:t.collapseIcon?"span":"ChevronDownIcon"),d({key:1,class:[t.cx("tab.headerIcon"),t.collapseIcon],"aria-hidden":"true"},r.getTabPT(i,"headericon",o)),null,16,["class"])):(s(),f(v(t.$slots.expandicon?t.$slots.expandicon:t.expandIcon?"span":"ChevronRightIcon"),d({key:2,class:[t.cx("tab.headerIcon"),t.expandIcon],"aria-hidden":"true"},r.getTabPT(i,"headericon",o)),null,16,["class"])),i.props&&i.props.header?(s(),l("span",d({key:3,class:t.cx("tab.headerTitle")},r.getTabPT(i,"headertitle",o)),m(i.props.header),17)):y("",!0),i.children&&i.children.header?(s(),f(v(i.children.header),{key:4})):y("",!0)],16,W)],16,Q),S(F,d({name:"p-toggleable-content"},r.getTabPT(i,"transition",o)),{default:P(function(){return[!t.lazy||r.isTabActive(o)?j((s(),l("div",d({key:0,id:r.getTabContentId(o),style:r.getTabProp(i,"contentStyle"),class:[t.cx("tab.toggleableContent"),r.getTabProp(i,"contentClass")],role:"region","aria-labelledby":r.getTabHeaderActionId(o)},b(b({},r.getTabProp(i,"contentProps")),r.getTabPT(i,"toggleablecontent",o))),[u("div",d({class:t.cx("tab.content")},r.getTabPT(i,"content",o)),[(s(),f(v(i)))],16)],16,X)),[[N,t.lazy?!0:r.isTabActive(o)]]):y("",!0)]}),_:2},1040)],16,J)}),128))],16)}E.render=Y;var Z={},ee={name:"BaseAccordionTab",extends:_,props:{header:null,headerStyle:null,headerClass:null,headerProps:null,headerActionProps:null,contentStyle:null,contentClass:null,contentProps:null,disabled:Boolean},style:Z,provide:function(){return{$parentInstance:this}}},D={name:"AccordionTab",extends:ee,inheritAttrs:!1};function te(t,e,n,a,c,r){return B(t.$slots,"default")}D.render=te;const ne=u("h1",null,"Attendance list",-1),ae={key:0,src:$,alt:"loading icon"},re=["href"],ce={__name:"Index",setup(t){const e=M(null),n=async()=>{const r=await fetch("http://localhost:2000/get/attendance/all");e.value=await r.json()},a=r=>new Date(r).toDateString(),c=r=>{const i=new Date(r);if(i instanceof Date&&!isNaN(i)){const o=i.getHours()<=9?"0"+i.getHours():i.getHours(),h=i.getMinutes()<=9?"0"+i.getMinutes():i.getMinutes();return`${o}:${h}`}else return i};return U(async()=>{n()}),(r,i)=>(s(),l("main",null,[ne,e.value?y("",!0):(s(),l("img",ae)),S(w(E),{multiple:!0,activeIndex:[0]},{default:P(()=>[(s(!0),l(A,null,I(e.value,o=>(s(),f(w(D),{key:o._id,header:`${a(o.date)} - Attendants ${o.messages.length}`},{default:P(()=>[u("ul",null,[(s(!0),l(A,null,I(o.messages,(h,g)=>(s(),l("li",{class:"messages",key:g},[u("span",null,m(c(h.date)),1),u("span",null,[u("a",{href:"/users/"+h.user_ref},m(h.user_name),9,re)]),u("span",null,m(h.message),1)]))),128))])]),_:2},1032,["header"]))),128))]),_:1})]))}};export{ce as default};
