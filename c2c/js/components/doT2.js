// doT.js
// 2011-2014, Laura Doktorova, https://github.com/olado/doT
// Licensed under the MIT license.
function randomNum(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1);
            break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum);
            break;
        default:
            return 0;
            break;
    }
};
function isEmpty(text) {
    if (typeof text == "object") {//判断是否为空对象
        for (var x in text) {
            return false;
        }
        return true;
    } else {
        if (text == null || text == undefined || text == "undefined" || text == "" || text == "null") {
            return true;
        } else {
            return false;
        }
    }
}
//图片地址处理
function getImageHost(){
    var imageHost;
    // var data=['12','13','14','20','30']
    // var n=randomNum(0,4);
    // imageHost="//img"+data[n]+".360buyimg.com";
    imageHost="//m.360buyimg.com"
    return imageHost;
};
//判断请求的头像全路径or半路径
function getImageIcon(s, url,cc){
    // url图片地址 s宽高 cc裁切
    if(url && url.indexOf('jfs') > -1 && url.indexOf('http') !== 0){
        return getImageHost()+s+url+cc;
    }else{
        if(url && url.indexOf('jfs') > -1  ){
            return url+cc;
        }else{
            return url;
        }

    }
};
//半路径,商品详情推荐商品再用，图片半路径不一定有jfs
function getImage(s, url,cc){
    // url图片地址 s宽高 cc裁切
    if(url && url.indexOf('http') > -1  ){
        return url;
    }else{
        return getImageHost()+s+url+cc;
    }


};
(function() {
    "use strict";

    window.doT = {
        version: "1.0.3",
        templateSettings: {
            evaluate:    /\{\{([\s\S]+?(\}?)+)\}\}/g,
            interpolate: /\{\{=([\s\S]+?)\}\}/g,
            encode:      /\{\{!([\s\S]+?)\}\}/g,
            use:         /\{\{#([\s\S]+?)\}\}/g,
            useParams:   /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
            define:      /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
            defineParams:/^\s*([\w$]+):([\s\S]+)/,
            conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
            iterate:     /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
            varname:	"it",
            strip:		true,
            append:		true,
            selfcontained: false,
            doNotSkipEncoded: false
        },
        template: undefined, //fn, compile template
        compile:  undefined  //fn, for express
    };
    var _globals;

    doT.encodeHTMLSource = function(doNotSkipEncoded) {
        var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
            matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
        return function(code) {
            return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
        };
    };

    _globals = (function(){ return this || (0,eval)("this"); }());

    if (typeof module !== "undefined" && module.exports) {
        module.exports = doT;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return doT;});
    } else {
        _globals.doT = doT;
    }

    var startend = {
        append: { start: "'+(",      end: ")+'",      startencode: "'+encodeHTML(" },
        split:  { start: "';out+=(", end: ");out+='", startencode: "';out+=encodeHTML(" }
    }, skip = /$^/;

    function resolveDefs(c, block, def) {
        return ((typeof block === "string") ? block : block.toString())
            .replace(c.define || skip, function(m, code, assign, value) {
                if (code.indexOf("def.") === 0) {
                    code = code.substring(4);
                }
                if (!(code in def)) {
                    if (assign === ":") {
                        if (c.defineParams) value.replace(c.defineParams, function(m, param, v) {
                            def[code] = {arg: param, text: v};
                        });
                        if (!(code in def)) def[code]= value;
                    } else {
                        new Function("def", "def['"+code+"']=" + value)(def);
                    }
                }
                return "";
            })
            .replace(c.use || skip, function(m, code) {
                if (c.useParams) code = code.replace(c.useParams, function(m, s, d, param) {
                    if (def[d] && def[d].arg && param) {
                        var rw = (d+":"+param).replace(/'|\\/g, "_");
                        def.__exp = def.__exp || {};
                        def.__exp[rw] = def[d].text.replace(new RegExp("(^|[^\\w$])" + def[d].arg + "([^\\w$])", "g"), "$1" + param + "$2");
                        return s + "def.__exp['"+rw+"']";
                    }
                });
                var v = new Function("def", "return " + code)(def);
                return v ? resolveDefs(c, v, def) : v;
            });
    }

    function unescape(code) {
        return code.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ");
    }

    doT.template = function(tmpl, c, def) {
        c = c || doT.templateSettings;
        var cse = c.append ? startend.append : startend.split, needhtmlencode, sid = 0, indv,
            str  = (c.use || c.define) ? resolveDefs(c, tmpl, def || {}) : tmpl;

        str = ("var out='" + (c.strip ? str.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ")
            .replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""): str)
            .replace(/'|\\/g, "\\$&")
            .replace(c.interpolate || skip, function(m, code) {
                return cse.start + unescape(code) + cse.end;
            })
            .replace(c.encode || skip, function(m, code) {
                needhtmlencode = true;
                return cse.startencode + unescape(code) + cse.end;
            })
            .replace(c.conditional || skip, function(m, elsecase, code) {
                return elsecase ?
                    (code ? "';}else if(" + unescape(code) + "){out+='" : "';}else{out+='") :
                    (code ? "';if(" + unescape(code) + "){out+='" : "';}out+='");
            })
            .replace(c.iterate || skip, function(m, iterate, vname, iname) {
                if (!iterate) return "';} } out+='";
                sid+=1; indv=iname || "i"+sid; iterate=unescape(iterate);
                return "';var arr"+sid+"="+iterate+";if(arr"+sid+"){var "+vname+","+indv+"=-1,l"+sid+"=arr"+sid+".length-1;while("+indv+"<l"+sid+"){"
                    +vname+"=arr"+sid+"["+indv+"+=1];out+='";
            })
            .replace(c.evaluate || skip, function(m, code) {
                return "';" + unescape(code) + "out+='";
            })
        + "';return out;")
            .replace(/\n/g, "\\n").replace(/\t/g, '\\t').replace(/\r/g, "\\r")
            .replace(/(\s|;|\}|^|\{)out\+='';/g, '$1').replace(/\+''/g, "");
        //.replace(/(\s|;|\}|^|\{)out\+=''\+/g,'$1out+=');

        if (needhtmlencode) {
            if (!c.selfcontained && _globals && !_globals._encodeHTML) _globals._encodeHTML = doT.encodeHTMLSource(c.doNotSkipEncoded);
            str = "var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : ("
                + doT.encodeHTMLSource.toString() + "(" + (c.doNotSkipEncoded || '') + "));"
                + str;
        }
        try {
            var fn = new Function(c.varname, str);
            return function(){
                return fn.apply(def, arguments);
            }
        } catch (e) {
            if (typeof console !== "undefined") console.log("Could not create a template function: " + str);
            throw e;
        }
    };

    doT.compile = function(tmpl, def) {
        return doT.template(tmpl, null, def);
    };
}());

