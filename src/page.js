/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Entry.
 */

'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import Storage from './storage';
import { debounce } from 'lodash';
import parse from './parser';
import AceEditor from './editor';
import { bindFunctions, logError } from './utils';
import configManager from './config';

if (process.env.BROWSER) {
    require ('./theme/styles/sky.css');
    require ('./theme/styles/highlight.css');
    require ('./theme/styles/article.css');
}

export default class Page extends React.Component{
    constructor(props){
        super(props);
        const text = Storage.nowBook.readNowPage();
        this.last_markdown = text;
        this.state = {
            markdown: text,
            html : parse(text)
        };
        bindFunctions(
            this,
            [
                "parsePage",
                "refresh",
                "reload",
                "save",
                "onChange",
                "onBlur",
                "onScroll"
            ],
            logError(configManager.getSysConfig().logPath)
        );
    }

    parsePage(value){
        this.setState({
            html: parse(value)
        });
    }

    refresh(value, callback){
        const cb = callback === undefined ? () => {} : callback;
        this.setState({
            markdown: value
        }, cb);
        debounce(this.parsePage, 10)(value);
    }

    reload(){
        const nowPage = Storage.nowBook.readNowPage();
        this.last_markdown = nowPage;
        this.refresh(
            nowPage,
            this.refs.editor.focus
        );
    }

    save(text){
        Storage.nowBook.save(text);
        this.last_markdown = this.state.markdown;
        const book = Storage.getName(Storage.getNow());
        const chapter = Storage.nowBook.getNow();
        const page = Storage.nowBook.getNow(chapter);
        this.props.handleShowNotify(
            "info",
            `Book '${book}', Chapter '${chapter}', Page '${page}' is saved!`
        );
    }

    onChange(value){
        this.refresh(value);
    }

    onBlur(){
        if(this.last_markdown !== this.state.markdown){
            this.save(this.state.markdown);
        }
    }

    onScroll(percent){
        var domNode = ReactDom.findDOMNode(this.refs.preview);
        domNode.scrollTop = percent * domNode.scrollHeight;
    }

    render(){
        const config = configManager.getConfig();
        return (
            <div
                className="page-content full-height float-left"
                style={this.props.style}
            >
                <div
                    className="page page-editor float-left"
                >
                    <AceEditor
                        ref="editor"
                        className="page-text"
                        name="src"
                        value={this.state.markdown}
                        fontSize={13}
                        font={config.font}
                        tabSize={4}
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        onSave={this.onBlur}
                        onChangeScrollTop={this.onScroll}
                    />
                </div>
                <div
                    className="page page-preview float-left"
                >
                    <div
                        ref="preview"
                        className="page-text"
                        dangerouslySetInnerHTML={{__html: this.state.html}}
                    >
                    </div>
                </div>
            </div>
        );
    }
}