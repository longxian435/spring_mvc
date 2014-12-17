$(function(){
	$(".top-img input:file,.poster input:file").change(function(){
		if(!this.files.length){
			return false;
		}
        var t = util.checkFileType("image", this.files);
		if(t){
			alert(t);
            t = null;
			return false;
		}
		var file = this.files,
			img  = $(this).siblings("img"),
			tip  = $(this).siblings(".up-tip");
			key  = $(this).siblings("input:hidden");

		// 预览图片并上传
		util.qiniuUpload(file,"TICKET", function(res){
			util.previewImg(file, function(url){
				img.attr("src", url).show();
				tip.remove();
				key.val(res.key);
			});
		});

	});
	
	/**
	 * 节目类型的下拉菜单联动
	 */
	var catSelect = function(){
		var data,
			top = $("#top_category"),
		    sub = $("#sub_category");
		var insertOpt = function(sel, text, val){
			if(sel === undefined){
				return false;
			}
			var opt = new Option();
			opt.text = text || "";
			opt.value = val || "";
			sel.add(opt);
		};
		$.get(APIPATH + "/ticket/getcategory", function(res){
			data = (res && res.obj) ? res.obj : {};
			
			// 插入顶级栏目
			$.each(data, function(i, n){
				insertOpt(top[0], n.name, n.id);
			});
			
			// 初始化下级栏目
			$.each(data[0].child, function(k, v){
				insertOpt(sub[0], v.name, v.id);
			});
			
			// 如果是编辑页，填入待编辑的数据
			if( typeof parentId != "undefined" && typeof childId != "undefined" ){
				top.find("option[value="+parentId+"]").attr('selected', true);
				sub.find("option[value="+childId+"]").attr('selected', true);
			}
			
			// 下级栏目的联动
			top.change(function(){
				sub[0].length = 0;
				var that = this;
				$.each(data, function(i, n){
					if(n.id == that.options[that.selectedIndex].value){
						$.each(n.child, function(k, v){
							insertOpt(sub[0], v.name, v.id);
						});
					}
				});
			});
		});
		    
	};
	
	//catSelect();

});