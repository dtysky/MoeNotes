/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/20
 * Description: Indexes of pages.
 */

'use strict';

import React from 'react';
import SortableList from './sortable-list';
import Storage from './storage';
import Notify from './notify';

import './theme/styles/sky.css';


class ChapterList extends SortableList {
    constructor(props){
        super(props);
        this.initState(
            "chapter-list",
            Storage.getIndexes()
        );
    }

    refresh(){
        this._sortkey ++;
        this.setState({
            indexes: Storage.getIndexes()
        }, this.setScrollbar.bind(this));
    }

    onSort(indexes) {
        Storage.setIndexes(indexes);
        this.refresh();
    }

    remove(index) {
        Storage.remove(index);
        this.props.handlerChangeChapter();
        this.refresh();
    }

    create(no) {
        this.state.indexes.splice(no, 0, "");
        this._sortkey ++;
        this.doMenuOptions("rename", "");
    }

    rename(index, name){
        if(!Storage.has(index)){
            Storage.create(name);
            Storage.setIndexes(this.state.indexes);
        }
        else{
            Storage.rename(index, name);
        }
        this.select(name);
    }

    select(index){
        Storage.change(index);
        this.props.handlerChangeChapter();
        this.refresh();
    }

    copy(index){
        this.clipBoard = Storage.getPath(index);
    }

    reload(){
        if(Storage.isEmpty()){
            this.createEnd();
        }
        else{
            this.select(Storage.getNow());
        }
    }

    componentDidUpdate(){
        this.resizeSortableList();
    }

    render(){
        return this.renderGen();
    }
}

export default ChapterList;