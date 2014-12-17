/**
 * Created by Terry on 2014/8/29 0029.
 */
var util = {
    /*
    * 图片预览 基于FileReader对象
    * @param f Object fileList或者单个文件对象
    * @param callback Function(imgUrl, imgIndex)
    * */
    previewImg: function(f, callback){
        if(!f){ return false;}
        if(f.length === undefined){
            f = [f]; // 如果f不是filelist而是单文件则将它组装成数组
        }
        var me = this;
        $.each(f, function(index, file){
            if(!/image\//.test(file.type)){
                return true
            }else{
                // 预览图片
                if(FileReader === undefined){
                    alert("您使用的浏览器不支持预览图片！");
                    return false;
                }
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(){
                    callback && callback.apply(me, [this.result, index]);
                    util.showTip().hide();
                };
            }
        });
    },
    /*
    * 将文件上传到七牛
    * @param files Object fileList或者单个文件对象
    * @param callback Function(res, file, index)
    * */
    qiniuUpload: function(files, type, callback){
        'use strict';
        if(!files){return false;}
        util.showTip("正在上传图片...", false, true, false).show();

        type = arguments.length === 3 ? type : "TICKET";
        callback = arguments.length === 3 ? callback : arguments[1];
        if(files.length === undefined){
            files = [files]; // 如果f不是filelist而是单文件则将它组装成数组
        }
        var me = this;
        for(var i = 0; i < files.length; i++){
            $.ajax({
                url: APIPATH + "/getfiletoken",
                type: "POST",
                data: {type: type},
                async: false,
                success: function(res){
                    if(res.obj){
                        var fd = new FormData();
                        fd.append("file", files[i]);
                        fd.append("token", res.obj);
                        $.ajax({
                            url: "http://upload.qiniu.com",
                            type: "POST",
                            data: fd,
                            async: false,  // 为了保证顺序不乱，采用同步上传
                            processData: false,  // tell jQuery not to process the data
                            contentType: false,   // tell jQuery not to set contentType
                            success: function(res){
                                callback && callback.apply(me, [res, files[i], i]);
                            },
                            error: function(){
                                util.showTip().hide();
                                alert("上传失败！");
                            }
                        });
                    }else{
                        util.showTip().hide();
                        alert("获取token失败！");
                    }
                }
            });
        }

    },
    /*
    * 将htmlStr字符串中的变量替换为dataObj中的同名的变量的值
    * htmlStr中的变量格式为：#{var} 将用dataObj[var]替换它
    * 支持Object和Array
    * */
    replaceVar: function(dataObj, htmlStr){
        var re = /#\{([a-zA-Z_$]\w+)\}/g, res = "";
        if(dataObj.length === undefined){
            for(k in dataObj){
                if(dataObj.hasOwnProperty(k)){
                    res = htmlStr.replace(re, function(match, p1){
                        if(dataObj[p1] != undefined) {
                            return dataObj[p1];
                        }else{
                            return "";
                        }
                    });
                }
            }
        }else{
            for(var k = 0; k < dataObj.length; k++){
                res = htmlStr.replace(re, function(match, p1){
                    if(dataObj[p1] != undefined) {
                        return dataObj[p1];
                    }else{
                        return "";
                    }
                });
            }
        }
        return res;
    },
    /*
     * 获取URL中的参数，返回键值对
     * */
    getUrlParam: function(){
        var args = {}; //声明一个空对象
        var query = window.location.search.substring(1); // 取查询字符串
        var pairs = query.split("&"); // 以 & 符分开成数组
        for(var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('='); // 查找 "name=value" 对
            if (pos == -1) continue; // 若不成对，则跳出循环继续下一对
            var argname = pairs[i].substring(0,pos); // 取参数名
            var value = pairs[i].substring(pos+1); // 取参数值
            value = decodeURIComponent(value); // 若需要，则解码
            args[argname] = value; // 存成对象的一个属性
        }
        return args; // 返回此对象
    },
    /*
     * 检测文件类型
     * param type {String} 要检测的类型，如："image"，2014-10-14添加图片大小500KB的限制
     * param files {Object} 文件列表或者单个文件
     * */
    checkFileType: function(type, files){
    	var f;
    	if(!type || !files){
    		return false;
    	}
        if(files.length){
            f = files;
        }else{
            f = [files];
        }
    	switch(type){
    		case "image":
    			for(var i=0; i<f.length; i++){
                    console.log(f[i])
    				if(!/image\/jpeg|image\/png|image\/gif/.test(f[i].type) || f[i].size > 512000){
                        return "包含非图片文件或者图片大小超过500KB的限制";
    				}
    			}
    			return false;
    			break;
            case "audio":
                for(var i=0; i<f.length; i++){
                    if(!/\/mp3/.test(f[i].type)){
                        return "请选择mp3格式的音频文件";
                    }
                }
                return false;
                break;
    		default:
    			return false;
    	}
    },
    /*
    * 查看大图
    * @param imgSelector {String} 小图的jquery选择器
    * @param cssObj {Object} 大图的css样式对象
    * */
    largeImgView: function(imgSelector, cssObj){
        if(!imgSelector){
            return false;
        }
        var $smallImg = $(imgSelector), // 小图jquery对象
            $largeImg = $(document.createElement("img")), // 大图jquery对象

            // 大图的默认样式
            style = {
                position: "absolute",
                maxWidth: "300px",
                border: "4px solid #fff",
                boxShadow: "0 0 4px 1px #999",
                zIndex: 999
            };
        var cssObj = cssObj ? $.extend(style, cssObj) : style ;
        $largeImg.css(cssObj).addClass("large-img");
        $smallImg.parent().css({position: "relative"});
        $smallImg.mouseover(function(evt){
            $largeImg.attr("src", $(this).attr("src"));
            $(this).parent().append($largeImg);

            // 检测插入大图的时候是否超出屏幕，如果超出就贴着底部放置
            if(evt.clientY + $(this).siblings(".large-img").height() > document.documentElement.clientHeight){
                $largeImg.css({
                    top:  document.documentElement.clientHeight - (evt.clientY + $(this).siblings(".large-img").height())
                });
            }
        }).mousemove(function(evt){
            // 鼠标相对于图片的位移
            var offsetX = evt.offsetX || (evt.clientX - evt.target.getBoundingClientRect().left);
            var offsetY = evt.offsetY || (evt.clientY - evt.target.getBoundingClientRect().top);

            // 大图x坐标跟随鼠标移动，y坐标超出屏幕下边缘之后不在移动
            $largeImg.css({
                left: offsetX + 30
            });
            if(evt.clientY + $(this).siblings(".large-img").height() < document.documentElement.clientHeight){
                $largeImg.css({
                    top:  offsetY
                });
            }
        }).mouseout(function(){
            $largeImg.remove();
        });
    },
    /*
    * 在屏幕中央显示提示
    * content {String} 提示的内容
    * hasBackground {Boolean} 是否有覆盖层
    * hasLoadingImg {Boolean} 是否有加载的图标
    * autoHide {Boolean} 提示是否自动消失
    * */
    showTip: function(content, hasCover, hasLoadingImg, autoHide){
        var $con = $( '<div class="pt10 pb10 pl20 pr20 pos-a br4 fs16" id="g-tip" style="background-color: #fff;border: 1px solid #aaa;">'+ content +'</div>' ),
            $cover = $( '<div class="h100 w100 l-0 t-0" id="g-cover" style="position: fixed;background-color: rgba(0,0,0,.3)"></div>' ),
            $body = $("body");
        return {
            show: function(){
                $con.css({
                    left: document.documentElement.clientWidth/2 - 100,
                    top: document.documentElement.clientHeight/2 - 100 + document.body.scrollTop
                });
                if(hasLoadingImg){
                    $con.prepend('<img src="'+ BASEPATH +'/res/img/loading.gif" class="middle mr5"/>');
                }
                if(hasCover){
                    $body.append($cover);
                }
                $body.append($con);
                if(autoHide){
                    setTimeout(function(){
                        $con.remove();
                        $cover.remove();
                    }, 2000);
                }
            },
            hide: function(){
                $("#g-tip").remove();
                $("#g-cover").remove();
            }
        };

    }
};