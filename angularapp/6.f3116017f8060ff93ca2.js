(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"zKj/":function(t,e,o){"use strict";o.r(e),o.d(e,"IngresoModule",function(){return p});var r=o("ofXK"),n=o("tyNb"),i=o("3Pt+"),s=o("PSD3"),a=o.n(s),c=o("fXoL"),b=o("lGQG");let l=(()=>{class t{constructor(t,e){this.auth=t,this.router=e,this.password=new i.c(""),this.email=new i.c("")}ngOnInit(){}ingresar(){this.auth.singIn(this.email.value,this.password.value).then(t=>{console.log(t),a.a.fire({position:"center",icon:"success",title:"Bienvenido a la Sala de juegos",showConfirmButton:!1,timer:1500}),this.router.navigate(["/home"]),localStorage.setItem("usuario",this.email.value)},t=>{console.log(t.message),a.a.fire({icon:"error",title:"Oops...",text:"Email o Contrase\xf1a incorrecta!",footer:"<a></a>"})})}test(){this.email.setValue("test@test.com"),this.password.setValue("123456")}}return t.\u0275fac=function(e){return new(e||t)(c.Ob(b.a),c.Ob(n.a))},t.\u0275cmp=c.Ib({type:t,selectors:[["app-login"]],decls:33,vars:2,consts:[["id","login"],[1,"text-center","text-white","pt-5"],[1,"container"],["id","login-row",1,"row","justify-content-center","align-items-center"],["id","login-column",1,"col-md-4"],["id","login-box",1,"col-md-12"],["id","login-form",1,"form"],[1,"text-center","text-info"],[1,"form-group"],["for","email",1,"text-info"],["type","text","name","email","id","email",1,"form-control",3,"formControl"],["for","password",1,"text-info"],["type","password","name","password","id","password",1,"form-control",3,"formControl"],["for","remember-me",1,"text-info"],["id","remember-me","name","remember-me","type","checkbox"],["type","button","value","Ingresar",1,"btn","btn-info","btn-md","btn-block",3,"click"],["type","button","value","Test",1,"btn","btn-info","btn-md","btn-block",3,"click"],["id","register-link",1,"text-right"],["routerLink","/ingreso/registro",1,"text-info"]],template:function(t,e){1&t&&(c.Tb(0,"div",0),c.Tb(1,"h3",1),c.Bc(2,"Login form"),c.Sb(),c.Tb(3,"div",2),c.Tb(4,"div",3),c.Tb(5,"div",4),c.Tb(6,"div",5),c.Tb(7,"form",6),c.Tb(8,"h3",7),c.Bc(9,"Iniciar sesi\xf3n"),c.Sb(),c.Tb(10,"div",8),c.Tb(11,"label",9),c.Bc(12,"Email:"),c.Sb(),c.Pb(13,"br"),c.Pb(14,"input",10),c.Sb(),c.Tb(15,"div",8),c.Tb(16,"label",11),c.Bc(17,"Password:"),c.Sb(),c.Pb(18,"br"),c.Pb(19,"input",12),c.Sb(),c.Tb(20,"div",8),c.Tb(21,"label",13),c.Tb(22,"span"),c.Bc(23,"Remember me"),c.Sb(),c.Bc(24,"\xa0"),c.Tb(25,"span"),c.Pb(26,"input",14),c.Sb(),c.Sb(),c.Pb(27,"br"),c.Tb(28,"input",15),c.dc("click",function(){return e.ingresar()}),c.Sb(),c.Tb(29,"input",16),c.dc("click",function(){return e.test()}),c.Sb(),c.Sb(),c.Tb(30,"div",17),c.Tb(31,"a",18),c.Bc(32,"Registarse"),c.Sb(),c.Sb(),c.Sb(),c.Sb(),c.Sb(),c.Sb(),c.Sb(),c.Sb()),2&t&&(c.Cb(14),c.kc("formControl",e.email),c.Cb(5),c.kc("formControl",e.password))},directives:[i.u,i.m,i.n,i.b,i.l,i.d,n.c],styles:[""]}),t})();var m=o("I/3d");let u=(()=>{class t{constructor(t){this.db=t,this.dbPath="/usuarios",this.usuariosRef=t.collection(this.dbPath)}getAll(){return this.usuariosRef}create(t){return this.usuariosRef.add(Object.assign({},t))}}return t.\u0275fac=function(e){return new(e||t)(c.ac(m.a))},t.\u0275prov=c.Kb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();const d=[{path:"login",component:l},{path:"registro",component:(()=>{class t{constructor(t,e,o){this.auth=t,this.usuarioService=e,this.router=o,this.password=new i.c(""),this.email=new i.c(""),this.nombre=new i.c(""),this.usuario={email:"",nombre:""}}ngOnInit(){}registrar(){this.usuario.email=this.email.value,this.usuario.nombre=this.nombre.value,this.auth.registrar(this.email.value,this.password.value).then(t=>{console.log(t),this.usuarioService.create(this.usuario),a.a.fire({position:"top-end",icon:"success",title:"Usuario registrado con existo",showConfirmButton:!1,timer:1500}),this.router.navigate(["/ingreso/login"])},t=>{console.log(t.message),a.a.fire({icon:"error",title:"Oops...",text:"Email o Contrase\xf1a incorrecta!",footer:"<a></a>"})})}}return t.\u0275fac=function(e){return new(e||t)(c.Ob(b.a),c.Ob(u),c.Ob(n.a))},t.\u0275cmp=c.Ib({type:t,selectors:[["app-registro"]],decls:25,vars:3,consts:[["id","registro"],[1,"container"],["id","registro-row",1,"row","justify-content-center","align-items-center"],["id","registro-column",1,"col-md-4"],["id","registro-box",1,"col-md-12"],["id","registro-form","action","","method","post",1,"form"],[1,"text-center","text-info"],[1,"form-group"],["for","username",1,"text-info"],["type","text","name","username","id","username",1,"form-control",3,"formControl"],["type","email","name","email","id","email",1,"form-control",3,"formControl"],["for","password",1,"text-info"],["type","password","name","password","id","password",1,"form-control",3,"formControl"],["type","button","name","submit","value","Registarse",1,"btn","btn-info","btn-md","btn-block",3,"click"]],template:function(t,e){1&t&&(c.Tb(0,"div",0),c.Tb(1,"div",1),c.Tb(2,"div",2),c.Tb(3,"div",3),c.Tb(4,"div",4),c.Tb(5,"form",5),c.Tb(6,"h3",6),c.Bc(7,"Registrarse"),c.Sb(),c.Tb(8,"div",7),c.Tb(9,"label",8),c.Bc(10,"Username:"),c.Sb(),c.Pb(11,"br"),c.Pb(12,"input",9),c.Sb(),c.Tb(13,"div",7),c.Tb(14,"label",8),c.Bc(15,"Email:"),c.Sb(),c.Pb(16,"br"),c.Pb(17,"input",10),c.Sb(),c.Tb(18,"div",7),c.Tb(19,"label",11),c.Bc(20,"Password:"),c.Sb(),c.Pb(21,"br"),c.Pb(22,"input",12),c.Sb(),c.Tb(23,"div",7),c.Tb(24,"input",13),c.dc("click",function(){return e.registrar()}),c.Sb(),c.Sb(),c.Sb(),c.Sb(),c.Sb(),c.Sb(),c.Sb(),c.Sb()),2&t&&(c.Cb(12),c.kc("formControl",e.nombre),c.Cb(5),c.kc("formControl",e.email),c.Cb(5),c.kc("formControl",e.password))},directives:[i.u,i.m,i.n,i.b,i.l,i.d],styles:["#registro[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   #registro-row[_ngcontent-%COMP%]   #registro-column[_ngcontent-%COMP%]   #registro-box[_ngcontent-%COMP%]{margin-top:120px;max-width:600px;height:320px}#registro[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   #registro-row[_ngcontent-%COMP%]   #registro-column[_ngcontent-%COMP%]   #registro-box[_ngcontent-%COMP%]   #registro-form[_ngcontent-%COMP%]{padding:20px}#registro[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   #registro-row[_ngcontent-%COMP%]   #registro-column[_ngcontent-%COMP%]   #registro-box[_ngcontent-%COMP%]   #registro-form[_ngcontent-%COMP%]   #register-link[_ngcontent-%COMP%]{margin-top:-85px}"]}),t})()},{path:"",redirectTo:"login",pathMatch:"full"}];let g=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.Mb({type:t}),t.\u0275inj=c.Lb({imports:[[n.d.forChild(d)],n.d]}),t})(),p=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.Mb({type:t}),t.\u0275inj=c.Lb({imports:[[r.c,g]]}),t})()}}]);