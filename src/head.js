/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Entry.
 */

'use strict';

import React from 'react';
import ChapterList from './chapter-list';
import BookList from './book-list';

import './theme/styles/sky.css';

class Head extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        const width = this.props.width;
        this.styles = {
            bookListMenu: {
                bmBurgerButton: {
                    position: "absolute",
                    width: 48,
                    height: 48,
                    left: 10,
                    top: 0
                }
            },
            chapterList: {
                position: "absolute",
                width: width - 100,
                left: 100,
                top: 0
            }
        };
        return (
            <div
                className="head"
                style={this.props.style}
            >
                <BookList
                    styles={this.styles.bookListMenu}
                />
                <ChapterList
                    classList="chapter-list"
                    classSortableList="chapter-sortable-list"
                    classSortableItem="chapter-sortable-list-item"
                    classButton="chapter-list-button inner"
                    style={this.styles.chapterList}
                    layoutMode="horizontal"
                    addButtonLocation="end"
                />
            </div>
        );
    }
}

export default Head;