import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment';
import { fetchSlugPost } from '../actions'


class Post extends Component {

    componentDidMount() {
        this.props.fetchSlug(window.location.origin + '/api/posts/' + this.props.match.params.slug);
    }

    render() {
        return (
            <div>
                <React.Fragment>
                    <article>
                        <h1>{this.props.slug.title}</h1>
                        <div>
                            <img
                                alt={this.props.slug.title}
                                src={this.props.slug.image}
                            />
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: this.props.slug.content }} />
                        <div className="meta">
                            <img className="author" src={this.props.slug.author_image} />
                            By <a> {this.props.slug.author} </a> on {moment(this.props.slug.created_at).format('MMM DD YYYY')}
                        </div>

                    <p align="center">
                        <Link to='/' className="btn">
                            Back
                            </Link>
                    </p>
                    </article>
                </React.Fragment>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        slug: state.slug.slug
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSlug: (url) => dispatch(fetchSlugPost(url))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Post)
