---
title: git忽略本地文件的方法
date: 2017-06-20 17:19:18
tags:
 - git
 - 解决办法
categories:
 - solution
 - git
---
### 前言
这次做项目使用的nodejs和express框架，尝试用`git push`来本地上传项目到仓库，再从服务器把项目源码`git pull`下来 
但是由于本地和服务器使用了不同的数据库，所以数据库的配置文件是有差别的  
为了每次不把本地测试的数据库配置push到仓库，以及从仓库pull到服务器的时候不覆盖服务器的配置文件，这里记录一些git的操作  
 
### 方法
**1. `.gitignore`文件**  
此文件中保存的文件 都会被忽略以及`.gitignore`文件本身会被提交到版本库中，属于global的  
也就是说 需要所有端都忽略的文件就可以保存在这里面  
此文件的优点是 根目录与子目录可以有不同的`.gitignore`文件，由于git不会加入空目录，这个方法适用于想保留空目录但是忽略目录内的文件，在想要保留的目录下创建`.gitignore`并加入以下内容：  
```git
# 这里*代表该目录内所有文件
*
!.gitignore
```
** 需要注意的是，如果想要忽略的文件已经被纳入版本库了，那么修改`.gitignore`是无效的 *  
 
**2.	`.git/info/exclude`文件**  
如果只是想本地忽略，那么可以把想要忽略的文件添加到`.git/info/exclude`文件中  
被添加的文件只会在本地生效，且`.git/info/exclude`文件不会提交到版本库中  

但是在部署过程中我发现，一旦被忽略的文件有改动，就会出现很多问题
比如：
```bash
error: Untracked working tree file 'app.js' would be overwritten by merge.  Aborting
```

```bash
error: Your local changes to the following files would be overwritten by merge:
	package.json
Please commit your changes or stash them before you merge.
```
`git reset --hard`
`git pull`
 
 
   
`git submodule update --recursive --remote`
```bash
Submodule path 'themes/next': checked out 'someBranchId'
```
 
`cd blog`
`git pull origin master`
```bash
fatal: refusing to merge unrelated histories
```
`git pull origin master --allow-unrelated-histories` 

  
参考： 
1. http://www.itopers.com:8080/blog/posts/tools/git/git_config.html 
2. http://wyqbailey.github.io/2015/04/02/git%20update-index.html 
3. https://ruby-china.org/topics/17948 
4. https://stackoverflow.com/questions/8598937/git-update-index-assume-unchanged-returns-error 