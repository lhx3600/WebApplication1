
/*!

*
tybase 2 Javascript Library

*
taiyuehd - v1.1.0 (2014-03-19T14:55:51+0800)

*
http://www.taiyuehd.com/ | Released under TYHD license

*/
var Doesitstart = 0;


beforenum = 0;
afternum = 0;

//文字说明
var Stagesection = "";
//开盘阶段 内部测试，公共测试，客户认购
function getstage() {
    var urlUser = '/ajax.aspx?type=getstage&t=' + new Date();
    $.ajax({
        url: urlUser,
        async: false,
        success: function (data) {

            switch (data) {
                case "1":
                    Stagesection = "内测";
                    break;
                case "2":
                    Stagesection = "公测";
                    break;
                case "3":
                    Stagesection = "申请";
                    break;
            }
            return Stagesection;
        }
    });

}

function checkYZ(step, nurl) {
    var urlUser = '/ajax.aspx?Type=checkYZ&yzstep=' + step + '&t=' + new Date();

    $.ajax({
        url: urlUser,
        async: false,
        dataType: "json",
        success: function (Datajson) {

            window.location = nurl;

        }
    });


}



$(document).ready(function () {
    getstage();
    var timer = null;
    var backdatajson = getstartandend();
    var startimes = backdatajson.starttime.split(',');
    var endtimes = backdatajson.endtime.split(',');


    var nowtime = getnowtime().split(',');
    var DTstart = new Date(startimes[0], startimes[1] - 1, startimes[2], startimes[3], startimes[4], startimes[5]).getTime();
    // var UnixdisTime = toUnix(startimes);

    var DTend = new Date(endtimes[0], endtimes[1] - 1, endtimes[2], endtimes[3], endtimes[4], endtimes[5]).getTime();
    // var UnixdisTime2 = toUnix(endtimes);
    var localTime = new Date(nowtime[0], nowtime[1] - 1, nowtime[2], nowtime[3], nowtime[4], nowtime[5]).getTime();
    // var UnixlocalTime = toUnix(nowtime);
    var c = 0;

    countdown();

    timer = setInterval(countdown, 1000);

    function countdown() {
        function toDouble(obj) {
            if (obj < 10) { return '0' + obj }
            else { return obj };
        }
        localTime = localTime + 1000;
        //当前时间小于开始时间  
        if (localTime < DTstart) {
            //开始时间减当前时间
            c = DTstart - localTime;
            $("#SpanHDtimeMsg").html("距" + Stagesection + "开始：")
            $(".tishitime").html("距" + Stagesection + "开始：");
            //活动未开始 倒计时
            if ($('#ftype').html() == '1') {
                if (c < 1 * 1000) {
                    Doesitstart = 1;
                    $(".buybox").unbind("click").click(function () {
                        if (islogin == 1) {
                            // checkYZ('1', 'styhd1.html');
                            window.location = "/kp/styhd1.html";
                        }
                        else {

                            PopShow("#public1");
                            $("#public1 h3").html("您还没有登录！请登录后再试！<a href=\"javascript:PopShow('.loginpop');PopHide('#public1');\">[立即登录]</a>");
                        }
                    })
                }
                else {
                    //                    layui.use(['layer'], function () {
                    //                        layer = layui.layer; //弹层   

                    //                        layer.msg('选房暂未开始！请耐心等待！');

                    //                    })
                    // $("#public1 h3").html("选房暂未开始！请耐心等待！");
                    // return;
                }
                afternum++;
                if (beforenum >= 60) {
                    nowtime = getnowtime().split(',');
                    localTime = new Date(nowtime[0], nowtime[1] - 1, nowtime[2], nowtime[3], nowtime[4], nowtime[5]).getTime();
                    afternum = 0
                }
            }
            else {
                Doesitstart = 0;
                $(".buybox").unbind("click").click(function () {

                    //   alert($(".buybox").html());
                    //                    if ($(".buybox").html() == '名额已满') {

                    //                        layui.use(['layer'], function () {
                    //                            layer = layui.layer; //弹层   

                    //                            layer.msg('名额已满！活动已截至！');

                    //                        })
                    //                        return;
                    //                    }

                    if (islogin == 1) {
                        layui.use(['layer'], function () {
                            layer = layui.layer; //弹层   

                            layer.msg('申请暂未开始！请耐心等待！');

                        })
                        //  $("#public1 h3").html("" + Stagesection + "暂未开始！请耐心等待！");
                    }
                    else {
                        PopShow("#public1");
                        $("#public1 h3").html("您还没有登录！请登录后再试！<a href=\"javascript:PopShow('.loginpop');PopHide('#public1');\">[立即登录]</a>");
                    }
                })
                // if ($('#ftype').html() == '0') {
                if (window.location.href.toUpperCase().indexOf("/S1") > -1 || window.location.href.toUpperCase().indexOf("/TYD") > -1) {
                    window.location = "/wap/tyhome.htm";
                }
                // }
                beforenum++;
                if (beforenum >= 60) {
                    nowtime = getnowtime().split(',');
                    localTime = new Date(nowtime[0], nowtime[1] - 1, nowtime[2], nowtime[3], nowtime[4], nowtime[5]).getTime();
                    beforenum = 0;
                }
            }
        }
        else {
            //当前时间小于开始时间  活动已经开始了
            c = DTend - localTime;
            $("#SpanHDtimeMsg").html("距" + Stagesection + "结束：")
            $(".tishitime").html("距" + Stagesection + "结束：");
            Doesitstart = 1;
            $(".buybox").unbind("click").click(function () {
                if (islogin == 1) {
                    //  alert(1);


                    //                    if ($(".buybox").html() == '名额已满') {

                    //                        layui.use(['layer'], function () {
                    //                            layer = layui.layer; //弹层   

                    //                            layer.msg('名额已满！活动已截至！');

                    //                        })
                    //                        return;
                    //                    }
                    //  window.location = "/kp/styhd1.html";
                    // window.location = "/wap/tyD1.html";
                    if ($('#useridcard').html().indexOf("您成功预订的房源") > -1 && Stagesection == '申请') {

                        layui.use(['layer'], function () {
                            layer = layui.layer; //弹层   

                            layer.msg('您已经成功预订房源！');

                        });

                        return;
                    }
                    else {
                        if (Stagesection == '公测') {
                            layui.use(['layer'], function () {
                                layer = layui.layer; //弹层   

                                layer.msg('公测无法上传图片，提交资料！');

                            });
                        }
                        else
                            window.location = "/wap/sqxz.htm";
                    }

                }
                else {
                    PopShow("#public1");
                    $("#public1 h3").html("您还没有登录！请登录后再试！<a href=\"javascript:PopShow('.loginpop');PopHide('#public1');\">[立即登录]</a>");
                }

            })
            afternum++;

            var cdftimes = getCookie("ftimescookie");

            if (window.location.href.indexOf("/s1.htm") > -1) {

                if (c / 1000 <= (DTend - DTstart) / 1000 - cdftimes) closeloading(1);

            }

            if (beforenum >= 60) {
                nowtime = getnowtime().split(',');
                localTime = new Date(nowtime[0], nowtime[1] - 1, nowtime[2], nowtime[3], nowtime[4], nowtime[5]).getTime();
                afternum = 0
            }
        }


        //活动已结束了。
        if (c <= 0) {
            clearInterval(timer);
            Doesitstart = -1;
            $('#SpanHDtimeMsg').text("名额已满，本次" + Stagesection + "已结束");
            $(".tishitime").html("名额已满，本次" + Stagesection + "已结束");
            $(".buybox").unbind("click").click(function () {
                PopShow("#public1");
                $("#public1 h3").html("本次" + Stagesection + "已结束！谢谢您的参与！");

            })
            //返回首页

            if (window.location.href.indexOf("/tyhome.htm") == -1) window.location = "/wap/tyhome.htm";

            $('.day').html('00');
            $('.houer').html('00');

            $('.minutes').html('00');

            $('.seconds').html('00');
            return false;
        };

        //给控件赋值
        var day = Math.floor(c / (24 * 60 * 60 * 1000));

        var hour = Math.floor(c / (60 * 60 * 1000) - day * 24);

        var minute = Math.floor(c / (60 * 1000) - day * 24 * 60 - hour * 60);

        var seconds = Math.floor(c / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60);

        $('.day').html(toDouble(parseInt(day)));
        $('.houer').html(toDouble(parseInt(hour)));

        $('.minutes').html(toDouble(minute));

        $('.seconds').html(toDouble(seconds));

    };


    if ($('.houer').html() == '' && $('.minutes').html() == '' && $('.seconds').html() == '') {

        $('#SpanHDtimeMsg').text('本次预订已结束')
    }

    function toUnix(obj) {

        var str = "" + obj[0] + "-" + obj[1] + "-" + obj[2] + " " + obj[3] + ":" + obj[4] + ":" + obj[5] + "";
        str = str.replace(/-/g, "/");
        var date = new Date(str);
        var humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));

        return humanDate.getTime() / 1000 - 8 * 60 * 60;

    }



    //



});




