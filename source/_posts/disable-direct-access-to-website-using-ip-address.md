---
title: 宝塔面板如何禁止通过ip直接访问站点
date: 2018-07-18 15:28:59
tags: 
  - server
  - solution
categories:
  - solution
  - server
---
目前网站使用的宝塔面板  
为了防止通过ip直接访问站点  
需要修改vhost的伪静态配置文件  
在宝塔界面相关站点的伪静态选项中加上以下条件
```
location / {

    ...

    if ($host ~ ^\d+\.\d+\.\d+\.\d+$) {
        return 444;
    }
}
```
##### 参考
[宝塔论坛](https://www.bt.cn/bbs/thread-15900-1-1.html)