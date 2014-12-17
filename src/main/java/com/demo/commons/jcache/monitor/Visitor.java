package com.demo.commons.jcache.monitor;

import com.demo.commons.jcache.AutoRefreshCacheBase;
import com.demo.commons.jcache.Cache;
import com.demo.commons.jcache.adv.AdvAutoSaveCache;
import com.demo.commons.jcache.adv.AdvCache;

public interface Visitor
{

    void visitAutoRefreshCache(AutoRefreshCacheBase<?, ?> cache, String name);

    void visitAdvAutoSaveCache(AdvAutoSaveCache<?, ?> cache, String name);

    void visitAdvCache(AdvCache<?, ?> cache, String name);

    void visitCustomCache(Cache<?, ?> cache, String name);
}
