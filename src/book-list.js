/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/20
 * Description: Indexes of pages.
 */

'use strict';

import React from 'react';
import ReactDom from 'react-dom';
const Menu = require('react-burger-menu').slide;
import Storage from './storage';
import Notify from './notify';
import { bindFunctions } from './utils';

import './theme/styles/sky.css';
import './theme/styles/books-list.css';

class Book extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: this.props.index
        };
        bindFunctions(
            this,
            [
                "onChange",
                "onSubmit",
                "onRename",
                "onRemove",
                "onSelect",
                "handleTextChange",
                "enableInput"
            ]
        );
    }

    onChange(event){
        this.setState({
            text: event.target.value
        });
    }

    onSubmit(event){
        event.preventDefault();
        var text = this.state.text;
        if (text.length === 0){
            this.props.handleErrorCannotChange(
                "Can't rename, book must have a non-empty name!"
            );
            this.enableInput();
            return;
        }

        this.handleTextChange();
    }

    onRename(){
        this.props.doMenuOptions(
            "rename",
            this.props.index
        );
    }

    onRemove(){
        this.props.doMenuOptions(
            "remove",
            this.props.index
        );
    }

    onSelect(){
        this.props.doMenuOptions(
            "select",
            this.props.index
        );
    }

    handleTextChange(){
        this.props.handleTextChange(
            this.props.index, this.state.text
        );
    }

    enableInput(){
        ReactDom.findDOMNode(this.refs.text).focus();
    }

    componentDidMount(){
        if (this.props.canInput){
            this.enableInput();
        }
    }

    componentDidUpdate(){
        if (this.props.canInput){
            this.enableInput();
        }
    }

    render() {
        return (
            <div
                className={this.props.className}
            >
                <form
                    className=""
                    onSubmit={this.onSubmit}
                    onBlur={this.onSubmit}
                    onClick={this.onSelect}
                >
                    <input
                        ref="text"
                        disabled={!this.props.canInput}
                        type="text"
                        value={this.state.text}
                        onChange={this.onChange}
                    />
                </form>
                <button
                    className=""
                    onClick={this.onRename}
                />
                <button
                    className=""
                    onClick={this.onRemove}
                />
            </div>
        );
    }

}


class BookList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            indexes: Storage.getBookIndexes(),
            now: Storage.getNowBook(),
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
            indexes: Storage.getBookIndexes(),
            now: Storage.getNowBook()
        }, this.resizeButton);
    }

    create() {
        //Not finised !
        this.select();
    }

    load() {

    }

    remove(index) {
        Storage.removeBook(index);
        //if empty, load book!
        this.props.handleChangeBook();
        this.refresh();
    }

    rename(index, name){
        Storage.renameBook(index, name);
        if(Storage.isBookEmpty()){
            this.create();
            return;
        }
        if(index === Storage.getNowBook()){
            Storage.changeBook(0);
        }
        this.select(name);
    }

    select(index){
        Storage.changeBook(index);
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
                        Storage.getBookName(
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

export default BookList;