import React, { Component } from "react";
import { Link } from "react-router-dom";
import { retrievePost, retrieveComments, deltPost, postVote } from "../actions";
import { connect } from "react-redux";
import { capitalize } from "../utils/helpers";
import Moment from "moment";
import Comments from "./Comments";

class Post extends Component {
	componentDidMount() {
		this.props.retrievePost(this.props.match.params.id);
		this.props.retrieveComments(this.props.match.params.id);
	}

	componentWillReceiveProps(nextProps) {
		let { post } = nextProps.post;
		if (post.deleted) window.location = "/notFound";
	}

	_deletePost = id => {
		if (window.confirm("Are you sure you want to delete this post?")) {
			this.props.deltPost(id);
			window.location = "/";
		}
	};

	_vote = (id, option) => {
		let data = { option: option };
		this.props.postVote(id, data, "posts", true);
	};

	render() {
		let { post } = this.props.post;
		let { comments } = this.props.comments;
		return (
			<main style={{ padding: 10 }}>
				<div className="back-btn-wrapper">
					<button className="del">
						<Link to="/">Go back</Link>
					</button>
				</div>
				<section className="post-wrapper">
					<div className="post-header">
						<div>
							<h3>{post.title}</h3>
							<span className="small">
								{"by " +
									post.author +
									" - " +
									Moment.unix(post.timestamp / 1000).format("DD/MM/YYYY")}
							</span>
							<Link className="category-item" to="#">
								{post.category !== undefined && capitalize(post.category)}
							</Link>
						</div>
						<div className="postVotes-wrapper">
							<span>{comments.length} comments | </span>
							<span>{post.voteScore} score</span>
							<button
								className="voteUp"
								style={{ marginRight: "5px", marginLeft: "10px" }}
								onClick={() => this._vote(post.id, "upVote")}>
								+1
							</button>
							<button
								className="voteDown"
								onClick={() => this._vote(post.id, "downVote")}>
								-1
							</button>
						</div>
					</div>
					<hr />
					<div className="post-body">{post.body}</div>
					<div>
						<button className="edt" style={{ marginRight: "5px" }}>
							<Link to={`/posts/${post.id}/edit`}>Edit</Link>
						</button>
						<button className="del" onClick={() => this._deletePost(post.id)}>
							Delete
						</button>
					</div>
					<hr />
				</section>
				<Comments id={this.props.match.params.id} />
			</main>
		);
	}
}

const mapStateToProps = ({ post, comments }) => ({ post, comments });

export default connect(
	mapStateToProps,
	{ retrievePost, retrieveComments, deltPost, postVote }
)(Post);
