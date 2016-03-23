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
            buttonHeight: 48,
            buttonTop: 40,
            buttonPosition: "absolute",
            bookListMenu: {
                height: 48
            },
            chapterList: {
                width: width - 100,
                left: 100,
                height: 40,
                top: 40
            }
        };
        return (
            <div
                className="head"
                style={this.props.style}
            >
                <BookList
                    menuStyle={this.styles.bookListMenu}
                    buttonHeight={this.styles.buttonHeight}
                    buttonTop={this.styles.buttonTop}
                    buttonPosition={this.styles.buttonPosition}
                />
                <ChapterList
                    classList="chapter-list absolute"
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