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
            Storage.getIndexes(this.props.chapter)
        );
    }

    refresh(){
        this._sortkey ++;
        this.setState({
            indexes: Storage.getIndexes(this.props.chapter)
        });
    }

    onSort(indexes) {
        Storage.setIndexes(indexes, this.props.chapter);
        this.refresh();
    }

    remove(index) {
        //Warning first!
        Storage.remove(index, this.props.chapter);
        this.refresh();
    }

    create(no) {
        this.state.indexes.splice(no, 0, "");
        this._sortkey ++;
        this.doMenuOptions("rename", "");
    }

    rename(index, name){
        if(Storage.getIndexes(this.props.chapter).indexOf(index) === -1){
            Storage.create(name, this.props.chapter);
            Storage.setIndexes(this.state.indexes, this.props.chapter);
        }
        else{
            Storage.rename(index, name, this.props.chapter);
        }
        this.refresh();
    }

    copy(index){
        this.clipBoard = Storage.getPath(index, this.props.chapter);
    }

    render(){
        //console.log(Storage.getIndexes(this.props.chapter));
        return this.renderGen();
    }
}

export default PageList;