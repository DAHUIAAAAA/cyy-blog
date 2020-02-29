// 引入react
import React, { Component } from 'react'
import marked from 'marked'
import hljs from 'highlight.js'
import less from './Detail.m.less'
import { Icon, Tag } from 'antd'
import { getEachArticle } from '../../api/article'
import Comment from '../../components/Comment/Comment'

const renderer = new marked.Renderer()

export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            article: null,
            state: false
        }
    }
    render() {
        const { article, status } = this.state
        if (status) {
            return (
                <div id="Detail" className={less.Detail}>
                    <div className={less.container}>
                        <div className={less.title}>{article.title}</div>
                        <div className="label">
                            <Icon type="calendar" />
                            <span>{article.time}</span>
                            {article.tags.map((tag, index) => {
                                return (
                                    <div key={index}>
                                        <Icon type="tag" />
                                        <Tag color="magenta">{tag}</Tag>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={less.content} dangerouslySetInnerHTML={
                            {
                                __html: marked(article.content,
                                    { renderer: renderer })
                            }}>
                        </div>
                        <Comment aid={this.props.match.params.time}></Comment>
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
        hljs.initHighlightingOnLoad()

        marked.setOptions({
            renderer: renderer,
            gfm: true,
            pedantic: false,
            sanitize: false,
            tables: true,
            breaks: true,
            smartLists: true,
            smartypants: true,
            highlight: code => hljs.highlightAuto(code).value
        })
    }

    componentDidMount() {

        const time = this.props.match.params.time

        getEachArticle(time).then(res => {
            this.setState({
                article: res.data,
                status: true
            })
        })
    }

    componentDidUpdate() {

        hljs.initHighlighting()

    }
}