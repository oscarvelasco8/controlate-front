import{a as ce}from"./chunk-BBFNYMFZ.js";import{c as ne,h as Xe,l as Ze,m as se,o as Ke,q as et,s as le,v as tt}from"./chunk-2RZNTMAK.js";import{a as U}from"./chunk-U4IYFD4R.js";import{$ as f,$b as oe,Bb as ee,C as Ae,Ea as ke,G as l,H as m,Ha as Ve,Ia as M,K as D,Ka as Ge,La as Z,Ma as H,N as g,P as d,Pa as Le,Qb as B,Ra as K,S as I,Tb as qe,U as r,Ub as L,V as a,W as v,Wb as P,Xb as te,Yb as $e,Zb as ie,_ as E,a as Ee,aa as p,ab as _e,ac as re,b as Oe,bc as ae,cc as Je,d as Se,da as we,dc as ze,ea as Te,ec as Qe,f as Me,g as je,ga as Ne,ha as He,ia as Re,ka as c,la as b,m as q,ma as G,n as $,na as Be,nc as Ye,o as N,oa as Pe,pa as Q,q as S,qa as X,r as J,ra as Y,u as C,ua as Ue,v as x,va as O,wb as R,yb as We,z}from"./chunk-PP6H3DI6.js";var _=class i{constructor(t,e){this.httpClient=t;this.messageService=e;this.BASE_URL="https://wet-chelsy-controlat-2005cbe5.koyeb.app/api/user-calories-history";this._totalCalories=D(0);this.totalProtein=D(0);this.totalCarbs=D(0);this.totalFat=D(0);this._history=[];this.selectedDate="";this.caloriesGraphicWeek=D([]);this.foodByMeal=D([])}insertIntoHistory(t,e){this.selectedDate=e,t.forEach(o=>{this.httpClient.post(this.BASE_URL,o).subscribe({next:()=>{this.messageService.add({severity:"success",summary:"Datos guardados",detail:"\xA1Registro a\xF1adido con \xE9xito!"}),this.getHistoryByDate(this.selectedDate),this.getTotalCaloriesWeek(this.selectedDate)},error:n=>{this.messageService.add({severity:"error",summary:"Error",detail:"Error al guardar el registro"})}})})}deleteFromHistory(t,e){t.forEach(o=>{this.selectedDate=e,this.httpClient.delete(`${this.BASE_URL}/${o.logId}`).subscribe({next:()=>{this.messageService.add({severity:"success",summary:"Datos borrados",detail:"\xA1Registro borrado con \xE9xito!"}),this.getHistoryByDate(this.selectedDate),this.getTotalCaloriesWeek(this.selectedDate)},error:n=>{this.messageService.add({severity:"error",summary:"Error",detail:"Error al borrar el registro"})}})})}getHistoryByDate(t){let e=localStorage.getItem("userLogged"),o=["Desayuno","Almuerzo","Comida","Cena"];this.httpClient.get(`${this.BASE_URL}/by-date?username=${e}&logDate=${t}`).subscribe({next:n=>{this._history=n,this.resetCalories(),this.totalProtein.set(0),this.totalCarbs.set(0),this.totalFat.set(0),this._history.forEach(s=>{this.addCalories(s.calories),this.totalProtein.set(this.totalProtein()+s.proteins),this.totalCarbs.set(this.totalCarbs()+s.carbohydrates),this.totalFat.set(this.totalFat()+s.fats)}),this.foodByMeal.set(o.map(s=>({name:s,foods:this._history.filter(h=>h.meal===s).map(h=>h.foodName)})))}})}getTotalCaloriesWeek(t){this.caloriesGraphicWeek.set([]);let e=new Date(t.split("/")[1]+"/"+t.split("/")[0]+"/"+t.split("/")[2]),o=localStorage.getItem("userLogged"),n=0;for(let s=0;s<7;s++){let h=0,y;s===0?y=e.toLocaleDateString():y=new Date(e.setDate(e.getDate()-1)).toLocaleDateString(),this.httpClient.get(`${this.BASE_URL}/by-date?username=${o}&logDate=${y}`).subscribe({next:A=>{A.forEach(w=>{h=h+w.calories}),this.caloriesGraphicWeek().find(w=>w.date===y)||this.caloriesGraphicWeek.set([...this.caloriesGraphicWeek(),{date:y,calories:h}]),n++,n===7&&this.sortData()},error:A=>{console.error("Error fetching data",A)}})}}sortData(){this.caloriesGraphicWeek().sort((t,e)=>{let o=new Date(t.date),n=new Date(e.date);return o.getTime()-n.getTime()})}addCalories(t){this._totalCalories.set(this._totalCalories()+t)}get totalCalories(){return this._totalCalories()}resetCalories(){this._totalCalories.set(0)}get history(){return this._history}static{this.\u0275fac=function(e){return new(e||i)(N(K),N(R))}}static{this.\u0275prov=q({token:i,factory:i.\u0275fac,providedIn:"root"})}};var de=class i{constructor(t){this.primengConfig=t;this.selectedDateChange=new z;this.selectedDate=null}ngOnInit(){if(this.selectedDate===null){let t=new Date().toLocaleDateString();this.selectedDateChange.emit(t)}this.primengConfig.setTranslation({dayNames:["LUNES","MARTES","MI\xC9RCOLES","JUEVES","VIERNES","S\xC1BADO","DOMINGO"],dayNamesShort:["DOM","LUN","MAR","MI\xC9","JUE","VIE","S\xC1B"],dayNamesMin:["D","L","M","X","J","V","S"],monthNames:["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"],monthNamesShort:["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"],today:"Hoy",clear:"Limpiar",firstDayOfWeek:1})}onDateSelect(){this.selectedDateChange.emit(this.selectedDate?.toLocaleDateString())}static{this.\u0275fac=function(e){return new(e||i)(m(We))}}static{this.\u0275cmp=S({type:i,selectors:[["calories-calendar"]],outputs:{selectedDateChange:"selectedDateChange"},decls:1,vars:2,consts:[["dateFormat","dd/mm/yy",3,"ngModelChange","onSelect","inline","ngModel"]],template:function(e,o){e&1&&(r(0,"p-calendar",0),Y("ngModelChange",function(s){return X(o.selectedDate,s)||(o.selectedDate=s),s}),f("onSelect",function(){return o.onDateSelect()}),a()),e&2&&(d("inline",!0),Q("ngModel",o.selectedDate))},dependencies:[Ze,P,$e]})}};function mt(i,t){if(i&1&&(r(0,"div"),v(1,"p-chart",1),a()),i&2){let e=t.$implicit,o=p();l(),d("data",e)("options",o.options)}}var me=class i{constructor(t,e){this.foodHistoryService=t;this.userService=e;this.doughtsData=[];M(()=>{let o=this.foodHistoryService.totalProtein(),n=this.foodHistoryService.totalCarbs(),s=this.foodHistoryService.totalFat();this.doughtsData=[{labels:["PROTE\xCDNAS DIARIAS CONSUMIDAS","CARBOHIDRATOS DIARIOS CONSUMIDOS","GRASAS DIARIAS CONSUMIDAS"],datasets:[{data:[o|100,n|100,s|100],backgroundColor:["rgb(60,50,140)","rgb(114,234,142)","rgb(255, 99, 132)"],hoverOffset:4}]},{labels:["PROTE\xCDNAS DIARIAS CONSUMIDAS","TOTAL DE PROTE\xCDNAS A CONSUMIR"],datasets:[{data:[o,this.userService.proteinesObjective()],backgroundColor:["rgb(60,50,140)","rgb(54, 162, 235)"],hoverOffset:4}]},{labels:["CARBOHIDRATOS DIARIOS CONSUMIDOS","TOTAL DE CARBOHIDRATOS A CONSUMIR"],datasets:[{data:[n,this.userService.carbohydratesObjective()],backgroundColor:["rgb(114,234,142)","rgb(54, 162, 235)"],hoverOffset:4}]},{labels:["GRASAS DIARIAS CONSUMIDAS","TOTAL DE GRASAS A CONSUMIR"],datasets:[{data:[s,this.userService.fatsObjective()],backgroundColor:["rgb(255, 99, 132)","rgb(54, 162, 235)"],hoverOffset:4}]}]})}ngOnInit(){let e=getComputedStyle(document.documentElement).getPropertyValue("--text-color");this.options={cutout:"60%",plugins:{legend:{}}}}static{this.\u0275fac=function(e){return new(e||i)(m(_),m(U))}}static{this.\u0275cmp=S({type:i,selectors:[["calories-dought"]],decls:1,vars:1,consts:[[4,"ngFor","ngForOf"],["type","doughnut",3,"data","options"]],template:function(e,o){e&1&&g(0,mt,2,2,"div",0),e&2&&d("ngForOf",o.doughtsData)},dependencies:[Z,se],styles:["[_nghost-%COMP%]{overflow-x:auto}"]})}};function ut(i,t){if(i&1&&(r(0,"span",2),c(1),a()),i&2){let e=p();l(),Be("",e.totalCaloriesHistory,"/",e.totalCaloriesDiary," KCAL")}}var pe=class i{constructor(t,e){this.foodHistoryService=t;this.userService=e;this.color="";this.totalCaloriesDiary=0;M(()=>{this.totalCaloriesDiary=this.userService.tmbAdjusted()})}get totalCaloriesHistory(){return this.foodHistoryService.totalCalories}ngOnInit(){console.log(this.totalCaloriesDiary,this.userService.tmbAdjusted())}static{this.\u0275fac=function(e){return new(e||i)(m(_),m(U))}}static{this.\u0275cmp=S({type:i,selectors:[["calories-progress-bar"]],decls:2,vars:2,consts:[[1,"max-w-full",3,"value","color"],["pTemplate","content"],[1,"centered-text"]],template:function(e,o){e&1&&(r(0,"p-progressBar",0),g(1,ut,2,2,"ng-template",1),a()),e&2&&d("value",o.totalCaloriesHistory*100/o.totalCaloriesDiary)("color",o.color)},dependencies:[ee,le],styles:[`.p-progressbar-value{max-width:100%}
`],encapsulation:2})}};var u=[];for(let i=0;i<256;++i)u.push((i+256).toString(16).slice(1));function rt(i,t=0){return(u[i[t+0]]+u[i[t+1]]+u[i[t+2]]+u[i[t+3]]+"-"+u[i[t+4]]+u[i[t+5]]+"-"+u[i[t+6]]+u[i[t+7]]+"-"+u[i[t+8]]+u[i[t+9]]+"-"+u[i[t+10]]+u[i[t+11]]+u[i[t+12]]+u[i[t+13]]+u[i[t+14]]+u[i[t+15]]).toLowerCase()}var Ce,ht=new Uint8Array(16);function xe(){if(!Ce){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");Ce=crypto.getRandomValues.bind(crypto)}return Ce(ht)}var vt=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),Ie={randomUUID:vt};function yt(i,t,e){if(Ie.randomUUID&&!t&&!i)return Ie.randomUUID();i=i||{};let o=i.random||(i.rng||xe)();if(o[6]=o[6]&15|64,o[8]=o[8]&63|128,t){e=e||0;for(let n=0;n<16;++n)t[e+n]=o[n];return t}return rt(o)}var Fe=yt;var fe=class i{constructor(t,e){this.httpClient=t;this.messageService=e;this.BASE_URL="https://wet-chelsy-controlat-2005cbe5.koyeb.app/api";this._foodsInfo=D([{name:"pollo",id:"1",calories:"500",protein:"80",carbohydrate:"0",fat:"10",serving_description:"g"},{name:"arroz",id:"2",calories:"800",protein:"10",carbohydrate:"90",fat:"20",serving_description:"g"}]);this.foodsInfo=Ve(()=>this._foodsInfo());this._searching=!1}getFoods(t){this.resetFoodsInfo(),this._searching=!0,this.httpClient.get(this.BASE_URL+"/search-food-by-name?searchTerm="+t).pipe(je(e=>e.foods.food)).subscribe({next:e=>{e.forEach(o=>Se(this,null,function*(){let n=yield this.mapToFoodInfo(o);this._foodsInfo.update(s=>[...s,n])})),this.messageService.add({severity:"success",summary:"Busqueda exitosa",detail:"\xA1Resultados encontrados!"}),this._searching=!1},error:e=>{this.messageService.add({severity:"error",summary:"Error",detail:"La busqueda no arrojo ningun resultado"}),this._searching=!1}})}resetFoodsInfo(){this._foodsInfo.set([])}translateEnToEs(t){return Me(this.httpClient.get(`${this.BASE_URL}/translate?text=${t}&sourceLanguage=en&targetLanguage=es`,{responseType:"text"}))}get searching(){return this._searching}mapToFoodInfo(t){return Se(this,null,function*(){let e=t.food_description.split("|").map(st=>st.trim()),o=e[0].match(/Per (\d+(?:\.\d+)?)\s*([a-zA-Z]+)/),n=o?parseFloat(o[1]):100,s=o?o[2]:"g",h=parseFloat(e[0].split(":")[1].replace("kcal","").trim()),y=parseFloat(e[1].split(":")[1].replace("g","").trim()),A=parseFloat(e[2].split(":")[1].replace("g","").trim()),w=parseFloat(e[3].split(":")[1].replace("g","").trim()),T=s==="g"?100/n:1;return{name:yield this.translateEnToEs(t.food_name),id:t.food_id,calories:(h*T).toFixed(2),protein:(w*T).toFixed(2),carbohydrate:(A*T).toFixed(2),fat:(y*T).toFixed(2),serving_description:s}})}static{this.\u0275fac=function(e){return new(e||i)(N(K),N(R))}}static{this.\u0275prov=q({token:i,factory:i.\u0275fac,providedIn:"root"})}};var _t=()=>({height:"6px"}),j=i=>({"background-color":i});function bt(i,t){i&1&&(r(0,"div",14),v(1,"p-progressBar",15),a()),i&2&&(l(),I(Ue(2,_t)))}function Ct(i,t){i&1&&(r(0,"tr")(1,"th"),c(2,"Alimentos"),a()())}function xt(i,t){if(i&1){let e=E();r(0,"tr",19)(1,"td",20)(2,"div")(3,"form",21),f("submit",function(){let n=C(e).$implicit,s=p(3);return x(s.addFoodToMeal(s.selectedMeal.name,n))}),r(4,"label"),c(5),a(),r(6,"p-inputNumber",22),f("keyup",function(){let n=C(e).$implicit,s=p(3);return x(s.calculate(n.id))}),a(),r(7,"span"),c(8),a(),v(9,"p-button",23),a()(),r(10,"div")(11,"td",24)(12,"div",25)(13,"span",26),c(14,"Prote\xEDnas"),a(),r(15,"div",27)(16,"span",28),c(17),a()()(),r(18,"div",25)(19,"span",26),c(20,"Carbohidratos"),a(),r(21,"div",27)(22,"span",28),c(23),a()()(),r(24,"div",25)(25,"span",26),c(26,"Grasas"),a(),r(27,"div",27)(28,"span",28),c(29),a()()(),r(30,"div",25)(31,"span",26),c(32,"Calorias"),a(),r(33,"div",27)(34,"span",28),c(35),a()()()()()()()}if(i&2){let e=t.$implicit,o=p(3);l(3),d("formGroup",o.foodForm),l(2),b(e.name),l(3),b(e.serving_description),l(7),I(O(15,j,o.proteinColor)),l(2),b(e.protein),l(4),I(O(17,j,o.carbsColor)),l(2),b(e.carbohydrate),l(4),I(O(19,j,o.fatColor)),l(2),b(e.fat),l(4),I(O(21,j,o.caloriesColor)),l(2),b(e.calories)}}function It(i,t){if(i&1&&(r(0,"p-table",16),g(1,Ct,3,0,"ng-template",17)(2,xt,36,23,"ng-template",18),a()),i&2){let e=p(2);d("value",e.foodsSearched)}}function Ft(i,t){i&1&&(r(0,"tr")(1,"th"),c(2,"Alimentos A\xF1adidos"),a()())}function Dt(i,t){if(i&1){let e=E();r(0,"tr")(1,"td",20)(2,"div",30),c(3),r(4,"p-button",31),f("click",function(){let n=C(e).$implicit,s=p(3);return x(s.deleteFoodFromMeal(n))}),a()(),r(5,"div",24)(6,"div",25)(7,"span",26),c(8,"Prote\xEDnas"),a(),r(9,"div",27)(10,"span",28),c(11),a()()(),r(12,"div",25)(13,"span",26),c(14,"Carbohidratos"),a(),r(15,"div",27)(16,"span",28),c(17),a()()(),r(18,"div",25)(19,"span",26),c(20,"Grasas"),a(),r(21,"div",27)(22,"span",28),c(23),a()()(),r(24,"div",25)(25,"span",26),c(26,"Calorias"),a(),r(27,"div",27)(28,"span",28),c(29),a()()()()()()}if(i&2){let e=t.$implicit,o=p(3);l(3),Pe(" ",e.foodName," ",e.quantity," ",e.units," "),l(6),I(O(15,j,o.proteinColor)),l(2),b(e.proteins),l(4),I(O(17,j,o.carbsColor)),l(2),b(e.carbohydrates),l(4),I(O(19,j,o.fatColor)),l(2),b(e.fats),l(4),I(O(21,j,o.caloriesColor)),l(2),b(e.calories)}}function Et(i,t){if(i&1&&(r(0,"p-table",29),g(1,Ft,3,0,"ng-template",17)(2,Dt,30,23,"ng-template",18),a()),i&2){let e=p(2);d("value",e.getuserHistoryByMeal(e.selectedMeal.name))("ngClass",e.foodsSearched.length>0?"w-1/2":"w-full")}}function Ot(i,t){if(i&1){let e=E();r(0,"div",4)(1,"div",5)(2,"label",6),c(3,"Buscar alimentos"),a(),r(4,"form",7)(5,"input",8),f("keydown.enter",function(){C(e);let n=p();return x(n.searchFoods())}),a(),r(6,"p-button",9),f("click",function(){C(e);let n=p();return x(n.searchFoods())}),a()(),g(7,bt,2,3,"div",10),a(),r(8,"div",11),g(9,It,3,1,"p-table",12)(10,Et,3,2,"p-table",13),a()()}if(i&2){let e=p();l(4),d("formGroup",e.searchForm),l(3),d("ngIf",e.isSearching),l(2),d("ngIf",e.foodsSearched.length>0),l(),d("ngIf",e.getuserHistoryByMeal(e.selectedMeal.name).length>0)}}var ue=class i{constructor(t,e,o){this.foodService=t;this.formBuilder=e;this.foodHistoryService=o;this.visible=!1;this.history=[];this.selectedDate="";this.visibleChange=new z;this.proteinColor="rgb(60,50,140)";this.carbsColor="rgb(114,234,142)";this.fatColor="rgb(255, 99, 132)";this.caloriesColor="rgb(228,234,60)";this._foodsSearched=[];this._foodAdded=[];this.originalValues={};this._foodDeleted=[];this.foodForm=this.formBuilder.group({quantity:[100,[L.required,L.min(1)]]});this.searchForm=this.formBuilder.group({searchTerm:[""]})}searchFoods(){this.foodService.getFoods(this.searchForm.get("searchTerm")?.value),this.foodForm.patchValue({quantity:100})}closeModal(){this.visible=!1,this.visibleChange.emit(this.visible),this.foodForm.patchValue({quantity:100}),this.searchForm.patchValue({searchTerm:""})}get foodsSearched(){return this._foodsSearched=this.foodService.foodsInfo(),this._foodsSearched}addFoodToMeal(t,e){this._foodAdded.push({logId:Fe(),username:localStorage.getItem("userLogged"),logDate:this.selectedDate,foodId:parseInt(e.id),meal:t,foodName:e.name,quantity:this.foodForm.controls.quantity.value,calories:parseFloat(e.calories),carbohydrates:parseFloat(e.carbohydrate),proteins:parseFloat(e.protein),fats:parseFloat(e.fat),units:e.serving_description})}getuserHistoryByMeal(t){let e=this.history.filter(n=>n.meal==t),o=this._foodAdded.filter(n=>n.meal==t);return[...e,...o]}deleteFoodFromMeal(t){this._foodDeleted.push(t),this._foodAdded=this._foodAdded.filter(e=>e.logId!==t.logId),this.history=this.history.filter(e=>e.logId!==t.logId)}get isSearching(){return this.foodService.searching}calculate(t){let e=this._foodsSearched.find(o=>o.id==`${t}`);if(e){this.originalValues[e.id]||(this.originalValues[e.id]=Oe(Ee({},e),{protein:e.protein,carbohydrate:e.carbohydrate,fat:e.fat,calories:e.calories}));let o=parseFloat(this.originalValues[e.id].protein),n=parseFloat(this.originalValues[e.id].carbohydrate),s=parseFloat(this.originalValues[e.id].fat),h=parseFloat(this.originalValues[e.id].calories),y=this.foodForm.controls.quantity.value;if(!isNaN(y)&&y>0){let A=o/100*y,w=n/100*y,T=s/100*y,De=h/100*y;e.protein=A.toFixed(2),e.carbohydrate=w.toFixed(2),e.fat=T.toFixed(2),e.calories=De.toFixed(2)}else console.error("Cantidad no v\xE1lida")}}saveMeal(){this.foodHistoryService.insertIntoHistory(this._foodAdded,this.selectedDate),this.foodHistoryService.deleteFromHistory(this._foodDeleted,this.selectedDate),this._foodAdded=[],this._foodDeleted=[],this.closeModal()}static{this.\u0275fac=function(e){return new(e||i)(m(fe),m(ae),m(_))}}static{this.\u0275cmp=S({type:i,selectors:[["search-food"]],inputs:{visible:"visible",selectedMeal:"selectedMeal",history:"history",selectedDate:"selectedDate"},outputs:{visibleChange:"visibleChange"},decls:4,vars:4,consts:[[3,"visibleChange","onHide","visible","modal","header"],["class","p-fluid",4,"ngIf"],[1,"flex","justify-content-end","mt-3"],["label","Guardar",3,"click"],[1,"p-fluid"],[1,"field"],["for","search"],[1,"flex","gap-2","mb-4",3,"formGroup"],["formControlName","searchTerm","id","search","type","text","pInputText","","placeholder","Escribe el nombre del alimento...",3,"keydown.enter"],["icon","pi pi-search",3,"click"],["class","card",4,"ngIf"],[1,"flex","gap-8"],[3,"value",4,"ngIf"],[3,"value","ngClass",4,"ngIf"],[1,"card"],["mode","indeterminate"],[3,"value"],["pTemplate","header"],["pTemplate","body"],[1,"tr-space"],[1,"flex","flex-column","align-items-center","justify-content-between","gap-4"],[1,"flex","align-items-center","justify-content-center","gap-2",3,"submit","formGroup"],["formControlName","quantity",3,"keyup"],["type","submit","icon","pi pi-plus"],[1,"flex","flex-nowrap","gap-2","justify-content-around","pb-4"],[1,"flex","flex-column","gap-2","flex-1"],[1,"text-center"],[1,"border-round","flex","justify-content-center"],[1,"text-white"],[3,"value","ngClass"],[1,"flex","align-items-center","justify-content-between","w-full"],["icon","pi pi-minus",3,"click"]],template:function(e,o){e&1&&(r(0,"p-dialog",0),Y("visibleChange",function(s){return X(o.visible,s)||(o.visible=s),s}),f("onHide",function(){return o.closeModal()}),g(1,Ot,11,4,"div",1),r(2,"div",2)(3,"p-button",3),f("click",function(){return o.saveMeal()}),a()()()),e&2&&(we("header",o.selectedMeal==null?null:o.selectedMeal.name),Q("visible",o.visible),d("modal",!0),l(),d("ngIf",o.selectedMeal))},dependencies:[Ge,H,B,ee,Qe,Xe,Ke,et,le,ie,qe,P,te,oe,re],styles:[`.p-selectbutton{display:flex}
`],encapsulation:2})}};function At(i,t){if(i&1&&v(0,"p-button",12),i&2){let e=t.$implicit;d("label",e.length>15?e.slice(0,15)+"...":e)("rounded",!0)}}function wt(i,t){if(i&1&&(r(0,"div",9)(1,"div",10),g(2,At,1,2,"p-button",11),a(),r(3,"p")(4,"strong"),c(5,"Total de alimentos:"),a(),c(6),a()()),i&2){let e=p().$implicit;l(2),d("ngForOf",e.foods),l(4),G(" ",e.foods.length,"")}}function Tt(i,t){i&1&&(r(0,"div")(1,"strong"),c(2,"Sin alimentos que mostrar"),a()())}function Nt(i,t){if(i&1){let e=E();r(0,"p-card",6),f("click",function(){let n=C(e).$implicit,s=p();return x(s.openModal(n))}),g(1,wt,7,2,"div",7)(2,Tt,3,0,"div",8),a()}if(i&2){let e=t.$implicit;Te("header","",e.name," "),l(),d("ngIf",e.foods&&e.foods.length>0),l(),d("ngIf",e.foods&&e.foods.length==0)}}var ge=class i{constructor(t){this.foodHistoryService=t;this.history=[];this.selectedDate="";this.meals=[];this.displayModal=!1;this.selectedMeal="";M(()=>{this.meals=this.foodHistoryService.foodByMeal()})}openModal(t){this.selectedMeal=t,this.displayModal=!0}static{this.\u0275fac=function(e){return new(e||i)(m(_))}}static{this.\u0275cmp=S({type:i,selectors:[["calories-food-info"]],inputs:{history:"history",selectedDate:"selectedDate"},decls:6,vars:5,consts:[[1,"flex","flex-column","flex-wrap","gap-3","justify-content-start"],[1,"flex","flex-column","gap-5","flex-1"],[1,"w-auto"],[1,"flex","flex-1","flex-wrap","gap-4","justify-content-between"],["styleClass","cursor-pointer hover:scale-105 transition-all","class","w-5",3,"header","click",4,"ngFor","ngForOf"],[3,"visibleChange","visible","selectedMeal","history","selectedDate"],["styleClass","cursor-pointer hover:scale-105 transition-all",1,"w-5",3,"click","header"],["class","flex gap-2 flex-column",4,"ngIf"],[4,"ngIf"],[1,"flex","gap-2","flex-column"],[1,"flex","flex-column","gap-2"],["icon","pi pi-check","iconPos","right","class","flex-1",3,"label","rounded",4,"ngFor","ngForOf"],["icon","pi pi-check","iconPos","right",1,"flex-1",3,"label","rounded"]],template:function(e,o){e&1&&(r(0,"div",0)(1,"div",1),v(2,"calories-progress-bar",2),a(),r(3,"div",3),g(4,Nt,3,4,"p-card",4),a(),r(5,"search-food",5),f("visibleChange",function(s){return o.displayModal=s}),a()()),e&2&&(l(4),d("ngForOf",o.meals),l(),d("visible",o.displayModal)("selectedMeal",o.selectedMeal)("history",o.history)("selectedDate",o.selectedDate))},dependencies:[Z,H,B,ne,pe,ue],encapsulation:2})}};var Bt=["chart"],he=class i{constructor(t,e,o,n){this.platformId=t;this.cd=e;this.foodHistoryService=o;this.localStorageService=n;this.days=[];this.calories=[];M(()=>{let s=this.foodHistoryService.caloriesGraphicWeek();this.days=s.map(h=>h.date),this.calories=s.map(h=>h.calories),this.updateChartData(this.calories,this.days)})}ngOnInit(){this.initChart()}initChart(){let t=getComputedStyle(document.documentElement),e=t.getPropertyValue("--text-color"),o=t.getPropertyValue("--text-color-secondary"),n=t.getPropertyValue("--surface-border");this.data={labels:this.foodHistoryService.caloriesGraphicWeek().map(s=>s.date),datasets:[{label:"Calor\xEDas consumidas en una semana",data:this.foodHistoryService.caloriesGraphicWeek().map(s=>s.calories),fill:!0,tension:.4}]},this.options={maintainAspectRatio:!1,aspectRatio:.6,plugins:{legend:{}},scales:{x:{ticks:{color:o},grid:{color:n,drawBorder:!1}},y:{ticks:{color:o},grid:{color:n,drawBorder:!1}}}}}updateChartData(t,e){this.data.datasets[0].data=t,this.data.labels=e,this.chart&&this.chart.chart&&this.chart.chart.update(),this.cd.detectChanges()}static{this.\u0275fac=function(e){return new(e||i)(m(Ae),m(ke),m(_),m(ce))}}static{this.\u0275cmp=S({type:i,selectors:[["calories-graphic"]],viewQuery:function(e,o){if(e&1&&Ne(Bt,5),e&2){let n;He(n=Re())&&(o.chart=n.first)}},decls:3,vars:2,consts:[["chart",""],["type","line",1,"w-2","h-2rem",3,"data","options"]],template:function(e,o){e&1&&(r(0,"p-card"),v(1,"p-chart",1,0),a()),e&2&&(l(),d("data",o.data)("options",o.options))},dependencies:[ne,se]})}};function Ut(i,t){if(i&1){let e=E();r(0,"form",13),f("submit",function(){C(e);let n=p();return x(n.saveUserObjective())}),v(1,"p-dropdown",14),r(2,"p-button",15),c(3,"Guardar preferencias"),a()()}if(i&2){let e=p();d("formGroup",e.userObjectiveForm),l(),d("options",e.userObjectiveOptions)}}function kt(i,t){if(i&1){let e=E();r(0,"p-button",16),f("click",function(){C(e);let n=p();return x(n.modifyObjective())}),c(1,"Modificar preferencias"),a()}}var ve=class i{constructor(t,e,o,n,s){this.foodHistoryService=t;this.userService=e;this.formBuilder=o;this.messageService=n;this.localStorageService=s;this.date="";this.userTmb=0;this.userWantsModifyObjective=!1;this.userObjectiveName="";this.userObjectiveOptions=[{name:"Bajar de peso ligeramente",code:"1",value:"BAJAR_LIGERO"},{name:"Bajar de peso moderadamente",code:"2",value:"BAJAR_MODERADO"},{name:"Mantenimiento",code:"3",value:"MANTENIMIENTO"},{name:"Subir de peso ligeramente",code:"4",value:"SUBIR_LIGERO"},{name:"Subir de peso moderadamente",code:"5",value:"SUBIR_MODERADO"}];this.userObjectiveForm=this.formBuilder.group({objective:[null,[L.required]]});this.localStorage=localStorage}onDateChange(t){this.date=t,this.foodHistoryService.getHistoryByDate(this.date),this.foodHistoryService.getTotalCaloriesWeek(this.date)}ngOnInit(){this.date=new Date().toLocaleDateString(),this.foodHistoryService.getHistoryByDate(this.date),this.userService.getUserObjective().subscribe({next:t=>{this.userService.userObjective.set(t),this.getUserData(),this.userObjectiveName=this.userObjectiveOptions.find(e=>e.value===this.userService.userObjective()).name},error:t=>{console.error("Error fetching user objective:",t)}})}getUserData(){this.userService.tmb.subscribe({next:t=>{this.userTmb=Math.round(t),this.userService.tmbObjective.set(Math.round(t)),this.getObjectivesInBaseOfTmb()}})}get history(){return this.foodHistoryService.history}saveUserObjective(){let t=this.userObjectiveForm.controls.objective.value.value;this.userService.saveUserObjective(t).subscribe({next:()=>{this.messageService.add({severity:"success",summary:"Busqueda exitosa",detail:"\xA1Preferencias guardadas!"}),this.localStorageService.saveUserObjective(t),this.userService.userObjective.set(t),this.getUserData()},error:()=>{this.messageService.add({severity:"error",summary:"Error",detail:"Error al guardar las preferencias"})}}),this.userWantsModifyObjective=!1}get userObjective(){return this.userService.userObjective()}modifyObjective(){this.userWantsModifyObjective=!this.userWantsModifyObjective}getObjectivesInBaseOfTmb(){let t=this.userService.tmbObjective();switch(this.userService.userObjective()){case"BAJAR_LIGERO":this.userService.tmbAdjusted.set(t*.9);break;case"BAJAR_MODERADO":this.userService.tmbAdjusted.set(t*.8);break;case"MANTENIMIENTO":this.userService.tmbAdjusted.set(t);break;case"SUBIR_LIGERO":this.userService.tmbAdjusted.set(t*1.1);break;case"SUBIR_MODERADO":this.userService.tmbAdjusted.set(t*1.2);break;default:throw new Error("Objetivo no definido")}let e=.3,o=.25,n=.45;this.userService.proteinesObjective.set(this.userService.tmbAdjusted()*e/4),this.userService.fatsObjective.set(this.userService.tmbAdjusted()*o/9),this.userService.carbohydratesObjective.set(this.userService.tmbAdjusted()*n/4)}static{this.\u0275fac=function(e){return new(e||i)(m(_),m(U),m(ae),m(R),m(ce))}}static{this.\u0275cmp=S({type:i,selectors:[["app-calories-page"]],decls:21,vars:7,consts:[[1,"px-4","md:mx-8"],[1,"flex","flex-column","gap-4","mb-4","md:flex-row"],["class","flex gap-4",3,"formGroup","submit",4,"ngIf"],[3,"click",4,"ngIf"],[1,"flex","flex-wrap","mb-5","md:flex-nowrap"],[1,"m-auto"],[3,"selectedDateChange"],[1,"w-full","flex-none","md:flex-1","md:w-auto"],[1,"flex","md:flex-wrap","md:justify-content-around"],[1,"flex","align-items-center","justify-content-center","gap-8","mb-5"],[1,"flex-1","flex","flex-wrap"],[3,"history","selectedDate"],[1,"flex-1"],[1,"flex","gap-4",3,"submit","formGroup"],["formControlName","objective","id","userObjective","optionLabel","name","placeholder","Elige tu objetivo",3,"options"],["type","submit"],[3,"click"]],template:function(e,o){e&1&&(r(0,"main",0)(1,"div",1)(2,"p"),c(3),r(4,"b"),c(5),a(),c(6,". Actualmente tu objetivo es: "),r(7,"b"),c(8),a()(),g(9,Ut,4,2,"form",2)(10,kt,2,0,"p-button",3),a(),r(11,"div",4)(12,"div",5)(13,"calories-calendar",6),f("selectedDateChange",function(s){return o.onDateChange(s)}),a()(),r(14,"div",7),v(15,"calories-dought",8),a()(),r(16,"div",9)(17,"div",10),v(18,"calories-food-info",11),a(),r(19,"div",12),v(20,"calories-graphic"),a()()()),e&2&&(l(3),G("\xA1Hola, ",o.localStorage.getItem("userLogged"),"! segun los datos de tu perfil, tus calor\xEDas de mantenimiento son de : "),l(2),G("",o.userTmb," kcal"),l(3),b(o.userObjectiveName),l(),d("ngIf",o.userWantsModifyObjective),l(),d("ngIf",!o.userWantsModifyObjective),l(8),d("history",o.history)("selectedDate",o.date))},dependencies:[H,B,Ye,ie,P,te,oe,re,de,me,ge,he],styles:["main[_ngcontent-%COMP%]{margin-top:140px}"]})}};var Vt=[{path:"",component:ve}],ye=class i{static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275mod=J({type:i})}static{this.\u0275inj=$({imports:[_e.forChild(Vt),_e]})}};var nt=class i{static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275mod=J({type:i})}static{this.\u0275inj=$({imports:[Le,ye,tt,Je,ze]})}};export{de as a,Fe as b,fe as c,nt as d};
