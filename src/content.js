/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Entry.
 */

'use strict';

import parse from './parser';
import React from 'react';
import ReactDom from 'react-dom';
require('./theme/styles/sky.css');
require('./theme/styles/highlight.css');
require('./theme/styles/katex.css');

class Content extends React.Component{
    render(){
        return (
            <div className="content">
                <div className="content-src">
                    <input type="text"/>
                </div>
                <div className="content-dist">
                </div>
            </div>
        );
    }
}

export default Content;