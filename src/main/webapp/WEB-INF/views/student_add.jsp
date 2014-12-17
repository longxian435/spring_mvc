<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="root" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>添加</title>
</head>
 <script type="text/javascript" src="http://web-res.qiniudn.com/jquery-1.11.1.js"></script>
 
<script type="text/javascript">
$(function(){	
	$("a[target='ajax']").click(function(){
		var that = this;
		if(confirm($(this).attr("title"))){
			$.ajax({
			 	type: "post",
			 	url: $(that).attr("href"), 
			 	dataType:"json",
			 	success: function(data){  
			 		alert("删除成功！");
			 	}
			 });
		}
		else{
			return false;
		}
		
		
	});
});
function dialogAjax(json){
   alert(json);
}
</script>
<body>
	<div style="text-align: center;">
		<a href="${root}/test/delVote" target="ajax" title="确定要删除吗？">删除1</a>
		<br/>
		
		<a class="delete" href="${root}/test/delVote" target="ajax" title="确定要删除吗?"><span>删除2</span></a>
	</div>
	<form method="post"
		action="<%=request.getContextPath()%>/student.do?method=save">
		<div>
			<c:out value="${addstate}"></c:out>
		</div>
		<table>
			<tr>
				<td>姓名</td>
				<td><input id="user" name="user" type="text" /></td>
			</tr>
			<tr>
				<td>密码</td>
				<td><input id="psw" name="psw" type="text" /></td>
			</tr>
			<tr>
				<td colSpan="2" align="center"><input type="submit" value="提交" />
				<input type="button" onclick="turnback()" value="返回" /></td>
			</tr>
		</table>

	</form>
</body>
</html>