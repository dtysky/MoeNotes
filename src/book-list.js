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
            now: Storage.nowBook,
            width: 0
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
                "resizeButton",
                "doMenuOptions",
                "handleTextChange",
                "handleErrorCannotChange",
                "showNotify"
            ]
        );
    }

    onCreate(){
        this.create(this.state.indexes.length + 1);
    }

    onLoad(){
        //Not finised !
        this.refresh();
    }

    refresh(){
        this.setState({
            indexes: Storage.getIndexes(),
            now: Storage.getNow()
        }, this.resizeButton);
    }

    create() {
        //Not finised !
        this.select();
    }

    load() {

    }

    remove(index) {
        Storage.remove(index);
        //if empty, load book!
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
        this.select(name);
    }

    select(index){
        Storage.change(index);
        this.props.handleChangeBook();
        this.refresh();
    }

    resizeButton(){
        const width = ReactDom.findDOMNode(this.refs.buttonsOpen).offsetWidth;
        this.props.reoffsetChapter(width);
        this.setState({
            width: width
        });
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
                    styles={{
                        bmBurgerButton:{
                            position: this.props.buttonPosition,
                            height: this.props.buttonHeight,
                            top: this.props.buttonTop,
                            width: this.state.width
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
                                    className={this.props.classSortableItem}
                                    canInput={this.state.canInput === no}
                                    handleTextChange={this.handleTextChange}
                                    handleErrorCannotChange={this.handleErrorCannotChange}
                                    doMenuOptions={this.doMenuOptions}
                                />
                            );
                        }, this)
                    }
                    <button
                        onClick={this.onCreate}
                    >
                        Create
                    </button>
                    <button
                        onClick={this.onLoad}
                    >
                        Load
                    </button>
                </Menu>
                <div
                    ref="buttonsOpen"
                    className="books-button-open"
                    style={{
                        position: this.props.buttonPosition,
                        height: this.props.buttonHeight,
                        top: this.props.buttonTop
                    }}
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