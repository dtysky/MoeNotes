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
    show(){
        this.refs.modal.show();
    }
    render(){
        if(this.props.type === "error"){
            return (
                <ScaleModal
                    ref="modal"
                    className="modal-error"
                    modalStyle={{
                        background: "rgba(0,0,0,0)"
                    }}
                    contentStyle={{
                        background: "rgba(255,0,0,0.6)",
                        padding: 20
                    }}
                >
                    <div className="message">
                        {this.props.message}
                    </div>
                    <button
                        className="button"
                        style={{
                                background: "rgba(255,255,255,0.6)"
                            }}
                        onClick={() => this.refs.modal.hide()}
                    >
                        Close
                    </button>
                </ScaleModal>
            );
        }
        return <div></div>;
    }
}

export default Notify;