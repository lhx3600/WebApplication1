var imgserver = '';
var imgupsize = 5;
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
/* 弹框显示隐藏 弹框自适应 */
function PopHide(obj) {
    $(obj).hide();
    $(obj).children('.PopDiv').removeAttr("style");
    $(".winpop .close").removeAttr("style");
    $(".BackTop").fadeOut();
}
function showloading() {
    PopShow("#public1");

    // $("#public1 h1").html('正在排队请求中...请稍候！');
    $("#public1 .popbox").append('<center><img  style="width: 250px; height: 100px;" src="/wap/images/load.gif"/></center>');
    $("#public1 .close").hide();
}


function closeloading(isclose) {
    if (isclose == 1) {
        PopHide('#public1');
    }

    $("#public1 .close").show();
    $("#public1 .popbox img").remove();
}




//     var codeChars = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9,
//              'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
//              'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的


var code;
function createCode() {
    document.getElementById("inputCode").value = '';
    document.getElementById("inputCode").focus();
    code = "";
    var codeLength = 4; //验证码的长度
    var checkCode = document.getElementById("checkCode");
    var codeChars = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9); //所有候选组成验证码的字符，当然也可以用中文的

    for (var i = 0; i < codeLength; i++) {
        var charNum = Math.floor(Math.random() * 9);
        code += codeChars[charNum];
    }
    if (checkCode) {
        checkCode.className = "code";
        checkCode.innerHTML = code;
    }
}
function validateCode() {

    layui.use(['layer'], function () {

        var inputCode = document.getElementById("inputCode").value;
        if (inputCode.length <= 0) {
            // alert("请输入验证码！");
            layer.msg('请输入验证码！');
            $("#inputCode").focus();
        }
        // else if (inputCode.toUpperCase() != code.toUpperCase()) {
        else if (inputCode != code) {

            layer.msg('验证码输入有误！');
            $("#btnfyfb").hide();
            $("#myfav").hide();
            createCode();
        }
        else {
            $("#btnfyfb").show();
            $("#myfav").show();
            $("#mycode").hide();


            checkYZ2('1', '');
            // alert("验证码正确！");
        }


    });

}


function checkYZ2(step, nurl) {
    var urlUser = '/ajax.aspx?Type=checkYZ&yzstep=' + step + '&t=' + new Date();

    $.ajax({
        url: urlUser,
        async: false,
        dataType: "json",
        success: function (Datajson) {

            //  window.location = nurl;

        }
    });


}

function myfunction() {

    var discount = $(this).val();
    if (discount == "否") {
        alert(10);
        $("#divLM").css("display", "none");
    }
    if (discount == "是") {
        $("#divLM").css("display", "inline");
    }

}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}



function delimg(xxfid, xxfurl, ftype) {

    layer.confirm('确定删除此图片?',
        {
            btn: ['确认', '取消'] //按钮
        }, function (index) {
            //layer.msg('的确很重要', {icon: 1});
            var urlUser = '/ajax.aspx?Type=delImg&fid=' + xxfid + '&furl=' + escape(xxfurl) + '&t=' + new Date();

            $.ajax({
                url: urlUser,
                async: false,
                dataType: "json",
                success: function (Datajson) {

                    if (Datajson == '1') {
                        //  $("#img-" + xxfid).remove();
                        //   $("#delimg-" + xxfid).remove();
                        $("#divimg-" + xxfid).empty();
                        //   alert(ftype);
                        $('#demo' + ftype + '' + ftype + ' .layui-badge').html($('#demo' + ftype + '' + ftype + ' .layui-badge').html() * 1 - 1);
                        // if ($('#demo11 .layui-badge').html() == '0') $('#demo11  .layui-badge').remove();
                        if ($('#demo' + ftype + '' + ftype + ' .layui-badge').html() == '0') $('#demo' + ftype + '' + ftype + '  .layui-badge').remove();
                        else if ($('#demo' + ftype + '' + ftype + ' .layui-badge').html() * 1 < 15) {
                            $('#test' + ftype).show();

                        }


                    }

                }
            });


            layer.close(index);
        }, function (index) {

        });





}

var cookiecustname;
var usercardnocookie;


