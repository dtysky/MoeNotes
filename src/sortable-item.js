/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/20
 * Description: Indexes of pages.
 */

'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { SortableItemMixin } from 'react-anything-sortable';
import Storage from './storage';
import { ContextMenuLayer } from './context-menu';
import { bindFunctions } from './utils';

import './theme/styles/sky.css';
import './theme/styles/sortable.css';

export default ContextMenuLayer(
    (props) => (props.menuName),
    (props) => ({
        name: props.index
    })
)(React.createClass({
    mixins: [SortableItemMixin],

    getInitialState: function(){
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
    },

    enableInput: function(){
        ReactDom.findDOMNode(this.refs.text).focus();
    },

    resizeInput: function(callback){
        let fun = callback === undefined ? () => {} : callback;
        if (this.props.layoutMode !== "horizontal"){
            fun();
            return;
        }
        const width = this.state.text.length * 12;
        if(width === this.state.style.width){
            fun();
            return;
        }
        this.setState({
            style: {width: width}
        }, fun);
    },

    select: function(event){
        if(!this.props.canInput){
            this.props.doMenuOptions("select", this.state.text);
        }
    },

    componentDidMount: function(){
        if (this.props.canInput){
            this.enableInput();
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
        return (
            <div
                className={this.props.className}
                onClick={this.select}
            >
                <form
                    onSubmit={this.onSubmit}
                    //onBlur will be called...
                    onBlur={this.onSubmit}
                >
                    <input
                        style={this.state.style}
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
}));