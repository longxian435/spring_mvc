/**
 * Created by Terry on 2014/8/29.
 */
$(function(){
    $("#wk_upfile").change(function(){
        var files = this.files;
        var t = util.checkFileType("image", this.files);
        if(t){
            alert(t);
            t = null;
            return false;
        }
        var html = '<li title="点击设为封面" data-index="#{index}">'
                    + '<img src="#{url}" alt="图片"/>'
                    + '<p class="wk-cover none">封面</p>'
                    + '<span class="wk-pic-close">x</span>'
                    + '<input type="hidden" name="pics[].uri" value="#{key}" class="wk-pic-uri"/>'
                    + '<input type="hidden" name="pics[].ord" value="" class="wk-pic-ord"/>'
                    + '<input type="hidden" name="pics[].isCover" value="" class="wk-pic-isCover"/>'
                 + '</li>';
        util.qiniuUpload(files,"WEEKEND", function(res, file, index){
            util.previewImg(file, function(imgUrl){
                var dataObj = {"key": res.key, "url": imgUrl, "index": index};
                var $li = $(util.replaceVar(dataObj, html));
                $(".wk-pic-list").append($li);
                initPicList(".wk-pic-list");

                // 设置第一个为默认封面
                setCover(0);

                // 绑定设置封面事件
                $li.click(function(){
                    setCover($(this));
                });

                // 绑定关闭事件
                $li.find(".wk-pic-close").click(function(e){
                    removePic($li);
                    e.stopPropagation();
                });
            });
        });
    });
    
    // 实现标签选择浮层
    var $wrap = $(".wk-cat-wrap"),
    	$wrapUl = $wrap.find("ul");
	$("input[name='catname']").click(function(){
	    if($wrapUl.find("li").size()){
	        $wrap.fadeIn("fast");
	    }else{
	        var liStr = '<li><label class="checkbox"><input type="checkbox" value="#{id}" #{checked} name="categorieIds"/><span class="pl5">#{text}</span></label></li>';
	       // var activityId = util.getUrlParam().activityId || "";
	        $.post(APIPATH + "/week/getacticategory/",{"activityId": activityId}, function(res){
	            if(res.obj){
	                $.each(res.obj, function(i,r){
	                    r.checked = r.checked ? "checked" : "";
	                    $wrapUl.append(util.replaceVar(r, liStr));
	                });
	                $wrap.fadeIn("fast");
	            }
	        });
	    }
	});
	$(".wk-cat-submit").click(function(){
	    var txt = [],
	        val = [];
	    $wrap.find("input:checkbox").each(function(){
	        if($(this).prop("checked")){
	            txt.push($(this).siblings("span").text());
	            val.push($(this).val());
	        }
	    });
	    $("input[name='catname']").val(txt.join(","));
	    //$("input[name='categorieIds']").val(val.join(","));
	    $wrap.fadeOut("fast");
	    return false;
	});
	$(".wk-cat-cancel").click(function(){
		$wrap.fadeOut("fast");
		return false;
	});
	
	// 实现地点选择提示
    var $addr  = $("input[name='addressName']"),
        $addrV = $("input[name='Address.id']"),
        $recWrap = $(".wk-addr-rec"),
        originVal,
        notFoundTip = "无此地点";
    $addr.on("keyup", function(){
        if(this.value === ""){
            $addr.val("");
            $addrV.val("");
            $recWrap.fadeOut("fast");
            return false;
        }
        var kw = this.value,
            liStr = '<li data-id="#{id}" data-mobile="#{mobile}">#{abbreName}</li>',
            $ul   = $recWrap.find("ul");
        $.post(APIPATH + "/week/getaddressbykeyword", {keyWord: kw}, function(res){
            $ul.empty();
            $recWrap.fadeIn("fast");
            if(res.obj.length){
                $.each(res.obj, function(i, v){
                    $ul.append(util.replaceVar(v, liStr));
                });
                $ul.find("li").click(function(){
                    $addr.val($(this).text());
                    $addrV.val($(this).attr("data-id"));
                    $("input[name='mobile']").val($(this).attr("data-mobile")); // 自动填入地点的联系电话
                    $recWrap.fadeOut("fast");
                    return false;
                });
                $recWrap.show("fast");
            }else{
                var r = {id: "", abbreName: notFoundTip};
                $ul.append(util.replaceVar(r, liStr));
            }
        });
    }).on("focus", function(){
        originVal = $(this).val();
    }).on("blur", function(){
        if($(this).val() != originVal){
            $(this).val("");
            $addrV.val("");
        }
        $recWrap.fadeOut("fast");
    });

    // 是否有图片的验证
    $("button[type='submit']").click(function(){
        if(!$(".wk-pic-list li").length){
            alert("图片不能为空！");
            return false;
        }
        if($(".wk-pic-list li").length > 9){
            alert("图片不能超过9张！");
            return false;
        }
    })

});

//初始化图片列表
var initPicList = function(picUl){
    var $pics = $(picUl + " li");
    $.each($pics, function(i, p){
        var $uri = $(this).find(".wk-pic-uri");
        var $ord = $(this).find(".wk-pic-ord");
        var $isCover = $(this).find(".wk-pic-isCover");
        $(this).attr("data-index", i); // 给每个li设置data-index属性作为序号

        // 设置表单名和值
        $uri.attr("name", "pics[" + (i) + "].uri");
        $ord.attr("name", "pics[" + (i) + "].ord");
        $isCover.attr("name", "pics[" + (i) + "].isCover");
        $ord.val(i);
    });
};

var initEditPic = function(){
	var lis = $(".wk-pic-li");
	$.each(lis,function(i,n){
		var $li = $(n);
		// 绑定设置封面事件
        $li.click(function(){
            setCover($(this));
        });

        // 绑定关闭事件
        $li.find(".wk-pic-close").click(function(e){
            removePic($li);
            e.stopPropagation();
        });
	});
};

// 删除一个图片
var removePic = function($li){
    var $close = $li.find(".wk-pic-close");
    $li.remove();
    initPicList(".wk-pic-list"); // 删除后重新初始化图片列表

    // 如果删除的是当前封面则把第一个设为封面
    if(!$(".wk-pic-isCover[value='true']").size()){
        setCover(0);
    }
};

// 设置一个图片为封面
// 如果param是数字则为要设置的序号，如果是Li节点则取其data-index属性作为序号
var setCover = function(param){
    var $li = $(".wk-pic-list li"),
        $cover = $li.find(".wk-cover"),
        $isCover = $(".wk-pic-isCover"),
        i = isNaN(param) ? parseInt(param.attr("data-index")) : param;
    $li.attr("title", "点击设置封面");
    $cover.hide();
    $isCover.val(false);
    $li.eq(i).attr("title", "当前封面");
    $cover.eq(i).show();
    $isCover.eq(i).val(true);
};

