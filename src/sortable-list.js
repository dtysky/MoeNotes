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
import Storage from './storage';
import { ContextMenuMain, ContextMenuLayer } from './context-menu';

import './theme/styles/sky.css';
import './theme/styles/sortable.css';

const SortableListItem = ContextMenuLayer(
    (props) => (props.menuName),
    (props) => ({
        name: props.name
    })
)(React.createClass({
    mixins: [SortableItemMixin],
    getInitialState: function(){
        return {
            text: this.props.sortData,
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
                "Can't rename, page must have a non-empty name!"
            );
            this.enableInput();
            return;
        }

        var indexes;
        if(this.props.chapter === undefined) {
            indexes = Storage.getIndexes();
        }
        else{
            indexes = Storage.getIndexes(this.props.chapter);
        }
        if(text !== this.props.sortData && indexes.indexOf(text) > -1){
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
            this.props.sortData, this.state.text
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
        if(width !== this.state.style.width){
            this.setState({
                style: {width: width}
            }, fun);
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
                    style={this.props.style}
                    className={this.props.classList}
                >
                    <Notify
                        ref="notify"
                    />
                    <ContextMenuMain
                        name={this.state.menuName}
                        handleClick={this.onContextMenu.bind(this)}
                    />
                    {
                        this.props.addButtonLocation === "front" ?
                            <button
                                className={this.props.classButton}
                                onClick={this.createEnd.bind(this)}
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
                            onSort={this.onSort.bind(this)}
                        >
                            {
                                this.state.indexes.map((index, no) => {
                                    return (
                                        <SortableListItem
                                            key={no}
                                            ref={index}
                                            name={index}
                                            layoutMode={this.props.layoutMode}
                                            menuName={this.state.menuName}
                                            chapter={this.props.chapter}
                                            sortData={index}
                                            className={this.props.classSortableItem}
                                            canInput={this.state.canInput === no}
                                            handleTextChange={this.handleTextChange.bind(this)}
                                            handleErrorCannotChange={this.handleErrorCannotChange.bind(this)}
                                        />
                                    );
                                }, this)
                            }
                        </Sortable>
                        {
                            this.props.addButtonLocation === "end" ?
                                <button
                                    className={this.props.classButton}
                                    onClick={this.createEnd.bind(this)}
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
    }

    componentDidMount(){
        this.resizeSortableList();
        this.setState({});
    }

    initState(name, indexes) {
        this.state = {
            indexes: indexes,
            canInput: -1,
            menuName: name + "-menu",
            styleSortableList: {}
        };
        this.clipBoard = undefined;
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
        //else if(this.props.layoutMode === "vertical"){
        //    length += elements.item(i).offsetHeight;
        //}
        //else if(this.props.layoutMode === "vertical"){
        //    this.setState({
        //        styleSortableList: {
        //            height: length
        //        }
        //    });
        //}
    }

    onContextMenu(data) {
        this.doMenuOptions(data.option, data.name);
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
                        fun: this.remove.bind(this),
                        param: index
                    }
                }
            );
        }
        else if(option === "rename"){
            this.setState({
                canInput: this.state.indexes.indexOf(index)
            });
        }
        else if(option === "create"){
            this.create(this.state.indexes.indexOf(index) + 1);
        }
        else if(option === "copy"){
            this.copy(index);
        }
    }

    createEnd(){
        this.create(this.state.indexes.length + 1);
    }

    handleTextChange(index, name) {
        this.setState({
            canInput: -1
        });
        this.rename(index, name);
    }

    showNotify(type, message, callbacks){
        this.refs.notify.show(type, message, callbacks);
    }

    handleErrorCannotChange(message){
        this.showNotify("error", message);
    }

    render(){
        return (
            <div></div>
        );
    }
}

export default SortableList;