$(document).ready(function () {

    custLogin1();
    var cookiecustname = getCookie("custnamecookie");
    var usercardnocookie = getCookie("usercardnocookie");
    var userphonecookie = getCookie("userphonecookie");

    $("#fname").val(cookiecustname);
    $("#fcardno").val(usercardnocookie);
    $("#ftel").val(userphonecookie);

    //  LoadImg(getCookie("custfnocookie"), '1', 'demo1');
    // showloading();

    //         $(":radio").click(function () {
    //            // alert("您是..." + $(this).val());
    //         });




    $(".mytest").click(function () {
        // alert(  $(this).html());

        if ($("input[name='fhyzk']:checked").val() == undefined) {

            layui.use(['layer'], function () {
                layer = layui.layer; //弹层   

                layer.msg('请到基本信息中，选择婚姻状况');

            })
            return false;
        }

        if ($("input[name='lmgf']:checked").val() == undefined) {

            layui.use(['layer'], function () {
                layer = layui.layer; //弹层   

                layer.msg('请到基本信息中，选择是否联名购房');

            })
            return false;
        }
        if ($("input[name='bdhk']:checked").val() == undefined) {

            layui.use(['layer'], function () {
                layer = layui.layer; //弹层   

                layer.msg('请到基本信息中，选择是否本地户口');

            })
            return false;
        }
        if ($("input[name='wcngf']:checked").val() == undefined) {

            layui.use(['layer'], function () {
                layer = layui.layer; //弹层   

                layer.msg('请到基本信息中，选择是否有未成年子女');

            })
            return false;
        }

        if ($("input[name='fkfs']:checked").val() == undefined) {

            layui.use(['layer'], function () {
                layer = layui.layer; //弹层   

                layer.msg('请选择付款方式');
                return;
            })
            return false;
        }

        if ($(this).html().indexOf('身份') != -1) LoadImg(getCookie("custfnocookie"), '1', 'demo1');
        if ($(this).html().indexOf('户口') != -1) LoadImg(getCookie("custfnocookie"), '2', 'demo2');
        if ($(this).html().indexOf('社保') != -1) LoadImg(getCookie("custfnocookie"), '3', 'demo3');
        if ($(this).html().indexOf('婚姻状况') != -1) LoadImg(getCookie("custfnocookie"), '4', 'demo4');
        if ($(this).html().indexOf('房查') != -1) LoadImg(getCookie("custfnocookie"), '5', 'demo5');
        if ($(this).html().indexOf('验资证明') != -1) LoadImg(getCookie("custfnocookie"), '6', 'demo6');
        if ($(this).html().indexOf('征信') != -1) LoadImg(getCookie("custfnocookie"), '7', 'demo7');
    });


    if (fstatus != '0') {
        $('.glyphicon-trash').hide();
        $('.btnupimp').hide();
        $('#Button7').hide();
    }





});

function tjzl() {
    if ($("input[name='fhyzk']:checked").val() == undefined) {

        layui.use(['layer'], function () {
            layer = layui.layer; //弹层   

            layer.msg('请到基本信息中，选择婚姻状况');

        })
        return;
    }

    if ($("input[name='lmgf']:checked").val() == undefined) {

        layui.use(['layer'], function () {
            layer = layui.layer; //弹层   

            layer.msg('请到基本信息中，选择是否联名购房');

        })
        return;
    }
    if ($("input[name='bdhk']:checked").val() == undefined) {

        layui.use(['layer'], function () {
            layer = layui.layer; //弹层   

            layer.msg('请到基本信息中，选择是否本地户口');

        })
        return;
    }
    if ($("input[name='wcngf']:checked").val() == undefined) {

        layui.use(['layer'], function () {
            layer = layui.layer; //弹层   

            layer.msg('请到基本信息中，选择是否有未成年子女');

        })
        return;
    }

    if ($("input[name='fkfs']:checked").val() == undefined) {

        layui.use(['layer'], function () {
            layer = layui.layer; //弹层   

            layer.msg('请到基本信息中，选择付款方式');

        })
        return;
    }


    if ($('#demo11 .layui-badge').html() == undefined) {

        layui.use(['layer'], function () {
            layer = layui.layer; //弹层   

            layer.msg('必须上传身份信息');

        })
        return;
    }
    //         if ($('#demo22 .layui-badge').html() == undefined) {

    //             layui.use(['layer'], function () {
    //                 layer = layui.layer; //弹层   

    //                 layer.msg('必须上传户口信息');

    //             })
    //             return;
    //         }


    if ($("input[name='fhyzk']:checked").val() == undefined) {
        // alert($("input[name='fhyzk']:checked").val());

        alert('必须选择婚姻状况');
        return;
    }

    if ($("input[name='fkfs']:checked").val() == undefined) {
        // alert($("input[name='fhyzk']:checked").val());

        alert('必须选择付款方式');
        return;
    }



    if ($('#demo22 .layui-badge').html() == undefined) {

        layui.use(['layer'], function () {
            layer = layui.layer; //弹层   

            layer.msg('必须上传户口信息');

        })
        return;
    }
    if ($('#demo44 .layui-badge').html() == undefined && $("input[name='fhyzk']:checked").val() != '1') {

        layui.use(['layer'], function () {
            layer = layui.layer; //弹层   

            layer.msg('必须上传婚姻信息');

        })
        return;
    }


    if ($('#demo55 .layui-badge').html() == undefined) {

        layui.use(['layer'], function () {
            layer = layui.layer; //弹层   

            layer.msg('必须上传房查信息');

        })
        return;
    }

    if ($('#demo66 .layui-badge').html() == undefined) {

        layui.use(['layer'], function () {
            layer = layui.layer; //弹层   

            layer.msg('必须上传资金冻结信息');

        })
        return;
    }







    layer.confirm('如果未能按照要求提交资料，您将无法通过资料审核，武汉新天澜置业投资开发有限公司将取消您后续的选房申请资格。<br/>确定相关资料准确无误?',
        {
            btn: ['确认提交', '取消'] //按钮
        }, function (index) {
            //layer.msg('的确很重要', {icon: 1});
            // form.on('submit(demoTJ)', function (data) {
            //  alert($("input[name='fhyzk']:checked").val());



            var urlUser = "/ajax.aspx?type=SQTJ"
                + "&flm=" + $("input[name='lmgf']:checked").val()
                + "&bdhk=" + $("input[name='bdhk']:checked").val()
                + "&fcardno=" + escape($("#fcardno").val())
                + "&fwcn=" + $("input[name='wcngf']:checked").val()
                + "&fhyzk=" + $("input[name='fhyzk']:checked").val()
                + "&fkfs=" + $("input[name='fkfs']:checked").val()
                + "&ftj=1&t=" + new Date();

            $.ajax({
                url: urlUser,
                async: false,
                dataType: "text",
                success: function (datax) {


                    if (datax == '请上传相关图片！') {
                        layer.msg(datax);
                        return;

                    }
                    if (datax == '申请人数已满！') {
                        layer.msg(datax);
                        return false;
                    }

                    // $('#demoTJ').hide();
                    $('#btnNext').hide();
                    $('#fstatus').html('审核中');
                    // custLogin1();


                    window.location = "/wap/userC.htm";

                }
            });

            //
            return false;
        });


    //             layer.close(index);
    //         }, function (index) {

    //         });




}


