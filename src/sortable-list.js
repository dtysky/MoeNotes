/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/20
 * Description: Indexes of pages.
 */

'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import Sortable, { SortableItemMixin } from 'react-anything-sortable';
import Notify from './notify';
import Storage from './storage-top';
import { ContextMenuMain, ContextMenuLayer } from './context-menu';
import { bindFunctions } from './utils';

import './theme/styles/sky.css';
import './theme/styles/sortable.css';

const SortableListItem = ContextMenuLayer(
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
        var text = this.state.text;
        if (text.length === 0){
            this.props.handleErrorCannotChange(
                this.props.chapter === undefined ?
                    "Can't rename, page must have a non-empty name!"
                    :
                    "Can't rename, chapter must have a non-empty name!"
            );
            this.enableInput();
            return;
        }

        var exists;
        if(this.props.chapter === undefined) {
            exists = Storage.has(text);
        }
        else{
            exists = Storage.has(text, this.props.chapter);
        }
        if(text !== this.props.index && exists){
            this.props.handleErrorCannotChange(
                this.props.chapter === undefined ?
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
        var fun = callback === undefined ? () => {} : callback;
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


class SortableList extends React.Component {
    constructor(props){
        super(props);
        this._sortkey=0;
        this.renderGen = function() {
            return (
                <div
                    ref="main"
                    style={this.props.style}
                    className={this.props.classList}
                >
                    <Notify
                        ref="notify"
                    />
                    <ContextMenuMain
                        name={this.state.menuName}
                        handleClick={this.onContextMenu}
                    />
                    {
                        this.props.addButtonLocation === "front" ?
                            <button
                                className={this.props.classButton}
                                onClick={this.createEnd}
                            >
                                Add new
                            </button>
                            :
                            null
                    }
                    <div
                        style={this.state.styleSortableList}
                    >
                        <Sortable
                            className={this.props.classSortableList}
                            key={this._sortkey}
                            onSort={this.onSort}
                        >
                            {
                                this.state.indexes.map((index) => {
                                    return (
                                        <SortableListItem
                                            key={index}
                                            ref={index}
                                            index={index}
                                            layoutMode={this.props.layoutMode}
                                            menuName={this.state.menuName}
                                            chapter={this.name === "page-list" ? Storage.getNow() : undefined}
                                            sortData={index}
                                            className={this.props.classSortableItem}
                                            canInput={this.state.canInput === index}
                                            doMenuOptions={this.doMenuOptions}
                                            handleTextChange={this.handleTextChange}
                                            handleErrorCannotChange={this.handleErrorCannotChange}
                                        />
                                    );
                                }, this)
                            }
                        </Sortable>
                        {
                            this.props.addButtonLocation === "end" ?
                                <button
                                    className={this.props.classButton}
                                    onClick={this.createEnd}
                                >
                                    Add new
                                </button>
                                :
                                null
                        }
                    </div>
                </div>
            );
        };
        bindFunctions(
            this,
            [
                "initState",
                "onContextMenu",
                "createEnd",
                "resizeSortableList",
                "setScrollbar",
                "doMenuOptions",
                "handleTextChange",
                "handleErrorCannotChange",
                "showNotify"
            ]
        );
    }

    componentDidMount(){
        this.resizeSortableList();
        this.setState({});
    }

    initState(name, indexes) {
        this.state = {
            indexes: indexes,
            canInput: "",
            menuName: name + "-menu",
            styleSortableList: {}
        };
        this.name = name;
        this.clipBoard = undefined;
    }

    onContextMenu(data) {
        this.doMenuOptions(data.option, data.name);
    }

    createEnd(){
        this.create(this.state.indexes.length + 1);
    }

    handleTextChange(index, name) {
        this.setState({
            canInput: ""
        });
        this.rename(index, name);
    }

    handleErrorCannotChange(message){
        this.showNotify("error", message);
    }

    showNotify(type, message, callbacks){
        this.refs.notify.show(type, message, callbacks);
    }

    doMenuOptions(option, index){
        if(option === "remove"){
            this.showNotify(
                "warn",
                this.props.chapter === undefined ?
                    "This chapter  will be deleted irrevocably, are you sure ?"
                    :
                    "This page will be deleted irrevocably, are you sure ?",
                {
                    onOk: {
                        fun: this.remove,
                        param: index
                    }
                }
            );
        }
        else if(option === "rename"){
            this.setState({
                canInput: index
            });
        }
        else if(option === "create"){
            this.create(this.state.indexes.indexOf(index) + 1);
        }
        else if(option === "copy"){
            this.copy(index);
        }
        else if(option === "select"){
            this.select(index);
        }
    }

    resizeSortableList(){
        var length = 0;
        const elements = document.getElementsByClassName(
            this.props.classSortableItem
        );
        if(this.props.layoutMode === "horizontal"){
            for (var i = 0; i< elements.length; i++){
                length += elements.item(i).offsetWidth;
            }
            length += 20 + document.getElementsByClassName(
                this.props.classButton
            )[0].offsetWidth;
            if(this.state.styleSortableList.width !== length) {
                this.setState({
                    styleSortableList: {
                        width: length
                    }
                });
            }
        }
    }

    setScrollbar(){
        const element = ReactDom.findDOMNode(
            this.refs.main
        );
        if(this.props.layoutMode === "horizontal"){
            element.scrollLeft = element.scrollWidth;
        }
        else{
            element.scrollTop = element.scrollHeight;
        }
        this.setState({});
    }

    render(){
        return (
            <div></div>
        );
    }
}

export default SortableList;