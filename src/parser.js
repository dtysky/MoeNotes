/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/17
 * Description: Parse markdown files.
 */

"use strict";

import markdown from 'marked';
import configManager from './config';
import katex from 'parse-katex';
import highlighter from 'highlight.js';

const defaultHighlight = configManager.getConfig().defaultHighlight;

const renderer = new markdown.Renderer();

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
    return highlighter.highlight(lang, content).value;
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