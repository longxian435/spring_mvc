package com.demo.user.common;

public class UserConstant {
	/** 用户状态: 锁定 */
	public static final Byte STATUS_DISABLED = 0;
	/** 用户状态: 激活正常但未绑定手机号 */
	public static final Byte STATUS_UNBIND_MOBILE = 1;
	/** 用户状态: 正常且已绑定手机号 */
	public static final Byte STATUS_BIND_MOBILE = 2;

	/************* 用户通知类型 *********************************/
	/** 官方 */
	public static final int MESSAGE_ORG = 0;
	/** 回复话题 */
	public static final int MESSAGE_REPLY_TOPIC = 1;
	/** 评论回复 */
	public static final int MESSAGE_REPLY_COMMENT = 2;

	/** 获取马甲账号key */
	public static final String FIND_VEST_USER_LIST = "findVestUserList";

}