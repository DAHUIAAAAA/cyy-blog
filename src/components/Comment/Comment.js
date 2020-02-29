import React, { Component } from 'react'
import { Button, message, Icon } from 'antd'
import less from './Comment.m.less'
import { getComment, uploadComment, uploadReply } from '../../api/comment'
import { connect } from 'react-redux'

class Comment extends Component {

    constructor(props) {

        super(props)

        this.state = {
            avatar: null,
            nickname: null,
            loginOutTime: 0,
            login: false,
            commentList: []
        }

    }

    addComment = e => {

        const msg = e.target.previousSibling.previousSibling.value

        if (!msg) {
            message.error('你尚未输入内容')
            return
        }

        const aid = this.props.aid,
            uid = localStorage.getItem('cyy_blog_u_id')

        uploadComment(aid, uid, msg)
            .then(res => {
                message.success('评论成功')
                this.setState(state => {
                    state.commentList.unshift(res.data)
                    return {
                        commentList: state.commentList
                    }
                })
            })
            .catch(err => {
                message.error('评论失败')
            })
    }

    getReplyTextarea = c_id => {

        this.setState({
            [`text${c_id}`]: !this.state[`text${c_id}`]
        })
    }

    addReply = (e, cid) => {

        const msg = e.target.previousSibling.previousSibling.value

        if (!msg) {
            message.error('你尚未输入内容')
            return
        }

        const aid = this.props.aid,
            uid = localStorage.getItem('cyy_blog_u_id')

        uploadReply(aid, cid, uid, msg)
            .then(res => {
                this.setState(state => {
                    for (let i = 0; i < state.commentList.length; i++) {
                        if (state.commentList[i]['c_id'] === cid) {
                            state.commentList[i]['replies'].push(res.data)
                            break
                        }
                    }
                    return {
                        commentList: state.commentList
                    }
                })
                message.success('评论成功')
            })
            .catch(err => {
                message.error('评论失败')
            })
    }

    render() {
        console.log(this.state.commentList.length)
        return (
            <div className={less.container}>
                {!this.state.login && (
                    <div className={less.tip}>
                        <Icon type="smile" theme="twoTone" />请先登录再评论
                    </div>
                )}
                <b className="top">all replies</b>
                <div className={less.body}>
                    {/* 评论输入模块 */}
                    {this.state.login && (
                        <div className={less.section}>
                            <aside className={less.left}>
                                <img className={less.avatar} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </aside>
                            <aside className={less.right}>
                                <div className={less.author}>
                                    {/* 姓名 */}
                                    <span className={less.name}>{this.state.nickname}</span>
                                </div>
                                <textarea className={less.text}></textarea><br />
                                <Button type="primary" onClick={e => this.addComment(e)}>add Comment</Button>
                            </aside>
                        </div>
                    )}
                    {/* 评论列表模块 */}
                    {this.state.commentList.length > 0 && this.state.commentList.map(item => {
                        return (
                            <div className={less.section} key={item.c_id}>
                                <aside className={less.left}>
                                    {/* 头像 */}
                                    <img className={less.avatar} src={item.avatar} />
                                </aside>
                                <aside className={less.right}>
                                    <div className={less.author}>
                                        {/* 姓名 */}
                                        <span className={less.name}>{item.nickname}</span>
                                        {/* 显示时间间隔 */}
                                        {/* <span className={less.time}>2秒前</span> */}
                                    </div>
                                    {/* 评论内容 */}
                                    <div className={less.comment}>
                                        {item.message}
                                    </div>
                                    <div className={less.replyBtn}>
                                        <a onClick={e => this.getReplyTextarea(item.c_id)}>回 复</a>
                                        {this.state[`text${item.c_id}`] && (
                                            <div className="reply">
                                                <textarea className={less.text}></textarea><br />
                                                <Button type="primary" onClick={e => this.addReply(e, item.c_id)}>add Reply</Button>
                                            </div>
                                        )}
                                    </div>
                                    {
                                        item.replies.map(reply => (
                                            <div className={less.replies} key={reply.r_id}>
                                                <div className={less.reply}>
                                                    <aside className={less.left}>
                                                        <img className={less.replyAvatar} src={reply.avatar} />
                                                    </aside>
                                                    <aside className={less.right}>
                                                        <div className={less.author}>
                                                            {/* 姓名 */}
                                                            <span className={less.name}>{reply.nickname}</span>
                                                        </div>
                                                        <div className={less.comment}>
                                                            {reply.message}
                                                        </div>
                                                    </aside>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </aside>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        )
    }

    componentWillMount() {

        const aid = this.props.aid,
            time = 1

        getComment(aid, time).then(res => {
            this.setState(state => {
                state.commentList.push(...res.data)
                return {
                    commentList: state.commentList
                }
            })
        })

        const nickname = localStorage.getItem('cyy_blog_nickname')

        if (nickname) {
            this.setState({
                nickname,
                login: true
            })
        }
    }

    shouldComponentUpdate(nextProps) {

        const token = localStorage.getItem('cyy_blog_token')

        if (!token && this.state.loginOutTime === 0) {
            this.setState({
                login: false,
                loginOutTime: 1
            })
        }
        return true
    }

}

// 连接redux
const mapStateToProps = state => ({
    LoginStatus: state.login.status,
    userMsg: state.login.data
})

export default connect(mapStateToProps)(Comment)