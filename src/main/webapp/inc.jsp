<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<c:set var="root" value="${pageContext.request.contextPath}"/>

<%
String path = request.getContextPath();    
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";    
pageContext.setAttribute("basePath",basePath);    
%>

<head>

<script type="text/javascript">
	var BASEPATH = '${root}';
	var APIPATH = "http://${header['host']}${pageContext.request.contextPath}";	
</script>
<!-- <script type="text/javascript" src="http://web-res.qiniudn.com/jquery-1.8.3.min.js"></script> -->
<script type="text/javascript" src="http://web-res.qiniudn.com/jquery-1.11.1.js"></script>

<script type="text/javascript" src="http://web-res.qiniudn.com/jquery.validate.min.js"></script>
<script type="text/javascript" src="http://web-res.qiniudn.com/bootstrap.min.js"></script>
<script type="text/javascript" src="${root}/res/js/form-validation.js?v=${res_vesion}"></script>

<link href="http://web-res.qiniudn.com/bootstrap.min.css"  rel="stylesheet" media="screen">
<link href="http://web-res.qiniudn.com/bootstrap-responsive.min.css" rel="stylesheet" media="screen">
<!-- 日期选择控件  -->
<script type="text/javascript" src="${root}/res/plugin/My97DatePicker/WdatePicker.js?v=${res_vesion}"></script>

<!-- jquery tmpl -->
<script src="http://web-res.qiniudn.com/jquery.tmpl.min.js"></script>

<link   href="http://web-res.qiniudn.com/ui-dialog.css" rel="stylesheet">
<script src="http://web-res.qiniudn.com/dialog-plus-min.js"></script>

<script src="${root}/res/js/util.js?v=${res_vesion}"></script>
<script src="${root}/res/js/com.js?v=${res_vesion}"></script>

<link href="http://web-res.qiniudn.com/base.css?v=${res_vesion}" rel="stylesheet" type="text/css" media="screen"/>
<link href="${root}/res/css/weekend.css?v=${res_vesion}" rel="stylesheet" type="text/css" media="screen"/>
<link href="${root}/res/css/main.css?v=${res_vesion}" rel="stylesheet" type="text/css" media="screen"/>



<script>
$.fn.tpl = function(data){
	$.template('template', $(this).html().replace(/@/g,"$"));
	return $.tmpl('template', data);
};
</script>
</head>