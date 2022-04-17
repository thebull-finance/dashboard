"use strict";(self.webpackChunkzignaly_webapp=self.webpackChunkzignaly_webapp||[]).push([[1570],{81282:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(67294),a=n(82245),s=n(60454),o=n(93178),l=n(80951),c=n(8987),i=function(e){var t=e.code,n=e.form,i=(0,r.useState)(!1),u=i[0],m=i[1];return r.createElement(a.Z,{alignItems:"center",className:"resetForm",display:"flex",flexDirection:"column",justifyContent:"center"},u?r.createElement(a.Z,{alignItems:"center",className:"errorBox",display:"flex",flexDirection:"column"},r.createElement(s.Z,{variant:"h3"},r.createElement(l.Z,{id:"recover.error"})),r.createElement(c.Z,{className:"loginLink",to:"/login"},r.createElement(l.Z,{id:"backtologin.text"}))):r.createElement(r.Fragment,null,r.createElement("img",{alt:"TheBull",className:"logo",src:o.Z}),r.createElement(n,{code:t,setExpired:m})))}},37404:function(e,t,n){n.r(t),n.d(t,{default:function(){return R}});var r=n(67294),a=n(48634),s=n(42656),o=n.n(s),l=(n(17727),n(82245)),c=n(35785),i=n(57229),u=n(85935),m=n(74018),p=n(49610),d=n(60454),f=n(8474),E=n(34141),g=n(54537),w=n(35065),Z=n(33274),x=n(82825),h=n(45850),v=n(19199),y=n(66718),b=n(25444),k=n(80951),N=n(46706),S=function(e){var t=e.code,n=e.setExpired,s=(0,r.useState)(void 0),S=s[0],C=s[1],P=(0,r.useState)(!1),I=P[0],R=P[1],B=(0,r.useState)(!1),j=B[0],D=B[1],F=(0,r.useState)(!1),T=F[0],q=F[1],L=(0,r.useState)(!1),z=L[0],A=L[1],M=(0,r.useState)(0),_=M[0],O=M[1],X=(0,N.xX)().executeRecaptcha,G=(0,x.cI)(),H=G.errors,J=G.handleSubmit,K=G.register,Q=G.clearErrors,U=G.setError,V=(0,v.I0)(),W=function(){var e=(0,a.Z)(o().mark((function e(r){var a,s,l;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.password!==r.repeatPassword){e.next=14;break}if(D(!1),R(!0),a=r.gRecaptchaResponse||"",s=2,a){e.next=10;break}return e.next=8,X("resetPassword");case 8:a=e.sent,s=3;case 10:l={token:t,password:r.password,gRecaptchaResponse:a,c:s},h.Z.forgotPasswordStep3(l).then((function(){V((0,y.O7)("alert.forgotpassword.step1.title","alert.forgotpassword.step3.body")),(0,b.navigate)("/login")})).catch((function(e){48===e.code?n(!1):V((0,y.jx)(e))})).finally((function(){R(!1)})),e.next=15;break;case 14:D(!0);case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.createElement("form",{method:"post",onSubmit:J(W)},r.createElement(l.Z,{alignItems:"center",className:"resetPasswordForm",display:"flex",flexDirection:"column",justifyContent:"center"},r.createElement(d.Z,{variant:"h3"},"Reset Password"),r.createElement(p.Z,{anchorEl:S,className:"passwordStrengthBox",open:!!S,placement:"left",transition:!0},r.createElement(Z.Z,{onClose:function(){return C(void 0)},strength:_})),r.createElement(l.Z,{alignItems:"start",className:"inputBox",display:"flex",flexDirection:"column",justifyContent:"start"},r.createElement("label",{className:"customLabel"},"New Password"),r.createElement(u.Z,{className:"customInput",variant:"outlined"},r.createElement(m.Z,{endAdornment:r.createElement(c.Z,{position:"end"},r.createElement(i.Z,{onClick:function(){return q(!T)}},T?r.createElement(g.Z,null):r.createElement(w.Z,null))),error:!!H.password,inputRef:K({required:!0}),name:"password",onBlur:function(){return C(void 0)},onChange:function(e){D(!1);var t=e.target,n=(0,E.uo)(t.value);O(n),n>=4?Q("password"):U("password",{type:"notStrong",message:"The password is weak."})},onFocus:function(e){return C(e.currentTarget)},type:T?"text":"password"}))),r.createElement(l.Z,{alignItems:"start",className:"inputBox",display:"flex",flexDirection:"column",justifyContent:"start"},r.createElement("label",{className:"customLabel"},"Repeat Password"),r.createElement(u.Z,{className:"customInput",variant:"outlined"},r.createElement(m.Z,{endAdornment:r.createElement(c.Z,{position:"end"},r.createElement(i.Z,{onClick:function(){return A(!z)}},z?r.createElement(g.Z,null):r.createElement(w.Z,null))),error:!!H.repeatPassword,inputRef:K({required:!0}),name:"repeatPassword",onChange:function(e){D(!1);var t=e.target,n=(0,E.uo)(t.value);O(n),n>=4?Q("repeatPassword"):U("repeatPassword",{type:"notStrong",message:"The repeat password is very weak."})},type:z?"text":"password"})),j&&r.createElement("span",{className:"errorText"},"Passwords do not match")),r.createElement(l.Z,{className:"inputBox"},r.createElement(f.Z,{className:"full submitButton",loading:I,onClick:function(){J(W)},type:"submit"},r.createElement(k.Z,{id:"action.reset"})))))},C=n(65186),P=n(66735),I=n(81282),R=function(e){var t=e.token,n=(0,P.Z)();return r.createElement(r.Fragment,null,r.createElement(C.q,null,r.createElement("title",null,n.formatMessage({id:"recover.title"})+" | "+n.formatMessage({id:"product"}))),r.createElement(I.Z,{code:t,form:S}))}}}]);
//# sourceMappingURL=component---src-pages-recover-index-js-04b311f9c34fa949c028.js.map