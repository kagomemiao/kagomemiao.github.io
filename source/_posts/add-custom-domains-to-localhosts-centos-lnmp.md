---
title: vagrant+vb+centos下本地lnmp的自定义域名设置
date: 2017-06-20 17:19:18
tags:
 - centos
 - 解决办法
 - vagrant
categories:
 - solution
 - centos
---
还是按操作创建虚拟主机`lnmp vhost add`填写自定义域名
一路操作下来后
centos虚拟机内
`vi /etc/hosts`添加`127.0.0.1 自定义域名`
可以创建个简单的index页面然后通过`curl 自定义域名`看能否查看内容
windows内
`C:\Windows\System32\drivers\etc`修改hosts，同centos一样添加
