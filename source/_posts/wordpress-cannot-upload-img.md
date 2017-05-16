---
title: wordpress无法上传图片的解决办法
date: 2017-04-25 15:15:36
categories:
  - solution
  - wordpress
tags:
  - wordpress
  - 解决方法
---

在本地是用apache进行调试的，然后搬到nginx搭建的服务器上，就会出现wordpress无法上传图片、安装插件和更新的问题。

在搜索了很多类似于修改权限777的内容后，学习到了一些内容。因为修改权限对于服务器来说并非是安全的，所以不建议使用这个方法，而且此方法对于我遇到的问题是无效的。
以下是参阅了[烂泥][1]的一篇文章后总结的内容

#### **几个命令查看nginx、php-fpm以及mysql运行在哪个用户下：**
```bash
//nginx显示用户情况
ps aux |grep nginx
//php-fpm显示用户情况
ps aux |grep php-fpm
//mysql显示用户情况
ps aux |grep mysql
```
**导致网站不能上传图片是因为nginx和php-fpm用户不统一*

#### **在同一用户组之后再修改虚拟主机的根目录用户及用户组**
    
`chown <username>:<usergroup> -R <directory>`

#### **之后重启lnmp服务就可以在站点进行上传了**
    
`lnmp restart`
**通过lnmp添加的虚拟主机配置文件会显示：operation not permitted，但是并不会影响*

  [1]: http://www.ilanni.com/?p=7438