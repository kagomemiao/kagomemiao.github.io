---
title: hexo首页只显示特定分类/标签下的文章
date: 2017-05-02 16:25:06
categories:
  - solution
  - hexo
tags:
  - hexo
  - 解决办法
---
## 前言
由于我为[music]分类单独设置了页面，所以不希望这个分页出现在首页。
## 在网上查找了很多办法:
#### hexo-generator-index2
比如使用插件[hexo-generator-index2](https://github.com/Jamling/hexo-generator-index2)来替换hexo-generator-index，使其增加过滤功能。

~~但实际使用中，hexo-generator-index2的include/exclude开启后无法正常生成index.html
推断是由于hexo版本更新到<font color=green>3.2</font>后推出了同样的include/exclude选项导致冲突。~~
{% note warning %}
~~Hexo 3.2更新后不允许配置文件中存在重复的选项设置。 
因此，如果 站点配置文件 中存在同名的配置，则需要将两者配置在一起。~~
{% endnote %}
~~但可能由于这里两者功能不同，所以无法配置在一起。
需等待作者回复~~
{% note info %}
<font color=blue>5/4</font> 作者回复他的博客并没有出现上述问题
{% endnote %}

那这就是最佳的方法了，具体使用方式如下：

##### 安装
```
  $ npm install hexo-generator-index2 --save
  $ npm uninstall hexo-generator-index --save
```
**hexo-generator-index2包含了原始插件所有内容，并添加了过滤功能。*

##### 配置选项
```
  index_generator:
    per_page: 10 # 每页显示文章数，设置0为不分页
    order_by: -date # 文章排序，默认为按时间先后排序
    include:
      - category Web # 包含分类为'Web'的文章，可自行修改
    exclude:
      - tag Hexo # 过滤标签为'Hexo'的文章，可自行修改
```
##### 选项说明
*per_page*和*order_by*都是原始官方插件的选项，可以不用修改

*include/exclude*可选属性有：
  - category: 文章分类
  - tag: 文章标签
  - path: 文章路径

使用过滤功能需在属性后添加具体过滤的值，格式可参照选项配置。

选项配置需添加在站点配置文件中。

#### 修改主题layout文件
这个方法是我在next主题的[github issues - 是否可以在主页只显示特定category下的文章](https://github.com/iissnan/hexo-theme-next/issues/843)下找到的
由[@chenkaiwei](https://github.com/chenkaiwei)提出修改next主题layout-index.swig的方法以实现标签过滤
```
  <section id="posts" class="posts-expand">
    {% for post in page.posts %}
        {% for tag in post.tags %}
            {% if tag.name=='<tagname>' %} 
                {{ post_template.render(post, true) }}
            {% endif %} 
        {% endfor %}
    {% endfor %}
  </section>
```
经测试同样可以用于首页分类的过滤，只需要把tags替换为categories
```
  <section id="posts" class="posts-expand">
    {% for post in page.posts %}
      {% for categories in post.categories %}
        {% if categories.name !== 'music' %}
          {{ post_template.render(post, true) }}
        {% endif %}
      {% endfor %}
    {% endfor %}
  </section>
```