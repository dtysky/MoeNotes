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


class PageList extends SortableList {
    constructor(props){
        super(props);
        this.initState(
            "page-list",
            Storage.getIndexes(Storage.getNow())
        );
    }

    refresh(){
        this._sortkey ++;
        this.setState({
            indexes: Storage.getIndexes(Storage.getNow())
        });
    }

    onSort(indexes) {
        Storage.setIndexes(indexes, Storage.getNow());
        this.refresh();
    }

    remove(index) {
        Storage.remove(index, Storage.getNow());
        this.select(index);
    }

    create(no) {
        this.state.indexes.splice(no, 0, "");
        this._sortkey ++;
        this.doMenuOptions("rename", "");
    }

    rename(index, name){
        if(!Storage.has(index, Storage.getNow())){
            Storage.create(name, Storage.getNow());
            Storage.setIndexes(this.state.indexes, Storage.getNow());
        }
        else{
            Storage.rename(index, name, Storage.getNow());
        }
        this.select(name);
    }

    select(index){
        Storage.change(index, Storage.getNow());
        this.props.handlerChangePage();
        this.refresh();
    }

    copy(index){
        this.clipBoard = Storage.getPath(index, Storage.getNow());
    }

    reload(){
        if(Storage.isEmpty(Storage.getNow())){
            this.createEnd();
        }
        else{
            const chapter = Storage.getNow();
            this.select(Storage.getNow(chapter));
        }
    }

    render(){
        return this.renderGen();
    }
}

export default PageList;