function LoadImg(fno, ftype, kj) {
    var urlUser = '/ajax.aspx?Type=LoadImg&fno=' + fno + '&ftype=' + ftype + '&t=' + new Date();

    $.ajax({
        url: urlUser,
        async: false,
        dataType: "text",
        success: function (Datajson) {
            $('#' + kj).empty();
            var xdata = Datajson.split('$');
            var fidd, furll, fpass, fpasstxt;
            for (var i = 0; i < xdata.length - 1; i++) {


                fidd = xdata[i].split('|')[0];
                furll = xdata[i].split('|')[1];
                fpass = xdata[i].split('|')[2];
                if (fpass != '1') fpasstxt = '<p id="delimg-' + fidd
                    + '"  title="' + xdata[i] + '"      class="glyphicon glyphicon-trash" style="  margin:5px; font-size:18px; background:red; color:white; " >删除' + '</p>';
                else fpasstxt = '审核通过';


                $('#' + kj).append('<div id="divimg-' + fidd + '" ><img id="img-' + fidd
                    + '" height="150px" width="200px" src="' + imgserver + furll + '" alt="' + ''
                    + '" class="layui-upload-img"><br/>'
                    + fpasstxt
                    + '<br/></div>');

                $("#delimg-" + fidd).click(function () {
                    // $(this).hide();
                    delimg($(this).attr("title").split('|')[0], $(this).attr("title").split('|')[1], ftype);
                });

                if (fstatus != '0') {
                    $('.glyphicon-trash').hide();
                    $('.btnupimp').hide();
                    $('#Button7').hide();
                }

            }


            //


        }
    });


}



function checkyzm() {
    var urlUser = '/ajax.aspx?Type=getfyzmxed&t=' + new Date();

    $.ajax({
        url: urlUser,
        async: false,
        dataType: "json",
        success: function (Datajson) {


            if (Datajson == '1') {
                $("#btnfyfb").show();
                $("#myfav").show();
                $("#mycode").hide();
            }
            else {
                $("#mycode").show();
                $("#myfav").hide();
                $("#btnfyfb").hide();

            }




        }
    });


}








