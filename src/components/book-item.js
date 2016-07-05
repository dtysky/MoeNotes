/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/20
 * Description: Indexes of pages.
 */

'use strict';

import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import { bindFunctions, stringToColor, logError } from '../cores/utils';
import configManager from '../cores/config-manager';


if (process.env.BROWSER) {
    require ('../theme/styles/sky.css');
    require ('../theme/styles/books.css');
}

export default class Book extends React.Component {
    constructor(props){
        super(props);
        this.canInputNow = false;
        this.state = {
            text: this.props.name
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
            ],
            logError(configManager.getSysConfig().logPath)
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
        if(text === this.props.name){
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
        this.canInputNow = false;
    }

    enableInput(){
        const element = ReactDom.findDOMNode(this.refs.text);
        element.focus();
        if(!this.canInputNow && this.props.canInput){
            const length = this.state.text.length;
            element.setSelectionRange(length, length);
            this.canInputNow = true;
        }
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
        const config = configManager.getConfig();
        return (
            <div
                className="book"
                style={{
                    backgroundColor: stringToColor(this.props.name, config.bookBackCSC)
                }}
            >
                <div
                    style={{
                        backgroundColor: stringToColor(this.props.name, config.bookShapeCSC)
                    }}
                    className="book-pre button float-left"
                    onClick={this.onSelect}
                >
                </div>
                <form
                    className="book-text float-left"
                    onSubmit={this.onSubmit}
                    onBlur={this.onSubmit}
                >
                    <input
                        ref="text"
                        disabled={!this.props.canInput}
                        type="text"
                        value={this.state.text}
                        style={{
                            color: stringToColor(this.props.name, config.bookFontCSC)
                        }}
                        onChange={this.onChange}
                    />
                </form>
                <div
                    className="book-buttons float-left"
                >
                    <div
                        style={{
                            backgroundColor: stringToColor(this.props.name, config.bookShapeCSC)
                        }}
                        className="book-button-edit book-button button"
                        onClick={this.onRename}
                    >
                    </div>
                    <div
                        style={{
                            backgroundColor: stringToColor(this.props.name, config.bookShapeCSC)
                        }}
                        className="book-button-remove book-button button"
                        onClick={this.onRemove}
                    >
                    </div>
                </div>
            </div>
        );
    }
}

Book.propTypes = {
    index: PropTypes.string,
    name: PropTypes.string,
    canInput: PropTypes.bool,
    handleTextChange: PropTypes.func,
    handleErrorCannotChange: PropTypes.func,
    doMenuOptions: PropTypes.func
};

Book.defaultProps = {
    canInput: false,
    handleTextChange: (index, name) => {},
    handleErrorCannotChange: (message) => {},
    doMenuOptions: (option, index) => {}
};