---
title: Painter大神的Adobe-2018全家桶安装方法以及无限试用
date: 2018-06-10 21:46:37
tags: 
 - hack
 - adobe
 - amtemu
categories: 
 - hack
 - adobe
permalink: how-to-activate-adobe-CC-2018-and-renew-trial
---
### 方法
1. [官网](https://www.adobe.com/mena_en/creativecloud/desktop-app.html)下载Adobe Creative Cloud
2. 申请个Email或者使用已有的  
3. 然后通过Creative Cloud来安装各种软件的试用 比如PS或者DW
    ##### 如果提醒试用到期的话  
    可以通过修改相关软件下`/AMT/application`文件(注意是无后缀的那一个)里面的SerialNumber来重新试用  
    随便改几个数字后保存 只要位数一致就ok  
    <small>*如果提示没有权限就右键该文件-属性 修改权限后再尝试</small>
4. 下载AMTemu工具 可以通过搜索'AMTemu v0.9.2'来下载
5. 下载`AdobeCreativeCloudCleanerTool.exe`备用
6. 断网后运行AMTemu工具 需要修改的参数有三个 第三个参数Version需要你右键想修改的软件的exe文件(不是快捷方式 所以是在软件目录里 比如Photoshop.exe)-属性-详细信息中的产品版本 例如19.1.4 其他两个参数请参照以下
    ###### Photoshop
        Application Name: Adobe Photoshop CC 2018
        Application LEID: V7{}Photoshop-19-Win-GM
    ###### Illustrator
        Application Name: Adobe Illustrator CC 2018
        Application LEID: V7{}Illustrator-22-Win-GM
    ###### XD (Experience Design)
        Application Name: Adobe XD CC 2018
        Application LEID: V7{}XD-1-Win-GM
    ###### After Effects
        Application Name: Adobe After Effects CC 2018
        Application LEID: V7{}AfterEffects-15-Win-GM
    ###### Animate
        Application Name: Adobe Animate CC 2018
        Application LEID: V7{}Animate-18-Win-GM
    ###### Audition
        Application Name: Adobe Audition CC 2018
        Application LEID: V7{}Audition-11-Win-GM
    ###### Character Animator
        Application Name: Adobe Character Animator CC 2018
        Application LEID: V7{}CharacterAnimator-1-Win-GM
    ###### Dreamweaver
        Application Name: Adobe Dreamweaver CC 2018
        Application LEID: V7{}Dreamweaver-18-Win-GM
    ###### InDesign
        Application Name: Adobe InDesign CC 2018
        Application LEID: V7{}CharacterAnimator-13-Win-GM
    ###### Premier Pro
        Application Name: Adobe Premier Pro CC 2018
        Application LEID: V7{}PremierPro-12-Win-GM
7. 修改完相对应的参数后点Install然后定位到该软件目录下选择`amtlib.dll`文件再点击打开(以防万一可以先备份一下原文件) 中途跳出来的框可以选否 等待AMTemu自己运行后就算成功了
8. 删除Creative Cloud 如果删不掉就用步骤5中下载好的工具 我下载的是可选择性删除的版本 具体可参考[这篇文章](https://blog.csdn.net/testcs_dn/article/details/52334691)
---
### 参考
1. [reddit/Piracy: Trick to Activate Adobe CC 2018 (including Adobe XD)](https://www.reddit.com/r/Piracy/comments/7bpiq6/trick_to_activate_adobe_cc_2018_including_adobe_xd/)