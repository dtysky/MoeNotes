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
import { bindFunctions } from './utils';

import './theme/styles/sky.css';
import './theme/styles/highlight.css';
import './theme/styles/katex.css';
import './theme/styles/article.css';

export default class Page extends React.Component{
    constructor(props){
        super(props);
        const text = Storage.nowBook.readNowPage();
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
                "onChange",
                "onBlur",
                "onScroll"
            ]
        );
    }

    parsePage(value){
        this.setState({
            html: parse(value)
        });
    }

    refresh(value){
        this.setState({
            markdown: value
        });
        debounce(this.parsePage, 10)(value);
    }

    reload(){
        this.refresh(
            Storage.nowBook.readNowPage()
        );
    }

    onChange(value){
        this.refresh(value);
    }

    onBlur(){
        Storage.nowBook.save(this.state.markdown);
    }

    onScroll(percent){
        var domNode = ReactDom.findDOMNode(this.refs.preview);
        domNode.scrollTop = percent * domNode.scrollHeight;
    }

    render(){
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
                        fontSize={14}
                        tabSize={4}
                        onChange={this.onChange}
                        onBlur={this.onBlur}
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