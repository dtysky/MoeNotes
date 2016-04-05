/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/20
 * Description: Indexes of pages.
 */

'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import Sortable from 'react-anything-sortable';
import SortableListItem from './sortable-item';
import Notify from './notify';
import Storage from './storage';
import { ContextMenuMain } from './context-menu';
import { bindFunctions } from './utils';

import './theme/styles/sky.css';
import './theme/styles/sortable.css';


export default class SortableList extends React.Component {
    constructor(props){
        super(props);
        this._sortkey=0;
        bindFunctions(
            this,
            [
                "renderGen",
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

    initState(name, indexes) {
        this.state = {
            indexes: indexes,
            canInput: null,
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
            canInput: null
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
        let length = 0;
        const elements = document.getElementsByClassName(
            this.props.classSortableItem
        );
        if(this.props.layoutMode === "horizontal"){
            for (let i = 0; i< elements.length; i++){
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

    componentDidMount(){
        this.resizeSortableList();
        this.setState({});
    }

    renderGen () {
        return (
            <div
                ref="main"
                style={this.props.style}
                className={this.props.classBackground}
            >
                <div
                    style={this.props.styleList}
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
                            <div
                                className={this.props.classButton}
                                onClick={this.createEnd}
                            >
                                Add new
                            </div>
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
                                            chapter={this.name === "page-list" ? Storage.nowBook.getNow() : undefined}
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
                                <div
                                    className={this.props.classButton}
                                    onClick={this.createEnd}
                                >
                                    Add new
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        );
    }

    render(){
        return (
            <div></div>
        );
    }
}