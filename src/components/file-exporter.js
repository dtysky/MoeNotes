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
import Storage from '../cores/storage';
import { FadeModal as Modal } from 'boron';
import configManager from '../cores/config-manager';


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
                "loadCSS"
            ]
        );
    }

    chooseFile(title, callback){
        const chapter = Storage.nowBook.getCurrent();
        const file = Storage.nowBook.getCurrent(chapter);
        const fpMarkdown = Storage.nowBook.getPath(file, chapter);
        const fpSave = fpMarkdown.split(".")[0];
        dialog.showSaveDialog(
            {
                title: title,
                defaultPath: fpSave,
                filters: [
                    {name: 'PDF/HTML', extensions: ['pdf', 'html']},
                    {name: 'Light/Dark', extensions: ['light', 'dark']}
                ]
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
                console.log(fp);
                if(fp === null){
                    return;
                }
                if(this.state.type === "PDF"){
                    this.exportPDF(fp);
                }
                else if(this.state.type === "HTML"){
                    this.exportHTML(fp);
                }
            }
        );
    }

    exportHTML(fp){

    }

    exportPDF(fp){

    }

    loadCSS(){

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
                        onClick={this.hideModal}
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