/*!

*
tybase 2 Javascript Library

*
taiyuehd - v1.1.0 (2014-03-19T14:55:51+0800)

*
http://www.taiyuehd.com/ | Released under TYHD license

*/

if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
    if (window.location.href.indexOf("?wm=h5") < 0) {
        try {
            if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                //   window.location.href = "/wap/wtyhome.htm";   

            }
        } catch (e) { }
    }
}

$(function () {


    //                 var ua = navigator.userAgent.toLowerCase();
    //                  var isWeixin = ua.indexOf('micromessenger') != -1;
    //                 //var isWeixin =(ua.indexOf('micromessenger') != -1) && (ua.indexOf('windows nt') != -1 );
    //                 var isAndroid = ua.indexOf('android') != -1;
    //                 var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1 );
    //                 if (!isWeixin || ua.indexOf('windows nt') != -1) {
    //                     document.head.innerHTML = '<title>抱歉，出错了</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/open/libs/weui/0.4.1/weui.css">';
    //                     document.body.innerHTML = ua+ '<div class="weui_msg"><div class="weui_icon_area"><i class="weui_icon_info weui_icon_msg"></i></div><div class="weui_text_area"><h4 class="weui_msg_title">请在微信客户端打开链接</h4></div></div>';
    //                
    //                 }



    //导航 脚部加载
    //$('.nav-wrap').load('nav.html');
    //$('.footer').load('footer.html');

    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $("#back-to-top").fadeIn();
        } else {
            $("#back-to-top").fadeOut();
        }
    });
    $("#back-to-top").click(function () {
        $('body,html').animate({ scrollTop: 0 }, 800);
        return false;
    });
})


/* 弹框显示隐藏 弹框自适应 */
function PopHide(obj) {
    $(obj).hide();
    $(obj).children('.PopDiv').removeAttr("style");
    $(".winpop .close").removeAttr("style");
    $(".BackTop").fadeOut();
}
function PopShow(obj) {
    $(obj).fadeIn();
    var winhei = $(window).height();
    var boxwidth = $(obj).children('.PopDiv').width();
    var boxheight = $(obj).children('.PopDiv').height();
    if (boxheight > winhei) {
        $(obj).children('.PopDiv').css({ 'top': '2%', 'margin-left': -boxwidth / 2, 'height': '96%', 'overflow-x': 'hidden', 'overflow-y': 'auto' });
        $(".BackTop").fadeIn();
        $(".winpop .close").css({ 'position': 'fixed' });
    } else {
        $(obj).children('.PopDiv').css({ 'margin-top': -boxheight / 2, 'margin-left': -boxwidth / 2 });
    }
}
function PopShow1(obj) {
    $(obj).fadeIn();
    var boxwidth = $(obj).children('.PopDiv').width();
    $(obj).children('.PopDiv').css({ 'margin-left': -boxwidth / 2 });
    $(".BackTop").fadeIn();
    $(".winpop .close").css({ 'position': 'fixed' });
}
$(function () {
    /* 切换 */
    $(".TabTit p").click(function () {
        $(this).addClass("cur").siblings().removeClass("cur");
        var index = $(this).parent().children("p").index(this);
        $(this).parent().next().children(".box").eq(index).show().siblings().hide();
    })
    /* 返回顶部 */
    $(".BackTop").click(function () {
        $(".PopDiv").animate({ scrollTop: 0 }, 800);
        $("html,body").animate({ scrollTop: 0 }, 800);
    })
    $(window).bind("scroll", function () {
        var bodytop = document.documentElement.scrollTop || $("body").scrollTop();
        // $(".HouseShow h1").html(bodytop);
        if (bodytop > 180) {
            $(".BackTop").fadeIn();
            $(".housetit").css({ 'position': 'fixed', 'top': '0' })
        } else {
            $(".BackTop").fadeOut();
            $(".housetit").css({ 'position': 'relative', 'top': 'auto' })
        }
    });
});

// fpdemo
//function getCustFPdemoID() {
//    var urlUser = '/ajax.aspx?type=getCustFPdemoID&t=' + new Date();
//    $.ajax({
//        url: urlUser,
//        async: false,
//        success: function (data) {

//            $("#txtFcardno").val(data.split('$')[0]);
//            $("#txtPhone").val(data.split('$')[1]);
//            $("#txtPwd").val(data.split('$')[2]);
//        }
//    });

//}


