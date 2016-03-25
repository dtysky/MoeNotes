/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/17
 * Description: Parse markdown files.
 */

"use strict";

import markdown from 'marked';
import defaultHighlight from '../helpers/config';
import katex from 'parse-katex';

function highlight(code, callback){
    var re = /:::(\S+)\n([\s\S]+)/.exec(code);
    var lang, content;
    if(re){
        lang = re[1];
        content = re[2];
    }
    else{
        lang = defaultHighlight;
        content = code;
    }
    return require('highlight.js').highlight(lang, content).value;
}

const options = {
    renderer: new markdown.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: highlight
};


function parse(page){
    var html = markdown.parse(
        page,
        options
    );
    return katex.renderLaTeX(html);
}


module.exports = {
    parse: parse
};