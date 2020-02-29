import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import {Layout} from 'antd'

//引入公用
import Nav from '../../components/Nav/Nav'
//引入主体部分的业务组件
import Home from '../../routes/Home/Home'
import Article from '../../routes/Article/Article'
import About from '../../routes/About/About'
import Detail from '../../routes/Detail/Detail'
import Login from '../../routes/Login/Login'
import Register from '../../routes/Register/Register'
import layoutCss from './DefaultLayout.m.less'

const {Content} = Layout

export default class DefaultLayout extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props.match.url + '/detail') 
        return (
            <div id="DefaultLayout">
                <Layout>
                    {/* 头部 */}
                    <Nav />
                    {/* 主题内容 */}
                    <Content id={layoutCss.body}>
                        <Route path={this.props.match.url} component={Home} exact />
                        <Route path={`${this.props.match.url}detail/:time`} component={Detail} />
                        <Route path={this.props.match.url + 'article'} component={Article} />
                        <Route path={this.props.match.url + 'about'} component={About} />
                        <Route path={this.props.match.url + 'login'} component={Login} />
                        <Route path={this.props.match.url + 'register'} component={Register} />
                    </Content>
                </Layout>
            </div>
        )
    }
}
