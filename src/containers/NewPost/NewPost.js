import React, { Component } from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom'

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false
    }

    componentDidMount() {
        console.log(this.props);
    }

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author
        }
        axios.post("/posts", data)
            .then(response => {
                console.log(response)
                /* push method updates the history stack to put the input URL at the top of the stack
                    so that you can go back to the current page from the input URL if you click browser back button */
                this.props.history.push('/posts')

                /* Replace method replaces the top most page with the redirected URL in the history stack 
                    so you can't go back to that top most page using the browser back */
                //this.props.history.replace('/posts')

                //this.setState({submitted: true})
            })
    }

    render () {
        /* Redirect replaces the top most page with the redirected URL in the history stack 
            so you can't go back to that top most page */
        let redirect = null;
        if(this.state.submitted) {
            redirect = <Redirect to="/posts" />;
        }

        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;