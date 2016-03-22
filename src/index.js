/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Entry.
 */

'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import Head from './head';
import Content from './content';

import './theme/styles/sky.css';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    resize() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize.bind(this));
    }

    render(){
        const height = this.state.height;
        this.styles = {
            head: {
                height: 100
            },
            content: {
                height: height - 100
            }
        };
        return (
            <div>
                <Head
                    width={this.state.width}
                    style={this.styles.head}
                />
                <Content
                    width={this.state.width}
                    style={this.styles.content}
                    chapter="test1"
                />
            </div>
        );
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('react-content')
);