/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/21
 * Description: Notifies.
 */


'use strict';

import React, { PropTypes } from 'react';
import { FadeModal as Modal } from 'boron';
import NotificationSystem from 'react-notification-system';
import { bindFunctions, logError } from './utils';
import configManager from './config-manager';

if (process.env.BROWSER) {
    require ('./theme/styles/sky.css');
    require ('./theme/styles/notify.css');
}


export default class Notify extends React.Component {
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
        bindFunctions(
            this,
            [
                "show"
            ],
            logError(configManager.getSysConfig().logPath)
        );
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
            if(type === "warn" || type === "error" || type === "sysInfo"){
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
                    background: config.notifyInfoBack,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "top"
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
                    modalStyle={{
                    }}
                    backdropStyle={{
                        backgroundColor: config.notifyDropBack
                    }}
                    contentStyle={{
                        backgroundSize: "100% 100%",
                        background: config.notifyErrorBack,
                        outline: "none"
                    }}
                    onHide={() => this.state.onHide.fun(this.state.onHide.param)}
                >
                    <div className="modal-head">
                    </div>
                    <div className="modal-body">
                        <div
                            className="modal-message"
                            dangerouslySetInnerHTML={{__html: this.state.message}}
                        >
                        </div>
                        <button
                            className="modal-button button"
                            onClick={() => this.refs.error.hide()}
                        >
                            Close
                        </button>
                    </div>
                </Modal>
                <Modal
                    ref="warn"
                    className="modal-warn modal"
                    modalStyle={{
                    }}
                    backdropStyle={{
                        backgroundColor: config.notifyDropBack
                    }}
                    contentStyle={{
                        animationDuration: 0,
                        backgroundSize: "100% 100%",
                        background: config.notifyWarnBack,
                        outline: "none"
                    }}
                    onHide={this.state.onHide.fun(this.state.onHide.param)}
                >
                    <div className="modal-head">
                    </div>
                    <div className="modal-body">
                        <div
                            className="modal-message"
                            dangerouslySetInnerHTML={{__html: this.state.message}}
                        >
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
                    </div>
                </Modal>
                <Modal
                    ref="sysInfo"
                    className="modal-sys-info modal"
                    modalStyle={{
                    }}
                    backdropStyle={{
                        backgroundColor: config.notifyDropBack
                    }}
                    contentStyle={{
                        animationDuration: 0,
                        backgroundSize: "100% 100%",
                        background: config.notifySysInfoBack,
                        outline: "none"
                    }}
                    onHide={this.state.onHide.fun(this.state.onHide.param)}
                >
                    <div className="modal-head">
                    </div>
                    <div className="modal-body">
                        <div
                            className="modal-message"
                            dangerouslySetInnerHTML={{__html: this.state.message}}
                        >
                        </div>
                        <button
                            className="modal-button button"
                            onClick={() => this.refs.sysInfo.hide()}
                        >
                            Close
                        </button>
                    </div>
                </Modal>
                <NotificationSystem
                    ref="info"
                    style={style}
                />
            </div>
        );
    }
}

Notify.propTypes = {
};
