import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostShow extends Component {
    componentDidMount() {
        if (!this.props.post) {
            const { id } = this.props.match.params;
            this.props.fetchPost(id);
        }
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        // this.props === ownProps; true !!
        const { post } = this.props;
        // console.log(this.props.post);
        if (!post) {
            return (<div>Loading...</div>)
        }

        return (
            <div>
                <Link to="/" className="btn btn-primary">
                    Back to main page
                </Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}>
                    Delete post
                    </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return { post: state.posts[ownProps.match.params.id] }
    // return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);