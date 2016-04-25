/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/21
 * Description: Notifies.
 */


'use strict';

import React from 'react';
import { ContextMenu, MenuItem, ContextMenuLayer } from 'react-contextmenu';

import { bindFunctions } from './utils';

if (process.env.BROWSER) {
    require ('./theme/styles/sky.css');
    require ('./theme/styles/context-menu.css');
}

class ContextMenuMain extends React.Component {
    constructor(props){
        super(props);
        bindFunctions(
            this,
            ["handleClick"]
        );
    }

    handleClick(event, data) {
        this.props.handleClick(data);
    }

    render(){
        return (
            <ContextMenu
                identifier={this.props.name}
            >
                <MenuItem
                    data={{option: "remove"}}
                    onClick={this.handleClick}
                >
                    Remove
                </MenuItem>
                <MenuItem
                    data={{option: "rename"}}
                    onClick={this.handleClick}
                >
                    Rename
                </MenuItem>
                <MenuItem
                    data={{option: "create"}}
                    onClick={this.handleClick}
                >
                    Create
                </MenuItem>
                <MenuItem
                    data={{option: "copy"}}
                    onClick={this.handleClick}
                >
                    Copy
                </MenuItem>
            </ContextMenu>
        );
    }
}



export { ContextMenuMain, ContextMenuLayer };