function getnowtime() {
    var urlUser = '/ajax.aspx?type=getnowtime&t=' + new Date();
    var myhcdata = "";
    $.ajax({
        url: urlUser,
        async: false,
        dataType: "text",
        success: function (data) {

            myhcdata = data;

        }
    });

    return myhcdata;
}



function showlogin() {
    $.colorbox({ inline: true, href: "#inline_example2" });
}


function getstartandend() {
    var urlUser = '/ajax.aspx?type=getstartandend&t=' + new Date();
    var myhcdata = "";
    $.ajax({
        url: urlUser,
        async: false,
        dataType: "json",
        success: function (data) {

            myhcdata = data;

        }, error: function (data) {
            myhcdata = eval("(" + data.responseText + ")");
        }
    });

    return myhcdata;
}



var timerloginstate = null;

function getloginstate() {
    clearInterval(timerloginstate);
    //if (islogin == 0) {
    //    // window.location.href = "/Login/L.htm";
    //    window.location.href = "/sqzc.htm";

    //    return;
    //}


    var urlUser = "/ajax.aspx?type=getloginstate&usercardno=" + getCookie("usercardnocookie");

    $.ajax({
        url: urlUser,
        async: false,
        dataType: "jsonp",
        success: function (data) {
            debugger;
            if (data.state == '-1') {
                islogin = 0;
                //   ManualExit();
                layui.use(['layer'], function () {
                    layer = layui.layer; //弹层   

                    layer.msg('该账号在其他地方登录，您被迫下线！');

                });
                //alert('该账号在其他地方登录，您被迫下线');
                // window.location.href = "/Login/L.htm";
                window.location.href = "/sqzc.htm";
                $("#tblLogin").show();
                $("#tblMain").hide();

            }
            else {

                //                if (data.totalnum * 1 >= data.jznum) {
                //                    $(".buybox").html("名额已满");
                //                   
                //                }
                timerloginstate = setInterval(getloginstate, 10 * 60 * 1000);
                $("#totalnum").html(data.totalnum);



            }

        }
    });


}




function ManualExit() {
    var urlUser = '/ajax.aspx?type=exit&t=' + new Date();

    $.ajax({
        url: urlUser,
        async: false,
        dataType: "text",
        success: function (data) {


        }
    });

}



function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}