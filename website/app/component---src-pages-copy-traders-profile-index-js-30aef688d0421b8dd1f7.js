(self.webpackChunkzignaly_webapp=self.webpackChunkzignaly_webapp||[]).push([[4043],{88109:function(t,e,r){"use strict";r.d(e,{Z:function(){return y}});var i=r(18446),a=r.n(i),o=r(67294),n=r(82245),l=r(2961),s=(r(21980),r(12229)),d=r(76913),h=r(36839),u=function(t,e){return a()(t.data,e.data)&&a()(t.options,e.options)},x=o.memo(l.$Q,u),c=o.memo(l.n4,u),y=function(t){var e=t.values,r=t.labels,i=t.horizontal,a=t.tooltipFormat,l=t.imageUrls,u=t.adjustHeightToContent,y=t.options,_=(0,d.Z)(a),b=_.chartRef,g=_.pointHoverRef,f=_.tooltipData,p=_.showTooltip,v=(0,o.useCallback)(p,[e]),m={labels:l?e.map((function(){return""})):r,datasets:[{data:e,barThickness:20,maxBarThickness:24,backgroundColor:e.map((function(t){return t<0?"#f63f82":"#08a441"}))}]},T={ticks:{fontColor:"#d4d4d4",fontSize:14,padding:0},gridLines:{color:"transparent",display:!0,drawBorder:!1,zeroLineColor:"#d4d4d4"}},w={gridLines:{display:!1},ticks:{display:!0,padding:i?10:0}},C=o.useState([]),k=C[0],q=C[1];o.useEffect((function(){if(l){var t=l.map((function(t){var e=new Image;return e.src=t,e}));q(t)}}),[l]);var I={responsive:!0,maintainAspectRatio:!1,legend:{display:!1},scales:{yAxes:[i?w:T],xAxes:[i?T:w]},layout:{padding:{left:i?15:0,right:0,top:20,bottom:i?10:l?25:0}},cornerRadius:4,tooltips:{enabled:!1,custom:v},animation:{duration:0},hover:{intersect:!1,mode:"index",animationDuration:0},plugins:{legendImages:!!k&&{images:k,horizontal:i}}},M=[{id:"legendImages",afterDraw:function(t){if(t.data.datasets)for(var e=t.options.plugins.legendImages,r=e.images,i=e.horizontal,a=t.ctx,o=t.scales["x-axis-0"],n=t.scales["y-axis-0"],l=function(t,e){if(t.naturalWidth||(t.src=s.Z),i){var r=n.getPixelForTick(e);a.drawImage(t,0,r-13,26,26)}else{var l=o.getPixelForTick(e);a.drawImage(t,l-20,n.bottom+15,40,40)}},d=function(t){var e=r[t];e.complete?l(e,t):e.onload=function(){l(e,t)}},h=0;h<r.length;h++)d(h)}}];I=Object.assign(I,y);var z=i?c:x,Z=0;if(i&&u){var R=m.datasets[0].barThickness;R="number"==typeof R?R:0,Z=e.length*(R+6)+60}return o.createElement(n.Z,{className:"barChart",style:Object.assign({},Z&&{height:Z})},o.createElement(h.Z,{pointHoverRef:g,showPointHover:!1,tooltipData:f},o.createElement(z,{data:m,options:I,plugins:M,ref:b})))}},21980:function(){Chart.elements.Rectangle.prototype.draw=function(){var t,e,r,i,a,o,n,l=this._chart.ctx,s=this._view,d=s.borderWidth,h=this._chart.config.options.cornerRadius;if(h<0&&(h=0),void 0===h&&(h=0),s.horizontal?(r=s.base,i=s.x,n=s.y-s.height/2,e=s.y+s.height/2,a=i>r?1:-1,o=1,t=s.borderSkipped||"left"):(r=s.x-s.width/2,i=s.x+s.width/2,n=s.y,a=1,o=(e=s.base)>n?1:-1,t=s.borderSkipped||"bottom"),d){var u=Math.min(Math.abs(r-i),Math.abs(n-e)),c=(d=d>u?u:d)/2,_=r+("left"!==t?c*a:0),b=i+("right"!==t?-c*a:0),g=n+("top"!==t?c*o:0),f=e+("bottom"!==t?-c*o:0);_!==b&&(n=g,e=f),g!==f&&(r=_,i=b)}l.beginPath(),l.fillStyle=s.backgroundColor,l.strokeStyle=s.borderColor,l.lineWidth=d;var p=[[r,e],[r,n],[i,n],[i,e]],v=["bottom","left","top","right"].indexOf(t,0);function m(t){return p[(v+t)%4]}-1===v&&(v=0);var T=m(0);l.moveTo(T[0],T[1]);for(var w=1;w<4;w++){var C;T=m(w),nextCornerId=w+1,4==nextCornerId&&(nextCornerId=0),nextCorner=m(nextCornerId),width=p[2][0]-p[1][0],height=p[0][1]-p[1][1],x=p[1][0],y=p[1][1],(C=h)>Math.abs(height)/2&&(C=Math.floor(Math.abs(height)/2)),C>Math.abs(width)/2&&(C=Math.floor(Math.abs(width)/2)),height<0?(x_tl=x,x_tr=x+width,y_tl=y+height,y_tr=y+height,x_bl=x,x_br=x+width,y_bl=y,y_br=y,l.moveTo(x_bl+C,y_bl),l.lineTo(x_br-C,y_br),l.quadraticCurveTo(x_br,y_br,x_br,y_br-C),l.lineTo(x_tr,y_tr+C),l.quadraticCurveTo(x_tr,y_tr,x_tr-C,y_tr),l.lineTo(x_tl+C,y_tl),l.quadraticCurveTo(x_tl,y_tl,x_tl,y_tl+C),l.lineTo(x_bl,y_bl-C),l.quadraticCurveTo(x_bl,y_bl,x_bl+C,y_bl)):width<0?(x_tl=x+width,x_tr=x,y_tl=y,y_tr=y,x_bl=x+width,x_br=x,y_bl=y+height,y_br=y+height,l.moveTo(x_bl+C,y_bl),l.lineTo(x_br-C,y_br),l.quadraticCurveTo(x_br,y_br,x_br,y_br-C),l.lineTo(x_tr,y_tr+C),l.quadraticCurveTo(x_tr,y_tr,x_tr-C,y_tr),l.lineTo(x_tl+C,y_tl),l.quadraticCurveTo(x_tl,y_tl,x_tl,y_tl+C),l.lineTo(x_bl,y_bl-C),l.quadraticCurveTo(x_bl,y_bl,x_bl+C,y_bl)):(l.moveTo(x+C,y),l.lineTo(x+width-C,y),l.quadraticCurveTo(x+width,y,x+width,y+C),l.lineTo(x+width,y+height-C),l.quadraticCurveTo(x+width,y+height,x+width-C,y+height),l.lineTo(x+C,y+height),l.quadraticCurveTo(x,y+height,x,y+height-C),l.lineTo(x,y+C),l.quadraticCurveTo(x,y,x+C,y))}l.fill(),d&&l.stroke()}},25450:function(t,e,r){"use strict";var i=r(19199);e.Z=function(){return(0,i.v9)((function(t){return t.views}))}},63947:function(t,e,r){"use strict";r.r(e);var i=r(67294),a=r(25450),o=r(62089);e.default=function(){var t=(0,a.Z)();return i.createElement(o.Z,{provider:t.provider})}}}]);
//# sourceMappingURL=component---src-pages-copy-traders-profile-index-js-30aef688d0421b8dd1f7.js.map