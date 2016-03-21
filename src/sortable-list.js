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
                        disabled={this.props.canInput}
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
                        handleClick={this.onContextMenu.bind(this)}
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
                                        canInput={this.state.canInput !== no}
                                        handleTextChange={this.handleTextChange.bind(this)}
                                        handleErrorCannotChange={this.handleErrorCannotChange.bind(this)}
                                    />
                                );
                            }, this)
                        }

                    </Sortable>
                </div>
            );
        };
    }

    initState(indexes) {
        this.state = {
            indexes: indexes,
            canInput: -1
        };
    }

    onContextMenu(data) {
        const { option, name} = data;
        if(option === "remove"){
            this.remove(name);
        }
        else if(option === "rename"){
            console.log(this.state);
            this.setState({
                canInput: this.state.indexes.indexOf(name)
            });
        }
        else if(option === "create"){

        }
        else if(option === "copy"){

        }
    }

    handleTextChange(index, name) {
        this.setState({
            canInput: -1
        });
        this.rename(index, name);
    }

    handleErrorCannotChange(){
        this.refs.modal.show();
    }

    render(){
        return (
            <div></div>
        );
    }
}

export default SortableList;