$(document).ready(function () {




    if (window.location.href.indexOf("/tyhome") > -1) {
        custLogin1();
    }

    if (window.location.href.indexOf("/sqzc.htm") > -1) {


        //  getCustFPdemoID();

    }




    layui.use('layer', function () { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句

        //触发事件
        var active = {
            setTop: function () {
                var that = this;
                //多窗口模式，层叠置顶
                layer.open({
                    type: 2 //此处以iframe举例
                    , title: '当你选择该窗体时，即会在最顶端'
                    , area: ['390px', '260px']
                    , shade: 0
                    , maxmin: true
                    , offset: [ //为了演示，随机坐标
                        Math.random() * ($(window).height() - 300)
                        , Math.random() * ($(window).width() - 390)
                    ]
                    , content: 'http://layer.layui.com/test/settop.html'
                    , btn: ['继续弹出', '全部关闭'] //只是为了演示
                    , yes: function () {
                        $(that).click();
                    }
                    , btn2: function () {
                        layer.closeAll();
                    }

                    , zIndex: layer.zIndex //重点1
                    , success: function (layero) {
                        layer.setTop(layero); //重点2
                    }
                });
            }
            , confirmTrans: function () {
                //配置一个透明的询问框
                layer.msg('大部分参数都是可以公用的<br>合理搭配，展示不一样的风格', {
                    time: 20000, //20s后自动关闭
                    btn: ['明白了', '知道了', '哦']
                });
            }
            , notice: function () {
                //示范一个公告层
                layer.open({
                    type: 1
                    , title: '网络选房协议' //不显示标题栏
                    , closeBtn: false
                    , area: '300px;'
                    , shade: 0.8
                    , id: 'LAY_layuipro' //设定一个id，防止重复弹出
                    , btn: ['同意', '不同意']
                    , btnAlign: 'c'
                    , moveType: 1 //拖拽模式，0或者1
                    ,
                    // content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">你知道吗？亲！<br>layer ≠ layui<br><br>layer只是作为Layui的一个弹层模块，由于其用户基数较大，所以常常会有人以为layui是layerui<br><br>layer虽然已被 Layui 收编为内置的弹层模块，但仍然会作为一个独立组件全力维护、升级。<br><br>我们此后的征途是星辰大海 ^_^</div>'
                    content: $("#rule").html()
                    ,
                    yes: function () {
                        // $("#CheckboxRuler").attr("checked", "checked");
                        //$("#CheckboxRuler").prop("checked", true);
                        ischeck = 1;
                        /** 点击同意的时候，自动将外面的同意协议的复选框勾选中 **/
                        $('.rule-box .uncheck').hide();
                        $('.rule-box img').show();
                        layer.closeAll();
                    }
                    , btn2: function () {
                        //$("#CheckboxRuler").attr("checked", "");
                        //$("#CheckboxRuler").attr("checked", false);
                        ischeck = 0;

                        $('.rule-box img').hide();
                        $('.rule-box .uncheck').show();
                        layer.closeAll();
                    }
                    //            ,
                    //            success: function (layero) {
                    //                var btn = layero.find('.layui-layer-btn');
                    //                btn.find('.layui-layer-btn0').attr({
                    //                    href: '#'
                    //            , target: '_blank'
                    //                }
                    //            );
                    //            }
                });
            }
            , offset: function (othis) {
                var type = othis.data('type')
                    , text = othis.text();

                layer.open({
                    type: 1
                    , offset: type //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                    , id: 'layerDemo' + type //防止重复弹出
                    , content: '<div style="padding: 20px 100px;">' + text + '</div>'
                    , btn: '关闭全部'
                    , btnAlign: 'c' //按钮居中
                    , shade: 0 //不显示遮罩
                    , yes: function () {
                        layer.closeAll();
                    }
                });
            }
        };

        $('.layui-btn').on('click', function () {
            var othis = $(this), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
        });

    });





    $("#txtFcardno").focus(function () {
        if ($("#txtFcardno").val() == '请输入申请人身份证号') $("#txtFcardno").val('');

        $("#txtFcardno").css("background-color", "#D6D6FF");
    });
    $("#txtFcardno").blur(function () {
        if ($("#txtFcardno").val() == '') $("#txtFcardno").val('请输入申请人身份证号');

        $("#txtFcardno").css("background-color", "#fff");
    });

    $("#txtPhone").focus(function () {
        if ($("#txtPhone").val() == '请输入手机号码') $("#txtPhone").val('');

        $("#txtPhone").css("background-color", "#D6D6FF");
    });
    $("#txtPhone").blur(function () {
        if ($("#txtPhone").val() == '') $("#txtPhone").val('请输入手机号码');

        $("#txtPhone").css("background-color", "#fff");
    });

    $(function () {
        $(".suspend .close").click(function () {
            $(this).parent().addClass("closed")
        })
    })



});

