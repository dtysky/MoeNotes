/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/4/1
 * Description: Call native APIs.
 */


import React from 'react';
import ReactDom from 'react-dom';
import { remote } from 'electron';
const dialog = remote.dialog;
import fs from 'fs';
import { bindFunctions } from './utils';

const aboutMessage = `
    MeoNotes

    A simple app for writing notes with markdown, and without any database(you can manage your .md files by yourself).
    For more information, please check here:

    Homepage:
        http://moe-notes.dtysky.moe
    Github:
        https://github.com/dtysky/MoeNotes

    Copyright (C) 2016  Tianyu Dai (dtysky)<dtysky@outlook.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
`;

export default class BookPicker extends React.Component{
    constructor(props){
        super(props);
        bindFunctions(
            this,
            [
                "showAbout",
                "reloadAPP"
            ]
        );
    }

    showAbout(){
        dialog.showMessageBox(
            {
                type: "info",
                title: "About",
                message: aboutMessage,
                buttons: []
            }
        );
    }

    reloadAPP(){
        remote.getCurrentWindow().reload();
    }

    render(){
        return (
            <div
                className="toolbar absolute"
                style={this.props.style}
            >
                <div
                    className="toolbar-item toolbar-reload button float-left"
                    style={this.props.styleItem}
                    onClick={this.reloadAPP}
                >
                </div>
                <div
                    className="toolbar-item toolbar-about button float-left"
                    style={this.props.styleItem}
                    onClick={this.showAbout}
                >
                </div>

            </div>
        );
    }
}