(self.webpackChunkzignaly_webapp=self.webpackChunkzignaly_webapp||[]).push([[9417],{16537:function(t,e,n){n(65743),t.exports=function(){"use strict";var t="month",e="quarter";return function(n,a){var r=a.prototype;r.quarter=function(t){return this.$utils().u(t)?Math.ceil((this.month()+1)/3):this.month(this.month()%3+3*(t-1))};var i=r.add;r.add=function(n,a){return n=Number(n),this.$utils().p(a)===e?this.add(3*n,t):i.bind(this)(n,a)};var u=r.startOf;r.startOf=function(n,a){var r=this.$utils(),i=!!r.u(a)||a;if(r.p(n)===e){var s=this.quarter()-1;return i?this.month(3*s).startOf(t).startOf("day"):this.month(3*s+2).endOf(t).endOf("day")}return u.bind(this)(n,a)}}}()},81689:function(t,e,n){"use strict";n(17727);var a=n(67294),r=n(45850),i=n(19199),u=n(66718),s=n(82122);e.Z=function(t,e){void 0===e&&(e=!0);var n=(0,a.useState)({}),c=n[0],o=n[1],f=(0,a.useState)(!1),d=f[0],l=f[1],h=(0,a.useContext)(s.Z),v=h.quotesMap,p=h.setQuotesMapData,g=t.exchangeId+"-"+t.exchangeType,m=(0,i.I0)();return(0,a.useEffect)((function(){if(e&&t.exchangeId&&t.exchangeType){if(v[g])return void o(v[g]);l(!0);var n={exchangeId:t.exchangeId,exchangeType:t.exchangeType};r.Z.quotesAssetsGet(n).then((function(t){o(t);var e=Object.assign({},v);e[g]=t,p(e)})).catch((function(t){m((0,u.jx)(t))})).finally((function(){l(!1)}))}}),[t.exchangeId,t.exchangeType,e]),{quoteAssets:c,quotesLoading:d}}},56614:function(t,e,n){"use strict";var a=n(66735),r=n(796);e.Z=function(t){var e=(0,a.Z)(),n=(0,r.Z)().exchanges,i=t?[{val:"ALL",label:e.formatMessage({id:"fil.allexchanges"})}]:[];return i=i.concat(n&&n.map((function(t){return t.enabled&&{val:t.name.toLowerCase(),label:t.name}})))}},25450:function(t,e,n){"use strict";var a=n(19199);e.Z=function(){return(0,a.v9)((function(t){return t.views}))}},57376:function(t,e,n){"use strict";n.r(e);var a=n(67294),r=n(82245),i=n(66735),u=n(25450),s=n(65186),c=n(10722);e.default=function(){var t=(0,u.Z)(),e=(0,i.Z)();return a.createElement(r.Z,{className:"profileAnalyticsPage"},a.createElement(s.q,null,a.createElement("title",null,t.provider.name+" - "+e.formatMessage({id:"srv.analytics"})+" | "+e.formatMessage({id:"product"}))),a.createElement(c.Z,{provider:t.provider}))}},53951:function(t,e,n){"use strict";n.d(e,{e:function(){return c}});var a=n(2580),r=n.n(a),i=n(16537),u=n.n(i);r().extend(u());var s={unit:"d",startDate:null,endDate:null,dateKey:"date"},c=function(t,e,n){if(t.length){var a=Object.assign({},s,e),i=a.startDate?r()(a.startDate):r()(t[0][a.dateKey]);i=i.startOf("d");for(var u=a.endDate?r()(a.endDate):r()(),c=(u=u.startOf("d")).diff(i,a.unit),o=i,f=0,d=function(){for(var e=[],n=f;n<t.length;n++){var i=t[n];if(f=n,!r()(i[a.dateKey]).isSame(o,a.unit))break;e.push(i)}return e},l=0;l<=c;l++){var h=d();h.length?h.forEach((function(t){return n(o,t)})):n(o,null),o=o.add(1,a.unit)}}}}}]);
//# sourceMappingURL=component---src-pages-copy-traders-provider-analytics-index-js-3cd86df574c70f78104e.js.map