//客户信息
var islogin = 0;
var fstatus = '0';

var bdhk = '';
var lmgf = '';
var wcngf = '';
var fhyzk = '';
function custLogin1() {
    var urlUser = '/ajax.aspx?Type=getCustLoginStatus&t=' + new Date();

    $.ajax({
        url: urlUser,
        async: false,
        dataType: "json",
        success: function (Datajson) {
            
            if (Datajson.result.statu == 'true') {
                //已登录客户
                $("#tynav").show();

                $(".Loginbegin1").hide();
                $('.LoginEnd').show();

                // $("#tblLogin").hide();
                $("#tblMain").show();

                $('#ftype').html(Datajson.user.ftype);

                if (Datajson.user.froomno != "") {

                    $('#useridcard').html('欢迎您！' + Datajson.user.CustName + '您成功预订的房源：' + Datajson.user.froomno.replace('|', ' '));
                    clearInterval(timerloginstate);

                }
                else {
                    $('.buybox').hide();
                    if (Datajson.user.fstatus == '1') {
                        $('#useridcard').html('欢迎您！' + Datajson.user.CustName + ',您的资料审核中！');


                    } else if (Datajson.user.fstatus == '2') {
                        $('#useridcard').html('欢迎您！' + Datajson.user.CustName + ',您的资料已经审核通过！');


                    } else if (Datajson.user.fstatus == '3') {
                        $('#useridcard').html('欢迎您！' + Datajson.user.CustName + ',您的资料审核未通过！');


                    } else if (Datajson.user.fstatus == '4') {
                        $('#useridcard').html('欢迎您！' + Datajson.user.CustName + ',您的帐号为无效帐号！');


                    }

                    else {
                        $('#useridcard').html('欢迎您！' + Datajson.user.CustName);
                        $('.buybox').show();
                    }

                }
                islogin = 1;



                setCookie("custnamecookie", Datajson.user.CustName);
                setCookie("userphonecookie", Datajson.user.userphone);
                setCookie("zhiyeguwencookie", Datajson.user.zhiyeguwen);
                setCookie("ftypecookie", Datajson.user.ftype);
                setCookie("ftimescookie", Datajson.user.ftimes);
                fstatus = Datajson.user.fstatus;


                if (Datajson.user.bdhk == 'True') {
                    $("input[name='bdhk'][value=1]").prop("checked", true);
                    $("input[name='bdhk'][value=0]").prop("checked", false);
                    bdhk = '1';
                    // $('#demo33').hide();
                }
                else if (Datajson.user.bdhk == 'False') {
                    $("input[name='bdhk'][value=0]").prop("checked", true);
                    $("input[name='bdhk'][value=1]").prop("checked", false);
                    bdhk = '0';
                    //  $('#demo33').show();
                }

                if (Datajson.user.flm == 'True') {
                    $("input[name='lmgf'][value=1]").prop("checked", true);
                    $("input[name='lmgf'][value=0]").prop("checked", false);
                    lmgf = '1';
                }
                else if (Datajson.user.flm == 'False') {
                    $("input[name='lmgf'][value=0]").prop("checked", true);
                    $("input[name='lmgf'][value=1]").prop("checked", false);
                    lmgf = '0';
                }


                if (Datajson.user.fwcn == 'True') {
                    $("input[name='wcngf'][value=1]").prop("checked", true);
                    wcngf = '1';
                }
                else if (Datajson.user.fwcn == 'False') {
                    $("input[name='wcngf'][value=0]").prop("checked", true);
                    wcngf = '0';
                }

                switch (Datajson.user.fhyzk) {
                    case "1": $("input[name='fhyzk'][value=1]").prop("checked", true); break;
                    case "2": $("input[name='fhyzk'][value=2]").prop("checked", true); break;
                    case "3": $("input[name='fhyzk'][value=3]").prop("checked", true); break;
                    case "4": $("input[name='fhyzk'][value=4]").prop("checked", true); break;
                    default:
                        break;
                }
                fhyzk = Datajson.user.fhyzk;

                switch (Datajson.user.fkfs) {
                    case "1": $("input[name='fkfs'][value=1]").prop("checked", true);
                        //                        $('#demo22').show();
                        //                        $('#demo33').hide();
                        //                        $('#demo44').show();
                        //                        $('#demo55').hide();
                        //                        $('#demo66').hide();
                        //                        $('#demo77').hide();

                        //                        $('#Button4').hide();
                        //                        $('#Button2').show();
                        break;
                    case "1": $("input[name='fkfs'][value=2]").prop("checked", true);
                        //                        $('#demo22').show();
                        //                        $('#demo33').show();
                        //                        $('#demo44').show();
                        //                        $('#demo55').show();
                        //                        $('#demo66').show();
                        //                        $('#demo77').show();

                        //                        $('#Button4').show();
                        //                        $('#Button2').hide();
                        break;
                    case "3": $("input[name='fkfs'][value=3]").prop("checked", true);
                        //                        $('#demo22').show();
                        //                        $('#demo33').show();
                        //                        $('#demo44').show();
                        //                        $('#demo55').show();
                        //                        $('#demo66').show();
                        //                        $('#demo77').show();

                        //                        $('#Button4').show();
                        //                        $('#Button2').hide();
                        break;
                    case "4": $("input[name='fkfs'][value=4]").prop("checked", true);
                        //                        $('#demo22').show();
                        //                        $('#demo33').show();
                        //                        $('#demo44').show();
                        //                        $('#demo55').show();
                        //                        $('#demo66').show();
                        //                        $('#demo77').show();

                        //                        $('#Button4').show();
                        //                        $('#Button2').hide();
                        break;
                    default:
                        break;
                }
                //    fhyzk = Datajson.user.fhyzk;


                if (Datajson.user.fstatus == '0') {


                    $('#fstatus').html('提交资料中');
                    $('#demoTJ').show();
                    $('#btnNext').show();
                    $('.glyphicon-trash').show();
                } if (Datajson.user.fstatus == '1') {
                    //  alert(1111);
                    $('#fstatus').html('审核中');
                    $('#demoTJ').hide();
                    $('#btnNext').hide();
                    $('.glyphicon-trash').hide();
                    $('#Button7').hide();
                    $('#Button2').hide();
                }
                else if (Datajson.user.fstatus == '2') {
                    $('#fstatus').html('已审核');
                    $('#demoTJ').hide();
                    $('#btnNext').hide();
                    $('.glyphicon-trash').hide();
                    $('#Button7').hide();
                    $('#Button2').hide();
                }
                else if (Datajson.user.fstatus == '3') {
                    $('#fstatus').html('审核未通过');
                    $('#demoTJ').hide();
                    $('#btnNext').hide();
                    $('.glyphicon-trash').hide();
                } else if (Datajson.user.fstatus == '4') {
                    $('#fstatus').html('帐号无效');
                    $('#demoTJ').hide();
                    $('#btnNext').hide();
                    $('.glyphicon-trash').hide();
                }

                // start

                if (Datajson.user.ftype1 == undefined) {
                    $('#demo11 .layui-badge').remove();
                } else {

                    $('#demo11').append('<span class="layui-badge">' + Datajson.user.ftype1 + '</span>');
                    if ($('#demo11 .layui-badge').html() * 1 >= 15) {
                        $('#test1').hide();

                    }
                }

                if (Datajson.user.ftype2 == undefined) $('#demo22 .layui-badge').remove();
                else {
                    $('#demo22').append('<span class="layui-badge">' + Datajson.user.ftype2 + '</span>');
                    if ($('#demo22 .layui-badge').html() * 1 >= 15) {
                        $('#test2').hide();

                    }
                }

                if (Datajson.user.ftype3 == undefined) $('#demo33 .layui-badge').remove();
                else {
                    $('#demo33').append('<span class="layui-badge">' + Datajson.user.ftype3 + '</span>');
                    if ($('#demo33 .layui-badge').html() * 1 >= 15) {
                        $('#test3').hide();

                    }
                }

                if (Datajson.user.ftype4 == undefined) $('#demo44 .layui-badge').remove();
                else {
                    $('#demo44').append('<span class="layui-badge">' + Datajson.user.ftype4 + '</span>');
                    if ($('#demo44 .layui-badge').html() * 1 >= 15) {
                        $('#test4').hide();

                    }
                }

                if (Datajson.user.ftype5 == undefined) $('#demo55 .layui-badge').remove();
                else {
                    $('#demo55').append('<span class="layui-badge">' + Datajson.user.ftype5 + '</span>');
                    if ($('#demo55 .layui-badge').html() * 1 >= 15) {
                        $('#test5').hide();

                    }
                }

                if (Datajson.user.ftype6 == undefined) $('#demo66 .layui-badge').remove();
                else {
                    $('#demo66').append('<span class="layui-badge">' + Datajson.user.ftype6 + '</span>');
                    if ($('#demo66 .layui-badge').html() * 1 >= 15) {
                        $('#test6').hide();

                    }
                }

                if (Datajson.user.ftype7 == undefined) $('#demo77 .layui-badge').remove();
                else {
                    $('#demo77').append('<span class="layui-badge">' + Datajson.user.ftype7 + '</span>');
                    if ($('#demo77 .layui-badge').html() * 1 >= 15) {
                        $('#test7').hide();

                    }
                }
                //end


                if (Datajson.user.froomno == "") {
                    getloginstate();
                }
            }
            else {
                //未登录客户
                // window.location.href = "/Login/L.htm";
                window.location.href = "/sqzc.htm";


                $("#tynav").hide();
                // $("#tblLogin").show();
                $("#tblMain").hide();

                $(".Loginbegin1").show();
                $('.LoginEnd').hide();
                $('#ftype').html('-1');
                islogin = 0;
                clearInterval(timerloginstate);
            }

        }
    });


}
function UserCenter11() {
    alert(1);
}
//个人中心
function UserCenter() {


    var urlUser = '/ajax.aspx?Type=getCustLoginStatus&t=' + new Date();

    $.ajax({
        url: urlUser,
        async: false,
        dataType: "json",
        success: function (Datajson) {

            if (Datajson.result.statu == 'true') {
                $('#custname').html(Datajson.user.CustName);
                $('#userphone').html(Datajson.user.userphone);
                $('#useridcard').html(Datajson.user.useridcard);
                //  $('#zhiyeguwen').html(Datajson.user.zhiyeguwen);


                if (Datajson.user.fstatus == '0') {


                    $('#fstatus').html('提交资料中');

                } if (Datajson.user.fstatus == '1') {
                    //  alert(1111);
                    $('#fstatus').html('正在审核中');


                }
                else if (Datajson.user.fstatus == '2') {
                    $('#fstatus').html('已审核通过，请等待通知。');

                }
                else if (Datajson.user.fstatus == '3') {
                    $('#fstatus').html(' 审核未通过，请查看未通过原因。');

                }
                else if (Datajson.user.fstatus == '4') {
                    $('#fstatus').html('无效帐号。');

                }
                //  if (Datajson.user.fnote!='') alert(Datajson.user.fnote);
                $('#spnotxt').html(Datajson.user.fnote);

                islogin = 1;
                if (Datajson.user.froomno == "") {
                    getloginstate();
                }
            }
            else {

                islogin = 0;

            }

        }
    });


}


