/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/20
 * Description: Indexes of pages.
 */

'use strict';

import React from 'react';
import SortableList from './sortable-list';
import storage from './storage';

import './theme/styles/sky.css';


class PageList extends SortableList {
    constructor(props){
        super(props);
        this.state = {
            data: storage.book_now.chapters[this.props.chapter]
        };
    }

    onSort(indexes, dragging) {
        var data = this.state.data;
        data.indexes = indexes;
        data.dragging = dragging;
        storage.setChapterIndexes(this.props.chapter, indexes);
        this.setState({
            data: data
        });
    }

    remove(index) {

    }

    create(index) {

    }

    rename(index, name){

    }

    render(){
        return this.renderGen();
    }
}

export default PageList;