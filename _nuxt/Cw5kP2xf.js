import{_ as R}from"./CVEkPnOu.js";import{q as P,y as h,A as x,r as a,o as j,c as A,b as i,u as s,s as C,v as q,x as z,w as g,d as D,t as F,V as T,z as U,p as J,f as L,a as r,_ as M}from"./BgyJECtJ.js";const u=d=>(J("data-v-89f578c1"),d=d(),L(),d),O={class:"content"},G=u(()=>r("h1",null,"お知らせ作成",-1)),H=u(()=>r("br",null,null,-1)),K=u(()=>r("br",null,null,-1)),Q=u(()=>r("br",null,null,-1)),W=u(()=>r("br",null,null,-1)),X=P({__name:"[id]",async setup(d){let e,p;const w=U().public.apiUrl,k=h().currentRoute.value.params.id,S=([e,p]=x(()=>fetch(w+`/notice?id=${k}`)),e=await e,p(),e),n=([e,p]=x(()=>S.json()),e=await e,p(),e)[0],_=a(n.title),b=a(n.content.replace(/\{(.*?)\}\((.*?)\)/g,'<span style="color: $1">$2</span>')),m=a(n.visible),y=a(!1),f=a("primary"),l=a("修正");function $(c){b.value=c}const E=async()=>{y.value=!0,l.value="送信中...";const c=b.value.replace(/<span style="color: (.*?)">(.*?)<\/span>/g,"{$1}($2)"),t=new Date().getTime(),o=U().public.apiUrl,V=await fetch(o+"/notice",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:n.id,title:_.value,content:c,createDate:n.createDate,updateDate:t,visible:m.value})});V.ok?(f.value="success",l.value="修正しました",await V.text(),await new Promise(I=>setTimeout(async()=>{const N=h();I(await N.push("/admin/notices"))},1e3))):(f.value="error",l.value="修正に失敗しました。調査するのでメールで連絡貰えると助かります")},B=async()=>{confirm("本当に削除しますか？この操作は取り消せません。")&&((await fetch(w+`/notice?id=${n.id}`,{method:"DELETE"})).ok?await new Promise(v=>setTimeout(async()=>{const o=h();v(await o.push("/admin/notices"))},1e3)):(f.value="error",l.value="削除に失敗しました。調査するのでメールで連絡貰えると助かります"))};return(c,t)=>{const v=R;return j(),A("div",O,[G,H,i(q,{label:"タイトル",variant:"solo-inverted",modelValue:s(_),"onUpdate:modelValue":t[0]||(t[0]=o=>C(_)?_.value=o:null)},null,8,["modelValue"]),i(v,{content:s(b),onUpdateContent:$},null,8,["content"]),K,i(z,{modelValue:s(m),"onUpdate:modelValue":t[1]||(t[1]=o=>C(m)?m.value=o:null),label:"公開する"},null,8,["modelValue"]),Q,i(T,{disabled:s(y),color:s(f),onClick:E},{default:g(()=>[D(F(s(l)),1)]),_:1},8,["disabled","color"]),W,i(T,{color:"error",onClick:B},{default:g(()=>[D("削除する")]),_:1})])}}}),oe=M(X,[["__scopeId","data-v-89f578c1"]]);export{oe as default};