//预订房源信息
function UserCenterRoomInfo(froomno) {
    var urlUser = '/ajax.aspx?Type=UserCenterRoomInfo&froomno=' + froomno + '&t=' + new Date();

    $.ajax({
        url: urlUser,
        async: false,
        dataType: "jsonp",
        success: function (statuback) {

            if ("" == "公测") {

            }
            else {


                $('#mianji').html(unescape(statuback.rows[0].mianji) + '㎡');
                //   $('#info').html(unescape(statuback.rows[0].info)+ '元') ;
                //  $('#price').html(unescape(statuback.rows[0].price) + "元");

            }

        }

        //

    });


}




function CheckPwdTwo2() {
    if ($("#txtNewPwd").val() == "请再次输入新密码") {
        $("#spanRetrynewPwd").html('*必填');
        $("#spanRetrynewPwd").css("color", "red");
        return false;
    }

    if ($("#txtNewPwd").val() != $("#txtRnewPassword").val()) {
        $("#spanRetrynewPwd").css("color", "red");
        $("#spanRetrynewPwd").html('<img src=\"/wap/images/error.gif\" width=\"15\" height=\"15\" align=\"absmiddle\" />两次输入密码不一致!');
        return false;
    }
    else {

        if ($("#txtRnewPassword").val() != '') {
            $("#spanRetrynewPwd").css("color", "Green");
            $("#spanRetrynewPwd").html('<img src=\"/wap/images/pass.gif\" width=\"15\" height=\"15\" align=\"absmiddle\" />密码一致');
            return true;
        } else {
            return false;
        }

    }
}


