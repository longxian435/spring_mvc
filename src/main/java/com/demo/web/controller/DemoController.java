package com.demo.web.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.demo.util.AjaxJson;

@Controller
@RequestMapping(value = "/test")
public class DemoController {
	private static final Logger logger = Logger.getLogger(DemoController.class);

	@RequestMapping("list")
	public String list(HttpServletRequest request, ModelMap modelMap)
			throws Exception {
		System.out.println("----------------------------->");
		return "student_add";
	}

	@RequestMapping("login")
	// 请求url地址映射，类似Struts的action-mapping
	public String testLogin(HttpServletRequest request) {
		logger.info("Product adding to database...");
		logger.error("-dsadsdsa错误");
		return "student_add";
	}

	@RequestMapping("delVote")
	@ResponseBody
	public AjaxJson delVote(Model model, Integer activityId) {
		AjaxJson json = new AjaxJson();
		json.setSuccessedRes(null, "/test/list/");
		return json;
	}
}
