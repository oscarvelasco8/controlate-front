import{e as ae,h as ne,j as se,v as le}from "./chunk-2RZNTMAK.js";import{a as de}from "./chunk-U4IYFD4R.js";import{$ as x,$b as N,G as a,H as l,Ma as b,N as f,P as s,Pa as ee,Qb as V,Tb as O,U as o,Ub as c,V as r,W as d,Wb as E,Xb as _,Ya as te,Yb as ie,Za as C,Zb as w,_a as A,aa as p,ab as W,ac as M,bc as D,cc as re,dc as oe,ec as P,ka as m,m as R,ma as u,n as j,nc as G,pa as J,pc as me,q as g,qa as Q,r as T,ra as X,ua as $,wb as h}from "./chunk-PP6H3DI6.js";var B=class t{constructor(e){this.messageService=e;this.items=[];this.activeIndex=0}ngOnInit(){this.items=[{label:"Datos personales",routerLink:"personal"},{label:"Datos de actividad",routerLink:"activity"},{label:"Creaci\xF3n del usuario",routerLink:"user"}]}static{this.\u0275fac=function(i){return new(i||t)(l(h))}}static{this.\u0275cmp=g({type:t,selectors:[["app-register-page"]],decls:8,vars:2,consts:[[1,"flex","max-h-screen"],[1,"hidden","md:flex","flex-1","justify-content-center","align-items-center","p-7","max-h-full","w-6"],[1,"w-6","h-full"],["src","login/login-image.jpg","alt","",1,"decorator-img","w-full","h-full","border-round-2xl"],[1,"flex","flex-column","flex-1","justify-content-center"],[1,"card"],[3,"model","readonly"]],template:function(i, n){i&1&&(o(0,"main",0)(1,"div",1)(2,"div",2),d(3,"img",3),r()(),o(4,"div",4)(5,"div",5),d(6,"p-steps",6)(7,"router-outlet"),r()()()),i&2&&(a(6),s("model",n.items)("readonly",!0))},dependencies:[te,ae],styles:[`main{margin-top:180px}.p-steps-title{padding:0 10px}.decorator-img{object-fit:cover}.p-error{color:red}@media screen and (max-width: 500px){.card .p-steps-title{white-space:wrap;text-align:center}}
`],encapsulation:2})}};var F=class t{constructor(){}isValidField(e,i){return e.controls[i].errors&&e.controls[i].touched}getFieldError(e,i){if(!e.controls[i])return null;let n=e.controls[i].errors||{};for(let v of Object.keys(n))switch(v){case"required":return"Este campo es requerido.";case"min":return"Utiliza un valor diferente a 0.";case"minlength":return`El campo debe tener al menos ${n.minlength.requiredLength} caracteres.`;case"password":return"La contrase\xF1a debe tener al menos 8 caracteres, una letra may\xFAscula y un n\xFAmero.";case"email":return"El correo no es valido.";case"maxLength":return`El campo debe tener como maximo ${n.maxlength.requiredLength} caracteres.`}return null}passwordValidator(e){let i=e.value;return i.length<8||!/[A-Z]/.test(i)||!/[0-9]/.test(i)?{password:!0}:null}static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275prov=R({token:t,factory:t.\u0275fac,providedIn:"root"})}};var S=class t{constructor(){this._userInfo={name:"",lastname:"",email:"",age:0,weight:0,height:0,activityFactor:"",insulinaFactor:0,username:"",password:"",gender:"",icr:0}}get userInfo(){return this._userInfo}set name(e){this._userInfo.name=e}set lastName(e){this._userInfo.lastname=e}set email(e){this._userInfo.email=e}set age(e){this._userInfo.age=e}set weight(e){this._userInfo.weight=e}set height(e){this._userInfo.height=e}set activityFactor(e){this._userInfo.activityFactor=e}set insulinaFactor(e){this._userInfo.insulinaFactor=e}set userName(e){this._userInfo.username=e}set password(e){this._userInfo.password=e}set gender(e){this._userInfo.gender=e}get gender(){return this._userInfo.gender}set icr(e){this._userInfo.icr=e}isValidForm(){return this._userInfo.name.length>0&&this._userInfo.lastname.length>0&&this._userInfo.email.length>0&&this._userInfo.age>0&&this._userInfo.weight>0&&this._userInfo.height>0&&this._userInfo.activityFactor.length>0&&this._userInfo.username.length>0&&this._userInfo.password.length>0}resetForm(){this._userInfo={name:"",lastname:"",email:"",age:0,weight:0,height:0,activityFactor:"",insulinaFactor:0,username:"",password:"",gender:"",icr:0}}static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275prov=R({token:t,factory:t.\u0275fac,providedIn:"root"})}};function he(t,e){if(t&1&&(o(0,"span",17),m(1),r()),t&2){let i=p();a(),u(" ",i.getFieldError("name")," ")}}function Fe(t,e){if(t&1&&(o(0,"span",17),m(1),r()),t&2){let i=p();a(),u(" ",i.getFieldError("lastname")," ")}}function Se(t,e){if(t&1&&(o(0,"span",17),m(1),r()),t&2){let i=p();a(),u(" ",i.getFieldError("email")," ")}}var U=class t{constructor(e,i,n,v,y){this.router=e;this.messageService=i;this.formBuilder=n;this.registerValidatorService=v;this.formValidatorService=y;this.personalForm=this.formBuilder.group({name:["",[c.required]],lastname:["",[c.required]],email:["",[c.required,c.email]],gender:["",[c.required]]});this.genderOptions=[{name:"Hombre",code:"1",value:"male"},{name:"Mujer",code:"2",value:"female"}]}onSubmit(){if(this.personalForm.invalid){this.messageService.add({severity:"error",summary:"Error",detail:"Por favor, complete todos los campos."});return}this.messageService.add({severity:"success",summary:"Datos guardados",detail:"Datos personales guardados con \xE9xito"}),this.formValidatorService.name=this.personalForm.get("name")?.value,this.formValidatorService.lastName=this.personalForm.get("lastname")?.value,this.formValidatorService.email=this.personalForm.get("email")?.value,this.formValidatorService.gender=this.personalForm.get("gender")?.value.value.toUpperCase(),console.log(this.formValidatorService.userInfo),this.router.navigate(["/register/activity"])}isValidField(e){return this.registerValidatorService.isValidField(this.personalForm,e)}getFieldError(e){return this.registerValidatorService.getFieldError(this.personalForm,e)}ngOnInit(){this.personalForm.setValue({name:this.formValidatorService.userInfo.name,lastname:this.formValidatorService.userInfo.lastname,email:this.formValidatorService.userInfo.email,gender:this.genderOptions.find(e=>e.value===this.formValidatorService.userInfo.gender)})}static{this.\u0275fac=function(i){return new(i||t)(l(C),l(h),l(D),l(F),l(S))}}static{this.\u0275cmp=g({type:t,selectors:[["app-personal-form"]],decls:29,vars:6,consts:[[1,"flex","flex-column","p-6"],[1,"flex","flex-column","gap-4",3,"submit","formGroup"],[1,"flex","flex-column","gap-2"],["for","name"],["formControlName","name","pInputText","","id","name","aria-describedby","name-help"],["id","username-help"],["class","p-error",4,"ngIf"],["for","lastname"],["formControlName","lastname","pInputText","","id","lastname","aria-describedby","lastname-help"],["id","lastname-help"],["for","gender"],[1,"card","flex","justify-content-center"],["formControlName","gender","id","gender","optionLabel","name","placeholder","Introduce tu ge\u0301nero",3,"options"],["for","email"],["formControlName","email","pInputText","","id","email","aria-describedby","email-help"],["id","email-help"],["type","submit","label","Siguiente",1,"align-self-end",3,"rounded"],[1,"p-error"]],template:function(i,n){i&1&&(o(0,"div",0)(1,"form",1),x("submit",function(){return n.onSubmit()}),o(2,"div",2)(3,"label",3),m(4,"Nombre"),r(),d(5,"input",4),o(6,"small",5),m(7," Introduce tu nombre personal. "),r(),f(8,he,2,1,"span",6),r(),o(9,"div",2)(10,"label",7),m(11,"Apellidos"),r(),d(12,"input",8),o(13,"small",9),m(14," Introduce tus apellidos. "),r(),f(15,Fe,2,1,"span",6),r(),o(16,"div",2)(17,"label",10),m(18,"G\xE9nero"),r(),o(19,"div",11),d(20,"p-dropdown",12),r()(),o(21,"div",2)(22,"label",13),m(23,"Email"),r(),d(24,"input",14),o(25,"small",15),m(26," Introduce tu email personal. "),r(),f(27,Se,2,1,"span",6),r(),d(28,"p-button",16),r()()),i&2&&(a(),s("formGroup",n.personalForm),a(7),s("ngIf",n.isValidField("name")),a(7),s("ngIf",n.isValidField("lastname")),a(5),s("options",n.genderOptions),a(7),s("ngIf",n.isValidField("email")),a(),s("rounded",!0))},dependencies:[b,V,P,G,w,O,E,_,N,M],styles:[`p-dropdown,.p-dropdown{width:100%}
`],encapsulation:2})}};var Ie=()=>({standalone:!0});function ye(t,e){if(t&1&&(o(0,"span",23),m(1),r()),t&2){let i=p();a(),u(" ",i.getFieldError("age")," ")}}function xe(t,e){if(t&1&&(o(0,"span",23),m(1),r()),t&2){let i=p();a(),u(" ",i.getFieldError("weight")," ")}}function be(t,e){if(t&1&&(o(0,"span",23),m(1),r()),t&2){let i=p();a(),u(" ",i.getFieldError("height")," ")}}function Ce(t,e){t&1&&(o(0,"div",2)(1,"label",24),m(2,"Introduce tu factor de resistencia a la insulina"),r(),d(3,"p-inputNumber",25),r()),t&2&&(a(3),s("maxFractionDigits",2))}function Ve(t,e){if(t&1&&(o(0,"span",23),m(1),r()),t&2){let i=p();a(),u(" ",i.getFieldError("diabetesFactor")," ")}}function Ee(t,e){t&1&&(o(0,"div",2)(1,"label",26),m(2,"Introduce tu ICR (Relaci\xF3n Carbohidratos-Insulina)"),r(),d(3,"p-inputNumber",27),r()),t&2&&(a(3),s("maxFractionDigits",2))}function _e(t,e){if(t&1&&(o(0,"span",23),m(1),r()),t&2){let i=p();a(),u(" ",i.getFieldError("icr")," ")}}var q=class t{constructor(e,i,n,v,y){this.router=e;this.messageService=i;this.formBuilder=n;this.registerValidatorService=v;this.formValidatorService=y;this.isDiabetic=!1;this.activityOptions=[{name:"Poco Sedentario",code:"1",value:"POCO_SEDENTARIO"},{name:"Sedentario",code:"2",value:"SEDENTARIO"},{name:"Moderadamente Sedentario",code:"3",value:"MODERADAMENTE_SEDENTARIO"},{name:"Activo",code:"4",value:"ACTIVO"},{name:"Muy Activo",code:"5",value:"MUY_ACTIVO"}];this.activityForm=this.formBuilder.group({age:[null,[c.required,c.min(1)]],weight:[null,[c.required,c.min(1)]],height:[null,[c.required,c.min(1)]],activity:[null,[c.required]],diabetesFactor:[null],icr:[null]})}onSubmit(){if(this.activityForm.invalid){this.messageService.add({severity:"error",summary:"Error",detail:"Por favor, complete todos los campos."});return}this.messageService.add({severity:"success",summary:"Datos guardados",detail:"Datos de actividad guardados con \xE9xito"}),this.formValidatorService.age=this.activityForm.get("age")?.value,this.formValidatorService.weight=this.activityForm.get("weight")?.value,this.formValidatorService.height=this.activityForm.get("height")?.value,this.formValidatorService.activityFactor=this.activityForm.get("activity")?.value.value,this.formValidatorService.insulinaFactor=this.activityForm.get("diabetesFactor")?.value,this.formValidatorService.icr=this.activityForm.get("icr")?.value,console.log(this.formValidatorService.userInfo),this.router.navigate(["/register/user"])}isValidField(e){return this.registerValidatorService.isValidField(this.activityForm,e)}getFieldError(e){return this.registerValidatorService.getFieldError(this.activityForm,e)}ngOnInit(){this.activityForm.patchValue({age:this.formValidatorService.userInfo.age,weight:this.formValidatorService.userInfo.weight,height:this.formValidatorService.userInfo.height,activity:this.activityOptions.find(e=>e.value===this.formValidatorService.userInfo.activityFactor)||this.formValidatorService.userInfo.activityFactor,diabetesFactor:this.formValidatorService.userInfo.insulinaFactor,icr:this.formValidatorService.userInfo.icr})}static{this.\u0275fac=function(i){return new(i||t)(l(C),l(h),l(D),l(F),l(S))}}static{this.\u0275cmp=g({type:t,selectors:[["app-actividad-form"]],decls:39,vars:18,consts:[[1,"flex","flex-column","p-6"],[1,"flex","flex-column","gap-4",3,"submit","formGroup"],[1,"flex","flex-column","gap-2"],["for","age"],["formControlName","age","styleClass","w-full","id","age","aria-describedby","name-help",3,"max"],["id","age-help"],["class","p-error",4,"ngIf"],["for","weight"],["formControlName","weight","styleClass","w-full","id","weight","aria-describedby","weight-help","mode","decimal",3,"maxFractionDigits","max"],["id","weight-help"],["for","height"],["formControlName","height","styleClass","w-full","id","height","aria-describedby","height-help",3,"max"],["id","email-help"],["for","activity"],[1,"card","flex","justify-content-center"],["formControlName","activity","id","activity","optionLabel","name","placeholder","Selecciona un factor de actividad",3,"options"],[1,"card","flex"],["for","diabetes",1,"mr-4"],["name","isDiabetic","id","diabetes",3,"ngModelChange","ngModel","ngModelOptions"],["class","flex flex-column gap-2",4,"ngIf"],[1,"flex","justify-content-between"],["routerLink","/register/personal","label","Anterior",3,"rounded"],["type","submit","label","Siguiente",3,"rounded"],[1,"p-error"],["for","factor-diabetes"],["formControlName","diabetesFactor","styleClass","w-full","id","factor-diabetes","name","factorDiabetes","mode","decimal",3,"maxFractionDigits"],["for","icr"],["formControlName","icr","styleClass","w-full","id","icr","name","icr","mode","decimal",3,"maxFractionDigits"]],template:function(i,n){i&1&&(o(0,"div",0)(1,"form",1),x("submit",function(){return n.onSubmit()}),o(2,"div",2)(3,"label",3),m(4,"Edad"),r(),d(5,"p-inputNumber",4),o(6,"small",5),m(7," Introduce tu edad. "),r(),f(8,ye,2,1,"span",6),r(),o(9,"div",2)(10,"label",7),m(11,"Peso"),r(),d(12,"p-inputNumber",8),o(13,"small",9),m(14," Introduce tu peso en Kg. "),r(),f(15,xe,2,1,"span",6),r(),o(16,"div",2)(17,"label",10),m(18,"Altura"),r(),d(19,"p-inputNumber",11),o(20,"small",12),m(21," Introduce tu altura en centimetros. "),r(),f(22,be,2,1,"span",6),r(),o(23,"div",2)(24,"label",13),m(25,"Factor de actividad"),r(),o(26,"div",14),d(27,"p-dropdown",15),r()(),o(28,"div",16)(29,"label",17),m(30,"\xBFEres diabetico?"),r(),o(31,"p-inputSwitch",18),X("ngModelChange",function(y){return Q(n.isDiabetic,y)||(n.isDiabetic=y),y}),r()(),f(32,Ce,4,1,"div",19)(33,Ve,2,1,"span",6)(34,Ee,4,1,"div",19)(35,_e,2,1,"span",6),o(36,"div",20),d(37,"p-button",21)(38,"p-button",22),r()()()),i&2&&(a(),s("formGroup",n.activityForm),a(4),s("max",100),a(3),s("ngIf",n.isValidField("age")),a(4),s("maxFractionDigits",1)("max",500),a(3),s("ngIf",n.isValidField("weight")),a(4),s("max",250),a(3),s("ngIf",n.isValidField("height")),a(5),s("options",n.activityOptions),a(4),J("ngModel",n.isDiabetic),s("ngModelOptions",$(17,Ie)),a(),s("ngIf",n.isDiabetic),a(),s("ngIf",n.isValidField("diabetesFactor")),a(),s("ngIf",n.isDiabetic),a(),s("ngIf",n.isValidField("icr")),a(2),s("rounded",!0),a(),s("rounded",!0))},dependencies:[b,A,V,ne,G,se,w,E,_,ie,N,M],styles:[`p-dropdown,.p-dropdown{width:100%}
`],encapsulation:2})}};function we(t,e){if(t&1&&(o(0,"span",15),m(1),r()),t&2){let i=p();a(),u(" ",i.getFieldError("username")," ")}}function Ne(t,e){if(t&1&&(o(0,"span",15),m(1),r()),t&2){let i=p();a(),u(" ",i.getFieldError("password")," ")}}var L=class t{constructor(e,i,n,v,y,De){this.router=e;this.messageService=i;this.formBuilder=n;this.registerValidatorService=v;this.formValidatorService=y;this.userService=De;this.userForm=this.formBuilder.group({username:["",[c.required,c.minLength(3)]],password:["",[c.required,this.registerValidatorService.passwordValidator]]})}onSubmit(){if(this.userForm.invalid){this.messageService.add({severity:"error",summary:"Error",detail:"Por favor, complete todos los campos."});return}if(this.formValidatorService.userName=this.userForm.get("username")?.value,this.formValidatorService.password=this.userForm.get("password")?.value,!this.formValidatorService.isValidForm()){this.messageService.add({severity:"error",summary:"Error",detail:"Por favor, complete todos los campos."});return}console.log(this.formValidatorService.userInfo),this.userService.registerUser(this.formValidatorService.userInfo).subscribe({next:e=>{this.messageService.add({severity:"success",summary:"Datos guardados",detail:"\xA1Registro completado con \xE9xito!"}),this.formValidatorService.resetForm(),setTimeout(()=>{this.router.navigate(["/home"])},2e3)},error:e=>{console.log(e),this.messageService.add({severity:"error",summary:"Error",detail:e.error})}})}isValidField(e){return this.registerValidatorService.isValidField(this.userForm,e)}getFieldError(e){return this.registerValidatorService.getFieldError(this.userForm,e)}ngOnInit(){this.userForm.setValue({username:this.formValidatorService.userInfo.username,password:this.formValidatorService.userInfo.password})}static{this.\u0275fac=function(i){return new(i||t)(l(C),l(h),l(D),l(F),l(S),l(de))}}static{this.\u0275cmp=g({type:t,selectors:[["app-user-form"]],decls:20,vars:6,consts:[[1,"flex","flex-column","p-6"],[1,"flex","flex-column","gap-4",3,"submit","formGroup"],[1,"flex","flex-column","gap-2"],["for","username"],["pInputText","","formControlName","username","id","username","aria-describedby","name-help"],["id","username-help"],["class","p-error",4,"ngIf"],[1,"field","flex","flex-column"],[1,"mb-3"],["for","password"],["formControlName","password","id","password","aria-describedby","password-help",1,"w-full",3,"toggleMask"],["id","password-help"],[1,"flex","justify-content-between"],["routerLink","/register/activity","label","Anterior",3,"rounded"],["type","submit","label","Finalizar","styleClass","p-button-success",3,"rounded"],[1,"p-error"]],template:function(i,n){i&1&&(o(0,"div",0)(1,"form",1),x("submit",function(){return n.onSubmit()}),o(2,"div",2)(3,"label",3),m(4,"Nombre de usuario"),r(),d(5,"input",4),o(6,"small",5),m(7," Introduce tu nombre de usuario. "),r(),f(8,we,2,1,"span",6),r(),o(9,"div",7)(10,"div",8)(11,"label",9),m(12,"Contrase\xF1a"),r()(),d(13,"p-password",10),o(14,"small",11),m(15," Introduce tu contrase\xF1a. Tiene que tener al menos 8 caracteres, una letra may\xFAscula y un n\xFAmero. "),r(),f(16,Ne,2,1,"span",6),r(),o(17,"div",12),d(18,"p-button",13)(19,"p-button",14),r()()()),i&2&&(a(),s("formGroup",n.userForm),a(7),s("ngIf",n.isValidField("username")),a(5),s("toggleMask",!0),a(3),s("ngIf",n.isValidField("password")),a(2),s("rounded",!0),a(),s("rounded",!0))},dependencies:[b,A,V,P,me,w,O,E,_,N,M]})}};var Me=[{path:"",component:B,children:[{path:"",redirectTo:"personal",pathMatch:"full"},{path:"personal",component:U},{path:"activity",component:q},{path:"user",component:L}]}],k=class t{static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275mod=T({type:t})}static{this.\u0275inj=j({imports:[W.forChild(Me),W]})}};var fe=class t{static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275mod=T({type:t})}static{this.\u0275inj=j({imports:[ee,k,le,re,oe]})}};export{fe as RegisterModule};
