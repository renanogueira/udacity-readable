import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	retrieveComments,
	createComment,
	deltComment,
	postVote
} from "../actions";
import { connect } from "react-redux";
import Moment from "moment";
import sortBy from "sort-by";

class Comments extends Component {
	state = { ordem: "voteScore" };

	componentDidMount() {
		this.props.retrieveComments(this.props.id);
	}

	_createComment = e => {
		e.preventDefault();
		let comment = {
			id: Date.now(),
			parentId: this.props.id,
			timestamp: Date.now(),
			author: e.target.author.value,
			body: e.target.body.value
		};
		this.props.createComment(comment);
		window.location = "/posts/" + this.props.id;
	};

	_deltComment = id => {
		if (window.confirm("Are you sure you want to delete this comment?"))
			this.props.deltComment(id);
		window.location = "/posts/" + this.props.id;
	};

	_vote = (id, option) => {
		let data = { option: option };
		this.props.postVote(id, data, "comments");
	};

	render() {
		let { comments } = this.props.comments;
		comments.sort(sortBy(`-${this.state.order}`));
		return (
			<section className="comments-wrapper" style={{ padding: 10 }}>
				<ul>
					{comments !== undefined &&
						comments.map(comment => (
							<li key={comment.id} className="comment">
								<div>
									<b>
										{comment.author +
											" - " +
											Moment.unix(comment.timestamp / 1000).format(
												"DD/MM/YYYY"
											)}:
									</b>
								</div>
								<div className="comment-body">{comment.body}</div>
								<div className="comment-footer">
									<div>
										<button className="edt" style={{ marginRight: "5px" }}>
											<Link to={`/comments/${comment.id}/edit`}>Edit</Link>
										</button>
										<button
											className="del"
											onClick={() => this._deltComment(comment.id)}>
											Delete
										</button>
									</div>
									<div className="votes-wrapper">
										<span>{comment.voteScore} voteScore</span>
										<button
											className="voteUp"
											style={{ marginRight: "5px" }}
											onClick={() => this._vote(comment.id, "upVote")}>
											+1
										</button>
										<button
											className="voteDown"
											onClick={() => this._vote(comment.id, "downVote")}>
											-1
										</button>
									</div>
								</div>
								<hr />
							</li>
						))}
				</ul>
				<hr />
				<form className="comment-form" onSubmit={this._createComment}>
					<div style={{ marginBottom: "10px" }}>
						<b>Comment</b>
					</div>
					<input
						name="author"
						type="text"
						placeholder="Author"
						style={{ marginBottom: "10px" }}
						required
					/>
					<br />
					<textarea name="body" placeholder="Comment body" required />
					<br />
					<button className="new">Comment</button>
				</form>
			</section>
		);
	}
}

const mapStateToProps = ({ comments, comment, ordem }) => ({
	comments,
	comment,
	ordem
});

export default connect(
	mapStateToProps,
	{ retrieveComments, createComment, deltComment, postVote }
)(Comments);
