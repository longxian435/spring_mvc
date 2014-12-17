package com.demo.controller;

import java.util.Collection;

import org.kevin.cache.dao.DataDAO;
import org.kevin.cache.domain.Data;
import org.springframework.context.support.ClassPathXmlApplicationContext;

//import org.log4mongo.AsynMongoURILayoutAppender;

public class CacheMain
{
    public static void main(String[] args)
    {
      
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("spring-cache-demo.xml");
        
        System.out.println("----------------------------->");
        DataDAO dataDAO = context.getBean("dataDao", DataDAO.class);
        
        
        //ApplicationContext context = new ClassPathXmlApplicationContext("spring-cache-demo.xml"); 
        
        //DataDAO dataDAO = (DataDAO)context.getBean("dataDao");
        
       
        dataDAO.add(new Data(1, "li", "wenkai"));
        Collection<Data> dataCollection = dataDAO.getAll();
        System.out.println("size----->"+dataCollection.size());
        
        System.out.println("=================================");
        
        dataDAO.add(new Data(2, "jack", "lee"));
        dataCollection = dataDAO.getAll();
        System.out.println("size----->"+dataCollection.size());
        
        Data data = dataDAO.find(1);
        System.out.println(data.getFirst());
        data = dataDAO.find(2);
        System.out.println(data.getFirst());
        data = dataDAO.find(2);
        System.out.println(data.getFirst());

        System.out.println("====================================");
        dataDAO.add(new Data(3, "kevin", "lee"));
        data = dataDAO.find(2);
        System.out.println(data.getFirst());
        data = dataDAO.find(3);
        System.out.println(data.getFirst());
        data = dataDAO.find(2);
        System.out.println(data.getFirst());
        
        dataCollection = dataDAO.getAll();
        System.out.println("size----->"+dataCollection.size());
        
        for (int i = 1; i <= dataCollection.size(); i++)
        {
            data = dataDAO.find(i);
            System.out.println(data.getFirst()+"<---->"+data.getSecond());
            System.out.println("******************************"+i);
        }
        
        
    }
}
