# MoeNotes
I'm the god of magic, here is my spellbook.


## Design

复杂是一剂毒药，  
诱惑，诱惑，使你堕入泥沼。  
日常，是简单的。  
它们都应该切实的存在。  
这里没有数据库，  
只有你所爱的markdown。  
将他们加入你自己的仓库！  
不受制于平台。  
我们不生产日志 —  
我们只是日志的搬运工。  


这是一个简单的markdown日记管理平台，不同于印象笔记、Onenote、leanote等，这个平台没有那么大的野心。此平台所要解决的问题仅仅是“本地View”，也就是在本地管理你的日志文件，提供一个近似于onenote的分类体验。  
所有在本平台的笔记都需要完全使用markdown进行编写，每一个笔记都会对应本地的一个md文件，并提供和onenote类似的分类层级，这些分类完全是用文件夹进行管理的，每一个分类（无论是一级分类还是二级分类）都对应一个文件夹。  
你可以自己选择呢用什么方式将这些文件同步到什么地方，比如我就是同步到了自己的Github私有仓库，所以从这个角度来讲，本平台实现的不过是Gitbook的一小块功能，但至少不用每个月再交7$是吧www  
本平台将会拥有以下功能：  

1. 带有实时预览的Markdown编辑器（包括代码高亮、Tex、Table、Flowchart等常用扩展）。
2. 目录管理，将本地目录映射为分类并快速切换。
3. 基础操作，比如新建分类、新建文章啥的。
4. （可能）同步到Github，

就这些，慢慢填坑。  


## License

Copyright © 2015, 戴天宇, Tianyu Dai (dtysky\<dtysky@outlook.com\>). All Rights Reserved.
This project is free software and released under the **[GNU General Public License (GPL V3)](http://www.gnu.org/licenses/gpl.html)**.

An h1 header
============

Paragraphs are separated by a blank line.

2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists
look like:

  * this one
  * that one
  * the other one

Note that --- not considering the asterisk --- the actual text
content starts at 4-columns in.

> Block quotes are
> written like so.
>
> They can span multiple paragraphs,
> if you like.

Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "it's all
in chapters 12--14"). Three dots ... will be converted to an ellipsis.
Unicode is supported. ☺



An h2 header
------------

Here's a numbered list:

 1. first item
 2. second item
 3. third item

Note again how the actual text starts at 4 columns in (4 characters
from the left side). Here's a code sample:

    
    # Let me re-iterate ...
    signal count:std_logic_vector(3 downto 0) := 0;
    begin
        Count:process(clk, rst_n)
            if rise_edge(clk) then
                if rst_n == '0' then
                    count <= 0;
                elsif count == 15 then
                    count <= 0;
                else
                    count <= count + 1;
                end if;
        end process;
    end
                

As you probably guessed, indented 4 spaces. By the way, instead of
indenting the block, you can use delimited blocks, if you like:

~~~
:::js
function foobar() {
    console.log("Welcome to flavor country!");
}
~~~

(which makes copying & pasting easier). 
You can optionally mark the delimited block for Pygments to syntax highlight it:

    :::python
    import time
    # Quick, count to ten!
    for i in range(10):
        # (but not *too* quick)
        time.sleep(0.5)
        print i



### An h3 header ###

Now a nested list:

 1. First, get these ingredients:

      * carrots
      * celery
      * lentils

 2. Boil some water.

 3. Dump everything in the pot and follow
    this algorithm:

        find wooden spoon
        uncover pot
        stir
        cover pot
        balance wooden spoon precariously on pot handle
        wait 10 minutes
        goto first step (or shut off burner when done)

    Do not bump wooden spoon or it will fall.

Notice again how text always lines up on 4-space indents (including
that last line which continues item 3 above).

Here's a link to [a website](http://foo.bar), to a [local
doc](local-doc.html), and to a [section heading in the current
doc](#an-h2-header). Here's a footnote [^1].

[^1]: Footnote text goes here.

Tables can look like this:

|size | material     |  color      |
|---- |:------------:| -----------:|
|9    | leather      | brown       |
|10   | hemp canvas  | natural     |
|11   | glass        | transparent |

Table: Shoes, their sizes, and what they're made of

A horizontal rule follows.

***

Here's a definition list:

apples
  : Good for making applesauce.
oranges
  : Citrus!
tomatoes
  : There's no "e" in tomatoe.

Again, text is indented 4 spaces. (Put a blank line between each
term/definition pair to spread things out more.)

Here's a "line block":

| Line one
|   Line too
| Line tree

and images can be specified like so:

![example image](example-image.jpg "An exemplary image")

Inline math equations go in like so: $\omega = d\phi / dt$. Display
math should get its own line and be put in in double-dollarsigns:

$$I = \int \rho R^{2} dV$$


And note that you can backslash-escape any punctuation characters
which you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.