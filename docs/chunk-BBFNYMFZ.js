import{m as o}from"./chunk-PP6H3DI6.js";var r=class t{constructor(){}login(e){localStorage.setItem("userLogged",e)}logout(){localStorage.removeItem("userLogged")}getLoginStatus(){return!!localStorage.getItem("userLogged")}isDarkTheme(){localStorage.setItem("isDarkTheme","true")}isLightTheme(){localStorage.setItem("isDarkTheme","false")}get darkTheme(){return localStorage.getItem("isDarkTheme")==="true"}saveUserObjective(e){localStorage.setItem("userObjective",e)}get localStorageUserObjective(){return localStorage.getItem("userObjective")}static{this.\u0275fac=function(a){return new(a||t)}}static{this.\u0275prov=o({token:t,factory:t.\u0275fac,providedIn:"root"})}};export{r as a};
