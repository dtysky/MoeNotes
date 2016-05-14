# React组件

核心库之外的就是视图组件了，所有的显示和交互逻辑都在这些组件之中，我在此处使用的是React这个框架，它的优点不再赘述，以下会简单介绍一下各个组件，在可能有坑的地方做一下重点提示。  

## book-item && book-list

笔记本组件，`book-item`负责提供每一个笔记本控件的交互逻辑，`book-list`利用`book-item`构成笔记本的列表。没什么特别的坑。  

## sortable-item && sortable-list

可排序列表的元素和列表组件，由于是作为分类列表和笔记列表两个组件的父类来设计的，所以有一些地方有坑（像是class和style的定义之类的不算坑，看render方法里的布局代码很清晰）。  
坑主要是在`props.layoutMode`和`props.addButtonLocation`这两个属性，前者可选`horizontal`或者`vertical`，它决定了排序列表是水平还是竖直布局；后者可选`front`和`end`，它决定了“添加”按钮在列表前还是列表后。  
除此之外，对于继承自`sortable-list`的组件，应当在初始化的时候调用`this.initState(name, indexes)`方法，来对组件进行初始化。  

## chapter-list && page-list

这两个组件继承自`sortable-list`，分别负责显示和管理当前笔记本的分类列表与当前分类的日记列表。也没什么特别的坑。

## editor

这个组件是编辑器的视图，在ace editor外面封装了一层作为react组件，也没什么坑。  

## page

这个组件用于展示笔记正文，里面包括了editor和preview两个部分，在改变“专注写作”等模式的时候实际上修改的就是此组件的样式。  

## toobar

右上角的工具栏组件，几个按钮和选择框，在前面的章节已经介绍过功能。要注意的，`props.styleItem`只对按钮生效，并且对所有按钮都会生效。  

## context-menu

上下文菜单组件，此组件被绑定到了每一个可排序元素上，暂时只有三种半的功能（create、rename、remove和copy）。

## notify

通知系统组件，用于弹出警告框等或者弹出右上角的提示信息框（目前只有与提示保存成功），此组件的坑相对复杂，值得一说。  
组件的核心是一个名为`show`的方法，使用的时候也是先由组件的ref取得组件的引用，而后调用这个`show`方法。  

    :::javascript
    function show(type, message, callbacks)
    
### type

字符串，有`warn`、`error`、`sysInfo`和`info`四种，前三者是modal，最后一个是popup，每种模式都可以接收一个用于显示的`message`字符串和一个回调函数集合`callbacks`。  

### callbacks

回调函数集合，一个典型的`callbacks`例子如下：  

    :::js
    callbacks = {
        onHide: {
            fun: this.onHide,
            param: []
        },
        onOk: {
            fun: this.onOk,
            param: []
        },
        onCancel: {
            fun: this.onCancel,
            param: []
        }
    }
    
每个回调都至少提供一个`fun`属性，作为将被执行的回调函数，而param是可选的，作为回调函数的参数。  
onHide对于所有type都是可选的，它在modal或者popup消失后触发。  
onOk只对`warn`、`error`和`sysInfo`可选，它在用户点击“OK”按钮后触发。  
onCancel只对`warn`可选，在用户点击“Cancel”后触发。  