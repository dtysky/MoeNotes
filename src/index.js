/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Entry.
 */

'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import BookPicker from './book-picker';
import ChapterList from './chapter-list';
import BookList from './book-list';
import Page from './page';
import PageList from './page-list';
import Notify from './notify';
import Toolbar from './toolbar';
import Storage from './storage';
import { bindFunctions, stringToColor, logError } from './utils';
import configManager from './configManager';


if (process.env.BROWSER) {
    require ('./theme/styles/sky.css');
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            chapterListLeft: 100,
            toolbarColor: "rgba(0,0,0,0)",
            headBackColor: "rgba(0,0,0,0)",
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
                "handleChangeChapter",
                "handleChangePage",
                "handleChangeMode",
                "handleShowNotify",
                "loadTheme",
                "changeColor",
                "create",
                "createDefault",
                "resize",
                "initOptions"
            ],
            logError(configManager.getSysConfig().logPath)
        );
    }

    handleChangeBook(){
        this.refs.chapterList.reload();
    }

    reoffsetChapter(width){
        this.setState({
            chapterListLeft: width + 30
        });
        this.changeColor();
    }

    handleChangeChapter(){
        this.refs.pageList.reload();
        this.changeColor();
    }

    handleChangePage(){
        this.refs.page.reload();
    }

    handleChangeMode(mode){
        this.refs.page.changeMode(mode);
    }

    handleShowNotify(type, message, callbacks){
        this.refs.notify.show(type, message, callbacks);
    }

    changeColor(){
        const config = configManager.getConfig();
        this.setState({
            toolbarColor: stringToColor(Storage.getName(Storage.getNow()), config.toolbarCSC),
            headBackColor: stringToColor(Storage.getName(Storage.getNow()), config.headBackCSC),
            headLineColor: stringToColor(Storage.nowBook.getNow(), config.chapterNowBackCSC),
            pageListBackColor: stringToColor(Storage.nowBook.getNow(), config.pageListBackCSC),
            pageListButtonBackColor: stringToColor(Storage.nowBook.getNow(), config.pageButtonBackCSC),
            pageListButtonFontColor: stringToColor(Storage.nowBook.getNow(), config.pageButtonFontCSC)
        });
    }

    resize() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
        if(!Storage.nowBook.isEmpty()){
            this.refs.page.refs.editor.editor.resize();
            this.refs.pageList.resize();
        }
    }

    loadTheme(){
        const theme = configManager.getStyles();
        const head = document.head;
        let link = document.createElement('link');
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = theme.css;
        head.appendChild(link);
    }

    initOptions(){
        window.addEventListener('resize', this.resize);
        this.loadTheme();
        this.changeColor();
        this.resize();
    }

    createDefault(){
        Storage.nowBook.create(
            0, "Chapter"
        );
        Storage.nowBook.change("Chapter");
        Storage.nowBook.create(
            0, "Page", "Chapter"
        );
        Storage.nowBook.change(
            "Page", "Chapter"
        );
    }

    create(){
        BookPicker.create(
            dp => {
                if(dp === null && Storage.isEmpty()){
                    this.create();
                    return;
                }
                Storage.create(dp);
                Storage.change(dp);
                Storage.save();
                this.initOptions();
                this.handleChangeBook();
            }
        );
    }

    componentWillMount(){
        if(Storage.isEmpty()){
            this.create();
            return;
        }
        if(Storage.nowBook.isEmpty()){
            this.createDefault();
        }
    }

    componentDidMount() {
        this.initOptions();
    }

    render(){
        const width = this.state.width;
        const height = this.state.height;
        const headHeight = 100;
        this.styles = {
            head: {
                height: headHeight,
                backgroundColor: this.state.headBackColor
            },
            content: {
                height: height - headHeight
            },
            toolbar: {
                height: 24,
                right: 20,
                top: 10
            },
            toolbarItem: {
                width: 24,
                backgroundColor: this.state.toolbarColor
            },
            toolbarThemeSelector: {
                color: this.state.toolbarColor,
                borderColor: this.state.toolbarColor
            },
            bookButtonHeight: 65,
            bookButtonTop: headHeight - 70,
            bookButtonPosition: "absolute",
            bookListMenu: {
                height: 48
            },
            chapterList: {
                width: width - this.state.chapterListLeft,
                left: this.state.chapterListLeft,
                height: 45,
                top: headHeight - 45
            },
            headLine: {
                top: headHeight - 5,
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
        return Storage.isEmpty() ? (
            <div
                key="start"
                className="init-load absolute full-width text-center"
            >
            </div>
        )
            :
        (
            <div
                key="normal"
            >
                <Notify
                    ref="notify"
                />
                <div
                    ref="head"
                    className="head full-width"
                    style={this.styles.head}
                >
                    <div
                        className="head head-image full"
                    >
                        <BookList
                            ref="bookList"
                            menuStyle={this.styles.bookListMenu}
                            buttonHeight={this.styles.bookButtonHeight}
                            buttonTop={this.styles.bookButtonTop}
                            buttonPosition={this.styles.bookButtonPosition}
                            handleChangeBook={this.handleChangeBook}
                            reoffsetChapter={this.reoffsetChapter}
                            handleShowNotify={this.handleShowNotify}
                        />
                        <ChapterList
                            ref="chapterList"
                            classBackground="chapter-list-background absolute"
                            classList="chapter-list"
                            classSortableList="chapter-sortable-list inner"
                            classSortableItem="chapter-sortable-list-item"
                            classButton="chapter-list-button inner button"
                            style={this.styles.chapterList}
                            layoutMode="horizontal"
                            addButtonLocation="end"
                            handleChangeChapter={this.handleChangeChapter}
                            handleShowNotify={this.handleShowNotify}
                        />
                        <div
                            className="head-line absolute"
                            style={this.styles.headLine}
                        >
                        </div>
                        <Toolbar
                            ref="toolbar"
                            style={this.styles.toolbar}
                            styleItem={this.styles.toolbarItem}
                            styleThemeSelector={this.styles.toolbarThemeSelector}
                            handleShowNotify={this.handleShowNotify}
                            handleChangeMode={this.handleChangeMode}
                        />
                    </div>
                </div>
                <div style={this.styles.content}>
                    <PageList
                        ref="pageList"
                        classBackground="page-list-background float-left"
                        classList="page-list full-height"
                        classSortableList="page-sortable-list"
                        classSortableItem="page-sortable-list-item"
                        classButton="page-list-button button"
                        style={this.styles.pageListBackground}
                        styleList={this.styles.pageList}
                        styleButton={this.styles.pageListButton}
                        layoutMode="vertical"
                        addButtonLocation="front"
                        handleChangePage={this.handleChangePage}
                        handleShowNotify={this.handleShowNotify}
                    />
                    <Page
                        ref="page"
                        style={this.styles.page}
                        handleShowNotify={this.handleShowNotify}
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