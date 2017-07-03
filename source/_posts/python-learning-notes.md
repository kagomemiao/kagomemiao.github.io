---
title: python学习笔记
date: 2017-07-03 16:16:57
tags: 
  - python
  - 笔记
categories:
  - python
---
### Python学习中的一些问题记录及解决方法
#### `Python: URLError: <urlopen error [Errno 10060]`
如果是从国内网站访问一些不翻墙无法访问的网站，需要在`urlopen`里面配置代理： 
```python
def function(name):
    #because i am here in china so i need proxy to access some site
    p = {"http":"http://127.0.0.1:1080"} #这里我是用的shadowsocks，所以端口配置和ss的一致
    c = urllib.urlopen("http://www.google.com", proxies = p)
```

