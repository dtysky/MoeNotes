/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/7/5
 * Description:
 */


import React, { Component } from 'react';
import {RadioGroup, Radio} from 'react-radio-group';
import { remote } from 'electron';
const dialog = remote.dialog;
import fs from 'fs';
import path from 'path';
import { bindFunctions, getNameFromPath } from '../cores/utils';
import parse from '../cores/parser';
import Storage from '../cores/storage';
import { FadeModal as Modal } from 'boron';
import configManager from '../cores/config-manager';
import wkhtmltopdf from 'wkhtmltopdf';


const HTMLTemplate = `<!doctype html>
<html lang="zh" class="full">
<head>
<meta charset="utf-8">
<title>{{title}}</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.6.0/katex.min.css">
<style>
{{style}}
</style>
</head>
<body class="full">
<div class="content">
{{content}}
</div>
</body>
</html>`;


export default class FileExporter extends Component{
    constructor(props){
        super(props);
        this.state = {
            type: "html",
            theme: "none"
        };
        bindFunctions(
            this,
            [
                "chooseFile",
                "createFile",
                "exportFile",
                "show",
                "hide",
                "exportPDF",
                "exportHTML",
                "getCurrentHTML"
            ]
        );
    }

    chooseFile(title, callback){
        const chapter = Storage.nowBook.getCurrent();
        const file = Storage.nowBook.getCurrent(chapter);
        const fpMarkdown = Storage.nowBook.getPath(file, chapter);
        const fpSave = `${fpMarkdown.replace(".md", "")}.${this.state.type}`;
        dialog.showSaveDialog(
            {
                title: title,
                defaultPath: fpSave
            },
            fp => {
                if(fp === undefined){
                    callback(null);
                    return;
                }
                callback(fp);
            }
        );
    }

    createFile(callback){
        this.chooseFile(
            "Create a file",
            callback
        );
    }

    exportFile(){
        this.createFile(
            fp => {
                if(fp === null){
                    return;
                }
                if(this.state.type === "pdf"){
                    this.exportPDF(fp);
                }
                else if(this.state.type === "html"){
                    this.exportHTML(fp);
                }
            }
        );
    }

    exportHTML(fp){
        fs.writeFileSync(
            fp, this.getCurrentHTML()
        );
    }

    exportPDF(fp){
        wkhtmltopdf(this.getCurrentHTML(),
            {
                marginBottom: 0,
                marginTop: 20,
                marginLeft: 10,
                marginRight: 10
            },
            function(err) {
                console.log(err);
            }
        ).pipe(
            fs.createWriteStream(fp)
        );
    }

    getCurrentHTML(){
        const themePath = configManager.getSysConfig().themePath;
        const chapter = Storage.nowBook.getCurrent();
        const title = Storage.nowBook.getCurrent(chapter);
        const content = parse(Storage.nowBook.readCurrentPage());
        const style = this.state.theme === "none" ?
            "" :
            fs.readFileSync(`${themePath}/export/${this.state.theme}.css`);
        return HTMLTemplate
            .replace("{{title}}", title)
            .replace("{{style}}", style)
            .replace("{{content}}", content);
    }

    show(){
        this.refs.modal.show();
    }

    hide(){
        this.refs.modal.hide();
    }

    render(){
        const config = configManager.getConfig();
        return (
            <Modal
                ref="modal"
                className="modal-export modal"
                modalStyle={{
                    position: "fixed"
                }}
                backdropStyle={{
                    backgroundColor: config.notifyDropBack
                }}
                contentStyle={{
                    backgroundSize: "100% 100%",
                    outline: "none"
                }}
            >
                <div className="modal-head">
                </div>
                <div className="modal-body">
                    <div className="modal-message">
                        <b>
                            Please install <a href="http://wkhtmltopdf.org/">wkhtmltopdf</a> for exporting pdf,
                            <br/>
                            and connect to internet for exporting with formula !
                        </b>
                        <div
                            className="float-left"
                        >
                            <h3>Type</h3>
                            <RadioGroup
                                name="type"
                                selectedValue={this.state.type}
                                onChange={
                                value => {
                                    this.setState({
                                        type: value
                                    });
                                }
                            }
                            >
                                <label>
                                    <Radio value="html" />HTML
                                </label>
                                <label>
                                    <Radio value="pdf" />PDF
                                </label>
                            </RadioGroup>
                        </div>
                        <div
                            className="float-right"
                        >
                            <h3>Theme</h3>
                            <RadioGroup
                                name="theme"
                                selectedValue={this.state.theme}
                                onChange={
                                value => {
                                    this.setState({
                                        theme: value
                                    });
                                }
                            }
                            >
                                <label>
                                    <Radio value="light" />Light
                                </label>
                                <label>
                                    <Radio value="dark" />Dark
                                </label>
                                <label>
                                    <Radio value="none" />None
                                </label>
                            </RadioGroup>
                        </div>
                    </div>
                    <button
                        className="modal-button button button-cancel float-left"
                        onClick={this.hide}
                    >
                        Cancel
                    </button>
                    <button
                        className="modal-button button button-export float-right"
                        onClick={this.exportFile}
                    >
                        Export
                    </button>
                </div>
            </Modal>
        );
    }
}