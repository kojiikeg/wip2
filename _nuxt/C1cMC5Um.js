import{_ as w}from"./CVEkPnOu.js";import{q as C,r as t,o as g,c as S,b as u,u as a,s as f,v as T,x as D,w as k,d as U,t as B,V as I,y as N,p as $,f as R,a as v,z as E,_ as O}from"./BgyJECtJ.js";const b=n=>($("data-v-e73f64d0"),n=n(),R(),n),P={class:"content"},j=b(()=>v("h1",null,"お知らせ作成",-1)),q=b(()=>v("br",null,null,-1)),z=C({__name:"create",setup(n){const s=t(""),d=t(""),l=t(!0),c=t("作成"),r=t("primary"),p=t(!1),V=i=>{d.value=i.replace(/<span style="color: (.*?)">(.*?)<\/span>/g,"{$1}($2)")},x=async()=>{p.value=!0,c.value="送信中...";const i=d.value.replace(/<span style="color: (.*?)">(.*?)<\/span>/g,"{$1}($2)"),e=new Date().getTime(),o=E().public.apiUrl,_=await fetch(o+"/notice",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:s.value,content:i,createDate:e,updateDate:e,visible:l.value})});_.ok?(r.value="success",c.value="作成しました",await _.text(),await new Promise(y=>setTimeout(async()=>{const h=N();y(await h.push("/admin/notices"))},1e3))):(r.value="error",c.value="作成に失敗しました。調査するのでメールで連絡貰えると助かります")};return(i,e)=>{const m=w;return g(),S("div",P,[j,q,u(T,{label:"タイトル",variant:"solo-inverted",modelValue:a(s),"onUpdate:modelValue":e[0]||(e[0]=o=>f(s)?s.value=o:null)},null,8,["modelValue"]),u(m,{content:"",onUpdateContent:V}),u(D,{modelValue:a(l),"onUpdate:modelValue":e[1]||(e[1]=o=>f(l)?l.value=o:null),label:"すぐに公開する(公開/非公開は後から変更できます)"},null,8,["modelValue"]),u(I,{disabled:a(p),color:a(r),onClick:x},{default:k(()=>[U(B(a(c)),1)]),_:1},8,["disabled","color"])])}}}),M=O(z,[["__scopeId","data-v-e73f64d0"]]);export{M as default};