layui.use('upload', function () {
    var $ = layui.jquery
        , upload = layui.upload;

    //普通图片上传 身份11111111
    var uploadInst = upload.render({
        elem: '#test1',
        id: new Date().getTime(),
        size: 2 * 1024, //限制文件大小，单位 KB
        ext: 'bmp', //那么，就只会支持这三种格式的上传。注意是用|分割。 
        url: imgserver + '/Management/UploadFile.aspx?fname=' + escape(getCookie("custfnocookie")) + '&ftype=' + escape('身份证') + "&t=" + new Date(),
        auto: false,
        choose: function (obj) {
            obj.preview(function (index, file, result) {

                if ((file.size / 1000) < imgupsize) {
                    layer.msg('图片不能小于' + imgupsize + 'K');
                } else obj.upload(index, file); //文件上传


            });
        }
        , before: function (obj) {
            layer.msg('文件开始上传，请等待');
            $('#test1').hide();
            $('#myloading').show();

        },
        done: function (res) {
            //如果上传失败

            $('#test1').show();
            if (res.code > 0) {
                return layer.msg('上传失败');
            } else {
                //$('#demo1').attr('src', res.src); //图片链接（base64）
                $('#demo1').append('<div id="divimg-' + res.fid + '" ><img id="img-' + res.fid + '" height="150px" width="200px" src="' + res.data.src + '" alt="' + ''
                    + '" class="layui-upload-img"><br/><p id="delimg-' + res.fid + '"       class="glyphicon glyphicon-trash" style=" margin:5px; font-size:18px;background:red; color:white; " >删除</p><br/></div>');

                var xtypex = '1';
                $("#delimg-" + res.fid).click(function () {
                    //  $(this).hide();
                    // alert(res.fid);
                    delimg(res.fid, res.data.src, xtypex);
                });
                $('#myloading').hide();
                if ($('#demo' + xtypex + xtypex + ' .layui-badge').html() == undefined) $('#demo' + xtypex + xtypex + '').append('<span class="layui-badge">0</span>');
                $('#demo' + xtypex + xtypex + ' .layui-badge').html($('#demo' + xtypex + xtypex + ' .layui-badge').html() * 1 + 1);


            }
            if ($('#demo' + xtypex + xtypex + ' .layui-badge').html() * 1 >= 15) {
                $('#test' + xtypex).hide();

            }

            //上传成功
        }
        , error: function (data) {
            //演示失败状态，并实现重传
            $('#myloading').hide();
            //        var demoText = $('#demoText');
            //        demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
            //        demoText.find('.demo-reload').on('click', function () {
            //            uploadInst.upload();
            //        });
        }
    });

    //普通图片上传 户口22222222
    upload.render({
        elem: '#test2',
        id: new Date().getTime(),
        size: 2 * 1024, //限制文件大小，单位 KB
        //ext: 'bmp', //那么，就只会支持这三种格式的上传。注意是用|分割。
        url: '/Management/UploadFile.aspx?fname=' + escape(getCookie("custfnocookie")) + '&ftype=' + escape('户口') + "&t=" + new Date(),
        auto: false,
        choose: function (obj) {
            obj.preview(function (index, file, result) {

                if ((file.size / 1000) < imgupsize) {
                    layer.msg('图片不能小于' + imgupsize + 'K');
                } else obj.upload(index, file); //文件上传


            });
        }
        , before: function (obj) {
            layer.msg('文件开始上传，请等待');
            $('#test2').hide();
            $('#myloading').show();

        },
        done: function (res) {
            //如果上传失败

            $('#test2').show();

            if (res.code > 0) {
                return layer.msg('上传失败');
            } else {
                //$('#demo1').attr('src', res.src); //图片链接（base64）
                $('#demo2').append('<div id="divimg-' + res.fid + '" ><img id="img-' + res.fid + '" height="150px" width="200px" src="' + res.data.src + '" alt="' + ''
                    + '" class="layui-upload-img"><br/><p id="delimg-' + res.fid + '"       class="glyphicon glyphicon-trash" style="margin:5px; font-size:18px; background:red; color:white; " >删除</p><br/></div>');

                var xtypex = '2';
                $("#delimg-" + res.fid).click(function () {
                    //  $(this).hide();
                    // alert(res.fid);
                    delimg(res.fid, res.data.src, xtypex);
                });
                $('#myloading').hide();
                if ($('#demo' + xtypex + xtypex + ' .layui-badge').html() == undefined) $('#demo' + xtypex + xtypex + '').append('<span class="layui-badge">0</span>');
                $('#demo' + xtypex + xtypex + ' .layui-badge').html($('#demo' + xtypex + xtypex + ' .layui-badge').html() * 1 + 1);
                if ($('#demo' + xtypex + xtypex + ' .layui-badge').html() * 1 >= 15) {
                    $('#test' + xtypex).hide();

                }

            }


            //上传成功
        }
        , error: function () {
            //演示失败状态，并实现重传
            $('#myloading').hide();
            //        var demoText = $('#demoText');
            //        demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
            //        demoText.find('.demo-reload').on('click', function () {
            //            uploadInst.upload();
            //        });
        }
    });


    //普通图片上传  社保3333333333
    upload.render({
        elem: '#test3',
        id: new Date().getTime(),
        size: 2 * 1024, //限制文件大小，单位 KB
        //ext: 'bmp', //那么，就只会支持这三种格式的上传。注意是用|分割。
        url: '/Management/UploadFile.aspx?fname=' + escape(getCookie("custfnocookie")) + '&ftype=' + escape('社保') + "&t=" + new Date(),
        auto: false,
        choose: function (obj) {
            obj.preview(function (index, file, result) {

                if ((file.size / 1000) < imgupsize) {
                    layer.msg('图片不能小于' + imgupsize + 'K');
                } else obj.upload(index, file); //文件上传


            });
        }
        , before: function (obj) {
            layer.msg('文件开始上传，请等待');
            $('#test3').hide();
            $('#myloading').show();

        },
        done: function (res) {
            //如果上传失败

            $('#test3').show();

            if (res.code > 0) {
                return layer.msg('上传失败');
            } else {
                //$('#demo1').attr('src', res.src); //图片链接（base64）
                $('#demo3').append('<div id="divimg-' + res.fid + '" ><img id="img-' + res.fid + '" height="150px" width="200px" src="' + res.data.src + '" alt="' + ''
                    + '" class="layui-upload-img"><br/><p id="delimg-' + res.fid + '"       class="glyphicon glyphicon-trash" style="margin:5px; font-size:18px; background:red; color:white; " >删除</p><br/></div>');

                var xtypex = '3';
                $("#delimg-" + res.fid).click(function () {
                    //  $(this).hide();
                    // alert(res.fid);
                    delimg(res.fid, res.data.src, xtypex);
                });
                $('#myloading').hide();
                if ($('#demo' + xtypex + xtypex + ' .layui-badge').html() == undefined) $('#demo' + xtypex + xtypex + '').append('<span class="layui-badge">0</span>');
                $('#demo' + xtypex + xtypex + ' .layui-badge').html($('#demo' + xtypex + xtypex + ' .layui-badge').html() * 1 + 1);
                if ($('#demo' + xtypex + xtypex + ' .layui-badge').html() * 1 >= 15) {
                    $('#test' + xtypex).hide();

                }

            }


            //上传成功
        }
        , error: function () {
            //演示失败状态，并实现重传
            $('#myloading').hide();
            //        var demoText = $('#demoText');
            //        demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
            //        demoText.find('.demo-reload').on('click', function () {
            //            uploadInst.upload();
            //        });
        }
    });

    //普通图片上传  婚姻状况4444
    upload.render({
        elem: '#test4',
        id: new Date().getTime(),
        size: 2 * 1024, //限制文件大小，单位 KB
        //ext: 'bmp', //那么，就只会支持这三种格式的上传。注意是用|分割。
        url: '/Management/UploadFile.aspx?fname=' + escape(getCookie("custfnocookie")) + '&ftype=' + escape('婚姻状况') + "&t=" + new Date(),
        auto: false,
        choose: function (obj) {
            obj.preview(function (index, file, result) {

                if ((file.size / 1000) < imgupsize) {
                    layer.msg('图片不能小于' + imgupsize + 'K');
                } else obj.upload(index, file); //文件上传


            });
        }
        , before: function (obj) {
            layer.msg('文件开始上传，请等待');
            $('#test4').hide();
            $('#myloading').show();

        },
        done: function (res) {
            //如果上传失败

            $('#test4').show();

            if (res.code > 0) {
                return layer.msg('上传失败');
            } else {
                //$('#demo1').attr('src', res.src); //图片链接（base64）
                $('#demo4').append('<div id="divimg-' + res.fid + '" ><img id="img-' + res.fid + '" height="150px" width="200px" src="' + res.data.src + '" alt="' + ''
                    + '" class="layui-upload-img"><br/><p id="delimg-' + res.fid + '"       class="glyphicon glyphicon-trash" style="margin:5px; font-size:18px; background:red; color:white; " >删除</p><br/></div>');

                var xtypex = '4';
                $("#delimg-" + res.fid).click(function () {
                    //  $(this).hide();
                    // alert(res.fid);
                    delimg(res.fid, res.data.src, xtypex);
                });
                $('#myloading').hide();
                if ($('#demo' + xtypex + xtypex + ' .layui-badge').html() == undefined) $('#demo' + xtypex + xtypex + '').append('<span class="layui-badge">0</span>');
                $('#demo' + xtypex + xtypex + ' .layui-badge').html($('#demo' + xtypex + xtypex + ' .layui-badge').html() * 1 + 1);
                if ($('#demo' + xtypex + xtypex + ' .layui-badge').html() * 1 >= 15) {
                    $('#test' + xtypex).hide();

                }

            }


            //上传成功
        }
        , error: function () {
            //演示失败状态，并实现重传
            $('#myloading').hide();
            //        var demoText = $('#demoText');
            //        demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
            //        demoText.find('.demo-reload').on('click', function () {
            //            uploadInst.upload();
            //        });
        }
    });



    //普通图片上传  房产555
    upload.render({
        elem: '#test5',
        id: new Date().getTime(),
        size: 2 * 1024, //限制文件大小，单位 KB
        //ext: 'bmp', //那么，就只会支持这三种格式的上传。注意是用|分割。
        url: '/Management/UploadFile.aspx?fname=' + escape(getCookie("custfnocookie")) + '&ftype=' + escape('房产') + "&t=" + new Date(),
        before: function (obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function (index, file, result) {
                $('#myloading').show();
                // $('#demo1').attr('src', result); //图片链接（base64）
            });
        },
        done: function (res) {
            //如果上传失败

            if (res.code > 0) {
                return layer.msg('上传失败');
            } else {
                //$('#demo1').attr('src', res.src); //图片链接（base64）
                $('#demo5').append('<div id="divimg-' + res.fid + '" ><img id="img-' + res.fid + '" height="150px" width="200px" src="' + res.data.src + '" alt="' + ''
                    + '" class="layui-upload-img"><br/><p id="delimg-' + res.fid + '"       class="glyphicon glyphicon-trash" style="margin:5px; font-size:18px; background:red; color:white; " >删除</p><br/></div>');

                var xtypex = '5';
                $("#delimg-" + res.fid).click(function () {
                    //  $(this).hide();
                    // alert(res.fid);
                    delimg(res.fid, res.data.src, xtypex);
                });
                $('#myloading').hide();
                if ($('#demo' + xtypex + xtypex + ' .layui-badge').html() == undefined) $('#demo' + xtypex + xtypex + '').append('<span class="layui-badge">0</span>');
                $('#demo' + xtypex + xtypex + ' .layui-badge').html($('#demo' + xtypex + xtypex + ' .layui-badge').html() * 1 + 1);
                if ($('#demo' + xtypex + xtypex + ' .layui-badge').html() * 1 >= 15) {
                    $('#test' + xtypex).hide();

                }

            }


            //上传成功
        }
        , error: function () {
            //演示失败状态，并实现重传
            $('#myloading').hide();
            //        var demoText = $('#demoText');
            //        demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
            //        demoText.find('.demo-reload').on('click', function () {
            //            uploadInst.upload();
            //        });
        }
    });


    //普通图片上传  收入6666
    upload.render({
        elem: '#test6',
        id: new Date().getTime(),
        size: 2 * 1024, //限制文件大小，单位 KB
        //ext: 'bmp', //那么，就只会支持这三种格式的上传。注意是用|分割。
        url: '/Management/UploadFile.aspx?fname=' + escape(getCookie("custfnocookie")) + '&ftype=' + escape('收入') + "&t=" + new Date(),
        auto: false,
        choose: function (obj) {
            obj.preview(function (index, file, result) {

                if ((file.size / 1000) < imgupsize) {
                    layer.msg('图片不能小于' + imgupsize + 'K');
                } else obj.upload(index, file); //文件上传


            });
        }
        , before: function (obj) {
            layer.msg('文件开始上传，请等待');
            $('#test6').hide();
            $('#myloading').show();

        },
        done: function (res) {
            //如果上传失败

            $('#test6').show();

            if (res.code > 0) {
                return layer.msg('上传失败');
            } else {
                //$('#demo1').attr('src', res.src); //图片链接（base64）
                $('#demo6').append('<div id="divimg-' + res.fid + '" ><img id="img-' + res.fid + '" height="150px" width="200px" src="' + res.data.src + '" alt="' + ''
                    + '" class="layui-upload-img"><br/><p id="delimg-' + res.fid + '"       class="glyphicon glyphicon-trash" style="margin:5px; font-size:18px; background:red; color:white; " >删除</p><br/></div>');

                var xtypex = '6';
                $("#delimg-" + res.fid).click(function () {
                    //  $(this).hide();
                    // alert(res.fid);
                    delimg(res.fid, res.data.src, xtypex);
                });
                $('#myloading').hide();
                if ($('#demo' + xtypex + xtypex + ' .layui-badge').html() == undefined) $('#demo' + xtypex + xtypex + '').append('<span class="layui-badge">0</span>');
                $('#demo' + xtypex + xtypex + ' .layui-badge').html($('#demo' + xtypex + xtypex + ' .layui-badge').html() * 1 + 1);
                if ($('#demo' + xtypex + xtypex + ' .layui-badge').html() * 1 >= 15) {
                    $('#test' + xtypex).hide();

                }

            }


            //上传成功
        }
        , error: function () {
            //演示失败状态，并实现重传
            $('#myloading').hide();
            //        var demoText = $('#demoText');
            //        demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
            //        demoText.find('.demo-reload').on('click', function () {
            //            uploadInst.upload();
            //        });
        }
    });



    //普通图片上传  征信7777
    upload.render({
        elem: '#test7',
        id: new Date().getTime(),
        size: 2 * 1024, //限制文件大小，单位 KB
        //ext: 'bmp', //那么，就只会支持这三种格式的上传。注意是用|分割。
        url: '/Management/UploadFile.aspx?fname=' + escape(getCookie("custfnocookie")) + '&ftype=' + escape('征信') + "&t=" + new Date(),
        auto: false,
        choose: function (obj) {
            obj.preview(function (index, file, result) {

                if ((file.size / 1000) < imgupsize) {
                    layer.msg('图片不能小于' + imgupsize + 'K');
                } else obj.upload(index, file); //文件上传


            });
        }
        , before: function (obj) {
            layer.msg('文件开始上传，请等待');
            $('#test7').hide();
            $('#myloading').show();

        },
        done: function (res) {
            //如果上传失败

            $('#test7').show();

            if (res.code > 0) {
                return layer.msg('上传失败');
            } else {
                //$('#demo1').attr('src', res.src); //图片链接（base64）
                $('#demo7').append('<div id="divimg-' + res.fid + '" ><img id="img-' + res.fid + '" height="150px" width="200px" src="' + res.data.src + '" alt="' + ''
                    + '" class="layui-upload-img"><br/><p id="delimg-' + res.fid + '"       class="glyphicon glyphicon-trash" style="margin:5px; font-size:18px; background:red; color:white; " >删除</p><br/></div>');

                var xtypex = '7';
                $("#delimg-" + res.fid).click(function () {
                    //  $(this).hide();
                    // alert(res.fid);
                    delimg(res.fid, res.data.src, xtypex);
                });
                $('#myloading').hide();
                if ($('#demo' + xtypex + xtypex + ' .layui-badge').html() == undefined) $('#demo' + xtypex + xtypex + '').append('<span class="layui-badge">0</span>');
                $('#demo' + xtypex + xtypex + ' .layui-badge').html($('#demo' + xtypex + xtypex + ' .layui-badge').html() * 1 + 1);
                if ($('#demo' + xtypex + xtypex + ' .layui-badge').html() * 1 >= 15) {
                    $('#test' + xtypex).hide();

                }

            }


            //上传成功
        }
        , error: function () {
            //演示失败状态，并实现重传
            $('#myloading').hide();
            //        var demoText = $('#demoText');
            //        demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
            //        demoText.find('.demo-reload').on('click', function () {
            //            uploadInst.upload();
            //        });
        }
    });

    //多图片上传 
    //        upload.render({
    //            elem: '#test2'
    //    , url: '/upload/'
    //    , multiple: true
    //    , before: function (obj) {
    //        //预读本地文件示例，不支持ie8
    //        obj.preview(function (index, file, result) {
    //            $('#demo2').append('<img src="' + result + '" alt="' + file.name + '" class="layui-upload-img">')
    //        });
    //    }
    //    , done: function (res) {
    //        //上传完毕
    //    }
    //});





    //        //指定允许上传的文件类型
    //        upload.render({
    //            elem: '#test3'
    //    , url: '/upload/'
    //    , accept: 'file' //普通文件
    //    , done: function (res) {
    //        console.log(res)
    //    }
    //        });
    //        upload.render({ //允许上传的文件后缀
    //            elem: '#test4'
    //    , url: '/upload/'
    //    , accept: 'file' //普通文件
    //    , exts: 'zip|rar|7z' //只允许上传压缩文件
    //    , done: function (res) {
    //        console.log(res)
    //    }
    //        });
    //        upload.render({
    //            elem: '#test5'
    //    , url: '/upload/'
    //    , accept: 'video' //视频
    //    , done: function (res) {
    //        console.log(res)
    //    }
    //        });
    //        upload.render({
    //            elem: '#test6'
    //    , url: '/upload/'
    //    , accept: 'audio' //音频
    //    , done: function (res) {
    //        console.log(res)
    //    }
    //        });

    //设定文件大小限制
    //        upload.render({
    //            elem: '#test7'
    //    , url: '/upload/'
    //    , size: 60 //限制文件大小，单位 KB
    //    , done: function (res) {
    //        console.log(res)
    //    }
    //        });

    //同时绑定多个元素，并将属性设定在元素上
    upload.render({
        elem: '.demoMore'
        , before: function () {
            layer.tips('接口地址：' + this.url, this.item, { tips: 1 });
        }
        , done: function (res, index, upload) {
            var item = this.item;
            console.log(item); //获取当前触发上传的元素，layui 2.1.0 新增
        }
    })



});






