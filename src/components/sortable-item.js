/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/20
 * Description: Indexes of pages.
 */

'use strict';

import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import stringWidth from 'string-width';
import { SortableItemMixin } from 'react-anything-sortable';
import Storage from '../cores/storage';
import { ContextMenuLayer } from './context-menu';
import { bindTryCatchWrapper, stringToColor, logError } from '../cores/utils';
import configManager from '../cores/config-manager';

if (process.env.BROWSER) {
    require('../theme/styles/sky.css');
    require('../theme/styles/sortable.css');
}

let SortableItem = React.createClass({
    mixins: [SortableItemMixin],

    getInitialState: function(){
        this.canInputNow = false;
        bindTryCatchWrapper(
            this,
            [
                "onChange",
                "onSubmit",
                "handleTextChange",
                "enableInput",
                "resizeInput",
                "resizeInput",
                "select",
                "renderGen"

            ],
            logError(configManager.getSysConfig().logPath)
        );
        return {
            text: this.props.index,
            style: {}
        };
    },

    onChange: function(event){
        this.setState({
            text: event.target.value
        });
    },

    onSubmit: function(event){
        event.preventDefault();
        let text = this.state.text;
        if (text.length === 0){
            this.props.handleErrorCannotChange(
                this.props.chapter !== undefined ?
                    "Can't rename, page must have a non-empty name!"
                    :
                    "Can't rename, chapter must have a non-empty name!"
            );
            this.enableInput();
            return;
        }

        let exists;
        if(this.props.chapter === undefined) {
            exists = Storage.nowBook.has(text);
        }
        else{
            exists = Storage.nowBook.has(text, this.props.chapter);
        }
        //console.log(this.props.index, this.state.text, exists);
        if(text !== this.props.index && exists){
            this.props.handleErrorCannotChange(
                this.props.chapter !== undefined ?
                    "Page '" + text + "' is already in this chapter !"
                    :
                    "Chapter '" + text + "' is already in this book !"
            );
            this.enableInput();
            return;
        }

        this.resizeInput(
            this.handleTextChange
        );
    },

    //Fuck the callback !!!!
    handleTextChange: function(){
        this.props.handleTextChange(
            this.props.index, this.state.text
        );
        this.canInputNow = false;
    },

    enableInput: function(){
        const element = ReactDom.findDOMNode(this.refs.text);
        element.focus();
        if(!this.canInputNow && this.props.canInput){
            const length = this.state.text.length;
            element.setSelectionRange(length, length);
            this.canInputNow = true;
        }
    },

    resizeInput: function(callback){
        let fun = callback === undefined ? () => {} : callback;
        if (this.props.layoutMode !== "horizontal"){
            fun();
            return;
        }
        const width = stringWidth(this.state.text) * 11;
        if(width === this.state.style.width){
            fun();
            return;
        }
        this.setState({
            style: {width: width}
        }, fun);
    },

    select: function(event){
        if(!this.props.canInput && !this.props.active){
            this.props.doMenuOptions("select", this.state.text);
        }
    },

    componentDidMount: function(){
        if (this.props.canInput){
            this.enableInput(true);
        }
        else{
            this.resizeInput();
        }
    },

    componentDidUpdate: function(){
        if (this.props.canInput){
            this.enableInput();
        }
    },

    renderGen: function(){
        const config = configManager.getConfig();
        const style = this.props.chapter === undefined ? {
            backgroundColor: Storage.nowBook.getCurrent() === this.props.index ?
                stringToColor(this.props.index, config.chapterNowBackCSC) :
                stringToColor(this.props.index, config.chapterNormalBackCSC),
            borderColor: Storage.nowBook.getCurrent() === this.props.index ?
                stringToColor(this.props.index, config.chapterNowBorderCSC) :
                stringToColor(this.props.index, config.chapterNormalBorderCSC),
            width: this.state.style.width
        } : {
            backgroundColor: Storage.nowBook.getCurrent(
                Storage.nowBook.getCurrent()
            ) === this.props.index ?
                stringToColor(this.props.chapter, config.pageNowBackCSC) :
                stringToColor(this.props.chapter, config.pageNormalBackCSC)
        };
        let className, color;
        if(this.props.chapter === undefined){
            className = this.props.active ? this.props.className + "-active" : this.props.className + "-normal" ;
            color = Storage.nowBook.getCurrent() === this.props.index ?
                stringToColor(this.props.index, config.chapterNowFontCSC) :
                stringToColor(this.props.index, config.chapterNormalFontCSC);
        }
        else{
            className = this.props.active ?  this.props.className + "-active" : this.props.className + "-normal";
            color = Storage.nowBook.getCurrent(this.props.chapter) === this.props.index ?
                stringToColor(this.props.chapter, config.pageNowFontCSC) :
                stringToColor(this.props.chapter, config.pageNormalFontCSC);
        }
        return (
            <div
                onClick={this.select}
                className={this.props.className + " " + className}
            >
                <form
                    style={style}
                    onSubmit={this.onSubmit}
                    onBlur={this.onSubmit}
                >
                    <input
                        style={{
                            width: "100%",
                            color: color
                        }}
                        ref="text"
                        disabled={!this.props.canInput}
                        type="text"
                        value={this.state.text}
                        onChange={this.onChange}
                    />
                </form>
            </div>
        );
    },

    render: function() {
        return this.props.canInput ?
            this.renderGen()
            :
            this.renderWithSortable(
                this.renderGen()
            );
    }
});


SortableItem.propTypes = {
    index: PropTypes.string,
    layoutMode: PropTypes.string,
    menuName: PropTypes.string,
    chapter: PropTypes.string,
    sortData: PropTypes.string,
    className: PropTypes.string,
    active: PropTypes.bool,
    canInput: PropTypes.bool,
    handleTextChange: PropTypes.func,
    handleErrorCannotChange: PropTypes.func,
    doMenuOptions: PropTypes.func
};

SortableItem.defaultProps = {
    canInput: false,
    active: false,
    handleTextChange: (index, name) => {},
    handleErrorCannotChange: (message) => {},
    doMenuOptions: (option, index) => {}
};


export default ContextMenuLayer(
    (props) => (props.menuName),
    (props) => ({
        name: props.index
    })
)(SortableItem);