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
            indexes: storage.getChapter(this.props.chapter)
        };
    }

    refresh(){
        this._sortkey ++;
        this.setState({
            indexes: storage.getChapter(this.props.chapter)
        });
    }

    onSort(indexes) {
        storage.setChapterIndexes(this.props.chapter, indexes);
        this.refresh();
    }

    remove(index) {
        storage.removePage(this.props.chapter, index);
        this.refresh();
    }

    create(index) {
        console.log(index);
    }

    rename(index, name){
        storage.renamePage(this.props.chapter, index, name);
        this.refresh();
    }

    render(){
        return this.renderGen();
    }
}

export default PageList;