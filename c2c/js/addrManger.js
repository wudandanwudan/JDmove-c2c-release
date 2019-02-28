require(["jquery","utils","dot"],function(a,b,c){"use strict";var d={data:"",aesKey:""},e={init:function(){e.getAesKey(function(){e.getAddrList(),e.addClick()})},getAesKey:function(a){var c={url:b.getHost()+"/security/aesKey",data:{}};b.load(c).then(function(c){c&&0==c.code?d.aesKey=c.data:b.isNotEmpty(c.tip)?b.lightToast(c.tip):b.lightToast("解密key异常"),a()},function(b){a()})},decrypt:function(a,b){var c=CryptoJS.enc.Utf8.parse(b),d=CryptoJS.AES.decrypt(a,c,{mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7});return CryptoJS.enc.Utf8.stringify(d).toString()},addClick:function(){a(".ui-concat").unbind("click").bind("click",function(){"image/btn-moren-2x.png"!=a(this).find(".btn-img2").attr("src")&&(e.getDefaultAddress(a(this).attr("addressId")),a(".ui-concat").find(".btn-img2").attr("src","image/btn-moren2-2x.png"),a(this).find(".btn-img2").attr("src","image/btn-moren-2x.png"))}),a(".ui-delete").unbind("click").bind("click",function(){a(".reverse-dialog").show();var b=a(this).attr("addressId");a("#success").unbind("click").bind("click",function(){e.getDeleteAddress(b)}),a("#cancel").click(function(){a(".reverse-dialog").hide()})}),a(".ui-bianji").unbind("click").bind("click",function(){var b={addressId:"",name:"",mobile:"",provinceid:"",cityid:"",countryid:"",townid:"",addressDetail:"",addressDefault:""};b.addressId=a(this).attr("addressid"),b.provinceid=a(this).attr("provinceId"),b.cityid=a(this).attr("cityId"),b.countryid=a(this).attr("countryId"),b.townid=a(this).attr("townId"),b.name=a(this).parent().parent().parent().find(".ui-set .name").text(),b.mobile=a(this).parent().parent().parent().find(".ui-set .tel").text(),b.addressDetail=a(this).attr("addressDetail"),b.addressDefault=a(this).attr("addressDefault"),e.editAddr(b)}),a(".ui-layer-ft").unbind("click").bind("click",function(){d.data.length<20?e.newAddr():b.lightToast("抱歉，地址信息最多只能有20条哦，删一条再建吧！")})},renderAddrInfo:function(b){b=b||[],a(".ui-addr").html(c.template(a(".addrInfo").text())(b)),e.addClick()},newAddr:function(){b.goUrl("/newAddr.html?mgUrl="+encodeURIComponent("/c2c/addrManger.html")+"?refresh=no&add=yes")},editAddr:function(a){a&&(a=JSON.stringify(a),b.goUrl("/editAddr.html?addInfo="+encodeURIComponent(a)+"&refresh=no&mgUrl=/c2c/addrManger.html"))},getAddrList:function(){var c={url:b.getHost()+"/receiveAddr/secFindReceiveAddrList",data:{}};b.load(c).then(function(c){b.isNotEmpty(c.data)&&0==c.code&&d.aesKey?(a(".bgview").addClass("hide"),c.data.forEach(function(a){a.name=a.name&&e.decrypt(a.name,d.aesKey)||a.name,a.addressDetail=a.addressDetail&&e.decrypt(a.addressDetail,d.aesKey)||a.addressDetail,a.fullAddress=a.fullAddress&&e.decrypt(a.fullAddress,d.aesKey)||a.fullAddress}),e.renderAddrInfo(c.data),d.data=c.data):(a(".bgview").removeClass("hide"),a(".bgview img").attr("src","image/noDeliver1.png"))},function(b){a(".bgview").removeClass("hide"),a(".bgview p").text("数据加载失败，请点击刷新~"),a(".bgview").unbind("click").bind("click",function(){e.getAddrList()})})},getDefaultAddress:function(a){var c={url:b.getHost()+"/receiveAddr/setDefaultReceiveAddr",data:{addressId:a}};b.load(c).then(function(a){"0"==a.code?(b.lightToast("设置成功!"),setTimeout(function(){window.location.reload()},1e3)):b.isNotEmpty(a.tip)?b.lightToast(a.tip):b.lightToast("设置默认地址失败~")},function(a){})},getDeleteAddress:function(a){var c={url:b.getHost()+"/receiveAddr/deleteReceiveAddr",data:{addressId:a}};b.load(c).then(function(a){"0"==a.code?(b.lightToast("删除成功!"),setTimeout(function(){window.location.reload()},1e3)):b.isNotEmpty(a.tip)?b.lightToast(a.tip):b.lightToast("删除地址失败~")},function(a){})}};e.init()});