/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/20
 * Description: Indexes of pages.
 */

'use strict';

import React from 'react';
import Sortable, { SortableItemMixin } from 'react-anything-sortable';
import Notify from './notify';
import { ContextMenuMain, ContextMenuLayer } from './context-menu';

import './theme/styles/sky.css';
import './theme/styles/sortable.css';

const SortableListItem = ContextMenuLayer(
    (props) => ("page-list-menu"),
    (props) => ({
        name: props.name
    })
)(React.createClass({
    mixins: [SortableItemMixin],
    getInitialState: function(){
        return {
            text: this.props.sortData
        };
    },

    onChange: function(event){
        this.setState({
            text: event.target.value
        });
    },

    onSubmit: function(event){
        event.preventDefault();
        if (this.state.text.length === 0){
            this.props.handleErrorCannotChange();
            return;
        }
        this.props.handleTextChange(
            this.props.sortData, this.state.text
        );
    },

    render: function() {
        return this.renderWithSortable(
            <div>
                <form
                    onSubmit={this.onSubmit}
                >
                    <input
                        disabled="true"
                        type="text"
                        value={this.state.text}
                        onChange={this.onChange}
                    />
                </form>
            </div>
        );
    }
}));


class SortableList extends React.Component {
    constructor(props){
        super(props);
        this._sortkey=0;
        this.renderGen = function() {
            return (
                <div
                    style={this.props.style}
                    className={this.props.classList}
                >
                    <Notify
                        ref="modal"
                        type="error"
                        message="Can't rename, page's name mustn't be empty !"
                    />
                    <ContextMenuMain
                        name="page-list-menu"
                        handleClick={this.onContextMenu}
                    />
                    <button>
                        <img src="" alt=""/>
                        <p>Add new page</p>
                    </button>
                    <Sortable
                        key={this._sortkey}
                        onSort={this.onSort.bind(this)}
                    >
                        {
                            this.state.indexes.map((index, no) => {
                                return (
                                    <SortableListItem
                                        key={no}
                                        name={index}
                                        sortData={index}
                                        className={this.props.classItem}
                                        handleTextChange={this.rename.bind(this)}
                                        handleErrorCannotChange={this.errorCannotChange.bind(this)}
                                    />
                                );
                            }, this)
                        }

                    </Sortable>
                </div>
            );
        };
    }

    onContextMenu(data) {
        console.log(data);
    }

    errorCannotChange(){
        this.refs.modal.show();
    }

    render(){
        return (
            <div></div>
        );
    }
}

export default SortableList;