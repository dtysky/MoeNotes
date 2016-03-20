/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/20
 * Description: Indexes of pages.
 */

'use strict';

import React from 'react';
import Sortable, { SortableItemMixin } from 'react-anything-sortable';

import './theme/styles/sky.css';

const SortableListItem = React.createClass({
    mixins: [SortableItemMixin],

    onSubmit: function(event){
        this.props.handleTextChange(
            this.props.item, event.target.value
        );
    },

    render: function() {
        return this.renderWithSortable(
            <li
                className={
                    this.props.classItem + " "
                }
            >
                <input
                    type="text"
                    value={this.props.item}
                    onSubmit={this.onSubmit}
                />
            </li>
        );
    }
});


class SortableList extends React.Component {
    constructor(props){
        super(props);
        this.renderGen = function() {
            return (
                <div
                    style={this.props.style}
                    className={this.props.classList}
                >
                    <Sortable
                        onSort={this.onSort.bind(this)}
                    >
                        {
                            this.state.data.indexes.map(index => {
                                return (
                                    <SortableListItem
                                        sort={this.sort}
                                        sortData={this.state.data}
                                        item={index}
                                        classItem={this.props.classItem}
                                        handleTextChange={this.rename}
                                    />
                                );
                            }, this)
                        }

                    </Sortable>
                </div>
            );
        };
    }

    render(){
        return (
            <div></div>
        );
    }
}

export default SortableList;