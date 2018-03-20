---
title: mysql忘记密码
date: 
tags:
 - server
 - 解决办法
categories:
 - solution
 - server
---
### 前言
阿里云的服务器到期了 由于只是个小小的博客站   
决定换个vps就够了  
准备迁移wordpress 然而发现自己忘记了数据库的账号密码   
   
### 方法
1. 找到`my.conf`编辑 `vi /etc/my.conf`   
在`[mysqld]`选项下添加`skip-grant-table`   
我一般是加在socket的后一行   
2. 重启mysql服务 我嫌麻烦就直接`lnmp restart`   
当然你必须是使用lnmp进行搭建才行 不然还是老老实实`service mysqld restart`
3. 免密码登录mysql `mysql -u root -p`
4. 选择数据库 `use mysql`
5. 修改root密码 `UPDATE user SET password=password('password') WHERE User='root';`
6. 删除`my.conf`中的`skip-grant-table` 
7. 重启服务 同2
   
### 参考
1. [阿里云服务器忘记mysql的登录密码时候如何修改密码](http://blog.csdn.net/ckshcjhacmsabcbba/article/details/50783591)