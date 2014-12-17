/**
 * 
 */
package com.demo.commons.jcache;

import com.demo.commons.jcache.monitor.Visitable;

/**
 * @author bingyi
 */
public abstract class AutoRefreshCacheBase<K, V> implements Cache<K, V>, Visitable
{

    abstract public long getReflushTime();

    public abstract String getReflushingStatus();

}
