/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/21
 * Description: Notifies.
 */


'use strict';

import React from 'react';
import { ScaleModal } from 'boron';

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
        this.setState({
            message: message,
            onHide: callbacks !== undefined && callbacks.onHide !== undefined ?
                callbacks.onHide : this.defaltCallback,
            onOk: callbacks !== undefined && callbacks.onOk !== undefined ?
                callbacks.onOk : this.defaltCallback,
            onCancel: callbacks !== undefined && callbacks.onCancel !== undefined ?
                callbacks.onCancel : this.defaltCallback
        }, (preState, currPorps) => {
            this.refs[type].show();
        });
    }

    render(){
        return (
            <div>
                <ScaleModal
                    ref="error"
                    className="modal-error"
                    modalStyle={{
                    background: "rgba(0,0,0,0)"
                }}
                    contentStyle={{
                    background: "rgba(255,0,0,0.6)",
                    padding: 20
                }}
                    onHide={() => this.state.onHide.fun(this.state.onHide.param)}
                >
                    <div className="message">
                        {this.state.message}
                    </div>
                    <button
                        className="button"
                        style={{
                            background: "rgba(255,255,255,0.6)"
                        }}
                        onClick={() => this.refs.error.hide()}
                    >
                        Close
                    </button>
                </ScaleModal>
                <ScaleModal
                    ref="warn"
                    className="modal-error"
                    modalStyle={{
                    background: "rgba(0,0,0,0)"
                }}
                    contentStyle={{
                    background: "rgba(255,255,0,0.6)",
                    padding: 20
                }}
                    onHide={this.state.onHide.fun(this.state.onHide.param)}
                >
                    <div className="message">
                        {this.state.message}
                    </div>
                    <button
                        className="button"
                        style={{
                            background: "rgba(255,255,255,0.6)"
                        }}
                        onClick={() => {
                            this.refs.warn.hide();
                            this.state.onOk.fun(this.state.onOk.param);
                        }}
                    >
                        Ok
                    </button>
                    <button
                        className="button"
                        style={{
                            background: "rgba(255,255,255,0.6)"
                        }}
                        onClick={() => {
                            this.refs.warn.hide();
                            this.state.onCancel.fun(this.state.onCancel.param);
                        }}
                    >
                        Cancel
                    </button>
                </ScaleModal>
            </div>
        );
    }
}

export default Notify;