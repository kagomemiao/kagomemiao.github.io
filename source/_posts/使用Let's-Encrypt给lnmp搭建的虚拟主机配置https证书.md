---
title: 使用Let's Encrypt给lnmp搭建的虚拟主机配置https证书
date: 2018-12-03 15:49:28
tags:
    - https
    - nginx
categories:
    - server
    - nginx
---
现在网上免费ssl证书很多 我选择的是Let's Encrypt  
因为他可以自动更新证书认证 只需要使用官网的[certbot](https://certbot.eff.org/)  
在certbot可以选择具体的web服务程序和操作系统  
这里我是以debian操作系统下的nginx服务来进行的  
#### 具体步骤
1. 安装certbot
```
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
```
2. 生成证书以及公私钥
```
sudo ./certbot路径/certbot-auto certonly --webroot -w /网站根目录/ -d 域名.com
```
3. 配置nginx
```
server {
    listen 80;
    server_name www.域名.com;
    rewrite ^(.*)$ https://${server_name}$1 permanent; 
}
server {
    listen 443;
    server_name www.你的域名.com;
    root /你的网站目录/;
    ssl on;
    ssl_certificate     /etc/letsencrypt/live/你的域名.com/cert.pem;
    ssl_certificate_key /etc/letsencrypt/live/你的域名.com/privkey.pem;
    ....
}
```
4. 添加crond自动任务
```
crontab -e
# 加上
* * * */1 * /usr/bin/certbot renew 1>> /dev/null 2>&1
```
#### 问题
我在生成证书过程遇到了nginx403报错，原因是因为nginx配置文件指定路径被deny，这就需要在nginx的配置里加上  
```
location ~ /.well-known {
  allow all;
}
```
#### 参考
1. [certbot文档](https://certbot.eff.org/docs/)
2. [DingBlog - 给你的网站加上小绿锁，配置Let's Encrypt 免费SSL证书](http://dingdingblog.com/article/99)

