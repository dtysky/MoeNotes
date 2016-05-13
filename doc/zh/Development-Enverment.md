# 开发环境

## 平台

本软件的开发平台是Node.js，版本是5.9.0。

## 框架

使用Electron作为本软件的开发框架，版本是0.37.8，在本软件开发中这是一个全局的lib，没有包含在`package.json`中，你需要使用以下命令来安装：  

    :::bash
    npm install electron-prebuilt@0.37.8 -g

在web方面，本软件采用的视图框架是React.js，所以需要你有一些React组件化开发的基础。

## 构建工具

本软件使用Grunt和Webpack作为构建工具，Grunt也是需要自行在全局安装的：  

    :::bash
    npm install grunt-cil -g
    
## 其他

跨平台发布可能会有一些库的依赖，比如在mac下发布windows版本的软件就需要wine的支持，这个还请自己踩坑。
    
## 快速开始

在node、npm、electron和grunt都安装完后，将项目clone到本地后，首先执行：  

    :::bash
    npm install

安装所有依赖。之后运行：  

    :::bash
    grunt
    
编译代码并开启调试服务器。随后：  

    :::bash
    electron mainDev.js
    
便可打开应用，开始调试。  
工程下的BooksForTest目录自带了三个笔记本用于测试，你也可以直接打开doc文件夹，打开文档。