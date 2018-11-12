
/*!

*
tybase 2 Javascript Library

*
taiyuehd - v1.1.0 (2014-03-19T14:55:51+0800)

*
http://www.taiyuehd.com/ | Released under TYHD license

*/




var checkHelp = (function () {
    var default_opt = {
        containerid: "",//需要验证的容器ID
        myRegular: "",//正则表达式
        megerror: "",//报错信息
        spanerrcid: "",//报错信息承载容器
        placeholder: "",//默认提示信息
        spancid: "",//报错样式承载容器
        errclass: "err",//错误加载样式
        rightclass: "ok",//错误加载样式
        checktype: "txt"//验证文本还是单选多选下拉
    }

    function checkTxt(opt) {
        if ($(opt.containerid).val() == opt.placeholder) {
            errshow(opt);
            return false;
        }
        var myRegular = opt.myRegular;
        var patrn = eval(myRegular);
        var rtnValue = patrn.exec(trim($(opt.containerid).val()));
        if (rtnValue) {
            okshow(opt);
            return true;
        }
        else {
            errshow(opt);
            return false;
        }
    }

    function checklength(opt) {
        if ($(opt.containerid).val() == opt.placeholder || $(opt.containerid).val() == '') {
            errshow(opt);
            return false;
        }
        var len = trim($(opt.containerid).val()).length;
        if (len <= opt.myRegular) {
            okshow(opt);
            return true;
        }
        else {
            errshow(opt);
            return false;
        }

    }

    function errshow(opt) {
        if (opt.spanerrcid != "") {
            $(opt.spanerrcid).html(opt.megerror);
            $(opt.spanerrcid).css("color", "red");
            if (opt.spancid != "") {
                $(opt.spancid).removeClass(opt.rightclass).addClass(opt.errclass);
            }
        }
        else {
            if (opt.spancid != "") {
                $(opt.spancid).removeClass(opt.rightclass).addClass(opt.errclass);
            }
            alert(opt.megerror);
        }

    }


    function okshow(opt) {
        if (opt.spanerrcid != "") {
            $(opt.spanerrcid).html("");
            $(opt.spanerrcid).css("color", "Green");
            if (opt.spancid != "") {
                $(opt.spancid).removeClass(opt.errclass).addClass(opt.rightclass);
            }
        }
        else {
            if (opt.spancid != "") {
                $(opt.spancid).removeClass(opt.errclass).addClass(opt.rightclass);
            }
        }
    }

    //验证身份证
    function checkIdcard(opt) {
        if ($(opt.containerid).val() == opt.placeholder) {
            errshow(opt);
            return false;
        }
        var Errors = new Array(
    "验证通过!",
    "身份证号码位数不对!",
    "身份证号码出生日期超出范围或含有非法字符!",
    "身份证号码校验错误!",
    "身份证地区非法!"
    );
        var area = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" }
        var idcard = $(opt.containerid).val();
        var Y, JYM;
        var S, M;
        var idcard_array = new Array();
        idcard_array = idcard.split("");
        //地区检验
        if (area[parseInt(idcard.substr(0, 2))] == null) {
            opt.megerror = Errors[4];
            errshow(opt);
            return false;
        }
        //身份号码位数及格式检验
        switch (idcard.length) {
            case 15:
                if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
                    ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
                } else {
                    ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
                }
                if (ereg.test(idcard)) {
                    opt.megerror = "";
                    okshow(opt);
                    return true;
                }
                else {
                    opt.megerror = Errors[2];
                    errshow(opt);
                    return false;
                }
                break;
            case 18:
                //18位身份号码检测
                //出生日期的合法性检查 
                //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
                //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
                if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                    ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
                } else {
                    ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
                }
                if (ereg.test(idcard)) {//测试出生日期的合法性
                    //计算校验位
                    S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
    + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
    + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
    + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
    + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
    + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
    + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
    + parseInt(idcard_array[7]) * 1
    + parseInt(idcard_array[8]) * 6
    + parseInt(idcard_array[9]) * 3;
                    Y = S % 11;
                    M = "F";
                    JYM = "10x98765432";
                    M = JYM.substr(Y, 1); //判断校验位
                    if (M == idcard_array[17].toLocaleLowerCase()) {
                        opt.megerror = "";
                        okshow(opt);
                        return true; //检测ID的校验位
                    }
                    else {

                        opt.megerror = Errors[3];
                        errshow(opt);
                        return false;
                    }
                }
                else {
                    opt.megerror = Errors[2];
                    errshow(opt);


                    return false;
                }
                break;
            default:
                opt.megerror = Errors[1];
                errshow(opt);
                return false;
                break;
        }
    }


    function mycheck(options) {
        var opt = {};
        opt.containerid = (typeof (options.containerid) == "undefined") ? default_opt.containerid : options.containerid;
        opt.myRegular = (typeof (options.myRegular) == "undefined") ? default_opt.myRegular : options.myRegular;
        opt.megerror = (typeof (options.megerror) == "undefined") ? default_opt.megerror : options.megerror;
        opt.placeholder = (typeof (options.placeholder) == "undefined") ? default_opt.placeholder : options.placeholder;
        opt.checktype = (typeof (options.checktype) == "undefined") ? default_opt.checktype : options.checktype;

        opt.spanerrcid = (typeof (options.spanerrcid) == "undefined") ? default_opt.spanerrcid : options.spanerrcid;

        opt.spancid = (typeof (options.spancid) == "undefined") ? default_opt.spancid : options.spancid;

        opt.errclass = (typeof (options.errclass) == "undefined") ? default_opt.errclass : options.errclass;

        opt.rightclass = (typeof (options.rightclass) == "undefined") ? default_opt.rightclass : options.rightclass;

        switch (opt.checktype) {
            case "idcard":
                return checkIdcard(opt);
                break;
            case "txt":
                return checkTxt(opt);
                break;
            case "length":
                return checklength(opt);
                break;
        }

    }


    function trim(str) {
        return rtrim(ltrim(str));
    }
    //去掉字符串左边的空格 
    function ltrim(s) {
        if (s == null) return "";
        var whitespace = new String(" \t\n\r");
        var str = new String(s);
        if (whitespace.indexOf(str.charAt(0)) != -1) {
            var j = 0, i = str.length;
            while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
                j++;
            }
            str = str.substring(j, i);
        }
        return str;
    }

    //去掉字符串右边的空格 
    function rtrim(s) {
        if (s == null) return "";
        var whitespace = new String(" \t\n\r");
        var str = new String(s);
        if (whitespace.indexOf(str.charAt(str.length - 1)) != -1) {
            var i = str.length - 1;
            while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1) {
                i--;
            }
            str = str.substring(0, i + 1);
        }
        return str;
    }


    return {
        check: function (options) {
            return mycheck(options);
        }
    }
})();




