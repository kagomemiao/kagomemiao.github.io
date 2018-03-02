---
title: github创建submodule以及关联同步远程fork源
date: 2018-2-28 16:37:27
tags:
 - github
categories:
 - solution
 - git
---
### 前言  
NexT更新到v6.0了，通过作者的[Update from NexT v5.1.x](https://github.com/theme-next/hexo-theme-next/blob/master/docs/UPDATE-FROM-5.1.X.md)说明，我准备采用这种办法，即便出现问题也可以切换回去  
之前的老版本并没有fork，当时也没想那么多  
现在觉得既然fork过来，那么以后就可以同步源了  
### fork源仓库  
这个很简单，可以直接通过网页右上角的fork到自己的repo，就略过了  
~~### 本地添加远程仓库  ~~
~~本地先新建directory/文件夹，在该路径下`git init`  
 添加远程仓库`git remote add <origin> <git@github.com:remote/repo.git>` 这里origin是远程仓库的名字，后面是远程仓库的地址  
 再把远程仓库同步到本地`git pull origin master`~~
### 主仓库项目添加子模块(submodule)
<small>
~~最开始添加了远程仓库然后加子模块，发现git直接把整个目录clone下来了，并且文件是在以repo命名的文件夹下，所以创建子模块一定是要在上一级路径下，比如我的子模块是next的主题，那么就要在theme这个文件夹下创建~~  
由于一开始创建错误，需要删除掉该子模块:   
`git submodule deinit -f <mod_name>`  
mod_name是该子模块的目录名  
由于我还没有添加模块信息，所以不需要进行`git rm -cached <mod_name>`删除.gitmodule中的记录
</small>
#### 添加子模块  
后来发现由于我的理解失误，其实子模块应该是创建在主项目路径下的
由于一开始理解错误，在theme这个文件夹下创建了submodule导致了子模块创建在了另一个主题下，然后我只好进行[代码回滚](http://katerina.wang/2018/03/01/git-revert-tips/).  

`git submodule add <git@github.com...> local/directory`  

##### 问题1  
```bash
'repo' already exists in the index
```
两种解决办法:  
1. 换个没起过的名字
2. unstage之前添加的submodule: `git rm -r <repo-name>`，不管出现什么提示，之后再进行`git submodule add`就没有问题了  
提交子模块到远程仓库: `git commit -m "added <name> submodule"`  
  
##### 问题2  
```bash
A git directory is found locally with remote(s)
```
1. 删除`.gitmodules`中相关的内容:  
```bash
[submodule "path_to_submodule"]
    path = path_to_submodule
    url = https://github.com/path_to_submodule
```
2. 删除`.git/config`中相关的内容:  
```bash
[submodule "path_to_submodule"]
    url = https://github.com/path_to_submodule
```
3. 删除`.git/modules/path_to_submodule`文件夹
4. 之后再进行`git submodule add...`
  
### 添加上游仓库  
1. 首先进入到该submodule目录查看远程状态:  
```git
cd your/submodule
git remote -v
# origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
# origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
```
2. 添加fork源仓库: 
```git
git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
```
3. 查看是否配置成功:   
```git
git remote -v
# origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
# origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
# upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (fetch)
# upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (push)
```
### 同步fork源
从fork源fetch分支内容: `git fetch upstream`  
会被存到一个本地的分支`upstream/master`中: 
```git
From https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY
 * [new branch]      master     -> upstream/master
```
切换到本地分支: `git checkout master`  
把源分支合并到本地master上: `git merge upstream/master`   这样本地修改的内容也不会被覆盖  
本地修改内容后，就可以进行add，commit和push了  
之后再push到远程仓库中: `git push origin master`  

  
### 参考:   
1. [Add a submodule which can't be removed from the index
](https://stackoverflow.com/questions/12218420/add-a-submodule-which-cant-be-removed-from-the-index/39189599)  
2. [git中本地与远程库的关联与取消](http://blog.csdn.net/wsycsdn19930512/article/details/50574217)  
3. [[Git] 如何优雅的删除子模块](https://www.jianshu.com/p/ed0cb6c75e25)  
4. [【Git】子模块: 一个仓库包含另一个仓库](https://www.jianshu.com/p/491609b1c426)  
5. [同步一个 fork](https://gaohaoyang.github.io/2015/04/12/Syncing-a-fork/)
6. [Git submodule add: “a git directory is found locally” issue](https://stackoverflow.com/questions/20929336/git-submodule-add-a-git-directory-is-found-locally-issue)