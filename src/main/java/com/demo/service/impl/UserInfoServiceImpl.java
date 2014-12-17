package com.demo.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.demo.commons.jcache.Cache;
import com.demo.commons.jcache.CacheFactory;
import com.demo.commons.jcache.CommonCache;
import com.demo.service.UserInfoService;
import com.demo.user.common.UserConstant;
import com.demo.user.model.UserInfo;

@Service("userInfoService")
public class UserInfoServiceImpl implements UserInfoService {

	private static Cache<String, List<UserInfo>> vestUserCache = CacheFactory
			.createCache("vestUserCache", CommonCache.CLEAN_BY_CREATE_TIME,
					120 * 1000, 100, 80, -1, -1, 60);// 写死代码里减少客户端配置，1m过期

	
	public void addVestUser(UserInfo userInfo)
    {
        //userInfoDao.addVestUser(userInfo);
		
        if (vestUserCache != null)
        {
        	//删除Cache
            vestUserCache.remove(UserConstant.FIND_VEST_USER_LIST);
        }
    }
	
	public void updateVestUser(UserInfo userInfo)
    {
       // userInfoMgtService.updateVestUser(userInfo);
        if (vestUserCache != null)
        {
            vestUserCache.remove(UserConstant.FIND_VEST_USER_LIST);
        }
    }

	
	@Override
	public List<UserInfo> findUserInfo() {
		List<UserInfo> list = vestUserCache == null ? null : vestUserCache.get(UserConstant.FIND_VEST_USER_LIST);
        // Cache List 不为空直接返回
        if (list != null)
        {
            return list;
        }
        list=new ArrayList<UserInfo>();
        UserInfo userInfo=new UserInfo();
        userInfo.setPassword("1234456");
        userInfo.setUserName("dengwenjun");
        userInfo.setId(11);
        // list = userInfoMgtService.findVestUserList();
        list.add(userInfo);
        // 添加到Cache
        if (vestUserCache != null && list != null)
        {
            vestUserCache.put(UserConstant.FIND_VEST_USER_LIST, list);
        }
        return list;
	}
	
	

}
