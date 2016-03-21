/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/20
 * Description: Indexes of pages.
 */

'use strict';

import React from 'react';
import SortableList from './sortable-list';
import storage from './storage';
import Notify from './notify';

import './theme/styles/sky.css';


class PageList extends SortableList {
    constructor(props){
        super(props);
        this.initState(
            storage.getIndexes(this.props.chapter)
        );
    }

    refresh(){
        this._sortkey ++;
        this.setState({
            indexes: storage.getIndexes(this.props.chapter)
        });
    }

    onSort(indexes) {
        storage.setIndexes(indexes, this.props.chapter);
        this.refresh();
    }

    remove(index) {
        //Warning first!
        storage.remove(index, this.props.chapter);
        this.refresh();
    }

    create(index) {
        console.log(index);
    }

    rename(index, name){
        storage.rename(index, name, this.props.chapter);
        this.refresh();
    }

    render(){
        return this.renderGen();
    }
}

export default PageList;