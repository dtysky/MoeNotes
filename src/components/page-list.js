/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/20
 * Description: Indexes of pages.
 */

'use strict';

import React, { PropTypes } from 'react';
import SortableList from './sortable-list';
import Storage from './../cores/storage';
import Notify from './notify';
import { bindFunctions, logError } from '../cores/utils';
import configManager from '../cores/config-manager';

if (process.env.BROWSER) {
    require ('../theme/styles/sky.css');
}


export default class PageList extends SortableList {
    constructor(props){
        super(props);
        this.initState(
            "page-list",
            Storage.nowBook.getIndexes(Storage.nowBook.getNow())
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
                "reload",
                "setScrollbar"
            ],
            logError(configManager.getSysConfig().logPath)
        );
    }

    refresh(callback){
        this._sortkey ++;
        this.state.indexes = Storage.nowBook.getIndexes(Storage.nowBook.getNow());
        const cb = () => {
            this.save();
            if (callback !== undefined) {
                callback();
            }
        };
        this.setState({}, cb);
    }

    onSort(indexes) {
        Storage.nowBook.setIndexes(indexes, Storage.nowBook.getNow());
        this.refresh();
    }

    remove(index) {
        const chapter = Storage.nowBook.getNow();
        if(Storage.nowBook.canNotRemove(chapter)){
            this.showNotify(
                "error",
                "Chapter should have more than one page !"
            );
            return;
        }
        Storage.nowBook.remove(index, chapter);
        if(index === Storage.nowBook.getNow(chapter)){
            Storage.nowBook.change(
                Storage.nowBook.getIndexes(chapter)[0],
                chapter
            );
        }
        this.props.handleChangePage();
        this.refresh();
    }

    create(no) {
        this.state.indexes.splice(no, 0, "");
        this._sortkey ++;
        this.doMenuOptions("rename", "");
    }

    rename(index, name){
        if(!Storage.nowBook.has(index, Storage.nowBook.getNow())){
            Storage.nowBook.create(
                this.state.indexes.indexOf(index),
                name,
                Storage.nowBook.getNow()
            );
            this.select(name, this.setScrollbar);
        }
        else{
            Storage.nowBook.rename(index, name, Storage.nowBook.getNow());
            if(Storage.nowBook.getNow(Storage.nowBook.getNow()) === index){
                this.select(name);
            }
            else{
                this.refresh();
            }
        }
    }

    select(index, callback){
        Storage.nowBook.change(index, Storage.nowBook.getNow());
        this.props.handleChangePage();
        this.refresh(callback);
    }

    copy(index){
        this.clipBoard = Storage.nowBook.getPath(index, Storage.nowBook.getNow());
    }

    reload(){
        if(Storage.nowBook.isEmpty(Storage.nowBook.getNow())){
            this.refresh(this.createEnd);
        }
        else{
            const chapter = Storage.nowBook.getNow();
            this.select(Storage.nowBook.getNow(chapter));
        }
    }

    resize(){
        this.resizeSortableList();
    }

    render(){
        return this.renderGen();
    }
}