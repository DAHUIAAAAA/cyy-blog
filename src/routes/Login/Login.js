import React, { Component } from 'react'
import { Icon, Input, Button, message } from 'antd'
import less from './Login.m.less'
import { login } from '../../api/login'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Login extends Component {

    constructor(props) {

        super(props)

        this.state = {
            email: null,
            password: null
        }
    }

    inputChange = async (e, type) => {

        await this.setState({
            [`${type}`]: e.target.value
        })
    }

    login = async () => {

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        // 发送请求
        await this.props.login(user)

        const data = this.props.data

        if(data.code === 0) {
            message.success(data.msg)
            localStorage.setItem('cyy_blog_token', data.token)
            localStorage.setItem('cyy_blog_nickname', data.nickname)
            localStorage.setItem('cyy_blog_u_id', data.u_id)
            window.location.hash = '/'
        }else {
            message.error(data.msg)
        }

    }

    render() {
        return (
            <div id="Login" className={less.body}>
                <div className={`card-container ${less.container}`}>
                    <Input
                        placeholder="username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        size="large"
                        onChange={e => this.inputChange(e, 'email')}
                    />
                    <Input.Password
                        size="large"
                        placeholder="password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={e => this.inputChange(e, 'password')}
                    />
                    <Button
                        type="primary"
                        size="large"
                        block
                        onClick={this.login}>登 录</Button>
                    <Button type="primary" size="large" block ghost>
                        <Link to='/register'>注册</Link>
                    </Button>
                </div>
            </div>
        )
    }
}

// 连接redux
const mapStateToProps = state => ({
    status: state.login.status,
    data: state.login.data,
})


const mapDispatchToProps = dispatch =>
    bindActionCreators({ login }, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(Login)