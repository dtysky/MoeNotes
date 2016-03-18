/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Entry.
 */

'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import Content from './content';
require('./theme/styles/sky.css');

class App extends React.Component{
    render(){
        return (
            <Content/>
        );
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('content')
);