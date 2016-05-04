/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/20
 * Description: Indexes of pages.
 */

'use strict';

import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import Book from './book-item';
const Menu = require('react-burger-menu').slide;
import Storage from './storage';
import Notify from './notify';
import BookPicker from './book-picker';
import { bindFunctions, stringToColor, logError } from './utils';
import configManager from './config';

if (process.env.BROWSER) {
    require('./theme/styles/sky.css');
    require('./theme/styles/books.css');
}


export default class BookList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            indexes: Storage.getIndexes(),
            now: Storage.getNow(),
            width: 0,
            isOpen: false
        };
        this._sortkey = 0;
        bindFunctions(
            this,
            [
                "onCreate",
                "onLoad",
                "refresh",
                "create",
                "load",
                "rename",
                "remove",
                "select",
                "open",
                "close",
                "save",
                "isMenuOpen",
                "resizeButton",
                "doMenuOptions",
                "handleTextChange",
                "handleErrorCannotChange",
                "showNotify"
            ],
            logError(configManager.getSysConfig().logPath)
        );
    }

    onCreate(){
        this.create();
    }

    onLoad(){
        this.load();
    }

    refresh(){
        this.save();
        this._sortkey ++;
        this.setState({
            indexes: Storage.getIndexes(),
            now: Storage.getNow()
        }, this.resizeButton);
    }

    create() {
        BookPicker.create(
            dp => {
                if(dp === null && Storage.isEmpty()){
                    this.create();
                    return;
                }
                if(dp === null){
                    return;
                }
                if(!Storage.has(dp)){
                    Storage.create(dp);
                }
                this.select(dp);
                this.close();
            }
        );
    }

    load() {
        BookPicker.open(
            dp => {
                if(dp === null && Storage.isEmpty()){
                    this.load();
                    return;
                }
                if(dp === null){
                    return;
                }
                if(!Storage.has(dp)){
                    Storage.create(dp);
                }
                this.select(dp);
                this.close();
            }
        );
    }

    remove(index) {
        Storage.remove(index);
        if(Storage.isEmpty()){
            this.create();
            return;
        }
        if(Storage.getNow() === index){
            Storage.change(
                Storage.getIndexes()[0]
            );
        }
        this.refresh();
        this.props.handleChangeBook();
    }

    rename(index, name){
        Storage.rename(index, name);
        if(Storage.isEmpty()){
            this.create();
            return;
        }
        this.refresh();
    }

    select(index){
        Storage.change(index);
        this.refresh();
        this.props.handleChangeBook();
    }

    open(){
        this.setState({
            isOpen: true
        });
    }

    close(){
        this.setState({
            isOpen: false
        });
    }

    save(){
        Storage.save();
    }

    isMenuOpen(state){
        if(!state.isOpen){
            this.close();
        }
    }

    resizeButton(){
        const width = ReactDom.findDOMNode(this.refs.buttonsOpen).offsetWidth;
        this.props.reoffsetChapter(width);
    }

    doMenuOptions(option, index){
        if(option === "remove"){
            this.showNotify(
                "warn",
                "This book will be deleted irrevocably(but not removed from device), are you sure ?",
                {
                    onOk: {
                        fun: this.remove,
                        param: index
                    }
                }
            );
        }
        else if(option === "rename"){
            this.setState({
                canInput: this.state.indexes.indexOf(index)
            });
        }
        else if(option === "select"){
            this.select(index);
        }
    }

    handleTextChange(index, name) {
        this.setState({
            canInput: -1
        });
        this.rename(index, name);
    }

    handleErrorCannotChange(message){
        this.showNotify("error", message);
    }

    showNotify(type, message, callbacks){
        this.props.handleShowNotify(type, message, callbacks);
    }

    componentDidMount(){
        this.resizeButton();
    }

    render(){
        const config = configManager.getConfig();
        return (
            <div>
                <Menu
                    className="book-list"
                    isOpen={this.state.isOpen}
                    onStateChange={this.isMenuOpen}
                    styles={{
                        bmBurgerButton:{
                            position: "absolute",
                            height: 0,
                            width: 0
                        },
                        bmOverlay:{
                            zIndex: 10,
                            background: "rgba(200,200,200,0.7)"
                        },
                        bmMenuWrap: {
                          zIndex: 11
                        }
                    }}
                >
                    {
                        this.state.indexes.map((index, no) => {
                            return (
                                <Book
                                    key={this._sortkey}
                                    ref={index}
                                    index={index}
                                    name={Storage.getName(index)}
                                    canInput={this.state.canInput === no}
                                    handleTextChange={this.handleTextChange}
                                    handleErrorCannotChange={this.handleErrorCannotChange}
                                    doMenuOptions={this.doMenuOptions}
                                />
                            );
                        }, this)
                    }
                    <div
                        className="book-list-create book-list-button button text-center float-left"
                        onClick={this.onCreate}
                    >
                        Create
                    </div>
                    <div
                        className="book-list-load book-list-button button text-center float-left"
                        onClick={this.onLoad}
                    >
                        Load
                    </div>
                </Menu>
                <div
                    ref="buttonsOpen"
                    className="books-button-open button"
                    style={{
                        position: this.props.buttonPosition,
                        height: this.props.buttonHeight,
                        lineHeight: this.props.buttonHeight + "px",
                        top: this.props.buttonTop
                    }}
                    onClick={this.open}
                >
                    <div
                        style={{
                            backgroundColor: stringToColor(
                                Storage.getName(this.state.now), config.bookShapeCSC
                            )
                        }}
                        className="books-button-open-pre float-left"
                    >
                    </div>
                    <div
                        style={{
                            color: stringToColor(
                                Storage.getName(this.state.now), config.bookShapeCSC
                            )
                        }}
                        className="float-left"
                    >
                        {
                            Storage.getName(this.state.now)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

BookList.propTypes = {
    menuStyle: PropTypes.object,
    buttonHeight: PropTypes.number,
    buttonTop: PropTypes.number,
    buttonPosition: PropTypes.string,
    handleChangeBook: PropTypes.func,
    reoffsetChapter: PropTypes.func,
    handleShowNotify: PropTypes.func
};

BookList.defaultProps = {
    menuStyle: {},
    handleChangeBook: () => {},
    reoffsetChapter: (width) => {},
    handleShowNotify: (type, message, callbacks) => {}
};