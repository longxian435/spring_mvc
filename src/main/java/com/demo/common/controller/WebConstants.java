package com.demo.common.controller;

import java.util.HashMap;
import java.util.Map;

public class WebConstants
{
    /**
     * 静态资源版本
     */
    public final static String RES_VESION = "res_vesion";
    /**
     * 用户保存到Session的Key
     */
    public final static String SESSION_USER = "ONLINE_SESSION_SYSUSERVO";

    /**
     * 用户权限
     */
    public final static String SESSION_USER_RIGHT = "right";

    /**
     * 用户角色
     */
    public final static String SESSION_USER_ROLE = "role_list";

    /**
     * 用户状态-激活
     */
    public final static byte USERSTATUS_ACTI = 1;

    /**
     * 登录成功
     */
    public final static int LOGIN_SUCESS = 200;
    /**
     * 登录失败，密码或用户名错误
     */
    public final static int LOGIN_FAILED_PASSORNAME_ERROR = 301;
    /**
     * 登录失败，用户锁定
     */
    public final static int LOGIN_FAILED_USERLOCK_ERROR = 302;
    /**
     * 登录失败，参数错误
     */
    public final static int LOGIN_FAILED_PARARM_ERROR = 303;

    /**
     * 登录错误码与页面展示的映射
     */
    public final static Map<Integer, String> LOGIN_MSG = new HashMap<Integer, String>(10);
    static
    {
        LOGIN_MSG.put(LOGIN_FAILED_PASSORNAME_ERROR, "密码或用户名错误");
        LOGIN_MSG.put(LOGIN_FAILED_USERLOCK_ERROR, "用户锁定,不能登录");
        LOGIN_MSG.put(LOGIN_FAILED_PARARM_ERROR, "参数错误");
    }

    /**
     * cookies ID
     */
    public final static String JSESSIONID = "JSESSIONID";

    /**
     * cookies 用户名
     */
    public final static String COOKIES_LOGIN_USERNAME = "COOKIES_LOGIN_USERNAMESSIONID";

    /**
     * 错误页
     */
    public final static String ERROR_VIEW = "error/error";

    /**
     * 一页多少条
     */
    public final static int PAGESIZE = 20;

    /**
     * 第几页
     */
    public final static int PAGENO = 1;

   

    public static final Map<Integer, Integer[]> ACTIVITY_STATUS_EXPAND = new HashMap<Integer, Integer[]>(10);
    static
    {// 把审核通过拆分成3个状态
        ACTIVITY_STATUS_EXPAND.put(21, new Integer[] { 2, 1 });// 已上线
        ACTIVITY_STATUS_EXPAND.put(22, new Integer[] { 2, 2 });// 待上线
        ACTIVITY_STATUS_EXPAND.put(23, new Integer[] { 2, 3 });// 已下线
    }
    
  
   
    /**
     * 发票分享URL
     */
    public static final String TICKET_SHARE_URL = "ticket_share_url";
}
