/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/21
 * Description: Notifies.
 */


'use strict';

import React from 'react';
import { FadeModal as Modal } from 'boron';
import NotificationSystem from 'react-notification-system';
import configManager from './config';

import './theme/styles/sky.css';
import './theme/styles/notify.css';


class Notify extends React.Component {
    constructor(props){
        super(props);
        this.defaltCallback = {
            fun: () => {},
            param: null
        };
        this.state = {
            message: "",
            onHide: this.defaltCallback,
            onOk: this.defaltCallback,
            onCancel: this.defaltCallback
        };
    }

    show(type, message, callbacks){
        const cbs = {
            onHide: callbacks !== undefined && callbacks.onHide !== undefined ?
                callbacks.onHide : this.defaltCallback,
            onOk: callbacks !== undefined && callbacks.onOk !== undefined ?
                callbacks.onOk : this.defaltCallback,
            onCancel: callbacks !== undefined && callbacks.onCancel !== undefined ?
                callbacks.onCancel : this.defaltCallback
        };
        this.setState({
            message: message,
            onHide: cbs.onHide,
            onOk: cbs.onOk,
            onCancel: cbs.onCancel
        }, (preState, currPorps) => {
            if(type === "warn" || type === "error"){
                this.refs[type].show();
            }
            else{
                this.refs[type].addNotification({
                    message: message,
                    level: "info",
                    position: "tr",
                    onRemove: () => { cbs.onHide.fun(cbs.onHide.param); },
                    autoDismiss: 2
                });
            }
        });
    }

    render(){
        const config = configManager.getConfig();
        const style={
            Containers: {
                DefaultStyle: {
                    top: 110,
                    right: 10,
                    width: 300,
                    minHeight: 60
                }
            },
            NotificationItem: {
                DefaultStyle: {
                    width: "100%",
                    height: "100%",
                    borderTop: "none",
                    backgroundColor: "none",
                    backgroundImage: config.infoNotifyBack,
                    backgroundSize: "100% auto",
                    backgroundPosition: "center"
                }
            },
            MessageWrapper: {
                DefaultStyle: {
                    textAlign: "top",
                    fontFamily: config.font,
                    fontSize: 12
                }
            },
            Dismiss: {
                DefaultStyle: {
                    display: 'none'
                }
            }
        };
        return (
            <div>
                <Modal
                    ref="error"
                    className="modal-error modal"
                    backdropStyle={{
                        backgroundColor: config.modalBackDrop
                    }}
                    contentStyle={{
                        backgroundSize: "100% 100%",
                        background: config.errorNotifyBack,
                        boxShadow: config.errorNotifyShadow,
                        padding: 20
                    }}
                    onHide={() => this.state.onHide.fun(this.state.onHide.param)}
                >
                    <div className="modal-message">
                        {this.state.message}
                    </div>
                    <button
                        className="modal-button button"
                        onClick={() => this.refs.error.hide()}
                    >
                        Close
                    </button>
                </Modal>
                <Modal
                    ref="warn"
                    className="modal-warn modal"
                    backdropStyle={{
                        backgroundColor: config.modalBackDrop
                    }}
                    contentStyle={{
                        backgroundSize: "100% 100%",
                        background: config.warnNotifyBack,
                        boxShadow: config.warnNotifyShadow,
                        padding: 20
                    }}
                    onHide={this.state.onHide.fun(this.state.onHide.param)}
                >
                    <div className="modal-message">
                        {this.state.message}
                    </div>
                    <button
                        className="modal-button button"
                        onClick={() => {
                            this.refs.warn.hide();
                            this.state.onOk.fun(this.state.onOk.param);
                        }}
                    >
                        Ok
                    </button>
                    <button
                        className="modal-button button"
                        onClick={() => {
                            this.refs.warn.hide();
                            this.state.onCancel.fun(this.state.onCancel.param);
                        }}
                    >
                        Cancel
                    </button>
                </Modal>
                <NotificationSystem
                    ref="info"
                    style={style}
                />
            </div>
        );
    }
}

export default Notify;