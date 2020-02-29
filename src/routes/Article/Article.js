import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Timeline, Icon } from 'antd'
import { getArticleList } from '../../api/article'
import less from './Article.m.less'

export default class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articleList: [],
            pending: <a onClick={this.loadMore}>点击加载更多</a>,
            pendingDot: <Icon type='arrow-down' />,
            status: false
        }
    }

    loadMore = () => {
        const { articleList } = this.state,
            time = articleList[articleList.length - 1]['create_time']

        this.setState({
            pendingDot: <Icon type='loading' />,
            pending: '正在加载...'
        })

        getArticleList(time, 13).then(res => {
            if (res.data.length < 13) {
                this.getNewArticle(res.data)
                this.setState({
                    pendingDot: <Icon type="smile" />,
                    pending: '到底啦'
                })
            } else {
                this.getNewArticle(res.data)
                this.setState({
                    pendingDot: <Icon type='arrow-down' />,
                    pending: <a onClick={this.loadMore}>点击加载更多</a>

                })
            }
        })
    }

    getNewArticle = articleList => {
        this.setState(state => {
            state.articleList.push(...articleList)
            return {
                articleList: state.articleList
            }
        })
    }

    render() {
        const { articleList, status } = this.state
        if (status) {
            return (
                <div id="Article" className={less.body}>
                    <Timeline pending={this.state.pending} pendingDot={this.state.pendingDot}>
                        {articleList.map(item => {
                            return (
                                <Link key={item.create_time} to={`detail/${item.create_time}`}>
                                    <Timeline.Item>{item.title} {item.time}</Timeline.Item>
                                </Link>
                            )
                        })}
                    </Timeline>
                </div>
            )
        }
        else {
            return (
                <div className="page-container">
                    <div className="page-loading">
                        <span className="page-load-item page-load-item1"></span>
                        <span className="page-load-item page-load-item2"></span>
                        <span className="page-load-item page-load-item3"></span>
                    </div>
                </div>
            )
        }
    }

    componentWillMount() {
        getArticleList(1, 13).then(res => {
            this.getNewArticle(res.data)
        }).then(() => {
            this.setState({
                status: true
            })
        })
    }

}
