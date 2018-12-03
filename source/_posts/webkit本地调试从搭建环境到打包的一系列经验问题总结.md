---
title: webkit本地调试从搭建环境到打包的一系列经验问题总结
date: 2018-12-03 16:35:57
tags:
  - webkit
  - git
  - server
categories:
  - server
---
#### 从git clone项目到本地仓库
一个server端  
一个client端  
遇到的主要是server的本地环境调试和client的请求问题  
我用的vagrant搭建的centos虚拟机 这样可以在Windows下轻松一键ssh 调整配置也是一键reload就好  
参考网友说在centos系统下装宝塔管理系统 很方便 为了这种方便 让我焦头烂额了一晚上  
phpmyadmin打不开 由于瞎参考 一开始对vagrantfile的理解不够 没有加上端口转发 所以一直404 加上端口转发就好了 光宝塔的端口开启没有用的  
之后是路由问题 整个server只有一个入口文件可以访问 其他全部404 因为伪静态问题 也可以修改nginx配置文件解决 期间我读了半天代码 各种参数调试我也是醉了  
然后想办法把数据导入 学习到了没有设置主键的数据表只能通过sql修改  
好不容易server弄好  
client验证不通过 一开始是直接404  
后来auth fail 接着auth error  
心路历程太曲折了 要慢慢回忆  
最后终于进去了 数据要拷贝不然各种报错 后面还好都是小问题了  
数据库md5大小写是 auth半天不成功的原因 生成的apikey是大写decode64的  
调试要下载webdriver 有很多版本  
之后就是发现需要把client放进另外个虚拟机 这样避免影响本机操作  
所以又开了个win的虚拟机 还好有模板  
但是网络要重新设置 一个nat一个桥接  
还有虚拟机的hosts文件要加上 centos物理ip地址和绑定的调试域名  
之前主机只需要127.0.0.1 现在两台虚拟机加主机就需要用分配的虚拟ip地址了(192.168.x.x)  
win查询ipconfig  
centos ifconfig  
大功告成 学到很多 好累啊  
先这样后期加  