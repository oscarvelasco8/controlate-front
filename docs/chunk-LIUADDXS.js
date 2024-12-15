import{a as G}from"./chunk-U4IYFD4R.js";import{$ as h,$b as j,G as l,H as s,P as m,Pa as S,Qb as c,Tb as M,U as t,Ub as a,V as e,W as o,Wb as C,Xb as w,Za as I,Zb as N,_b as O,a as v,ab as y,ac as A,b,bc as R,dc as T,ec as D,fc as P,ka as n,n as g,nc as U,oc as q,pc as B,q as x,qc as _,r as E,wb as F}from"./chunk-PP6H3DI6.js";var p=class u{constructor(r,i,d,f){this.router=r;this.messageService=i;this.formBuilder=d;this.userService=f;this.modifyUserForm=this.formBuilder.group({name:["",[a.required]],lastname:["",[a.required]],email:["",[a.required]],gender:["",[a.required]],age:["",[a.required]],height:["",[a.required]],weight:["",[a.required]],activityFactor:["",[a.required]],insulinaFactor:["",[a.required]],username:["",[a.required]],password:["",[a.required]],objective:["",[a.required]],icr:["",[a.required]]});this.userObjectiveOptions=[{name:"Bajar de peso ligeramente",code:"1",value:"BAJAR_LIGERO"},{name:"Bajar de peso moderadamente",code:"2",value:"BAJAR_MODERADO"},{name:"Mantenimiento",code:"3",value:"MANTENIMIENTO"},{name:"Subir de peso ligeramente",code:"4",value:"SUBIR_LIGERO"},{name:"Subir de peso moderadamente",code:"5",value:"SUBIR_MODERADO"}];this.activityOptions=[{name:"Poco Sedentario",code:"1",value:"POCO_SEDENTARIO"},{name:"Sedentario",code:"2",value:"SEDENTARIO"},{name:"Moderadamente Sedentario",code:"3",value:"MODERADAMENTE_SEDENTARIO"},{name:"Activo",code:"4",value:"ACTIVO"},{name:"Muy Activo",code:"5",value:"MUY_ACTIVO"}];this.genderOptions=[{name:"Hombre",code:"1",value:"MALE"},{name:"Mujer",code:"2",value:"FEMALE"}]}modifyProperties(){if(!this.modifyUserForm.dirty){this.messageService.add({severity:"info",summary:"Sin cambios",detail:"No se realizaron cambios en el perfil"}),this.router.navigate(["home"]);return}let{activityFactor:r,gender:i,objective:d}=this.modifyUserForm.value;console.log(b(v({},this.modifyUserForm.value),{activityFactor:r.value,gender:i.value,objective:d.value})),this.userService.modifyUserInfo(b(v({},this.modifyUserForm.value),{activityFactor:r.value,gender:i.value,objective:d.value})).subscribe({next:f=>{this.messageService.add({severity:"success",summary:"Modificado",detail:"Perfil modificado con exito"}),this.router.navigate(["home"])},error:f=>{this.messageService.add({severity:"error",summary:"Error",detail:"Error al modificar el perfil"})}})}ngOnInit(){this.userService.userInfo.subscribe({next:r=>{this.modifyUserForm.setValue({name:r.name,lastname:r.lastname,email:r.email,gender:this.genderOptions.find(i=>i.value===r.gender)||r.gender,age:r.age,height:r.height,weight:r.weight,activityFactor:this.activityOptions.find(i=>i.value===r.activityFactor)||r.activityFactor,insulinaFactor:r.insulinaFactor,username:r.username,password:r.password,objective:this.userObjectiveOptions.find(i=>i.value===r.objective)||r.objective,icr:r.icr})}})}static{this.\u0275fac=function(i){return new(i||u)(s(I),s(F),s(R),s(G))}}static{this.\u0275cmp=x({type:u,selectors:[["app-modify-profile"]],decls:80,vars:7,consts:[[1,"flex-1","mb-4","pl-2","pr-2"],[1,"field-container"],[1,"field","flex","align-items-center","justify-content-center"],[1,"font-light","mr-3"],[1,"pi","pi-user",2,"font-size","1.5rem"],[1,"flex","flex-wrap","gap-4","align-items-center","justify-content-center",3,"submit","formGroup"],[1,"field"],[1,"mb-3"],["for","username"],["formControlName","username","pInputText","","id","username","type","text",1,"text-base","text-color","surface-overlay","p-2","border-1","border-solid","surface-border","border-round","appearance-none","outline-none","focus:border-primary","w-full"],["for","password"],["formControlName","password","id","password",1,"w-full",3,"toggleMask","feedback"],["for","name"],["formControlName","name","pInputText","","id","name","type","text",1,"text-base","text-color","surface-overlay","p-2","border-1","border-solid","surface-border","border-round","appearance-none","outline-none","focus:border-primary","w-full"],["for","lastname"],["formControlName","lastname","pInputText","","id","lastname","type","text",1,"text-base","text-color","surface-overlay","p-2","border-1","border-solid","surface-border","border-round","appearance-none","outline-none","focus:border-primary","w-full"],["for","email"],["formControlName","email","pInputText","","id","email","type","email",1,"text-base","text-color","surface-overlay","p-2","border-1","border-solid","surface-border","border-round","appearance-none","outline-none","focus:border-primary","w-full"],["for","gender"],["formControlName","gender","id","gender","optionLabel","name","placeholder","Introduce tu ge\u0301nero",3,"options"],["for","age"],["formControlName","age","pInputText","","id","age","type","number",1,"text-base","text-color","surface-overlay","p-2","border-1","border-solid","surface-border","border-round","appearance-none","outline-none","focus:border-primary","w-full"],["for","height"],["formControlName","height","pInputText","","id","height","type","number","step","0.01",1,"text-base","text-color","surface-overlay","p-2","border-1","border-solid","surface-border","border-round","appearance-none","outline-none","focus:border-primary","w-full"],["for","weight"],["formControlName","weight","pInputText","","id","weight","type","number","step","0.01",1,"text-base","text-color","surface-overlay","p-2","border-1","border-solid","surface-border","border-round","appearance-none","outline-none","focus:border-primary","w-full"],["for","activityFactor"],["formControlName","activityFactor","id","activityFactor","optionLabel","name","placeholder","Selecciona un factor de actividad",3,"options"],["for","insulinaFactor"],["formControlName","insulinaFactor","pInputText","","id","insulinaFactor","type","number",1,"text-base","text-color","surface-overlay","p-2","border-1","border-solid","surface-border","border-round","appearance-none","outline-none","focus:border-primary","w-full"],["for","ICR"],["formControlName","icr","pInputText","","id","ICR","type","number",1,"text-base","text-color","surface-overlay","p-2","border-1","border-solid","surface-border","border-round","appearance-none","outline-none","focus:border-primary","w-full"],["for","objective"],["formControlName","objective","id","objective","optionLabel","name","placeholder","Elige tu objetivo",3,"options"],[1,"w-full","text-center"],["type","submit","label","Modificar",3,"rounded"]],template:function(i,d){i&1&&(t(0,"main",0)(1,"div",1)(2,"div",2)(3,"h2",3),n(4,"Modifica tus datos"),e(),o(5,"i",4),e(),t(6,"form",5),h("submit",function(){return d.modifyProperties()}),t(7,"div")(8,"div",6)(9,"div",7)(10,"label",8),n(11,"Usuario"),e()(),o(12,"input",9),e(),t(13,"div",6)(14,"div",7)(15,"label",10),n(16,"Contrase\xF1a"),e()(),o(17,"p-password",11),e()(),t(18,"div")(19,"div",6)(20,"div",7)(21,"label",12),n(22,"Nombre"),e()(),o(23,"input",13),e(),t(24,"div",6)(25,"div",7)(26,"label",14),n(27,"Apellido"),e()(),o(28,"input",15),e()(),t(29,"div")(30,"div",6)(31,"div",7)(32,"label",16),n(33,"Correo Electr\xF3nico"),e()(),o(34,"input",17),e(),t(35,"div",6)(36,"div",7)(37,"label",18),n(38,"G\xE9nero"),e()(),o(39,"p-dropdown",19),e()(),t(40,"div")(41,"div",6)(42,"div",7)(43,"label",20),n(44,"Edad"),e()(),o(45,"input",21),e(),t(46,"div",6)(47,"div",7)(48,"label",22),n(49,"Altura"),e()(),o(50,"input",23),e()(),t(51,"div")(52,"div",6)(53,"div",7)(54,"label",24),n(55,"Peso"),e()(),o(56,"input",25),e(),t(57,"div",6)(58,"div",7)(59,"label",26),n(60,"Factor de Actividad"),e()(),o(61,"p-dropdown",27),e()(),t(62,"div")(63,"div",6)(64,"div",7)(65,"label",28),n(66,"Factor de Insulina"),e()(),o(67,"input",29),e(),t(68,"div",6)(69,"div",7)(70,"label",30),n(71,"ICR"),e()(),o(72,"input",31),e(),t(73,"div",6)(74,"div",7)(75,"label",32),n(76,"Objetivo"),e()(),o(77,"p-dropdown",33),e()(),t(78,"div",34),o(79,"p-button",35),e()()()()),i&2&&(l(6),m("formGroup",d.modifyUserForm),l(11),m("toggleMask",!0)("feedback",!1),l(22),m("options",d.genderOptions),l(22),m("options",d.activityOptions),l(16),m("options",d.userObjectiveOptions),l(2),m("rounded",!0))},dependencies:[c,D,B,N,M,O,C,w,j,A,U],styles:["main[_ngcontent-%COMP%]{margin-top:100px;min-height:calc(100vh - 490px)}"]})}};var k=[{path:"",redirectTo:"modify-profile",pathMatch:"full"},{path:"modify-profile",component:p}],L=class u{static{this.\u0275fac=function(i){return new(i||u)}}static{this.\u0275mod=E({type:u})}static{this.\u0275inj=g({imports:[S,y.forChild(k),c,P,_,T,q,y]})}};export{L as ModifyProfileModule};
