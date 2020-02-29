import React, { Component } from 'react'
import { HashRouter, Route} from 'react-router-dom'

//引入布局组件
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'

export default class RouterWrap extends Component {
    render() {
        return (
            <div id="router">
                <HashRouter>
                    <Route path="/" component={DefaultLayout}></Route>
                </HashRouter>
            </div>
        )
    }
}