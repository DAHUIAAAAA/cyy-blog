import React, { Component } from 'react'
import { Card, Tag, Icon } from 'antd'
import homeCss from './Home.m.less'
import { Link } from 'react-router-dom'
import { getArticleList } from '../../api/article'
import { get } from '../../util/util'

const { Meta } = Card

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            time: 0,
            articleList: [],
            newArticle: [],
            mouted: false,
            dataIsNull: false,
            loadding: 'none',
            status: false,
            firstLoadStatus: false
        }
    }

    getNewArticle = articles => {
        if (this.state.time === 0) {
            this.setState({
                time: 1
            })
            const newArticle = articles.slice()
            this.setState({
                newArticle: newArticle.splice(0, 5),
                articleList: articles,
                status: true
            })
        }
    }

    render() {
        const { newArticle, articleList, firstLoadStatus } = this.state
        const onBottom = this.state.dataIsNull ? 'block' : 'none'
        if (firstLoadStatus) {
            return (
                <div id="Home" className={homeCss.home} ref="home">
                    <div className={homeCss.layout}>
                        {/* 文章列表 */}
                        <aside className={homeCss.leftSide}>
                            {articleList.map((item) => {
                                return (
                                    <Link key={item.create_time} to={`detail/${item.create_time}`} className={homeCss.card}>
                                        <div className={homeCss.title}>{item.title}</div>
                                        <div className={[`${homeCss.label}`, `label`].join(' ')}>
                                            <Icon type="calendar" />
                                            <span className={homeCss.time}>{item.time}</span>
                                            <Icon type="tag" />
                                            {item.tags.map((tag) => {
                                                return (<Tag color="magenta" key={item.create_time}>{tag}</Tag>)
                                            })}
                                        </div>
                                        <div className={homeCss.content}>{item.desc}</div>
                                    </Link>)
                            })}
                        </aside>
                        {/* 个人介绍和最新文章 */}
                        <aside className={homeCss.rightSide}>
                            <Card
                                style={{ width: 100 + '%' }}
                                cover={<img src={require('../../assets/imgs/logo.jpg')} />}
                            >
                                <Meta title="YingYing" description="一个菜鸟前端" />
                            </Card>
                            <Card title="最新文章" style={{ width: 100 + '%' }}>
                                {newArticle.map((item) => {
                                    return (
                                        <Link to={{
                                            pathname: 'user/detail',
                                            query: { time: item.create_time },
                                        }} className={homeCss.link} key={item.create_time}>
                                            <span className={homeCss.newArticleTitle}>{item.title}</span>
                                        </Link>
                                    )
                                })}
                            </Card>
                        </aside>
                    </div>
                    <div className="loading" style={{ display: `${this.state.loadding}` }}>
                        <span className="loadAnimation load-item1"></span>
                        <span className="loadAnimation load-item2"></span>
                        <span className="loadAnimation load-item3"></span>
                    </div>
                    <div className={homeCss.onBottom} style={{ display: `${onBottom}` }}>
                        <Icon type="smile" />已经到底啦~
                    </div>
                </div>
            )
        } else {
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
        getArticleList(1, 5).then(res => {
            this.getNewArticle(res.data)
        }).then(() => {
            this.setState({
                firstLoadStatus: true
            })
        })
    }

    componentDidUpdate() {
        const { status, dataIsNull } = this.state
        window.onscroll = () => {
            let ch = get('clientHeight'),
                st = get('scrollTop'),
                sh = get('scrollHeight')
            if (ch + st === sh) {
                if (status && !dataIsNull) {
                    let lastId = this.state.articleList[this.state.articleList.length - 1].create_time
                    this.setState({
                        loadding: 'block',
                        status: false
                    })
                    getArticleList(lastId, 4, this.state.dataIsNull).then(res => {
                        this.setState(state => {
                            state.articleList.push(...res.data)
                            return {
                                articleList: state.articleList,
                                loadding: 'none',
                                status: true,
                                dataIsNull: !res.data.length
                            }
                        })
                    })
                }
            }
        }
    }

}
