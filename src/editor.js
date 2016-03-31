/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/19
 * Description: Editor based on ace.
 */

'use strict';

import ace from 'brace';
import React, { Component, PropTypes } from 'react';
import { bindFunctions } from './utils';

import 'brace/ext/searchbox';
import 'brace/mode/markdown';
import './theme/styles/magic-book';

export default class ReactAce extends Component {
    constructor(props) {
        super(props);
        bindFunctions(
            this,
        [
            'onChange',
            'onFocus',
            'onBlur',
            'onChangeScrollTop'
        ]);
    }

    componentDidMount() {
        const {
            name,
            mode,
            theme,
            fontSize,
            value,
            cursorStart,
            highlightActiveLine,
            tabSize,
            keyboardHandler,
            } = this.props;

        this.editor = ace.edit(name);

        const editorProps = Object.keys(this.props.editorProps);
        for (let i = 0; i < editorProps.length; i++) {
            this.editor[editorProps[i]] = this.props.editorProps[editorProps[i]];
        }

        this.editor.getSession().setMode(`ace/mode/markdown`);
        this.editor.setTheme(`ace/theme/magic-book`);
        this.editor.setFontSize(fontSize);
        this.editor.setValue(value, cursorStart);
        this.editor.renderer.setShowGutter(false);
        this.editor.getSession().setUseWrapMode(true);
        this.editor.setOption('highlightActiveLine', true);
        this.editor.setOption('tabSize', tabSize);
        this.editor.setShowPrintMargin(false);
        this.editor.on('focus', this.onFocus);
        this.editor.on('blur', this.onBlur);
        this.editor.on('change', this.onChange);
        this.editor.getSession().on('changeScrollTop', this.onChangeScrollTop);

        if (keyboardHandler) {
            this.editor.setKeyboardHandler('ace/keyboard/' + keyboardHandler);
        }
    }

    componentWillReceiveProps(nextProps) {
        const oldProps = this.props;
        if (nextProps.fontSize !== oldProps.fontSize) {
            this.editor.setFontSize(nextProps.fontSize);
        }
        if (nextProps.tabSize !== oldProps.tabSize) {
            this.editor.setOption('tabSize', nextProps.tabSize);
        }
        if (this.editor.getValue() !== nextProps.value) {
            // editor.setValue is a synchronous function call, change event is emitted before setValue return.
            this.silent = true;
            this.editor.setValue(nextProps.value, nextProps.cursorStart);
            this.silent = false;
        }
    }

    componentWillUnmount() {
        this.editor = null;
    }

    onChange() {
        if (this.props.onChange && !this.silent) {
            const value = this.editor.getValue();
            this.props.onChange(value);
        }
    }

    onChangeScrollTop(value){
        if (this.props.onChangeScrollTop){
            var height =
                this.editor.getSession().getDocument().getLength() *
                this.editor.renderer.lineHeight;
            this.props.onChangeScrollTop(value / height);
        }
    }

    onFocus() {
        if (this.props.onFocus) {
            this.props.onFocus();
        }
    }

    onBlur() {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }

    render() {
        const { name, className } = this.props;
        return (
            <div
                id={name}
                className={className}
            >
            </div>
        );
    }
}

ReactAce.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    fontSize: PropTypes.number,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.string,
    tabSize: PropTypes.number,
    cursorStart: PropTypes.number,
    editorProps: PropTypes.object,
    keyboardHandler: PropTypes.string
};

ReactAce.defaultProps = {
    name: 'brace-editor',
    value: '',
    fontSize: 12,
    onChange: null,
    tabSize: 4,
    cursorStart: 1,
    editorProps: {$blockScrolling: true}
};