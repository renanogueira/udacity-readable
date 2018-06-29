import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
	retrievePosts,
	retrieveCategoryPosts,
	deltPost,
	selectOrder,
	postVote
} from "../actions";
import Moment from "moment";
import sortBy from "sort-by";

class PostsTable extends Component {
	state = { order: "voteScore" };

	componentDidMount() {
		let { category } = this.props.match.params;
		if (category === undefined) this.props.retrievePosts();
		else this.props.retrieveCategoryPosts(category);
	}

	componentWillReceiveProps(nextProps) {
		let { order } = nextProps.order;
		this.setState({ order: order });
	}

	_deletePost = id => {
		if (window.confirm("Are you sure you want to delete this post?"))
			this.props.deltPost(id);
	};

	_selectOrder = e => {
		this.props.selectOrder(e.target.value);
	};

	_vote = (id, option) => {
		let data = { option: option };
		this.props.postVote(id, data, "posts");
	};

	render() {
		let { posts } = this.props.posts;
		posts.sort(sortBy(`-${this.state.order}`));
		return (
			<section className="posts-table-wrapper">
				<div className="h3-wrapper">
					<h3>Post list</h3>
					<div className="order-by">
						<label>Order by:</label>
						<select onChange={this._selectOrder}>
							<option value="voteScore">Score</option>
							<option value="timestamp">Data</option>
						</select>
					</div>
					<button className="new">
						<Link to="/posts/create">New post</Link>
					</button>
				</div>
				<table className="posts-table">
					<thead>
						<tr>
							<th>Title</th>
							<th>Category</th>
							<th>Author</th>
							<th>Data</th>
							<th>Comments</th>
							<th>Score</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{posts !== undefined &&
							posts.map(post => (
								<tr key={post.id}>
									<td>{post.title}</td>
									<td>{post.category}</td>
									<td>{post.author}</td>
									<td>
										{Moment.unix(post.timestamp / 1000).format("DD/MM/YYYY")}
									</td>
									<td>{post.commentCount}</td>
									<td>
										<span style={{ marginRight: "5px" }}>{post.voteScore}</span>
										<button
											className="voteUp"
											style={{ marginRight: "5px", padding: "5px" }}
											onClick={() => this._vote(post.id, "upVote")}>
											+1
										</button>
										<button
											className="voteDown"
											style={{ padding: "5px" }}
											onClick={() => this._vote(post.id, "downVote")}>
											-1
										</button>
									</td>
									<td>
										<button
											className="view"
											style={{ marginRight: "5px", padding: "5px" }}>
											<Link to={`/${post.category}/${post.id}`}>View</Link>
										</button>
										<button
											className="edt"
											style={{ marginRight: "5px", padding: "5px" }}>
											<Link to={`/posts/${post.id}/edit`}>Edit</Link>
										</button>
										<button
											className="del"
											style={{ padding: "5px" }}
											onClick={() => this._deletePost(post.id)}>
											{" "}
											Delete
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</section>
		);
	}
}

const mapStateToProps = ({ posts, post, order }) => ({ posts, post, order });

export default connect(
	mapStateToProps,
	{ retrievePosts, retrieveCategoryPosts, deltPost, selectOrder, postVote }
)(PostsTable);
