/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Entry.
 */

'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import ChapterList from './chapter-list';
import BookList from './book-list';
import Page from './page';
import PageList from './pages-list';
import Storage from './storage';
import { bindFunctions, stringToColor } from './utils';

import './theme/styles/sky.css';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            chapterListLeft: 100,
            headLineColor: "rgba(0,0,0,0)",
            pageListBackColor: "rgba(0,0,0,0)",
            pageListButtonBackColor: "rgba(0,0,0,0)",
            pageListButtonFontColor: "rgba(0,0,0,0)"
        };
        bindFunctions(
            this,
            [
                "handleChangeBook",
                "reoffsetChapter",
                "handlerChangeChapter",
                "handlerChangePage",
                "changeColor",
                "resize"
            ]
        );
    }

    handleChangeBook(){
        this.refs.chapterList.reload();
    }

    reoffsetChapter(width){
        this.setState({
            chapterListLeft: width + 30
        });
    }

    handlerChangeChapter(){
        this.refs.pageList.reload();
        this.changeColor();
    }

    handlerChangePage(){
        this.refs.page.reload();
    }

    changeColor(){
        this.setState({
            headLineColor: stringToColor(Storage.nowBook.getNow(), 50, 60, 1),
            pageListBackColor: stringToColor(Storage.nowBook.getNow(), 20, 40, 0.8),
            pageListButtonBackColor: stringToColor(Storage.nowBook.getNow(), 40, 50, 0.6),
            pageListButtonFontColor: stringToColor(Storage.nowBook.getNow(), 100, 20, 1)
        });
    }

    resize() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize.bind(this));
        this.changeColor();
        this.resize();
    }

    render(){
        const width = this.state.width;
        const height = this.state.height;
        this.styles = {
            head: {
                height: 100
            },
            content: {
                height: height - 100
            },
            bookButtonHeight: 65,
            bookButtonTop: 25,
            bookButtonPosition: "absolute",
            bookListMenu: {
                height: 48
            },
            chapterList: {
                width: width - this.state.chapterListLeft,
                left: this.state.chapterListLeft,
                height: 40,
                top: 55
            },
            headLine: {
                top: 95,
                height: 5,
                backgroundColor: this.state.headLineColor
            },
            pageList: {
                width: 200,
                backgroundColor: this.state.pageListBackColor
            },
            pageListBackground: {
                width: 200
            },
            pageListButton: {
                backgroundColor: this.state.pageListButtonBackColor,
                color: this.state.pageListButtonFontColor
            },
            page: {
                width: width - 200
            }
        };
        return (
            <div>
                <div
                    ref="head"
                    className="head"
                    style={this.styles.head}
                >
                    <BookList
                        menuStyle={this.styles.bookListMenu}
                        buttonHeight={this.styles.bookButtonHeight}
                        buttonTop={this.styles.bookButtonTop}
                        buttonPosition={this.styles.bookButtonPosition}
                        handleChangeBook={this.handleChangeBook.bind(this)}
                        reoffsetChapter={this.reoffsetChapter.bind(this)}
                    />
                    <ChapterList
                        ref="chapterList"
                        classBackground="chapter-list absolute"
                        classList=""
                        classSortableList="chapter-sortable-list inner"
                        classSortableItem="chapter-sortable-list-item"
                        classButton="chapter-list-button inner"
                        style={this.styles.chapterList}
                        layoutMode="horizontal"
                        addButtonLocation="end"
                        handlerChangeChapter={this.handlerChangeChapter.bind(this)}
                    />
                    <div
                        className="head-line absolute"
                        style={this.styles.headLine}
                    >
                    </div>
                </div>
                <div style={this.styles.content}>
                    <PageList
                        ref="pageList"
                        classBackground="page-list-background  float-left"
                        classList="page-list full-height"
                        classSortableList="page-sortable-list full-width"
                        classSortableItem="page-sortable-list-item"
                        classButton="page-list-button"
                        style={this.styles.pageListBackground}
                        styleList={this.styles.pageList}
                        styleButton={this.styles.pageListButton}
                        layoutMode="vertical"
                        addButtonLocation="front"
                        handlerChangePage={this.handlerChangePage.bind(this)}
                    />
                    <Page
                        ref="page"
                        style={this.styles.page}
                    />
                </div>

            </div>
        );
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('react-content')
);