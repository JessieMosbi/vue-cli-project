(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1617e56e"],{1799:function(e,t,a){"use strict";var c=a("7a23"),n={"aria-label":"Page navigation example"},o={class:"pagination"},r=Object(c["createVNode"])("a",{class:"page-link",href:"#","aria-label":"Previous"},[Object(c["createVNode"])("span",{"aria-hidden":"true"},"«")],-1),i=Object(c["createVNode"])("a",{class:"page-link",href:"#","aria-label":"Next"},[Object(c["createVNode"])("span",{"aria-hidden":"true"},"»")],-1);function l(e,t,a,l,s,d){return Object(c["openBlock"])(),Object(c["createBlock"])("div",null,[Object(c["createVNode"])("nav",n,[Object(c["createVNode"])("ul",o,[a.pagination.hasPre?(Object(c["openBlock"])(),Object(c["createBlock"])("li",{key:0,class:"page-item",onClick:t[1]||(t[1]=Object(c["withModifiers"])((function(e){return d.clickPage(a.pagination.current-1)}),["prevent"]))},[r])):Object(c["createCommentVNode"])("",!0),(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(a.pagination.total,(function(e){return Object(c["openBlock"])(),Object(c["createBlock"])("li",{class:["page-item",{active:a.pagination.current===e}],key:e},[Object(c["createVNode"])("a",{class:"page-link",href:"javascript:;",onClick:function(t){return d.clickPage(e)}},Object(c["toDisplayString"])(e),9,["onClick"])],2)})),128)),a.pagination.hasNext?(Object(c["openBlock"])(),Object(c["createBlock"])("li",{key:1,class:"page-item",onClick:t[2]||(t[2]=Object(c["withModifiers"])((function(e){return d.clickPage(a.pagination.current+1)}),["prevent"]))},[i])):Object(c["createCommentVNode"])("",!0)])])])}var s={props:["pagination"],methods:{clickPage:function(e){this.$emit("changePage",e)}}};s.render=l;t["a"]=s},"1dde":function(e,t,a){var c=a("d039"),n=a("b622"),o=a("2d00"),r=n("species");e.exports=function(e){return o>=51||!c((function(){var t=[],a=t.constructor={};return a[r]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"65f0":function(e,t,a){var c=a("861d"),n=a("e8b5"),o=a("b622"),r=o("species");e.exports=function(e,t){var a;return n(e)&&(a=e.constructor,"function"!=typeof a||a!==Array&&!n(a.prototype)?c(a)&&(a=a[r],null===a&&(a=void 0)):a=void 0),new(void 0===a?Array:a)(0===t?0:t)}},8418:function(e,t,a){"use strict";var c=a("c04e"),n=a("9bf2"),o=a("5c6c");e.exports=function(e,t,a){var r=c(t);r in e?n.f(e,r,o(0,a)):e[r]=a}},"99af":function(e,t,a){"use strict";var c=a("23e7"),n=a("d039"),o=a("e8b5"),r=a("861d"),i=a("7b0b"),l=a("50c4"),s=a("8418"),d=a("65f0"),u=a("1dde"),p=a("b622"),b=a("2d00"),g=p("isConcatSpreadable"),h=9007199254740991,f="Maximum allowed index exceeded",j=b>=51||!n((function(){var e=[];return e[g]=!1,e.concat()[0]!==e})),O=u("concat"),v=function(e){if(!r(e))return!1;var t=e[g];return void 0!==t?!!t:o(e)},k=!j||!O;c({target:"Array",proto:!0,forced:k},{concat:function(e){var t,a,c,n,o,r=i(this),u=d(r,0),p=0;for(t=-1,c=arguments.length;t<c;t++)if(o=-1===t?r:arguments[t],v(o)){if(n=l(o.length),p+n>h)throw TypeError(f);for(a=0;a<n;a++,p++)a in o&&s(u,p,o[a])}else{if(p>=h)throw TypeError(f);s(u,p++,o)}return u.length=p,u}})},e8b5:function(e,t,a){var c=a("c6b6");e.exports=Array.isArray||function(e){return"Array"==c(e)}},ed84:function(e,t,a){"use strict";a.r(t);var c=a("7a23"),n={class:"mt-4",style:{position:"relative"}},o={class:"table align-middle"},r=Object(c["createVNode"])("thead",null,[Object(c["createVNode"])("tr",null,[Object(c["createVNode"])("th",null,"圖片"),Object(c["createVNode"])("th",null,"商品名稱"),Object(c["createVNode"])("th",null,"價格"),Object(c["createVNode"])("th",null,"功能")])],-1),i={style:{width:"200px"}},l={class:"h5"},s={class:"h6"},d={class:"h5"},u={class:"btn-group btn-group-sm"},p=Object(c["createVNode"])("i",{class:"fas fa-pulse"},null,-1),b=Object(c["createTextVNode"])(" 查看更多"),g=Object(c["createVNode"])("i",{class:"fas fa-pulse"},null,-1),h=Object(c["createTextVNode"])(" 加到購物車 ");function f(e,t,a,f,j,O){var v=Object(c["resolveComponent"])("router-link"),k=Object(c["resolveComponent"])("pagination");return Object(c["openBlock"])(),Object(c["createBlock"])(c["Fragment"],null,[Object(c["createVNode"])("div",n,[Object(c["createVNode"])("table",o,[r,Object(c["createVNode"])("tbody",null,[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(j.products,(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])("tr",{key:t},[Object(c["createVNode"])("td",i,[e.imagesUrl?(Object(c["openBlock"])(),Object(c["createBlock"])("div",{key:0,style:O.getImageStyle(e.imageUrl)},null,4)):Object(c["createCommentVNode"])("",!0)]),Object(c["createVNode"])("td",null,Object(c["toDisplayString"])(e.title),1),Object(c["createVNode"])("td",null,[Object(c["createVNode"])("div",l,Object(c["toDisplayString"])(e.origin_price)+" 元",1),Object(c["createVNode"])("del",s,"原價 "+Object(c["toDisplayString"])(e.origin_price)+" 元",1),Object(c["createVNode"])("div",d,"現在只要 "+Object(c["toDisplayString"])(e.price)+" 元",1)]),Object(c["createVNode"])("td",null,[Object(c["createVNode"])("div",u,[Object(c["createVNode"])(v,{to:{path:"/product/".concat(e.id)},class:"btn btn-outline-secondary"},{default:Object(c["withCtx"])((function(){return[p,b]})),_:2},1032,["to"]),Object(c["createVNode"])("button",{type:"button",class:"btn btn-outline-danger",onClick:function(t){return O.addToCart({id:e.id,qty:1})}},[g,h],8,["onClick"])])])])})),128))])])]),Object(c["createVNode"])(k,{class:"mt-4",pagination:j.page,onChangePage:O.getProducts},null,8,["pagination","onChangePage"])],64)}a("99af");var j=a("1799"),O={props:["listPage"],data:function(){return{products:[],page:{total:0,current:0,hasPre:!1,hasNext:!1},product:{},isLoading:!1,loader:null}},components:{pagination:j["a"]},mounted:function(){var e=this.listPage>1?this.listPage:1;this.getProducts(e)},watch:{isLoading:function(e){e?this.loader=this.$loading.show({container:null}):this.loader&&this.loader.hide()},"page.current":function(){this.$emit("update:list-page",this.page.current)}},methods:{getImageStyle:function(e){return{height:"100px",backgroundSize:"cover",backgroundPosition:"center",backgroundImage:'url("'.concat(e,'")')}},getProducts:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.isLoading=!0,this.$http.get("".concat("https://vue3-course-api.hexschool.io","/api/").concat("jessiemosbi","/products?page=").concat(t)).then((function(t){if(!t.data.success)return alert("獲取產品列表資料失敗！"),void(e.isLoading=!1);e.products=t.data.products,e.page.total=t.data.pagination.total_pages,e.page.current=t.data.pagination.current_page,e.page.hasPre=t.data.pagination.has_pre,e.page.hasNext=t.data.pagination.has_next,e.isLoading=!1})).catch((function(e){return console.dir(e)}))},addToCart:function(e){var t=this;this.isLoading=!0;var a={data:{product_id:e.id,qty:+e.qty}};this.$http.post("".concat("https://vue3-course-api.hexschool.io","/api/").concat("jessiemosbi","/cart"),a).then((function(e){if(!e.data.success)return alert("新增至購物車失敗！"),void(t.isLoading=!1);alert("成功新增至購物車！"),t.isLoading=!1})).catch((function(e){return console.dir(e)}))}}};O.render=f;t["default"]=O}}]);
//# sourceMappingURL=chunk-1617e56e.3189589e.js.map