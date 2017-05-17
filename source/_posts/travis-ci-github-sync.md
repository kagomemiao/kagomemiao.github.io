---
title: 这是一篇心态爆炸的travis集成自动构建gitpage的解决方案
date: 2017-05-16 17:55:13
categories:
  - solution
  - hexo
tags:
  - 心态爆炸
  - hexo
  - 解决办法
  - travis ci
---
## 关于
由于在office和家里都会有更新文章的时候 
重新部署的时候又略嫌麻烦且难以同步更新两处文件 
所以参考网上的一些方法做了一个持续集成[^ci]的自动部署 
以便实现多人/多处更新后使用`git push`到repo后travis[^travis]自动化构建hexo博客
#### 工作原理
```flow
io1=>inputoutput: New Code
op1=>operation: Source Control
op2=>operation: Continuous Integration
io2=>inputoutput: Production

io1->op1->op2->io2
```
#### 具体方法
具体的travis ci自动同步方法网上一搜一大片，比如： 

[使用 Travis CI 自动部署 Hexo][1]
[手把手教你使用Travis CI自动部署你的Hexo博客到Github上][2]

## 一些问题
在follow教程中遇到了很多问题，导致最后就是心态爆炸 
但最终还是成功部署
我这里只写我遇到的一些坑 
### Error 1. git分支push问题
这个问题是由于我偷懒，直接通过github网页新建`source`分支产生的 
#### 先讲一下git远程分支的一些命令：
`git branch` 查看分支，<font color="green">***绿色**</font>为当前分支 
`git remote -v` 查看远程主机和仓库地址 
`git remote add <shortname> <url>` 添加远程仓库 
如果有提示错误，类似已有远程仓库，`git remote rm`之后重新添加就好了 

*\*基本理解就是把你当前文件夹和远程仓库对应分支进行关联以便push同步*

更多详细的操作可参考[Git远程操作详解][3] 

通过本地`git push origin source`后会提示如下：
```git
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Merge the remote changes (e.g. 'git pull')
hint: before pushing again.
```
这是由于通过webpage新建分支是直接clone master分支的内容，所以source分支内容不为空 
由于source内clone的内容对我并不重要，所以我使用了最简单暴力的`git push -f`：直接强行推送覆盖远程仓库
##### 其他方法
**方法1：push前先将远程repository修改pull下来**
```
git pull origin master
git push -u origin master
```
**方法2：若不想merge远程和本地修改，可以先创建新的分支**
`git branch [name]`然后再push`git push -u origin [name]`

### Error 2. git push `theme/next`无内容
猜想原因是由于主题文件通过`git clone`进行安装的，所以push上去会没有内容 
于是 

 - 我fork了一份next的主题（并不好使）
 - 新建了一个repo，把自己本地的next主题内容push了上去（完美）

这里你要用到上面提到的git关联仓库的方法进行push 
再在博客根目录新建`.gitmodules`，写入以下内容 
```
[submodule "themes/next"]
    path = themes/next
    url = git://github.com/yourname/your_theme_repo.git #这里可能会引发Error4
```
*\*这里用submodule的方法把source分支下themes/next和新建的repo进行关联* 

参考[Travis CI自动部署Hexo博客到Github][4]
### Error 3. travis build fatal error
此问题基本是因为问题2中主题文件缺失，导致一些自定义标签未定义产生的 
修正问题2后就ok了 
### Error 4. travis log 提示 `git permission denied`
如果你正确配置了travis的环境变量后还是出现了permission denied 
但是通过hexo d能正常推送 
这个问题**可能**会出现，是由于在配置`.gitmodules`文件时，url使用git而不是https，反之亦然
```
url = git://github.com/yourname/your_theme_repo.git
修改为
url = https://github.com/yourname/your_theme_repo.git
```
## 使用方法
在本地编辑文章后
```
git add . #提交文件到缓存区
git commit -m "msg" #添加本次提交说明
git push <shortname> <branch> #提交
```
基本上就这些，另附我的.travis.yml配置：
```
language: node_js
node_js: stable

# cache this directory
cache:
  directories:
    - node_modules #缓存本地package

# S: Build Lifecycle
before_install:
- export TZ='Asia/Shanghai' #设定时区
- npm install -g hexo
- npm install -g hexo-cli

install:
  - npm install
  
before_script:
  - npm install -g gulp #如果使用gulp优化才需要这一行

script:
  - git submodule init #用于更新主题,更新源为自己的主题项目，否则会clone最新NexT主题，而官方主题配置文件没有设置
  - git submodule update
  - hexo clean && hexo g
  - gulp default #使用 gulp 对流程进行优化，不使用可以删除这一行

after_script:
  - cd ./public
  - git init
  - git config user.name "yourname"
  - git config user.email "youremail"
  - git add .
  - git commit -m "Update docs"
  - git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:master

# E: Build LifeCycle

branches:
  only:
    - branch #需要监听的分支名，这里是博客的源文件分支
env:
 global:
   - GH_REF: github.com/yourname/yourname.github.io.git
   #设置GH_REF，注意更改yourname
```

[^ci]: 持续集成：Continuous Integration，简称CI: 在一个项目中，任何人对代码库的任何改动，都会触发CI服务器自动对项目进行构建，自动运行测试，甚至自动部署到测试环境。这样做的好处就是，随时发现问题，随时修复。因为修复问题的成本随着时间的推移而增长，越早发现，修复成本越低。

[^travis]: [Travis CI][5]是在线托管的开源持续集成构建项目，不需要搭建服务器，它采用yaml格式且对开源项目免费。

[1]: http://www.jianshu.com/p/5e74046e7a0f
[2]: http://www.jianshu.com/p/e22c13d85659
[3]: http://www.ruanyifeng.com/blog/2014/06/git_remote.html
[4]: https://xin053.github.io/2016/06/05/Travis%20CI%E8%87%AA%E5%8A%A8%E9%83%A8%E7%BD%B2Hexo%E5%8D%9A%E5%AE%A2%E5%88%B0Github/
[5]: https://travis-ci.org/