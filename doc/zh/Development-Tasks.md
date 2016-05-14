# Grunt任务

本软件开发使用Grunt作为构建工具，我预设了许多grunt任务来帮助加速开发，使用时只需要执行`grunt <TaskName>`即可。  

## 任务列表

### debug

此任务将会编译代码并开启一个调试服务器，一般配合`electron mainDev`用于开发测试。

### test

此任务用于单元测试，具体流程会在后面章节说到。

### build-pre

此任务用于发布，使用webpack将所有的代码打包整合到dist文件夹，为最后的release做准备。

### build-xxx系列

这系列任务包含`build-osx`、`build-linux`、`build-windows`、`build-all`，显然，这是将软件发布到不同平台的任务，需要在`bulid-pre`任务完成后执行。  
发布后的文件被存储在release文件夹内。

### release-xxx系列

这系列任务整合了`build-pre`和`build-xxx`系列任务，直接发布。

### zip

将release文件夹下的所有文件夹分别压缩,便于发布。