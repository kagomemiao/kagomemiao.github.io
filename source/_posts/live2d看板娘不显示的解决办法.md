title: live2d看板娘不显示的解决办法
author: Katerina Wang
tags:
  - hexo
  - live2d
categories:
  - solution
  - hexo
date: 2018-04-06 16:44:00
---
之前瞎逛网站看到了几个不错的博客安装了[hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)  
于是自己也尝试搞了一个shizuku的简单模型(默认的其中之一)  
在公司的电脑上配置好了能看见, 然而回到家里的mac上却看不见  
用chrome的console看了一下问题是`Live2D widgets: Failed to create WebGL context.`  
检查到是没有开启WebGL这个选项, 所以如果你使用了live2d但是却不显示 那么可能就是你的浏览器没有开启或者不支持WebGL   
chrome用户可以通过`chrome://gpu`来查看是否开启  
如果没有的话, 可以按照以下步骤开启:
1. 打开`chrome://settings`,在'高级-系统'里面打开'使用硬件加速模式(如果可用)'
2. 打开`chrome://flags` 把'Override software rendering list'和'WebGL Draft Extensions'选为'Enabled'
3. 重启浏览器  

之后重新加载使用了live2d的网站，等待几秒就能看见可爱的看板娘了  

### 参考
[How to enable/Fix WebGL on Google Chrome (3 Easy steps!!!)
](https://www.youtube.com/watch?v=Nz_HgqzmRkQ)