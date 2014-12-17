$(function(){
	// ajax提交表单及验证，给表单加上"target='ajax'"属性即可，后台返回结果包含“forwardUrl"即可实现跳转
	$("form").length && $("form").validate({
		submitHandler: function(form){
			var $this = $(form);
			if($this.attr("target") === "ajax"){
				$.ajax({
					url: $this.attr("action"),
					type: "post",
					data: $this.serialize(),
					success: function(res){
                        if(res.statusCode && res.statusCode == 200){
                            dialog({
                                content: res.msg,
                                ok: function(){
                                    if(res.forwardUrl){
                                        location.href = APIPATH + res.forwardUrl;
                                    }else{
                                        location.back();
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
					}
				});	
			}else{
				form.submit();
			}
		},
		errorElement: "span",
		errorClass:"help-block text-error",
        ignore: false,
		errorPlacement: function(error, element) {
			if($(element).parents(".controls").size()){
				$(element).parents(".controls").append(error);
			}else{
				$(element).parent().append(error);
			}
		    
		},
		highlight: function(element, errorClass){
			$(element).parents(".control-group").addClass("error");
		},
		unhighlight: function(element, errorClass){
			$(element).parentsUntil(".control-group").parent().removeClass("error");
		},
		// 特殊的验证规则添加到这里，key:输入框的name；value:验证名+验证值
		rules: {
			/*drawRate: {
				range: [0-100]
			}*/
		}
		
	});

    jQuery.validator && $.extend(jQuery.validator.messages, {
		required: "不能为空",
	    remote: "请修正该字段",
	    email: "请输入正确格式的电子邮件",
	    url: "请输入合法的网址",
	    date: "请输入合法的日期",
	    dateISO: "请输入合法的日期 (ISO).",
	    number: "请输入合法的数字",
	    digits: "只能输入整数",
	    creditcard: "请输入合法的信用卡号",
	    equalTo: "请再次输入相同的值",
	    accept: "请输入拥有合法后缀名的字符串",
	    maxlength: jQuery.validator.format("请输入一个 长度最多是 {0} 的字符串"),
	    minlength: jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),
	    rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
	    range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
	    max: jQuery.validator.format("请输入一个最大为{0} 的值"),
	    min: jQuery.validator.format("请输入一个最小为{0} 的值")
	});
    jQuery.validator && jQuery.validator.addMethod("phone", function (value, element) {
	   var length = value.length;  
	   var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;  
	   var tel = /^\d{3,4}\s?-?\s?\d{7,9}$/;  
	   return this.optional(element) || (tel.test(value) || mobile.test(value));  		 
	 
	}, "请填写正确的联系电话");  
});
	