function Editmypwd() {
    if (!CheckPwd()) {
        $("#pwdmsg").html('');
        return;
    }
    if (!CheckPwdTwo2()) {
        $("#pwdmsg").html('');
        return;
    }

    var urlUser = "/ajax.aspx?type=xgpwd" + "&newpwd=" + escape($("#txtRnewPassword").val()) + "&t=" + new Date();

    $.ajax({
        url: urlUser,
        async: false,
        dataType: "text",
        success: function (data) {
            if (data == "1") {
                $("#pwdmsg").html("恭喜您，修改密码成功！");
                $("#txtNewPwd").val('');
                $("#txtRnewPassword").val('');

                $("#SpanNewPwd").html('');
                $("#spanRetrynewPwd").html('');
                custLogin1();
            }
            else {
                $("#pwdmsg").html(data);


            }


        }
    });


}




function ClearPwdTxt() {
    $("#txtNewPwd").val('');
    $("#txtRnewPassword").val('');

    $("#SpanNewPwd").html('');
    $("#spanRetrynewPwd").html('');
    $("#pwdmsg").html('');
}




//手动注销 

function myExit() {
    var urlUser = '/ajax.aspx?type=exit&t=' + new Date();

    $.ajax({
        url: urlUser,
        async: false,
        dataType: "text",
        success: function (data) {

            clearCookie();

            // window.location.href = "/Login/L.htm";
            window.location.href = "/sqzc.htm";

            //            $("#tynav").hide();
            //            $("#tblLogin").show();
            //            $("#tblMain").hide();

            //            $(".Loginbegin1").show();
            //            $('.LoginEnd').hide();
            //            $('#ftype').html('-1');
            //            islogin = 0;


        }
    });

}


