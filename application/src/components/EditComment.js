import React, { Component } from "react";
import { Link } from "react-router-dom";
import { editComment, retrieveComment } from "../actions";
import { connect } from "react-redux";

class EditComment extends Component {
	state = { author: "", body: "" };

	componentDidMount() {
		this.props.retrieveComment(this.props.match.params.id);
		let { comment } = this.props.comment;
		this.setState({ author: comment.author, body: comment.body });
	}

	componentWillReceiveProps(nextProps) {
		let { comment } = nextProps.comment;
		if (comment.deleted === undefined) window.location = "/notFound";
		this.setState({ author: comment.author, body: comment.body });
	}

	_editComment = e => {
		e.preventDefault();
		let comment = {
			id: this.props.match.params.id,
			parentId: this.props.comment.comment.parentId,
			timestamp: Date.now(),
			author: e.target.author.value,
			body: e.target.body.value
		};
		this.props.editComment(comment);
		window.location = "/posts/" + this.props.comment.comment.parentId;
	};

	_input = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<main style={{ padding: 10 }}>
				<div className="back-btn-wrapper">
					<button className="del">
						<Link to={"/post/" + this.props.comment.comment.parentId}>
							Go back
						</Link>
					</button>
				</div>
				<section className="main-content">
					<h3 className="post-form-title">Edit Comment</h3>
					<form className="post-form" onSubmit={this._editComment}>
						<div className="form-group">
							<label>Author:</label>
							<input
								name="author"
								type="text"
								placeholder="Author"
								required
								value={this.state.author}
								onChange={e => this._input(e)}
							/>
						</div>
						<div className="form-group">
							<label>Body:</label>
							<textarea
								name="body"
								value={this.state.body}
								onChange={e => this._input(e)}
							/>
						</div>
						<div className="form-group">
							<button className="edt">Edit</button>
						</div>
					</form>
				</section>
			</main>
		);
	}
}

const mapStateToProps = ({ comment }) => ({ comment });

export default connect(
	mapStateToProps,
	{ retrieveComment, editComment }
)(EditComment);
