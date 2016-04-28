/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/4/1
 * Description: Call native APIs.
 */


import React from 'react';
import ReactDom from 'react-dom';
import { remote, ipcRenderer } from 'electron';
import fs from 'fs';
import { bindFunctions, logError } from './utils';
import configManager from './config';

const aboutMessage = `
    <h1>MoeNotes</h1>

    <p>A simple application for writing notes with markdown, and without any database(you can manage your .md files by yourself).</p>
    <p>For more information, please check here:</p>

    <h4>Homepage:</h4>
    &nbsp;&nbsp;&nbsp;&nbsp;<a href="http://moe-notes.dtysky.moe">moe-notes.dtysky.moe</a>
    <h4>Github:</h4>
    &nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/dtysky/MoeNotes">github.com/dtysky/MoeNotes</a>

    <p>Copyright (C) 2016  Tianyu Dai (dtysky)&lt;dtysky@outlook.com&gt;</p>

    <p>This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.</p>

    <p>This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.</p>

    <p>You should have received a copy of the GNU General Public License
    along with this program.  If not, see <a href="http://www.gnu.org/licenses/">http://www.gnu.org/licenses/</a>.
</p>`;

export default class BookPicker extends React.Component{
    constructor(props){
        super(props);
        bindFunctions(
            this,
            [
                "showAbout",
                "reloadAPP"
            ],
            logError(configManager.getSysConfig().logPath)
        );
        ipcRenderer.on("showAbout", () => {
            this.showAbout();
        });
    }

    showAbout(){
        this.props.handleShowNotify(
            "sysInfo", aboutMessage
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