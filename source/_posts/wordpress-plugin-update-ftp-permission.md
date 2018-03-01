---
title: 解决wordpress安装升级插件需要ftp信息的方法
date: 2017-05-16 13:45:35
categories:
  - solution
  - wordpress
tags: 
  - wordpress
  - 解决办法
---
## wordpress博客在安装插件时提示需要输入FTP信息的解决办法：

### 步骤：

1. 修改wordpress配置文件`wp-config.php`

2. 在配置文件末尾添加如下代码：
```php
if(is_admin()) {
	add_filter('filesystem_method', create_function('$a','return "direct";' ));
	define('FS_CHMOD_DIR', 0751);
}
```
加上以上代码，就可以了