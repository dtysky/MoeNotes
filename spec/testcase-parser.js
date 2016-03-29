/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/26
 * Description:
 */

export const markdown = `
An h1 header
============

Paragraphs are separated by a blank line.

2nd paragraph. *Italic*, **bold**, and `+`monospace`+`. Itemized lists
look like:

  * this one
  * that one
  * the other one;

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
`;

export const html = `<h1 id="an-h1-header">An h1 header</h1>
<p>Paragraphs are separated by a blank line.</p>
<p>2nd paragraph. <em>Italic</em>, <strong>bold</strong>, and <code>monospace</code>. Itemized lists
look like:</p>
<ul>
<li>this one</li>
<li>that one</li>
<li>the other one</li>
</ul>
<p>Note that --- not considering the asterisk --- the actual text
content starts at 4-columns in.</p>
<blockquote>
<p>Block quotes are
written like so.</p>
<p>They can span multiple paragraphs,
if you like.</p>
</blockquote>
<p>Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., &quot;it&#39;s all
in chapters 12--14&quot;). Three dots ... will be converted to an ellipsis.
Unicode is supported. ☺</p>
<h2 id="an-h2-header">An h2 header</h2>
<p>Here&#39;s a numbered list:</p>
<ol>
<li>first item</li>
<li>second item</li>
<li>third item</li>
</ol>
<p>Note again how the actual text starts at 4 columns in (4 characters
from the left side). Here&#39;s a code sample:</p>
<pre><code># Let me re-iterate ...
<span class="hljs-keyword">signal</span> count:<span class="hljs-built_in">std_logic_vector</span>(<span class="hljs-number">3</span> <span class="hljs-keyword">downto</span> <span class="hljs-number">0</span>) := <span class="hljs-number">0</span>;
<span class="hljs-keyword">begin</span>
    Count:<span class="hljs-keyword">process</span>(clk, rst_n)
        <span class="hljs-keyword">if</span> rise_edge(clk) <span class="hljs-keyword">then</span>
            <span class="hljs-keyword">if</span> rst_n == <span class="hljs-literal">'0'</span> <span class="hljs-keyword">then</span>
                count &lt;= <span class="hljs-number">0</span>;
            <span class="hljs-keyword">elsif</span> count == <span class="hljs-number">15</span> <span class="hljs-keyword">then</span>
                count &lt;= <span class="hljs-number">0</span>;
            <span class="hljs-keyword">else</span>
                count &lt;= count + <span class="hljs-number">1</span>;
            <span class="hljs-keyword">end</span> <span class="hljs-keyword">if</span>;
    <span class="hljs-keyword">end</span> <span class="hljs-keyword">process</span>;
<span class="hljs-keyword">end</span>
</code></pre><p>As you probably guessed, indented 4 spaces. By the way, instead of
indenting the block, you can use delimited blocks, if you like:</p>
<pre><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foobar</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Welcome to flavor country!"</span>);
}
</code></pre><p>(which makes copying &amp; pasting easier).
You can optionally mark the delimited block for Pygments to syntax highlight it:</p>
<pre><code><span class="hljs-keyword">import</span> time
<span class="hljs-comment"># Quick, count to ten!</span>
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> range(<span class="hljs-number">10</span>):
    <span class="hljs-comment"># (but not *too* quick)</span>
    time.sleep(<span class="hljs-number">0.5</span>)
    <span class="hljs-keyword">print</span> i
</code></pre><h3 id="an-h3-header">An h3 header</h3>
<p>Now a nested list:</p>
<ol>
<li><p>First, get these ingredients:</p>
<ul>
<li>carrots</li>
<li>celery</li>
<li>lentils</li>
</ul>
</li>
<li><p>Boil some water.</p>
</li>
<li><p>Dump everything in the pot and follow
this algorithm:</p>
<pre><code>find wooden spoon
uncover pot
stir
<span class="hljs-keyword">cover</span> pot
balance wooden spoon precariously <span class="hljs-keyword">on</span> pot handle
<span class="hljs-keyword">wait</span> <span class="hljs-number">10</span> minutes
goto first step (<span class="hljs-keyword">or</span> shut off burner <span class="hljs-keyword">when</span> done)
</code></pre><p>Do not bump wooden spoon or it will fall.</p>
</li>
</ol>
<p>Notice again how text always lines up on 4-space indents (including
that last line which continues item 3 above).</p>
<p>Here&#39;s a link to <a href="http://foo.bar">a website</a>, to a <a href="local-doc.html">local
doc</a>, and to a <a href="#an-h2-header">section heading in the current
doc</a>. Here&#39;s a footnote [^1].</p>
<p>[^1]: Footnote text goes here.</p>
<p>Tables can look like this:</p>
<table>
<thead>
<tr>
<th>size</th>
<th style="text-align:center">material</th>
<th style="text-align:right">color</th>
</tr>
</thead>
<tbody>
<tr>
<td>9</td>
<td style="text-align:center">leather</td>
<td style="text-align:right">brown</td>
</tr>
<tr>
<td>10</td>
<td style="text-align:center">hemp canvas</td>
<td style="text-align:right">natural</td>
</tr>
<tr>
<td>11</td>
<td style="text-align:center">glass</td>
<td style="text-align:right">transparent</td>
</tr>
</tbody>
</table>
<p>Table: Shoes, their sizes, and what they&#39;re made of</p>
<p>A horizontal rule follows.</p>
<hr>
<p>Here&#39;s a definition list:</p>
<p>apples
  : Good for making applesauce.
oranges
  : Citrus!
tomatoes
  : There&#39;s no &quot;e&quot; in tomatoe.</p>
<p>Again, text is indented 4 spaces. (Put a blank line between each
term/definition pair to spread things out more.)</p>
<p>Here&#39;s a &quot;line block&quot;:</p>
<p>| Line one
|   Line too
| Line tree</p>
<p>and images can be specified like so:</p>
<p><img src="example-image.jpg" alt="example image" title="An exemplary image"></p>
<p>Inline math equations go in like so: <span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>ω</mi><mo>=</mo><mi>d</mi><mi>ϕ</mi><mi mathvariant="normal">/</mi><mi>d</mi><mi>t</mi></mrow><annotation encoding="application/x-tex">\omega = d\phi / dt</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.75em;"></span><span class="strut bottom" style="height:1em;vertical-align:-0.25em;"></span><span class="base textstyle uncramped"><span class="mord mathit" style="margin-right:0.03588em;">ω</span><span class="mrel">=</span><span class="mord mathit">d</span><span class="mord mathit">ϕ</span><span class="mord mathrm">/</span><span class="mord mathit">d</span><span class="mord mathit">t</span></span></span></span>. Display
math should get its own line and be put in in double-dollarsigns:</p>
<p><span class="katex-display"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>I</mi><mo>=</mo><mo>∫</mo><mi>ρ</mi><msup><mi>R</mi><mrow><mn>2</mn></mrow></msup><mi>d</mi><mi>V</mi></mrow><annotation encoding="application/x-tex">I = \int \rho R^{2} dV</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:1.36em;"></span><span class="strut bottom" style="height:2.22225em;vertical-align:-0.86225em;"></span><span class="base displaystyle textstyle uncramped"><span class="mord mathit" style="margin-right:0.07847em;">I</span><span class="mrel">=</span><span class="op-symbol large-op mop" style="margin-right:0.44445em;top:-0.0011249999999999316em;">∫</span><span class="mord mathit">ρ</span><span class="mord"><span class="mord mathit" style="margin-right:0.00773em;">R</span><span class="vlist"><span style="top:-0.413em;margin-right:0.05em;"><span class="fontsize-ensurer reset-size5 size5"><span style="font-size:0em;">​</span></span><span class="reset-textstyle scriptstyle uncramped"><span class="mord scriptstyle uncramped"><span class="mord mathrm">2</span></span></span></span><span class="baseline-fix"><span class="fontsize-ensurer reset-size5 size5"><span style="font-size:0em;">​</span></span>​</span></span></span><span class="mord mathit">d</span><span class="mord mathit" style="margin-right:0.22222em;">V</span></span></span></span></span></p>
<p>And note that you can backslash-escape any punctuation characters
which you wish to be displayed literally, ex.: `+`foo`+`, *bar*, etc.</p>
`;