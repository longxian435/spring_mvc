package com.demo.common.listener;


import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.joda.time.DateTime;

import com.demo.common.controller.WebConstants;


@WebListener
public class SysInitListener implements ServletContextListener
{
    public void contextInitialized(ServletContextEvent sce)
    {
        ServletContext sc = sce.getServletContext();
        String timestamp = String.valueOf(DateTime.now().getMillis());
        // 静态资源版本
        sc.setAttribute(WebConstants.RES_VESION, timestamp);
        System.out.println("-*-------------------------------------------->");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce)
    {
        // TODO Auto-generated method stub

    }

    public static void main(String[] args)
    {
        System.out.println(DateTime.now().getMillis());
    }
}
