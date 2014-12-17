package org.kevin.cache.dao;

import java.util.Collection;

import org.kevin.cache.domain.Data;

public interface DataDAO
{
    
    public void add(Data data);
    
    public void update(Data data);
    
    public Data find(Integer id);
    
    public void delete(Integer id);
    
    public Collection<Data> getAll();
}
