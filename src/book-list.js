/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/20
 * Description: Indexes of pages.
 */

'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import Book from './book-item';
const Menu = require('react-burger-menu').slide;
import Storage from './storage';
import Notify from './notify';
import BookPicker from './book-picker';
import { bindFunctions } from './utils';

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
            isOpen: true
        };
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
                "resizeButton",
                "doMenuOptions",
                "handleTextChange",
                "handleErrorCannotChange",
                "showNotify"
            ]
        );
    }

    onCreate(){
        this.create();
    }

    onLoad(){
        this.load();
    }

    refresh(){
        this.setState({
            indexes: Storage.getIndexes(),
            now: Storage.getNow()
        }, this.resizeButton);
    }

    create() {
        BookPicker.create(
            dp => {
                if(!Storage.has(dp)){
                    Storage.create(dp);
                }
                this.state.isOpen = false;
                this.select(dp);
            }
        );
    }

    load() {
        BookPicker.open(
            dp => {
                if(!Storage.has(dp)){
                    Storage.create(dp);
                }
                this.state.isOpen = false;
                this.select(dp);
            }
        );
    }

    remove(index) {
        Storage.remove(index);
        if(Storage.isEmpty()){
            this.create();
        }
        this.props.handleChangeBook();
        this.refresh();
    }

    rename(index, name){
        Storage.rename(index, name);
        if(Storage.isEmpty()){
            this.create();
            return;
        }
        if(index === Storage.getNow()){
            Storage.change(0);
        }
        this.select(index);
    }

    select(index){
        Storage.change(index);
        Storage.save();
        this.props.handleChangeBook();
        this.refresh();
    }

    open(){
        this.setState({
            isOpen: true
        });
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
        this.refs.notify.show(type, message, callbacks);
    }

    componentDidMount(){
        this.resizeButton();
    }

    render(){
        return (
            <div>
                <Menu
                    className="book-list"
                    isOpen={this.state.isOpen}
                    styles={{
                        bmBurgerButton:{
                            position: "absolute",
                            height: 0,
                            width: 0
                        }
                    }}
                >
                    {
                        this.state.indexes.map((index, no) => {
                            return (
                                <Book
                                    key={no}
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
                    {
                        Storage.getName(
                            this.state.now
                        )
                    }
                </div>
                <Notify
                    ref="notify"
                />
            </div>
        );
    }
}