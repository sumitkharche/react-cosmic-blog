import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchBlogPosts } from '../actions'
import Header from '../components/Header';
import PostList from '../components/PostList';


class Posts extends Component {

    componentDidMount() {
        this.props.fetchData(window.location.href + 'api/posts')
    }

    render() {
        return (
            <div>
                <div className="content">
                    <div className="container">
                        <PostList posts={this.props.data} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.posts.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(fetchBlogPosts(url))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Posts)