/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/21
 * Description: Notifies.
 */


'use strict';

import React from 'react';
import { ContextMenu, MenuItem, ContextMenuLayer } from 'react-contextmenu';

import './theme/styles/context-menu.css';
import './theme/styles/sky.css';


class ContextMenuMain extends React.Component {
    render(){
        return (
            <ContextMenu
                identifier={this.props.name}
            >
                <MenuItem
                    data={{option: "delete"}}
                    onClick={this.handleClick.bind(this)}
                >
                    Delete
                </MenuItem>
                <MenuItem
                    data={{option: "rename"}}
                    onClick={this.handleClick.bind(this)}
                >
                    Rename
                </MenuItem>
                <MenuItem
                    data={{option: "create"}}
                    onClick={this.handleClick.bind(this)}
                >
                    Create
                </MenuItem>
                <MenuItem
                    data={{option: "copy"}}
                    onClick={this.handleClick.bind(this)}
                >
                    Copy
                </MenuItem>
            </ContextMenu>
        );
    }

    handleClick(event, data) {
        this.props.handleClick(data);
    }
}



export { ContextMenuMain, ContextMenuLayer };