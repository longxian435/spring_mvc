package com.demo.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;


public class JavaDemo
{
    public static void main(String[] args)
    {
        
        String date1 = "2013-10-16";
        
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        try
        {
            Date d1 = df.parse(date1);
            System.out.println("d1==" + df.format(d1));
            Calendar g = Calendar.getInstance();
            g.setTime(d1);
            g.add(Calendar.MONTH, +6);
            Date d2 = g.getTime();
            System.out.println("d2=======" + df.format(d2));
        }
        catch (ParseException e)
        {
            e.printStackTrace();
        }
    }
}
