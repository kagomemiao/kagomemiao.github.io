---
title: 如何使用git进行代码回滚
date: 2018-3-1 17:18:06
tags:
 - git
 - solution
categories:
 - solution
 - git
---
### 本地代码库回滚  
```git
# 回滚到指定的分支号
git reset --hard <commit-id>
# 回滚到最近的第N次提交
git reset --hard HEAD~N
```
  
### 远程代码库回滚  
先将本地分支回滚->删除远程分支->重新推送本地分支    
```git
# 切换到指定分支
git checkout <branchName>
# 将远程分支拉取到本地
git pull
# 备份当前分支
git branch branchName_backup
# 本地回滚
git reset --hard <commit-id>
# 删除远程分支(推送空内容到远程分支)
git push origin :<branchName>
# 将本地回滚后的分支推送
git push origin <branchName>
# 查看是否成功后 可选择删除备份
git branch -d <branchName>_backup
```
  
### 参考
1. [记一次git代码merge和回滚操作](https://zhuanlan.zhihu.com/p/27929977)