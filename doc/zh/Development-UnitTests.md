# 单元测试

由于视图部分比较复杂并且测试困难，所以现在基本只做了核心库的测试。不过前面我已经踩了许多坑，并成功搭建了一个可以测试包含node api的测试框架，有兴趣的开发者也可以自己测试视图部分。  

## 测试步骤和结果

使用jasmine作为单元测试框架，instanbul作为覆盖率收集工具，所以需要按照jasmine的规范来编写测试用例。  
所有的测试文件都在spec文件夹下，你需要做的是：  

1. 在spec文件夹下新建名如“[name].sepc.js”的测试文件。
2. 按照[jsamine规范]()编写测试用例，要注意的是本软件已经引入`mock-fs`库来产生虚拟的目录和文件，在`stronge-book`和`storage-top`库的测试中均有应用。  
3. 运行`grunt test`来执行单元测试。
4. 用浏览器打开`reports/coverage/lcov-report/index.html`，查看覆盖率收集结果。  

![unit-test](../unit-test.jpg)