"use strict";(self.webpackChunkzignaly_webapp=self.webpackChunkzignaly_webapp||[]).push([[7645],{81282:function(e,t,a){a.d(t,{Z:function(){return o}});var r=a(67294),n=a(82245),l=a(60454),i=a(93178),c=a(80951),s=a(8987),o=function(e){var t=e.code,a=e.form,o=(0,r.useState)(!1),m=o[0],u=o[1];return r.createElement(n.Z,{alignItems:"center",className:"resetForm",display:"flex",flexDirection:"column",justifyContent:"center"},m?r.createElement(n.Z,{alignItems:"center",className:"errorBox",display:"flex",flexDirection:"column"},r.createElement(l.Z,{variant:"h3"},r.createElement(c.Z,{id:"recover.error"})),r.createElement(s.Z,{className:"loginLink",to:"/login"},r.createElement(c.Z,{id:"backtologin.text"}))):r.createElement(r.Fragment,null,r.createElement("img",{alt:"TheBull",className:"logo",src:i.Z}),r.createElement(a,{code:t,setExpired:u})))}},78857:function(e,t,a){a.r(t),a.d(t,{default:function(){return Z}});var r=a(67294),n=(a(17727),a(82245)),l=a(74018),i=a(60454),c=a(8474),s=a(82825),o=a(45850),m=a(19199),u=a(66718),f=a(25444),d=a(66735),p=a(80951),E=function(e){var t=e.code,a=e.setExpired,E=(0,r.useState)(!1),g=E[0],y=E[1],Z=(0,s.cI)(),b=Z.errors,h=Z.handleSubmit,x=Z.register,k=Z.setError,v=(0,m.I0)(),N=(0,d.Z)();return r.createElement("form",{method:"post",onSubmit:h((function(e){var r=e.apiKey;y(!0);var n={token:t,apiKey:r};o.Z.disable2FAConfirm(n).then((function(){v((0,u.O7)("","security.2fa.disable.success")),(0,f.navigate)("/login")})).catch((function(e){91===e.code?k("apiKey",{type:"manual",message:N.formatMessage({id:"form.error.apikey.error"})}):48===e.code?a(!1):v((0,u.jx)(e))})).finally((function(){y(!1)}))}))},r.createElement(n.Z,{alignItems:"center",className:"confirmTwoFADisableForm",display:"flex",flexDirection:"column",justifyContent:"center"},r.createElement(i.Z,{variant:"h3"},r.createElement(p.Z,{id:"security.2fa.disable"})),r.createElement("label",{className:"customLabel"},r.createElement(i.Z,null,r.createElement(p.Z,{id:"security.2fa.reset.api"}))),r.createElement(l.Z,{className:"customInput",fullWidth:!0,inputRef:x({required:N.formatMessage({id:"form.error.apikey"})}),name:"apiKey",placeholder:N.formatMessage({id:"signalp.settings.apikey"})}),b.apiKey&&r.createElement("span",{className:"errorText"},b.apiKey.message),r.createElement(c.Z,{className:"submitButton",loading:g,type:"submit"},r.createElement(p.Z,{id:"security.2fa.disable"}))))},g=a(65186),y=a(81282),Z=function(e){var t=e.token,a=(0,d.Z)();return r.createElement(r.Fragment,null,r.createElement(g.q,null,r.createElement("title",null,a.formatMessage({id:"security.2fa.disable"})+" | "+a.formatMessage({id:"product"}))),r.createElement(y.Z,{code:t,form:E}))}}}]);
//# sourceMappingURL=component---src-pages-disable-2-fa-index-js-0bda54a2247d304fce9a.js.map