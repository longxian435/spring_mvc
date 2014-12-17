package org.kevin.cache.domain;

public class Data
{
    private Integer id;
    
    private String first;
    
    private String second;
    
    public Data(Integer id, String first, String second)
    {
        this.id = id;
        this.first = first;
        this.second = second;
    }
    
    public String getFirst()
    {
        return first;
    }
    
    public void setFirst(String first)
    {
        this.first = first;
    }
    
    public String getSecond()
    {
        return second;
    }
    
    public void setSecond(String second)
    {
        this.second = second;
    }
    
    public void setId(Integer id)
    {
        this.id = id;
    }
    
    public Integer getId()
    {
        return id;
    }
}
