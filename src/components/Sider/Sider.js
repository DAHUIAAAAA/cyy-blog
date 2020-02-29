import React, { Component } from 'react'
import { Menu, Icon} from 'antd'
import less from './Sider.m.less'

const { SubMenu } = Menu

export default class Sider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
        }
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const { className } = this.props
        console.log(this.props)
        return (
            <div id="sider" className={[`${less.sider}`, `${className}`].join(' ')}>
                <Menu
                    onClick={this.handleClick}
                    style={{ width: 256, height: 100+'%' }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['g1']}
                    mode="inline"
                    theme="dark"
                >
                    <SubMenu
                        key="g1"
                        title={
                            <span>
                                <Icon type="setting" />
                                <span>文章</span>
                            </span>
                        }
                    >
                        <Menu.Item key="1">文章上传</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}