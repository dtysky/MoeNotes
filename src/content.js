/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Entry.
 */

'use strict';

import React from 'react';
import Page from './page';
import PageList from './pages-list';

import './theme/styles/sky.css';

class Content extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        const width = this.props.width;
        this.styles = {
            pageList: {
                width: 200
            },
            page: {
                width: width - 200
            }
        };
        return (
            <div style={this.props.style}>
                <PageList
                    classList="page-list full-height float-left"
                    classSortableList="inner page-sortable-list full-width"
                    classSortableItem="page-sortable-list-item"
                    classButton="page-list-button"
                    style={this.styles.pageList}
                    layoutMode="vertical"
                    chapter={this.props.chapter}
                    addButtonLocation="front"
                />
                <Page
                    style={this.styles.page}
                />
            </div>
        );
    }
}

export default Content;