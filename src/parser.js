/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/17
 * Description: Parse markdown files.
 */

"use strict";

import markdown from 'marked';
import katex from 'parse-katex';
import highlighter from 'highlight.js';


let configManager;
//妈的智障 babel-istanbul
if (process.env.BROWSER) {
    configManager = require('./config-manager');
}
else{
    //For UnitTest..................
    configManager = require('./config-manager-zhizhang');
}
//妈的智障 babel-istanbul


const defaultHighlight = configManager.getConfig().defaultHighlight;

const renderer = new markdown.Renderer();

function highlight(code, callback){
    const re = /:::(\S+)\n([\s\S]+)/.exec(code);
    let lang, content;
    if(re){
        lang = re[1];
        content = re[2];
    }
    else{
        lang = defaultHighlight;
        content = code;
    }
    let result;
    try{
        result = highlighter.highlight(lang, content).value;
    }
    catch (e){
        result = highlighter.highlight(defaultHighlight, content).value;
    }
    return result;
}

const options = {
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: highlight
};


export default function parse(page){
    const html = markdown.parse(
        page,
        options
    );
    return katex.renderLaTeX(html);
}