layui.use('element', function () {
    var $ = layui.jquery
        , element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

    //触发事件
    var active = {
        tabChange1: function (mytab) {
            //切换到指定Tab项

            if ($("input[name='fhyzk']:checked").val() == undefined) {

                layui.use(['layer'], function () {
                    layer = layui.layer; //弹层   

                    layer.msg('请选择婚姻状况');

                })
                return;
            }


            if ($("input[name='lmgf']:checked").val() == undefined) {

                layui.use(['layer'], function () {
                    layer = layui.layer; //弹层   

                    layer.msg('请选择是否联名购房');

                })
                return;
            }
            if ($("input[name='bdhk']:checked").val() == undefined) {

                layui.use(['layer'], function () {
                    layer = layui.layer; //弹层   

                    layer.msg('请选择是否本地户口');

                })
                return;
            }
            if ($("input[name='wcngf']:checked").val() == undefined) {

                layui.use(['layer'], function () {
                    layer = layui.layer; //弹层   

                    layer.msg('请选择是否有未成年子女');

                })
                return;
            }
            if ($("input[name='fkfs']:checked").val() == undefined) {

                layui.use(['layer'], function () {
                    layer = layui.layer; //弹层   

                    layer.msg('请选择付款方式');

                })
                return;
            }



            var urlUser = "/ajax.aspx?type=SQTJ"
                + "&flm=" + $("input[name='lmgf']:checked").val()
                + "&bdhk=" + $("input[name='bdhk']:checked").val()
                + "&fcardno=" + escape($("#fcardno").val())
                + "&fwcn=" + $("input[name='wcngf']:checked").val()
                + "&fhyzk=" + $("input[name='fhyzk']:checked").val()
                + "&fkfs=" + $("input[name='fkfs']:checked").val()
                + "&t=" + new Date();

            $.ajax({
                url: urlUser,
                async: false,
                dataType: "text",
                success: function (datax) {



                }
            });
            LoadImg(getCookie("custfnocookie"), '1', 'demo1');
            element.tabChange('demoxxx', 'demo11'); //切换到：用户管理
            //$("#demo11").css("background-color", "red");
            // $("#demo11").css("color", "white");
        }, tabChange2: function (mytab) {

            //切换到指定Tab项

            if ($('#demo11 .layui-badge').html() == undefined) {

                layui.use(['layer'], function () {
                    layer = layui.layer; //弹层   

                    layer.msg('必须上传身份信息');

                })
                return;
            }

            LoadImg(getCookie("custfnocookie"), '2', 'demo2');
            element.tabChange('demoxxx', 'demo22'); //切换到：用户管理
        }, tabChange3: function (mytab) { //户口-->婚姻状况
            //                   if ($('#demo22 .layui-badge').html() == undefined) {

            //                       layui.use(['layer'], function () {
            //                           layer = layui.layer; //弹层   

            //                           layer.msg('必须上传户口信息');

            //                       })
            //                       return;
            //                   }
            //切换到指定Tab项
            LoadImg(getCookie("custfnocookie"), '4', 'demo4');
            element.tabChange('demoxxx', 'demo44'); //切换到：用户管理

        }, tabChange4: function (mytab) {  //社保 -->收入
            //切换到指定Tab项
            //                 LoadImg(getCookie("custfnocookie"), '6', 'demo6');
            //                 element.tabChange('demoxxx', 'demo66'); //切换到：用户管理

            LoadImg(getCookie("custfnocookie"), '5', 'demo5');
            element.tabChange('demoxxx', 'demo55'); //切换到：用户管理


        }, tabChange5: function (mytab) {//婚姻状况-->社保
            //切换到指定Tab项
            LoadImg(getCookie("custfnocookie"), '3', 'demo3');
            element.tabChange('demoxxx', 'demo33'); //切换到：用户管理

            //                 LoadImg(getCookie("custfnocookie"), '5', 'demo5');
            //                 element.tabChange('demoxxx', 'demo55'); //切换到：用户管理
        }, tabChange6: function (mytab) {
            //切换到指定Tab项
            LoadImg(getCookie("custfnocookie"), '6', 'demo6');
            element.tabChange('demoxxx', 'demo66'); //切换到：用户管理
        }, tabChange7: function (mytab) {
            //切换到指定Tab项
            LoadImg(getCookie("custfnocookie"), '7', 'demo7');
            element.tabChange('demoxxx', 'demo77'); //切换到：用户管理
        }, tabChange8: function (mytab) {
            //切换到指定Tab项
            tjzl();
        }, tabChange888: function (mytab) {
            //切换到指定Tab项
            tjzl();
        }, tabChange9: function (mytab) {
            //切换到指定Tab项

            tjzl();
        }, tabChange101: function (mytab) {
            //切换到指定Tab项

            $('#samplePic1').show();

            $("#sfz1").attr('src', 'http://img3.taiyuehd.net/wap/images/sample/s-sfz.jpg');
            $("#sfz2").attr('src', 'http://img3.taiyuehd.net/wap/images/sample/jgz.jpg');
            $("#sfz3").attr('src', 'http://img3.taiyuehd.net/wap/images/sample/jrbzk.jpg');

        }, tabChange102: function (mytab) {
            //切换到指定Tab项

            $('#samplePic2').show();
            $("#hk1").attr('src', 'http://img3.taiyuehd.net/wap/images/sample/hksy.jpg');
            $("#hk2").attr('src', 'http://img3.taiyuehd.net/wap/images/sample/gry.jpg');

        }
        , tabChange103: function (mytab) {
            //切换到指定Tab项

            $('#samplePic3').show();
            $("#sb1").attr('src', 'http://img3.taiyuehd.net/wap/images/sample/mmt.jpg');
            $("#sb2").attr('src', 'http://img3.taiyuehd.net/wap/images/sample/sb.jpg');

        }, tabChange104: function (mytab) {
            //切换到指定Tab项

            $('#samplePic4').show();
            $("#hyzk1").attr('src', 'http://img3.taiyuehd.net/wap/images/sample/jhz.jpg');
            $("#hyzk2").attr('src', 'http://img3.taiyuehd.net/wap/images/sample/lhz.jpg');
            $("#hyzk3").attr('src', 'http://img3.taiyuehd.net/wap/images/sample/lhxys.jpg');

        }, tabChange105: function (mytab) {
            //切换到指定Tab项

            $('#samplePic5').show();
            $("#fc1").attr('src', 'http://img3.taiyuehd.net/wap/images/sample/fc.jpg');


        }, tabChange106: function (mytab) {
            //切换到指定Tab项

            $('#samplePic6').show();
            $("#sr1").attr('src', 'http://img3.taiyuehd.net/wap/images/sample/yz.jpg');
            //                   $("#sr2").attr('src', 'http://img3.taiyuehd.net/wap/images/sample/yhls.jpg');
            //                   $("#sr3").attr('src', 'http://img3.taiyuehd.net/wap/images/sample/gjjzm1.jpg');
            //                   $("#sr4").attr('src', 'http://img3.taiyuehd.net/wap/images/sample/gjjzm2.jpg');

        }, tabChange107: function (mytab) {
            //切换到指定Tab项

            $('#samplePic7').show();
            $('#samplePic7').show();
            $("#zx1").attr('src', 'http://img3.taiyuehd.net/wap/images/sample/zx.jpg');

        }
    };

    $('.site-demo-active').on('click', function () {
        var othis = $(this), type = othis.data('type');
        active[type] ? active[type].call(this, othis) : '';
    });





    //           $('#demo').on('click', function () {
    //               var othis = $(this), type = othis.data('type');
    //               active[type] ? active[type].call(this, othis) : '';
    //               alert(1111);
    //           });

    //           //Hash地址的定位
    //           var layid = location.hash.replace(/^#demo=/, '');
    //           element.tabChange('demo', layid);

    //           element.on('tab(demo)', function (elem) {
    //               location.hash = 'demo=' + $(this).attr('lay-id');
    //           });

});




