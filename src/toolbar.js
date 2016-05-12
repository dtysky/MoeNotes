/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/4/1
 * Description: Call native APIs.
 */


import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import { remote, ipcRenderer } from 'electron';
import fs from 'fs';
import { bindFunctions, logError } from './utils';
import configManager from './configManager';

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

export default class Toolbar extends React.Component{
    constructor(props){
        super(props);
        bindFunctions(
            this,
            [
                "showAbout",
                "reloadAPP",
                "changeTheme",
                "changeMode"
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

    changeTheme(event){
        const theme = event.target.value;
        configManager.refresh(theme);
        this.reloadAPP();
    }

    changeMode(event){
        const mode = event.target.value;
        this.props.handleChangeMode(mode);
    }

    render(){
        return (
            <div
                className="toolbar absolute"
                style={this.props.style}
            >
                <select
                    key="toolbar-selector-mode"
                    className="toolbar-selector float-left"
                    style={this.props.styleThemeSelector}
                    size={1}
                    defaultValue="normal"
                    onChange={this.changeMode}
                >
                    {
                        ["normal", "writing", "view"].map(theme => {
                            return (
                                <option
                                    key={theme}
                                    className="toolbar-selector-item"
                                    value={theme}
                                >
                                    {theme}
                                </option>
                            );
                        })
                    }
                </select>
                <select
                    key="toolbar-selector-theme"
                    className="toolbar-selector float-left"
                    style={this.props.styleThemeSelector}
                    size={1}
                    defaultValue={configManager.getNow()}
                    onChange={this.changeTheme}
                >
                    {
                        configManager.getThemes().map(theme => {
                            return (
                                <option
                                    key={theme}
                                    className="toolbar-selector-item"
                                    value={theme}
                                >
                                    {theme}
                                </option>
                            );
                        })
                    }
                </select>
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

Toolbar.propTypes = {
    style: PropTypes.object,
    styleItem: PropTypes.object,
    handleShowNotify: PropTypes.func
};

Toolbar.defaultProps = {
    style: {},
    styleItem: {},
    handleShowNotify: (type, message, callbacks) => {}
};