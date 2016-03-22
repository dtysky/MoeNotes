/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/20
 * Description: Indexes of pages.
 */

'use strict';

import React from 'react';
const Menu = require('react-burger-menu').slide;
import Storage from './storage';
import Notify from './notify';

import './theme/styles/sky.css';
import './theme/styles/books-list.css';


class BookList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            indexes: Storage.getBookIndexes()
        };
    }

    refresh(){
        this.setState({
            indexes: Storage.getBookIndexes()
        });
    }

    remove(index) {
        Storage.removeBook(index);
        this.refresh();
    }

    create(index) {
        this.refresh();
    }

    rename(index, name){
        Storage.renameBook(index, name);
        this.refresh();
    }

    onCreate(){

    }

    render(){
        console.log(this.props);
        return (
            <Menu
                styles={this.props.styles}
            >
                {
                    this.state.indexes.map((index, no) => {
                        return (
                            <div>index</div>
                        );
                    }, this)
                }
                <button
                    onClick={this.onCreate.bind(this)}
                >
                    Create
                </button>
            </Menu>
        );
    }
}

export default BookList;