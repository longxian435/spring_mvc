package com.demo.util;

import java.util.Map;

/**
 * $.ajax后需要接受的JSON
 * 
 * @author: oyytoy
 * @date 2014年3月10日 上午11:03:58
 */
public class AjaxJson {
	private boolean successed = true;// 是否成功
	private String msg = "操作成功";// 提示信息
	private Object obj = null;// 其他信息
	private Map<String, Object> map;// 其他参数
	private Integer statusCode;// 错误码
	private String forwardUrl; // 转向url，表示当前tab或者dialog跳转到指定的url

	public void setSuccessedRes(Object obj, String forwardUrl) {
		this.successed = true;
		this.statusCode = 200;
		this.obj = obj;
		this.forwardUrl = forwardUrl;
	}

	public void setErrorRes(int statusCode) {
		this.successed = false;
		this.statusCode = (statusCode == 0 ? 300 : statusCode);
		this.msg = "操作失败";
	}

	public AjaxJson setErrorRes(int statusCode, String msg) {
		this.successed = false;
		this.statusCode = (statusCode == 0 ? 300 : statusCode);
		this.msg = msg;
		return this;
	}

	public String getForwardUrl() {
		return forwardUrl;
	}

	public void setForwardUrl(String forwardUrl) {
		this.forwardUrl = forwardUrl;
	}

	public Integer getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(Integer statusCode) {
		this.statusCode = statusCode;
	}

	public boolean isSuccessed() {
		return successed;
	}

	public void setSuccessed(boolean successed) {
		this.successed = successed;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Object getObj() {
		return obj;
	}

	public void setObj(Object obj) {
		this.obj = obj;
	}

	public Map<String, Object> getMap() {
		return map;
	}

	public void setMap(Map<String, Object> map) {
		this.map = map;
	}

	@Override
	public String toString() {
		return "AjaxJson [successed=" + successed + ", msg=" + msg + ", obj="
				+ obj + ", map=" + map + "]";
	}

}
