webpackJsonp([4],{"3nW7":function(e,t,s){"use strict";var a=s("Xxa5"),i=s.n(a),n=s("exGp"),o=s.n(n),r=s("Dd8w"),d=s.n(r),c=s("LOkV"),l=s("NYxO"),u={name:"page-user-info",props:{periodCode:String,userImg:String},data:function(){return{show:!1,address:"",name:"",phone:"",addressInfo:{},detail:""}},computed:d()({},Object(l.d)("mine",["showD"])),methods:d()({},Object(l.b)("mine",["submitForm"]),{selectAddress:function(){this.$refs.addressRef.show=!0,this.$refs.addressInput.blur()},addressFuc:function(e){this.address=e.province+e.city+e.county+e.town,this.addressInfo=e},submit:function(){var e=this;return o()(i.a.mark(function t(){var s;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s={periodCode:e.periodCode||void 0,receiveName:e.name,receiveMobile:e.phone,receiveProvinceId:e.addressInfo.provinceId||void 0,receiveCityId:e.addressInfo.cityId||void 0,receiveDistrictId:e.addressInfo.countyId||void 0,receiveTownId:e.addressInfo.townId||void 0,receiveAddress:e.detail},t.next=3,e.submitForm(s);case 3:e.show=e.showD,e.show||(e.clearForm(),e.$emit("callback"));case 5:case"end":return t.stop()}},t,e)}))()},closeDialog:function(){this.show=!1,this.clearForm(),c.c(!1)},clearForm:function(){this.name="",this.phone="",this.address=[],this.detail=""}})},v={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"page-user-info"},[s("transition",{attrs:{name:"info-mask"}},[e.show?s("div",{staticClass:"dialog-mask"},[s("div",{staticClass:"info-dialog"},[s("div",{staticClass:"info-dialog-con"},[s("div",{staticClass:"user-img"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:{src:e.$supImg(e.userImg,"88x88"),error:e.$reqImg("userDefaultGrey.png"),loading:e.$reqImg("userDefaultGrey.png")},expression:"{src: $supImg(userImg, '88x88'), error: $reqImg('userDefaultGrey.png'), loading: $reqImg('userDefaultGrey.png')}"}]})]),e._v(" "),s("div",{staticClass:"tip"},[e._v("恭喜您获得明星好物")]),e._v(" "),s("div",{staticClass:"info-input"},[s("div",{staticClass:"prompt"},[e._v("请填写手机号及收货地址，我们会在10个工作日内给您发货")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],attrs:{type:"text",name:"name",placeholder:"请输入姓名"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}}),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],attrs:{type:"text",name:"phone",placeholder:"请输入手机号"},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}}),e._v(" "),s("div",{staticClass:"select-address",on:{click:e.selectAddress}},[s("input",{ref:"addressInput",attrs:{type:"text",name:"address",placeholder:"请选择地区",readonly:""},domProps:{value:e.address}}),e._v(" "),s("div",{staticClass:"more clearfix"},[s("span",[e._v("·")]),s("span",[e._v("·")]),s("span",[e._v("·")])])]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.detail,expression:"detail"}],attrs:{type:"text",name:"detail",placeholder:"请输入详细地址"},domProps:{value:e.detail},on:{input:function(t){t.target.composing||(e.detail=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"submitBtn"},[e.name&&e.phone&&e.address&&e.detail?s("span",{staticClass:"enableBtn",on:{click:e.submit}},[e._v("提交")]):s("span",[e._v("提交")])])]),e._v(" "),s("div",{staticClass:"info-dialog-close"},[s("i",{on:{click:e.closeDialog}})])])]):e._e()]),e._v(" "),s("jd-address",{ref:"addressRef",on:{address:e.addressFuc}})],1)},staticRenderFns:[]};var p=s("VU/8")(u,v,!1,function(e){s("48me")},null,null);t.a=p.exports},"48me":function(e,t){},MtoQ:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("Xxa5"),i=s.n(a),n=s("exGp"),o=s.n(n),r=s("Dd8w"),d=s.n(r),c=s("LOkV"),l=s("NYxO"),u={name:"page-mine",components:{userInfo:s("3nW7").a},data:function(){return{periodCode:"",userImg:""}},created:function(){document.body.style.background="#fff",document.body.scrollTop=0},computed:d()({},Object(l.d)("mine",["allLoad","list"]),Object(l.d)("common",["jdInfo"])),mounted:function(){var e=this;return o()(i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.judgeJdIn();case 2:if(!t.sent){t.next=5;break}e.loadData(),c.i();case 5:case"end":return t.stop()}},t,e)}))()},methods:d()({},Object(l.b)("common",["judgeJdIn"]),Object(l.b)("mine",["loadData"]),{getPrize:function(e,t){this.$refs.infoDialog.show=!0,this.periodCode=e,this.userImg=t},callback:function(){this.loadData()},goDetail:function(e){var t=-1===this.jdInfo.indexOf("%")?encodeURIComponent(this.jdInfo):this.jdInfo;location.href=location.protocol+"//"+location.host+"/c2c/star/share?activityInfoId="+e+"&joinPin="+t}})},v={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"page-mine"},[s("div",{staticClass:"list"},[s("ul",{staticClass:"clearfix"},e._l(e.list,function(t){return s("li",{key:t.id,on:{click:function(s){e.goDetail(t.periodCode)}}},[s("div",{staticClass:"img-wrap"},[t.detailImgs?s("img",{attrs:{src:e.$supImg(t.detailImgs[0],"214x160")}}):e._e()]),e._v(" "),s("div",{staticClass:"info-wrap"},[s("div",{staticClass:"p-name"},[e._v(e._s(t.goodsName))]),e._v(" "),s("div",{staticClass:"p-state clearfix"},[s("div",{staticClass:"time"},[e._v(e._s(t.vo.createTime))]),e._v(" "),s("div",{staticClass:"state"},[t.vo.prized&&!t.vo.received?s("span",{staticClass:"state-prize",on:{click:function(s){s.stopPropagation(),e.getPrize(t.periodCode,t.vo.joinUserHeadImg)}}},[e._v("领取好物")]):e._e(),e._v(" "),903!==t.periodStatus||t.vo.prized?e._e():s("span",{staticClass:"state-on"},[e._v("进行中")]),e._v(" "),904!==t.periodStatus||t.vo.prized?e._e():s("span",{staticClass:"state-end"},[e._v("已结束")]),e._v(" "),t.vo.prized&&t.vo.received?s("span",{staticClass:"state-get"},[e._v("已领取好物")]):e._e()])])])])}))]),e._v(" "),e.allLoad&&e.list.length>10?s("div",{staticClass:"part-end"},[s("span",[e._v("已经到底啦")])]):e._e(),e._v(" "),e.allLoad&&0===e.list.length?s("div",{staticClass:"part-none"},[e._v("还没有参与活动哦～")]):e._e(),e._v(" "),e.allLoad?e._e():s("div",{staticClass:"part-loading"},[s("i"),e._v("加载中...")]),e._v(" "),s("userInfo",{ref:"infoDialog",attrs:{periodCode:e.periodCode,userImg:e.userImg},on:{callback:e.callback}})],1)},staticRenderFns:[]};var p=s("VU/8")(u,v,!1,function(e){s("b64a")},null,null);t.default=p.exports},b64a:function(e,t){}});
//# sourceMappingURL=4.d8da5f25751e230ccdf9.js.map