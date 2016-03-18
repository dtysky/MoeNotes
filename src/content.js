/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Entry.
 */

'use strict';

import { parse } from './parser';
import React from 'react';
import ReactDom from 'react-dom';
require('./theme/styles/sky.css');
require('./theme/styles/highlight.css');
require('./theme/styles/katex.css');

class Content extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            html : ""
        };
    }
    parsePage(event){
        console.log(parse);
        this.setState({
            html: parse(event.target.value)
        });
    }
    render(){
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.styles = {
            content: {
                background: "red",
                left: 20,
                width: width - 200,
                height: height * 0.8
            },
            src: {
                float: "left",
                background: "rgba(255,255,255, 0.6)",
                width: "48%",
                height: "98%",
                margin: "1%"
            },
            dist: {
                float: "left",
                background: "rgba(255,255,255, 0.6)",
                width: "48%",
                height: "98%",
                margin: "1%"
            },
            text: {
                width: "94%",
                height: "94%",
                margin: "3%",
                border: "none",
                background: "none",
                fontSize: "1em",
                overflow: "auto"
            }
        };
        return (
            <div style={this.styles.content}>
                <div style={this.styles.src}>
                    <textarea
                        type="text"
                        style={this.styles.text}
                        onChange={this.parsePage.bind(this)}
                    />
                </div>
                <div
                    style={this.styles.dist}
                >
                    <div
                        style={this.styles.text}
                        dangerouslySetInnerHTML={{__html: this.state.html}}
                    >
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;