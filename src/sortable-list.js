/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/20
 * Description: Indexes of pages.
 */

'use strict';

import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import Sortable from 'react-anything-sortable';
import SortableListItem from './sortable-item';
import Storage from './storage';
import { ContextMenuMain } from './context-menu';
import { bindFunctions, logError } from './utils';
import configManager from './configManager';

if (process.env.BROWSER) {
    require ('./theme/styles/sky.css');
    require ('./theme/styles/sortable.css');
}


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
                "showNotify",
                "save"
            ],
            logError(configManager.getSysConfig().logPath)
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
        this.props.handleShowNotify(type, message, callbacks);
    }

    doMenuOptions(option, index){
        if(option === "remove"){
            this.showNotify(
                "warn",
                this.name === "page-list" ?
                    "This page  will be deleted irrevocably, are you sure ?"
                    :
                    "This chapter will be deleted irrevocably, are you sure ?",
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
        if(this.props.layoutMode === "horizontal"){
            let length = 0;
            const elements = document.getElementsByClassName(
                this.props.classSortableItem
            );
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
        }else{
            const elementMain = ReactDom.findDOMNode(
                this.refs.main
            );
            const elementButton = ReactDom.findDOMNode(
                this.refs.button
            );
            const height = elementMain.offsetHeight - elementButton.offsetHeight;
            this.setState({
                styleSortableList: {
                    height: height
                }
            });
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

    save(){
        Storage.nowBook.save();
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
                    <ContextMenuMain
                        name={this.state.menuName}
                        handleClick={this.onContextMenu}
                    />
                    {
                        this.props.addButtonLocation === "front" ?
                            <div
                                ref="button"
                                className={this.props.classButton}
                                style={this.props.styleButton}
                                onClick={this.createEnd}
                            >
                                Add new
                            </div>
                            :
                            null
                    }
                    <div
                        style={this.state.styleSortableList}
                        className={
                            this.props.layoutMode === "horizontal" ?
                                "" :
                                this.props.classSortableList
                        }
                    >
                        <Sortable
                            ref="list"
                            className={
                                this.props.layoutMode === "horizontal" ?
                                    this.props.classSortableList :
                                    ""
                            }
                            key={this._sortkey}
                            onSort={this.onSort}
                        >
                            {
                                this.state.indexes.map((index) => {
                                    let active;
                                    if(this.name === "page-list") {
                                        active = Storage.nowBook.getNow(Storage.nowBook.getNow()) === index;
                                    }
                                    else{
                                        active = Storage.nowBook.getNow() === index;
                                    }
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
                                            active={active}
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
                                    ref="button"
                                    className={this.props.classButton}
                                    onClick={this.createEnd}
                                >
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

SortableList.propTypes = {
    classBackground: PropTypes.string,
    classList: PropTypes.string,
    classSortableList: PropTypes.string,
    classSortableItem: PropTypes.string,
    classButton: PropTypes.string,
    style: PropTypes.object,
    styleList: PropTypes.object,
    styleButton: PropTypes.object,
    layoutMode: PropTypes.string,
    addButtonLocation: PropTypes.string,
    handleChangeChapter: PropTypes.func,
    handleShowNotify: PropTypes.func
};

SortableList.defaultProps = {
    style: {},
    styleList: {},
    styleButton: {},
    layoutMode: "horizontal",
    addButtonLocation: "end",
    handleChangeChapter: () => {},
    handleShowNotify: (type, message, callbacks) => {}
};