require(["jquery","utils","dot"],function(a,b,c){"use strict";var d={obj:{dealId:0,tradeId:0,addressId:"",deliveryDesc:"",machineKey:"test",optSource:3},para:{aesKey:""},init:function(){var c=b.getUrlParam("dealId");return c?void d.getAesKey(function(){a("#return-address").attr("clstag","pageclick|keycount|returnAddress__201708109|1"),d.obj.dealId=c;var e=b.getParameter("addressInfo");if(e){var f=JSON.parse(e),g={id:f.addressId||"",name:f.receiveName||"",mobile:f.mobile||"",provinceId:f.provinceId||"",cityId:f.cityId||"",countyId:f.countryId||"",fullAddress:f.addressName||""};d.renderAddress(g)}else d.getDefaultReceiveAddr();d.bindEvents(),a("#return-address").attr("clstag","pageclick|keycount|returnAddress__201708109|1")}):void b.lightToast("缺少参数")},getAesKey:function(a){var c={url:b.getHost()+"/security/aesKey",data:{}};b.load(c).then(function(c){c&&0==c.code?d.para.aesKey=c.data:b.isNotEmpty(c.tip)?b.lightToast(c.tip):b.lightToast("解密key异常"),a()},function(b){a()})},decrypt:function(a,b){var c=CryptoJS.enc.Utf8.parse(b),d=CryptoJS.AES.decrypt(a,c,{mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7});return CryptoJS.enc.Utf8.stringify(d).toString()},bindEvents:function(){a(".reverse-address").bind("click",function(){b.goUrl("/deliveryGoods.html?backUrl="+encodeURIComponent("buyerPost.html?dealId="+d.obj.dealId+"&"))}),b.changeLength(".reverse-remark-textarea",300,function(a){d.obj.deliveryDesc=a}),a("#return-address").bind("click",function(){var a=d.obj;if(a.addressId){var c={url:b.getHost(1)+"/order/v1/refund/submitDelivery",data:d.obj};b.load(c).then(function(a){if("0"===a.code){b.lightToast("提交成功");var c="?dealId="+d.obj.dealId;b.goUrl("/refundDetail.html"+c)}else b.isNotEmpty(a.tip)?b.lightToast(a.tip):b.lightToast("提交异常")},function(a){b.log(a)})}else b.lightToast("缺少地址")})},getDefaultReceiveAddr:function(){var c={url:b.getHost()+"/receiveAddr/secGetDefaultReceiveAddr",callback:"callback"};b.load(c).then(function(c){if(c&&0==c.code&&b.isNotEmpty(c.data)){var e=c.data;e.name=d.decrypt(e.name,d.para.aesKey)||e.name,e.fullAddress=d.decrypt(e.fullAddress,d.para.aesKey)||e.fullAddress,d.renderAddress(e)}else a(".reverse-address-left").html('<div class="no-address">请设置您的收货地址</div>')},function(b){a(".reverse-address-left").html('<div class="no-address">请设置您的收货地址</div>')})},renderAddress:function(b){var c="收货人："+(b.name||"--"),e=b.mobile?b.mobile.substr(0,3)+"****"+b.mobile.substr(7):"";a(".reverse-address-left-name").html(c+"&nbsp&nbsp&nbsp&nbsp"+e),a(".reverse-address-left-address").html("收货地址："+b.fullAddress||""),d.obj.addressId=b.id}};d.init()});