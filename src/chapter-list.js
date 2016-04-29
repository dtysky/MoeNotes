/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/20
 * Description: Indexes of pages.
 */

'use strict';

import React, { PropTypes } from 'react';
import SortableList from './sortable-list';
import Storage from './storage';
import Notify from './notify';
import { bindFunctions, logError } from './utils';
import configManager from './config';


if (process.env.BROWSER) {
    require ('./theme/styles/sky.css');
}

export default class ChapterList extends SortableList {
    constructor(props){
        super(props);
        this.initState(
            "chapter-list",
            Storage.nowBook.getIndexes()
        );
        bindFunctions(
            this,
            [
                "onSort",
                "refresh",
                "create",
                "rename",
                "remove",
                "select",
                "copy",
                "reload"
            ],
            logError(configManager.getSysConfig().logPath)
        );
    }

    refresh(callback){
        this._sortkey ++;
        this.state.indexes = Storage.nowBook.getIndexes();
        const cb = () => {
            this.save();
            if (callback !== undefined) {
                callback();
            }
        };
        this.setState({}, cb);
    }

    onSort(indexes) {
        Storage.nowBook.setIndexes(indexes);
        this.refresh();
    }

    remove(index) {
        if(Storage.nowBook.canNotRemove()){
            this.showNotify(
                "error",
                "Book should have more than one chapter !"
            );
            return;
        }
        Storage.nowBook.remove(index);
        if(index === Storage.nowBook.getNow()){
            Storage.nowBook.change(
                Storage.nowBook.getIndexes()[0]
            );
        }
        this.props.handleChangeChapter();
        this.refresh();
    }

    create(no) {
        this.state.indexes.splice(no, 0, "");
        this._sortkey ++;
        this.doMenuOptions("rename", "");
    }

    rename(index, name){
        if(!Storage.nowBook.has(index)){
            Storage.nowBook.create(
                this.state.indexes.indexOf(index),
                name
            );
            this.select(name, this.setScrollbar);
        }
        else{
            Storage.nowBook.rename(index, name);
        }
    }

    select(index, callback){
        Storage.nowBook.change(index);
        this.props.handleChangeChapter();
        this.refresh(callback);
    }

    copy(index){
        this.clipBoard = Storage.nowBook.getPath(index);
    }

    reload(){
        if(Storage.nowBook.isEmpty()){
            this.refresh(this.createEnd);
        }
        else{
            this.select(Storage.nowBook.getNow());
        }
    }

    componentDidUpdate(){
        this.resizeSortableList();
    }

    render(){
        return this.renderGen();
    }
}

ChapterList.propTypes = {
    classBackground: PropTypes.string,
    classList: PropTypes.string,
    classSortableList: PropTypes.string,
    classSortableItem: PropTypes.string,
    classButton: PropTypes.string,
    style: PropTypes.object,
    styleList: PropTypes.object,
    styleButton: PropTypes.object,
    layoutMode: PropTypes.string,
    addButtonLocation: PropTypes.func,
    handleChangeChapter: PropTypes.func,
    handleShowNotify: PropTypes.func
};

ChapterList.defaultProps = {
    style: {},
    styleList: {},
    styleButton: {},
    layoutMode: "horizontal",
    addButtonLocation: "end",
    handleChangeChapter: () => {},
    handleShowNotify: (type, message, callbacks) => {}
};