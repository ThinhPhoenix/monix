import{c as p}from"./createLucideIcon-BX_fDlP4.js";import{_ as k,f as y,e as V,q as h,c as i,a as o,b as l,k as x,t as _,m as g,o as d}from"./index-CerHYTh5.js";import{I as s}from"./InputElement-7Ev1UjSM.js";/**
 * @license lucide-vue-next v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=p("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);/**
 * @license lucide-vue-next v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=p("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),N={class:"form-group"},S={class:"form-group"},M={class:"form-group"},j={class:"form-actions"},q={type:"submit",class:"btn-save"},C={__name:"ManagementForm",props:{expense:Object},emits:["save","cancel"],setup(c,{emit:f}){const r=c,u=f,t=y({title:"",amount:"",date:""}),m=V(()=>!!r.expense);h(()=>r.expense,n=>{n?t.value={...n}:t.value={title:"",amount:"",date:""}},{immediate:!0});function v(){u("save",{...t.value})}function b(){u("cancel")}return(n,e)=>(d(),i("form",{class:"expense-form",onSubmit:g(v,["prevent"])},[o("div",N,[e[3]||(e[3]=o("label",{for:"title"},"Tên khoản chi",-1)),l(s,{id:"title",modelValue:t.value.title,"onUpdate:modelValue":e[0]||(e[0]=a=>t.value.title=a),placeholder:"Nhập tên khoản chi",required:""},null,8,["modelValue"])]),o("div",S,[e[4]||(e[4]=o("label",{for:"amount"},"Số tiền",-1)),l(s,{id:"amount",modelValue:t.value.amount,"onUpdate:modelValue":e[1]||(e[1]=a=>t.value.amount=a),type:"number",placeholder:"Nhập số tiền",required:""},null,8,["modelValue"])]),o("div",M,[e[5]||(e[5]=o("label",{for:"date"},"Ngày",-1)),l(s,{id:"date",modelValue:t.value.date,"onUpdate:modelValue":e[2]||(e[2]=a=>t.value.date=a),type:"date",required:""},null,8,["modelValue"])]),o("div",j,[o("button",q,_(m.value?"Cập nhật":"Thêm mới"),1),m.value?(d(),i("button",{key:0,type:"button",class:"btn-cancel",onClick:b},"Huỷ")):x("",!0)])],32))}},F=k(C,[["__scopeId","data-v-fb51ef3a"]]);export{F as M,U as S,w as X};