//首次登录

function CustLoginFst() {
    //    if ($("#txtFcardno").val() == '') {

    //        $("#spanFcardnoMsg").html("您的信息输入错误，请重试!").show(300).delay(3000).hide(300); 


    //      //  $("#spanFcardnoMsg").html("okaaaaaaaaaaaaaaaaaaaaaaaaaaa").fadeTo(30000);
    //       //  $("#spanFcardnoMsg").html("okaaaaaaaaaaaaaaaaaaaaaaaaaaa").hide(30000); // 这个是渐渐消失 
    //       // $("#spanFcardnoMsg").html("okaaaaaaaaaaaaaaaaaaaaaaaaaaa").fadeTo(31000).hide(); //这个是让他显示5秒（实际就是没有改变透明度），然后隐藏 
    //    }

    if (!CheckIdCard('txtFcardno', 'spanFcardnoMsg')) {
        return;
    }
    if (!Checkphone()) {
        return;
    }



    var urlUser = "/ajax.aspx?type=CustLoginFst" + "&txtFname=" + escape($("#txtFname").val()) + "&idcard=" + escape($("#txtFcardno").val())
        + "&phone=" + escape($("#txtPhone").val()) + "&userpwd=" + escape($("#txtPwd").val()) + "&t=" + new Date();

    $.ajax({
        url: urlUser,
        async: false,
        dataType: "text",
        success: function (data) {
            //  alert(data);
            if (data == "登录成功") {
                // PopHide('.loginpop')
                window.location.href = "/wap/tyhome.htm";
                //  custLogin1(); 


                //                $("#tblLogin").hide();
                //                $("#tblMain").show(); 

            }
            else {

                layui.use(['layer'], function () {
                    layer = layui.layer; //弹层   

                    layer.msg(data);

                })

                //$("#msg").html(data);
            }


        }
    });



}





var myCheck = new TYHDPTreg();

function CheckIdCard(txtid, spanid) {

    if ($("#" + txtid).val() == "请输入15或18位身份证号码") {
        $("#" + spanid).html('*必填');
        $("#" + spanid).css("color", "red");
        return false;
    }


    return myCheck.checkValue(txtid, spanid, myCheck.EmptyRegular, "请输入证件号码") && checkIdcard2($("#" + txtid).val(), spanid);

}

function CheckIdCardExists(txtidcard, kjid) {

    var stat = false;
    var IdCard = $("#" + txtidcard).val();


    //    var urlUser = "/ajax.aspx?type=existidcard&useridcrd=" + escape(IdCard) + "&t=" + new Date();

    //    $.ajax({
    //        url: urlUser,
    //        async: false,
    //        dataType: "text",
    //        success: function (data) {
    //            if (data == '1') {

    //                $("#" + kjid).css("color", "Green");
    //                $("#" + kjid).html('<img src=\"/wap/images/pass.gif\" width=\"14\" height=\"14\" align=\"absmiddle\" />');
    //                stat = true;

    //            }
    //            else {

    //                $("#" + kjid).css("color", "red");
    //                $("#" + kjid).html('<img src=\"/wap/images/error.gif\" width=\"14\" height=\"14\" align=\"absmiddle\" />' + data);
    //                stat = false;
    //            }

    //        }
    //    });


    return stat;

}

