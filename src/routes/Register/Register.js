import React, { Component } from 'react'
import { Icon, Input, Button, message } from 'antd'
import less from './Register.m.less'
import { register } from '../../api/register'
import { getUser } from '../../api/register'
import { login } from '../../api/login'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            emailIsTrue: false,
            nicknameIsTrue: false,
            passwordIsTrue: false,
            emailTip: '请输入正确的邮箱',
            nicknameTip: '昵称可由数字，中文和英文字符组成，1-15位',
            passwordTip: '密码必须含英文和数字及!@#$%_等特殊字符，8-16位',
            email: null,
            nickname: null,
            password: null,
            emailIsRepeat: false,
            nicknameIsRepeat: false
        }
    }

    emailChange = e => {
        let reg = /^([a-zA-Z0-9]+[\w\.-]*)@([a-zA-Z0-9]+\.)+([a-zA-Z]{2,6})$/
        if (reg.test(e.target.value)) {
            this.setState({
                emailIsTrue: true,
                email: e.target.value,
                emailTip: '邮箱格式正确'
            })
        } else {
            this.setState({
                emailIsTrue: false,
                email: e.target.value,
                emailTip: '请输入正确的邮箱'
            })
        }
    }

    nicknameChange = e => {
        console.log(e.target.value)
        let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,15}$/
        if (reg.test(e.target.value)) {
            this.setState({
                nicknameIsTrue: true,
                nickname: e.target.value,
                nicknameTip: '昵称格式正确'
            })
        } else {
            this.setState({
                nicknameIsTrue: false,
                nickname: e.target.value,
                nicknameTip: '昵称可由数字，中文和英文字符组成，1-15位'
            })
        }
    }

    passwordChange = e => {
        let reg = /(?!^[a-z0-9]+$)(?!^[A-Za-z]$)(?!^[0-9]$)^[\w!@#$%_]{8,16}$/
        if (reg.test(e.target.value)) {
            this.setState({
                passwordIsTrue: true,
                password: e.target.value,
                passwordTip: '密码格式正确'
            })
        } else {
            this.setState({
                passwordIsTrue: false,
                password: e.target.value,
                passwordTip: '密码必须含英文和数字及!@#$%_等特殊字符，8-16位'
            })
        }
    }

    register = async () => {

        //  邮箱，用户名，密码是否为空的验证
        const { email, nickname, password } = this.state,
            user = { email, nickname, password }

        for (let key in user) {
            if (!user[key]) {
                message.error(`${key}为空`);
                return
            }
        }

        // 验证规则是否正确的验证
        const { emailIsTrue, nicknameIsTrue, passwordIsTrue } = this.state

        if (!emailIsTrue || !nicknameIsTrue || !passwordIsTrue) {
            message.error('请输入正确的用户名、昵称或者密码！')
            return
        }

        // 验证用户信息是否重复
        const { emailIsRepeat, nicknameIsRepeat } = this.state

        if (emailIsRepeat || nicknameIsRepeat) {
            message.error('用户名或昵称重复！')
            return
        }

        this.setState({
            emailIsRepeat: true,
            nicknameIsRepeat: true,
            emailIsTrue: false,
            nicknameIsTrue: false,
            emailTip: '当前email重复',
            nicknameTip: '当前nickname重复'
        })

        user.avatar = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'

        await register(user)

        message.success('注册成功！')

        await this.props.login(user)

        window.location.hash = '/user'
        

    }

    getUser = type => {
        const that = this,
            msg = {
                msg: that.state[type],
                type
            }

        const { emailIsTrue, nicknameIsTrue } = this.state
            let messageIsTrue = null

        if (type === 'email') {
            messageIsTrue = emailIsTrue
        } else {
            messageIsTrue = nicknameIsTrue
        }

        if (messageIsTrue) {
            getUser(msg).then(res => {
                if (res.data[`${type}`]) {
                    this.setState({
                        [`${type}IsRepeat`]: false,
                        [`${type}Tip`]: `当前${type}可用`
                    })
                } else {
                    this.setState({
                        [`${type}Tip`]: `当前${type}已重复`,
                        [`${type}IsTrue`]: false,
                        [`${type}IsRepeat`]: true
                    })
                }
            })
        }

    }

    render() {
        return (
            <div id="Register" className={less.body}>
                <div className={`card-container ${less.container}`}>
                    <section>
                        <Input
                            className={less.input}
                            placeholder="email"
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            size="large"
                            onChange={this.emailChange}
                            onBlur={e => this.getUser('email')}
                        />
                        <span>
                            {this.state.emailIsTrue && <Icon type="check-circle" style={{ color: '#52C41A' }} />}
                            {!this.state.emailIsTrue && <Icon type="exclamation-circle" style={{ color: '#FAAD14' }} />}
                            {this.state.emailTip}
                        </span>
                    </section>
                    <section>
                        <Input
                            className={less.input}
                            placeholder="nickname"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            size="large"
                            onChange={this.nicknameChange}
                            onBlur={e => this.getUser('nickname')}
                        />
                        <span>
                            {this.state.nicknameIsTrue && <Icon type="check-circle" style={{ color: '#52C41A' }} />}
                            {!this.state.nicknameIsTrue && <Icon type="exclamation-circle" style={{ color: '#FAAD14' }} />}
                            {this.state.nicknameTip}
                        </span>
                    </section>
                    <section>
                        <Input.Password
                            className={less.input}
                            size="large"
                            placeholder="password"
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            onChange={this.passwordChange}
                        />
                        <span>
                            {this.state.passwordIsTrue && <Icon type="check-circle" style={{ color: '#52C41A' }} />}
                            {!this.state.passwordIsTrue && <Icon type="exclamation-circle" style={{ color: '#FAAD14' }} />}
                            {this.state.passwordTip}
                        </span>
                    </section>
                    <br />
                    <Button type="primary" size="large" ghost onClick={this.register}>注 册 并 登 陆</Button>
                </div>
            </div>
        )
    }
}

// 连接redux
const mapStateToProps = state => ({
    loginData: state.login.data
})


const mapDispatchToProps = dispatch =>
    bindActionCreators({ login }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Register)