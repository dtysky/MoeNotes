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

import './theme/styles/sky.css';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            chapterListLeft: 100
        };
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
    }

    handlerChangePage(){
        this.refs.page.reload();
    }

    resize() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize.bind(this));
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
            bookButtonHeight: 60,
            bookButtonTop: 35,
            bookButtonPosition: "absolute",
            bookListMenu: {
                height: 48
            },
            chapterList: {
                width: width - this.state.chapterListLeft,
                left: this.state.chapterListLeft,
                height: 35,
                top: 60
            },
            pageList: {
                width: 200
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
                        classList="chapter-list absolute"
                        classSortableList="chapter-sortable-list inner"
                        classSortableItem="chapter-sortable-list-item"
                        classButton="chapter-list-button inner"
                        style={this.styles.chapterList}
                        layoutMode="horizontal"
                        addButtonLocation="end"
                        handlerChangeChapter={this.handlerChangeChapter.bind(this)}
                    />
                </div>
                <div style={this.styles.content}>
                    <PageList
                        ref="pageList"
                        classList="page-list full-height float-left"
                        classSortableList="page-sortable-list full-width"
                        classSortableItem="page-sortable-list-item"
                        classButton="page-list-button"
                        style={this.styles.pageList}
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