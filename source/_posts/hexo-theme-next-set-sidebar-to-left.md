---
title: 让NexT主题的Muse模板侧边栏居左
date: 2017-05-24 16:20:55
categories:
  - solution
  - hexo
tags:
  - hexo
  - theme-next
---
### 前言
目前hexo的NexT主题只有Pisces支持定义侧边栏位置  
但是我目前使用的是Muse主题 并且想让其在左侧  
### 方法
步骤其实很简单  
你需要：
#### 修改`motion.js`
首先调整侧边栏收放的动画效果 把原本从右至左的压缩页面变成从左至右  
这个文件在next主题下`source\js\src`  
使用Ctrl+F查找`paddingRight` 把其修改为`paddingLeft`就可以了

#### 调整自定义css
调整完动画之后就很简单了 把sidebar相关的部件通过修改css的方法移动到左侧  
直接在`source\css\_custom`下为`custom.styl`添加内容即可  
```css
.sidebar-toggle{
    left:30px;
}
.sidebar{
    left:0;
}
```
这里我还是把`back-to-top`这个按钮留在了右侧  
如果你偏向一并放在左侧 添加以下css
```css
.back-to-top{
    left:30px;
}
```
#### 修改箭头动画方向
追求完美的话，可以把箭头指向从左改成右  
参照以下内容修改`motion.js`文件
```javascript
  var sidebarToggleLine1st = new SidebarToggleLine({
    el: '.sidebar-toggle-line-first',
    status: {
      arrow: {width: '60%', rotateZ: '45deg', top: '2px', left: '50%'},
      close: {width: '100%', rotateZ: '-45deg', top: '5px'}
    }
  });
  var sidebarToggleLine2nd = new SidebarToggleLine({
    el: '.sidebar-toggle-line-middle',
    status: {
      arrow: {width: '90%'},
      close: {opacity: 0}
    }
  });
  var sidebarToggleLine3rd = new SidebarToggleLine({
    el: '.sidebar-toggle-line-last',
    status: {
      arrow: {width: '60%', rotateZ: '-45deg', top: '-2px', left: '50%'},
      close: {width: '100%', rotateZ: '45deg', top: '-5px'}
    }
  });
```   
   
<small>--- 2018年4月4日更新 ---</small>
#### 容器选择
由于想美化侧边栏，把它弄成半透明的，然后发现不管怎么调整都还是不透明   
后来发现问题出在之前修改的`motion.js`上面   
由于选择器是body，所以当展开左侧侧边栏时，把body同时向右压缩以适应页面  
这样就导致了侧边栏透明度不管怎么调整都还是不透明，因为下面是`body`的背景色而并不是侧边栏不能调整透明   
所以我就把motion.js中选择的两个`body`改成了`.container`  
`NexT.utils.isDesktop() && $('.container').velocity('stop')`
   
   