/*!

*
tybase 2 Javascript Library

*
taiyuehd - v1.1.0 (2014-03-19T14:55:51+0800)

*
http://www.taiyuehd.com/ | Released under TYHD license

*/


// JScript 文件
var Class = {
    create: function () {
        return function () {
            this.initialize.apply(this, arguments);
        }
    }
}



var TYHDPTreg = Class.create();
TYHDPTreg.prototype =
{
    ErrorMessage: "",
    initialize: function () {
        this.ErrorMessage = "";
    },
    getErrorMessage: function () {
        return ErrorMessage;
    },
    checkValue: function (myControlID, parSpanID, parRegular, parErrorMessage) {
        var controlTemp = document.getElementById(myControlID);
        if (controlTemp == null) {
            alert("没有ID为" + myControlID.toString() + "的对象");
            return false;
        }
        var objSpan = document.getElementById(parSpanID);
        if (objSpan == null) {
            alert("没有ID为" + parSpanID.toString() + "的SPAN对象");
            return false;
        }
        if (parRegular == null) {
            alert("正则表达式不能为空");
            return false;
        }

        try
        { var patrn = eval(parRegular); }
        catch (err)
        { alert("正则表达式有误"); return false; }
        var rtnValue = patrn.exec(trim(controlTemp.value));
        if (rtnValue) {
            objSpan.style.color = "Green";
            objSpan.innerHTML = "<img src=\"/wap/images/pass.gif\" width=\"14\" height=\"14\" align=\"absmiddle\" />";
            return true;
        }
        else {
            objSpan.style.color = "Red";
            objSpan.innerHTML = "<img src=\"/wap/images/error.gif\" width=\"14\" height=\"14\" align=\"absmiddle\" />" + parErrorMessage;
            return false;
        }
    },
    EmailRegular: '/^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$/',
    FloatRegular: '/^\\d+(\\.\\d+)?$/',
    IntRegular: '/^\\d+$/',
    EmptyRegular: '/^.+$/',
    StrFormatRegular: '/^[^`~!@#$%^&*()+=\\\\]{1,50}$/',
    PhoneRegular: '/^((\\d{3,4}-)?\\d{7,8})|1[3,5,8]{1}[0-9]{9}$/',
    MobileRegular: '/^1[3,4,5,6,7,8,9]{1}[0-9]{9}$/',
    TelRegular: '/^((\\d{3,4})\\d{7,8})$/',
    SerialRegular: '/^[0-9]{6}[1,2]{1}[0-9]{5}$/',

    IdentRegular: '/^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}|^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}(\\d{1}|[\\dxX])$/',
    ChinaNameRegular: '/^[\\u4e00-\\u9fa5]{2,6}$/',
    UserNameRegular: '/^[^`~!@#$%^&*()+=\\\\]{4,30}$/'
};


