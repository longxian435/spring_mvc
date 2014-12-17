package org.kevin.cache.dao;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.kevin.cache.domain.Data;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;

public class DataDAOImpl implements DataDAO
{
    private Map<Integer, Data> dataMap = new HashMap<Integer, Data>();  
    
    @CacheEvict(value = "data", allEntries = true)  
    public void add(Data data) {  
        System.out.println("Execute：public void add(Data data)");  
        System.out.println("--------------------------------"+data.getId());
        dataMap.put(data.getId(), data);  
    }  
  
    @CacheEvict(value = "data", allEntries = true)  
    public void update(Data data) {  
        System.out.println("Execute：public void update(Data data) ");  
        dataMap.put(data.getId(), data);  
    }  
  
    @Cacheable(value = "data")  
    public Data find(Integer id) {  
        System.out.println("Execute：public Data find(Integer id)");  
        return dataMap.get(id);  
    }  
  
    @CacheEvict(value = "data", allEntries = true)  
    public void delete(Integer id) {  
        System.out.println("Execute：public void delete(Integer id)");  
        dataMap.remove(id);  
    }  
  
    @Cacheable(value = "data")  
    public Collection<Data> getAll() {  
        System.out.println("Execute：public Collection<Data> getAll()");  
        return dataMap.values();  
    }  
    
}
