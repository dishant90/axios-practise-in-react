import React, {Component} from 'react'
import {Route} from 'react-router-dom'
//import {Link} from 'react-router-dom'

import axios from '../../axios'
import './Posts.css'
import Post from '../../components/Post/Post'
import FullPost from '../FullPost/FullPost'

class Posts extends Component {

    state = {
        posts: [],
        selectedPostId: null
    }

    componentDidMount() {
        console.log(this.props);
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
                console.log(error)
                /* this.setState({
                    error: 'Something went wrong while fetching the posts'
                }) */
            )
    }

    selectedPostHandler = (postId) => {
        /* this.setState({
            selectedPostId: postId
        }) */
        //this.props.history.push('/posts/' + postId);
        this.props.history.push({
            pathname: '/posts/' + postId
        })
    }

    render() {

        let posts = this.state.posts.map(post => 
            //<Link to={"/" + post.id} key={post.id} >
                <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.selectedPostHandler(post.id)} />
            //</Link>
        )

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} component={FullPost} />
            </div>
        )
    }
}

export default Posts;