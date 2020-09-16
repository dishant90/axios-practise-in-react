import React, { Component } from 'react';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import NewPost from '../NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: null
    }

    componentDidMount() {
        axios.get("/posts")
            .then((response => {
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                })
                this.setState({
                    posts: updatedPosts
                })
            }))
            .catch(error => 
                this.setState({
                    error: 'Something went wrong while fetching the posts'
                })
            )
    }

    selectedPostHandler = (postId) => {
        this.setState({
            selectedPostId: postId
        })
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>{this.state.error}</p>
        if(!this.state.error) {
            posts = this.state.posts.map(post => 
                <Post 
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.selectedPostHandler(post.id)} />
            )
        }

        return (
            <div>
                <header className="Blog">
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/new-post">New Post</a></li>
                        </ul>
                    </nav>
                </header>
                <section className="Posts">
                    {posts}
                </section>
                
            </div>
        );
    }
}

export default Blog;