layui.use(['form', 'layedit', 'laydate'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate;

    //日期
    laydate.render({
        elem: '#date'
    });
    laydate.render({
        elem: '#date1'
    });

    //创建一个编辑器
    var editIndex = layedit.build('LAY_demo_editor');



    //监听提交


    //本地户口 不需要提供
    form.on('radio(bdhk)', function (data) {
        //               if (data.value == 1) $('#demo33').hide();
        //               else $('#demo33').show();
    });

    //婚姻状况
    form.on('radio(fhyzk)', function (data) {
        //               if (data.value == 1) $('#demo44').hide();
        //               else $('#demo44').show();
    });

    //付款方式
    form.on('radio(fkfs)', function (data) {
        //               if (data.value == 1) {

        //                   $('#demo22').show();
        //                   $('#demo33').hide();
        //                   $('#demo44').show();
        //                   $('#demo55').hide();
        //                   $('#demo66').hide();
        //                   $('#demo77').hide();

        //                   $('#Button4').hide();
        //                   $('#Button2').show();

        //                   
        //               }
        //               else {
        //                   $('#demo22').show();
        //                   $('#demo33').show();
        //                   $('#demo44').show();
        //                   $('#demo55').show();
        //                   $('#demo66').show();
        //                   $('#demo77').show();

        //                   $('#Button4').show();
        //                   $('#Button2').hide();
        //               }
    });


    //  alert(lmgf);
    //表单初始赋值
    //           form.val('example', {
    //    "lmgf":'1',
    //    "wcngf":wcngf,
    //    "fhyzk": fhyzk 
    //           })

    //form.val('example', {
    //    "username": "贤心" // "name": "value"
    //    , "password": "123456"
    //    , "interest": 1
    //    , "like[write]": true //复选框选中状态
    //    , "close": true //开关状态
    //    , "lmgf": "是"
    //    , "desc": "我爱 layui"
    //})
    form.render();

});