function Checkname() {

    if ($("#txtFname").val() == "请输入姓名") {
        $("#spanFnameMsg").html('*必填');
        $("#spanFnameMsg").css("color", "red");
        return false;
    }

    return myCheck.checkValue("txtFname", "spanFnameMsg", myCheck.EmptyRegular, "请填写姓名") && myCheck.checkValue("txtFname", "spanFnameMsg", myCheck.ChinaNameRegular, "姓名格式不正确!");
}


function Checkphone() {

    if ($("#txtPhone").val() == "请输入11位手机号码") {
        $("#SpanPhoneMsg").html('*必填');
        $("#SpanPhoneMsg").css("color", "red");
        return false;
    }

    return myCheck.checkValue("txtPhone", "SpanPhoneMsg", myCheck.EmptyRegular, "请填写您登记的手机号码") && myCheck.checkValue("txtPhone", "SpanPhoneMsg", myCheck.MobileRegular, "手机号码格式不正确!");
}

function CheckPwd() {
    if ($("#txtNewPwd").val() == "请输入新的6位数密码") {
        $("#SpanNewPwd").html('*必填');
        $("#SpanNewPwd").css("color", "red");
        return false;
    }

    return myCheck.checkValue("txtNewPwd", "SpanNewPwd", myCheck.EmptyRegular, "请输入用户密码") && myCheck.checkValue("txtNewPwd", "SpanNewPwd", '/^[0-9a-zA-z\_\-]{6,14}$/', "请输入6-14位密码");
}


function showloading() {
    PopShow("#public1");

    $("#public1 h3").html('加载中...请稍候！');
    $("#public1 .popbox").append('<center><img  style="width: 250px; height: 100px;" src="/wap/images/loading1.gif"/></center>');
    $("#public1 .close").hide();
}

function inloading() {

    $("#loading").show();
    //  $("#loading").remove();
}

function exitloading() {

    $("#loading").hide();
    //  $("#loading").remove();
}



function closeloading(isclose) {
    if (isclose == 1) {
        PopHide('#public1');
    }

    $("#public1 .close").show();
    $("#public1 .popbox img").remove();
}


function version() {
    try {
        var bsr = navigator.appName
        var b_ver = navigator.appVersion
        var version = b_ver.split(";");
        var trim_Version = version[1].replace(/[ ]/g, "");
        if (bsr == "Microsoft Internet Explorer") {
            if (trim_Version == "MSIE6.0" || trim_Version == "MSIE7.0" || trim_Version == "MSIE8.0") {
                alert("您的IE浏览器版本太低，请使用IE9以上版本,为保证整个购买流程的顺畅，建议使用谷歌、火狐、360极速模式、QQ等高版本浏览器进行操作！");
            }

        }

    } catch (e) {

    }
}

//version();


