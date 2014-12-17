/* 全站公用的js */
$(function(){
	// 需要ajax方式的a标签的处理
	$("a[target='ajax']").click(function(){
        var that = this;
        var doAjax = function(){
            $.get($(that).attr("href"), function(res){
                if(res.statusCode && res.statusCode == 200){
                    dialog({
                        content: res.msg,
                        ok: function(){
                            if(res.forwardUrl){
                            	if(res.forwardUrl=='submit'){
                            		var targetForm = $("form.query");
                            		targetForm.submit();
                            	}else{
                            		location.href = APIPATH + res.forwardUrl;
                            	}
                            }else{
                                window.location.reload();
                            }
                        }
                    }).show();
                }else{
                    var msg = res.msg || "服务器错误！";
                    if(/403-/.test(res)){
                        msg = "没有权限！";
                    }
                    dialog({
                        title: "发生错误",
                        content: "<span class='text-error'>"+ msg +"</span>",
                        cancel: false,
                        ok: function(){

                        }
                    }).show();
                }
            });
        };
		if($(this).attr("title")){
            dialog({
                content: $(this).attr("title"),
                ok: function(){
                    doAjax();
                },
                cancel: function(){}
            }).show();
		}else{
            doAjax();
        }
		return false;
	});

    // 表格列搜索功能实现
    $("i.filter").parent().mouseenter(function(){
        var $this = $(this),
            $form = $("#query"),
            $input = $this.find("input[type='text']"),
            $select = $this.find("select");
        $input.width($this.width());
        $select.width($this.width());
        $this.css({position: "relative"});
        $input.css({
            position: "absolute",
            left: 0,
            top: $this.height() + 16
        });
        $select.css({
            position: "absolute",
            left: 0,
            top: $this.height() + 16
        });
        if($select.length){
            $select[0].onchange = function(){
                $form[0].submit();
            };
            $select.slideDown("fast");
        }else{
            $input.slideDown("fast").focus();
        }
        $(document).click(function(event){
            if(!$(event.target).siblings("i.filter").length){
                $this.find("input,select").slideUp("fast");
            }
        });
    });
});