function checkIdcard2(idcard, myControlID) {
    var objSpan = document.getElementById(myControlID);
    var Errors = new Array(
"验证通过!",
"身份证号码位数不对!",
"身份证号码出生日期超出范围或含有非法字符!",
"身份证号码校验错误!",
"身份证地区非法!"
);
    var area = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" }

    var idcard, Y, JYM;
    var S, M;
    var idcard_array = new Array();
    idcard_array = idcard.split("");
    //地区检验
    if (area[parseInt(idcard.substr(0, 2))] == null) {

        objSpan.style.color = "Red";
        objSpan.innerHTML = "<img src=\"/wap/images/error.gif\" width=\"14\" height=\"14\" align=\"absmiddle\" />" + Errors[4];

        return false;
    }
    //身份号码位数及格式检验
    switch (idcard.length) {
        case 15:
            if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
            } else {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
            }
            if (ereg.test(idcard)) {
                objSpan.style.color = "Green";
                objSpan.innerHTML = "<img src=\"/wap/images/pass.gif\" width=\"14\" height=\"14\" align=\"absmiddle\" />";
                return true;
            }
            else {

                objSpan.style.color = "Red";
                objSpan.innerHTML = "<img src=\"/wap/images/error.gif\" width=\"14\" height=\"14\" align=\"absmiddle\" />" + Errors[2];
                return false;
            }
            break;
        case 18:
            //18位身份号码检测
            //出生日期的合法性检查 
            //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
            //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
            if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
            } else {
                ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
            }
            if (ereg.test(idcard)) {//测试出生日期的合法性
                //计算校验位
                S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
+ parseInt(idcard_array[7]) * 1
+ parseInt(idcard_array[8]) * 6
+ parseInt(idcard_array[9]) * 3;
                Y = S % 11;
                M = "F";
                JYM = "10x98765432";
                M = JYM.substr(Y, 1); //判断校验位
                if (M == idcard_array[17].toLocaleLowerCase()) {
                    objSpan.style.color = "Green";
                    objSpan.innerHTML = "<img src=\"/wap/images/pass.gif\" width=\"14\" height=\"14\" align=\"absmiddle\" />";
                    return true; //检测ID的校验位
                }
                else {
                    objSpan.style.color = "Red";
                    objSpan.innerHTML = "<img src=\"/wap/images/error.gif\" width=\"14\" height=\"14\" align=\"absmiddle\" />" + Errors[3];

                    return false;
                }
            }
            else {
                objSpan.style.color = "Red";
                objSpan.innerHTML = "<img src=\"/wap/images/error.gif\" width=\"14\" height=\"14\" align=\"absmiddle\" />" + Errors[2];

                return false;
            }
            break;
        default:
            objSpan.style.color = "Red";
            objSpan.innerHTML = "<img src=\"/wap/images/error.gif\" width=\"14\" height=\"14\" align=\"absmiddle\" />" + Errors[1];

            return false;
            break;
    }
}



function trim(str) {
    return rtrim(ltrim(str));
}

//去掉字符串左边的空格 
function ltrim(s) {
    if (s == null) return "";
    var whitespace = new String(" \t\n\r");
    var str = new String(s);
    if (whitespace.indexOf(str.charAt(0)) != -1) {
        var j = 0, i = str.length;
        while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
            j++;
        }
        str = str.substring(j, i);
    }
    return str;
}

//去掉字符串右边的空格 
function rtrim(s) {
    if (s == null) return "";
    var whitespace = new String(" \t\n\r");
    var str = new String(s);
    if (whitespace.indexOf(str.charAt(str.length - 1)) != -1) {
        var i = str.length - 1;
        while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1) {
            i--;
        }
        str = str.substring(0, i + 1);
    }
    return str;
}

