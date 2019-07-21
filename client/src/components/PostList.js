import React from 'react'
import {Link} from 'react-router-dom'

export default function PostList({posts}) {
    return (
        <React.Fragment>
            {posts.map(post => (
                <Link key={post._id} to={`/${post.slug}`} className="card">
                    <div style={{ paddingRight: "1em" }}>
                        <img
                            alt={post.title}
                            className="card-img"
                            src={post.metadata.hero.url}
                        />
                    </div>
                    <div>
                        <h3 style={{ margin: 0 }}>{post.title}</h3>
                    </div>
                </Link>
            ))}
        </React.Fragment>
    )
}
