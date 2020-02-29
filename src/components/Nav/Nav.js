import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon, Button, Popover } from 'antd'
import less from './Nav.m.less'
import { getScreen } from '../../util/util'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loginOut, checkToken } from '../../api/login'

const { Header } = Layout

class Nav extends Component {

    constructor() {
        super()
        this.state = {
            current: 'home',
            collapsed: true,
            mode: 'horizontal',
            menuStyle: {
                width: 'auto'
            },
            hasToken: false,
            time: 0,
            nickname: false
        }
    }

    toggleMenu = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            menuStyle: this.state.menuStyle.width ?
                { width: 0 } : { width: '200px' }
        })
    }

    initMenu() {
        let w = getScreen('width')
        if (w <= 780) {
            this.setState({
                mode: 'inline',
                menuStyle: {
                    width: 0
                }
            })
        } else {
            this.setState({
                mode: 'horizontal',
                menuStyle: {
                    width: 'auto'
                }
            })
        }
    }

    initScreen() {
        let w = getScreen('width')
        if (w <= 780) {
            if (this.state.mode !== 'inline') {
                this.setState({
                    mode: 'inline',
                    menuStyle: {
                        width: 0
                    }
                })
            }
        } else if (w > 780) {
            if (this.state.mode !== 'horizontal') {
                this.setState({
                    mode: 'horizontal',
                    menuStyle: {
                        width: 'auto'
                    }
                })
            }
        }
    }

    loginOut = () => {
        localStorage.removeItem('cyy_blog_token')
        localStorage.removeItem('cyy_blog_nickname')
        localStorage.removeItem('cyy_blog_u_id')
        this.setState({
            hasToken: false,
            time: 0
        })
        this.props.loginOut()
    }

    urlChange = type => {
        this.setState({
            current: type
        })

        console.log(this.state)
    }

    render() {
        return (
            <Header id="Nav" className={less.wrap} >
                {/* logo部分 */}
                <aside className={less.left}>
                    <div className={less.logoImg}></div>
                    <span className={less.logoText}>嘤嘤怪的博客</span>
                </aside>
                {/* 菜单部分 */}
                <aside className={less.right}>
                    <Menu
                        ref="menu"
                        selectedKeys={[this.state.current]}
                        mode={this.state.mode}
                        className={less.menu}
                        style={this.state.menuStyle}
                    >
                        <Menu.Item key="home" onClick={e => this.urlChange('home')}>
                            <Link to="/"><Icon type="home" />首页</Link>
                        </Menu.Item>
                        <Menu.Item key="article" onClick={e => this.urlChange('article')}>
                            <Link to="/article"><Icon type="folder" />归档</Link>
                        </Menu.Item>
                        <Menu.Item key="login" className={less.hideBtn} onClick={e => this.urlChange('login')}>
                            <Link to="/login"><Icon type="user" />登录</Link>
                        </Menu.Item>
                        <Menu.Item key="register" className={less.hideBtn} onClick={e => this.urlChange('register')}>
                            <Link to="/register"><Icon type="login" />注册</Link>
                        </Menu.Item>
                        {/* <Menu.Item key="aboutme">
                            <Link to="/about">关于我</Link>
                        </Menu.Item> */}
                    </Menu>
                    {/* 登录注册按钮 */}
                    {(!this.state.hasToken) &&
                        <div className={less.navBtn}>
                            <Button
                                type="primary"
                                size="small"
                                ghost
                                className={less.loginBtn}
                            >
                                <Link to="/login">登 录</Link>
                            </Button>
                            <Button
                                type="primary"
                                size="small"
                                type="danger"
                                ghost
                            >
                                <Link to="/register">注 册</Link>
                            </Button>
                        </div>
                    }

                    {/* 用户头像 */}
                    {(this.state.hasToken) &&
                        <div className={less.loginIn}>
                            <div className={less.avator}>
                                <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </div>
                            <Popover content={<a onClick={this.loginOut}>退出登录</a>} title="个人">
                                <span className={less.nickname}>{this.state.nickname}</span>
                            </Popover>
                        </div>
                    }

                    {/* {隐藏菜单按钮} */}
                    <Button type="primary" onClick={this.toggleMenu} className={less.btn}>
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </Button>
                </aside>
            </Header>
        )
    }

    componentWillMount() {
        const token = localStorage.getItem('cyy_blog_token')
        if (token) {
            checkToken(token).then(res => {
                if(res.data.code === 0) {
                    this.setState({
                        hasToken: true,
                        nickname: localStorage.getItem('cyy_blog_nickname')
                    })
                }else if(res.data.code === 1) {
                    this.loginOut()
                }
            })
        }
    }

    componentDidMount() {
        this.initMenu()
        window.onresize = () => {
            this.initScreen()
        }
    }

    shouldComponentUpdate(nextProps) {

        const { data } = nextProps,
            { time } = this.state

        if (data.token && time === 0) {
            this.setState({
                hasToken: true,
                nickname: data.nickname,
                time: 1
            })
        }

        return true
    }
}

// 连接redux
const mapStateToProps = state => ({
    status: state.login.status,
    data: state.login.data,
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({ loginOut }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Nav)