# 核心库

源代码分为核心库和组件两部分，前者负责核心逻辑，后者负责视图层。  
负责核心逻辑的文件有：  

## storage-book

笔记本管理，负责通过文件夹创建和管理笔记本。每当加载一个笔记本时便会创建一个改类的新实例，该实例构造时首先检查文件夹下是否存在.tree文件，如果不存在或者.tree文件解析有误则创建一个全新的.tree文件。如果存在正确的.tree文件，该实例还会检查解析后的文件树和实际存在的文件树是否对应，如果不对应则会进行修正。  
此类的方法明明十分规范用途不再赘述，但需要注意的是此类自身**没有错误检查**，并不能保证操作后文件树中每一个属性的值都正确对应（比如调用`change`方法的时候并不会主动检查是否真的存在需要切换到的分类/笔记），所有的检查应该在上层自行完成。  
除此之外，几乎所有的方法都拥有两种调用方法，比如`getNow`方法，在拥有参数`chapter`的时候，该方法返回的是当前的笔记index，没有的时候，返回的是当前分类的index。所有具有这种特性的方法都具有`chapter`参数，并且都是最后一个参数。  

## storage-top

管理所有笔记本，通过用户目录下的.tree文件管理所有笔记本。在应用运行的生命周期中只会创建一个实例，实例构造时会检查用户目录下的.tree文件，根据具体情况进行创建或者加载。  
和上面同样，此类也**没有错误检查**，方法名字十分清楚，不再赘述。  

## config-manager

此类用于管理软件配置，主要是管理各个主题的加载和切换。  
程序启动时将会创建一个此类的实例，它从主题配置文件夹下读取一个由所有文件夹构成的列表，并获取上一次所使用的主题（被曝存在“.now”文件中）。  
可以使用它的`refresh(theme)`来更换主题（不过还需要外部的刷新、并通常需要重载整个应用才能让切换生效）。

## utils

提供了一些有用的辅助方法，有几个是需要特别注意的：  

### getFiles(dp)

该方法获取dp这个目录下的所有.md文件，但其返回的数组中所有的文件名已经去掉了扩展名，比如"1.md"这个文件实际最终返回的是"1"。  

### arrayIsLike(a1, a2)

可能叫arraysAresimilar更为合适- -，判断两个数组是否相似，所谓相似是指元素一样但顺序不一定一样：  

    :::js
    arrayIsLike([1, 2, 3], [2, 1, 3]) //ture
    arrayIsLike([1, 2, 3, 4], [2, 1, 3]) //false
    
### stringToColor(string, colorConstraints)

此方法用于将一个字符串转换为RGBA色彩，具体使用可以看前面的“主题-进阶”这一章。  

### bindTryCatchWrapper(self, methods, handler)

此方法将self中methods中所包含的所有方法加一层带有errorHandler的warpper，也就是说，通过此方法的处理，所有methods中的方法都会被包上一层，处理后，如果再调用这些方法中的某个，程序首先会尝试去直接执行这个方法，如果出错，将会把引发错误后产生的error对象传递给已经注册的handler，由handler去处理这个错误。  
在本软件中，我选择将这个错误的stack log到一个文件中，便于bug后的改进。  

### logError(file)

错误处理函数，将错误log到file中，其返回的函数可以作为bindTryCatchWrapper的一个handler，也可以作为其他有此种功能的方法的参数。  

### bindFunctions(self, methods, tryCatchHandler)

将methods中的方法们绑定到self上，如果tryCatchHandler被提供，则同时会实现bindTryCatchWrapper方法的功能。

### createObjectWithErrorHandler(obj, handler)

直接给某个对象的所有方法加上错误处理。