var ischeck = 0;
$(document).ready(function () {

    $('.rule-box .uncheck').show();
    $('.rule-box img').hide();
    //协议
    //    $(".rule-box p > span").on("click", function (e) {
    //        if ($("#rule").hasClass("closed")) {
    //            $("#rule").show();
    //            $("#rule").removeClass("closed");
    //        } else {
    //            $("#rule").hide();
    //            $("#rule").addClass("closed");
    //        }
    //    });

    $(".rule-shadow").on("click", function (e) {
        $("#rule").hide();
        $("#rule").addClass("closed");
    });

    $(".btn-read").on("click", function (e) {
        $("#rule").hide();
        $("#rule").addClass("closed");
        ischeck = 1;
        /** 点击同意的时候，自动将外面的同意协议的复选框勾选中 **/
        $('.rule-box .uncheck').hide();
        $('.rule-box img').show();
    });


    $(".btn-not-read").on('click', function (e) {
        $("#rule").hide();
        $("#rule").addClass("closed");
        ischeck = 0;

        $('.rule-box img').hide();
        $('.rule-box .uncheck').show();
    });

    $(".rule-box-close-div").on("click", function (e) {
        $("#rule").hide();
        $("#rule").addClass("closed");
        /** 点击同意的时候，自动将外面的同意协议的复选框勾选中 **/
        e.stopPropagation();
        $('.notice_choose').hide();
        $('.notice_star').show();
    });

    /*
    * 协议接受
    * */

    $('.rule-box .uncheck').on("click", function (e) {
        $(this).hide();
        $('.rule-box img').show();
        ischeck = 1;
    });

    $('.rule-box img').on("click", function (e) {
        $(this).hide();
        $('.rule-box .uncheck').show();
        ischeck = 0;
    });

    $('#btnLogin').on("click", function (e) {
        //alert(ischeck);


        layui.use(['layer'], function () {
            layer = layui.layer; //弹层   

            if ($('#txtFname').val() == '')
                layer.msg('姓名不能为空！');

            else if ($('#txtFcardno').val() == '')
                layer.msg('证件号码不能为空！');

            else if ($('#txtPhone').val() == '')
                layer.msg('手机号不能为空！');

            else if ($('#txtPwd').val() == '')
                layer.msg('验证码不能为空！');
            //            else if (!CheckYZM()) {
            //                alert(1);
            //                return;
            //            }
            else {

                CustLoginFst();
            }



        })


        //        if (ischeck == 1) CustLoginFst();
        //        else 
        //        {
        //            layui.use(['layer'], function () {
        //            layer = layui.layer; //弹层   

        //            layer.msg('请先阅读并接受《网络选房活动须知》');

        //                    })
        //        }

    });




    $('#btngetYZM').on("click", function (e) {
        //alert(ischeck);

        layui.use(['layer'], function () {
            layer = layui.layer; //弹层   

            if ($('#txtFname').val() == '')
                layer.msg('姓名不能为空！');

            else if ($('#txtFcardno').val() == '')
                layer.msg('证件号码不能为空！');

            else if ($('#txtPhone').val() == '')
                layer.msg('手机号不能为空！');
            else getYZM();




        })

    });



    //


});



//获取验证码

function getYZM() {


    if (!CheckIdCard('txtFcardno', 'spanFcardnoMsg')) {
        return;
    }
    if (!Checkphone()) {
        return;
    }

    var urlUser = "/ajax.aspx?type=getYZMTy" + "&idcard=" + escape($("#txtFcardno").val())
        + "&phone=" + escape($("#txtPhone").val()) + "&userpwd=" + escape($("#txtPwd").val()) + "&t=" + new Date();

    $.ajax({
        url: urlUser,
        async: false,
        dataType: "text",
        success: function (data) {
            console.log(data)
            if (data == "登录成功") {
                // PopHide('.loginpop')
                // window.location.href = "/wap/tyhome.htm";
                //  custLogin1(); 

                //                $("#tblLogin").hide();
                //                $("#tblMain").show(); 

            }
            else {

                layui.use(['layer'], function () {
                    layer = layui.layer; //弹层   

                    layer.msg(data);

                })

                //$("#msg").html(data);
            }


        }
    });



}



//校验验证码


function CheckYZM() {


    if ($("#txtPwd").val() == "请输入验证码") {
        $("#SpanYzmMsg").html('*必填');
        $("#SpanYzmMsg").css("color", "red");
        return false;
    }

    if ($("#txtPwd").val() == "") {
        $("#SpanYzmMsg").html('*必填');
        $("#SpanYzmMsg").css("color", "red");
        return false;
    }
    else if ($('#txtPhone').val() == '') {
        layer.msg('手机号不能为空！');
        return false;
    }

    var objSpan = document.getElementById("SpanYzmMsg");
    var urlUser = "/ajax.aspx?type=CheckYZM" + "&idcard=" + escape($("#txtFcardno").val())
        + "&phone=" + escape($("#txtPhone").val()) + "&userpwd=" + escape($("#txtPwd").val()) + "&t=" + new Date();

    $.ajax({
        url: urlUser,
        async: false,
        dataType: "text",
        success: function (data) {
            if (data == "成功") {
                // PopHide('.loginpop')
                // window.location.href = "/wap/tyhome.htm";
                //  custLogin1(); 

                objSpan.style.color = "Green";
                objSpan.innerHTML = "<img src=\"/wap/images/pass.gif\" width=\"14\" height=\"14\" align=\"absmiddle\" />";

                //                $("#tblLogin").hide();
                //                $("#tblMain").show(); 
                return true;
            }
            else {
                objSpan.style.color = "Red";
                objSpan.innerHTML = "<img src=\"/wap/images/error.gif\" width=\"14\" height=\"14\" align=\"absmiddle\" />验证码错误";
                //                layui.use(['layer'], function () {
                //                    layer = layui.layer; //弹层   

                //                    layer.msg(data);

                //                })
                return false;
                //$("#msg").html(data);
            }


        }
    });



}



function clearCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}


//写cookies

function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

