import React, { Component } from "react";
import { Link } from "react-router-dom";
import { retrieveCategories, editPost, retrievePost } from "../actions";
import { connect } from "react-redux";
import { capitalize } from "../utils/helpers";

class EditPost extends Component {
	state = { title: "", author: "", category: "", body: "" };

	componentDidMount() {
		this.props.retrieveCategories();
		this.props.retrievePost(this.props.match.params.id);
		let { post } = this.props.post;
		this.setState({
			title: post.title,
			author: post.author,
			category: post.category,
			body: post.body
		});
	}

	componentWillReceiveProps(nextProps) {
		let { post } = nextProps.post;
		this.setState({
			title: post.title,
			author: post.author,
			category: post.category,
			body: post.body
		});
	}

	_editPost = e => {
		e.preventDefault();
		let post = {
			id: this.props.match.params.id,
			timestamp: Date.now(),
			author: e.target.author.value,
			body: e.target.body.value,
			title: e.target.title.value,
			category: e.target.category.value
		};
		this.props.editPost(post);
		window.location = "/";
	};

	_input = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		let { categories } = this.props.categories;
		return (
			<main style={{ padding: 10 }}>
				<div className="back-btn-wrapper">
					<button className="del">
						<Link to="/">Go back</Link>
					</button>
				</div>
				<section className="main-content">
					<h3 className="post-form-title">Edit Post</h3>
					<form className="post-form" onSubmit={this._editPost}>
						<div className="form-group">
							<label>Title:</label>
							<input
								name="title"
								type="text"
								placeholder="Title"
								required
								value={this.state.title}
								onChange={e => this._input(e)}
							/>
						</div>
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
							<label>Category:</label>
							<select
								name="category"
								value={this.state.category}
								onChange={e => this._input(e)}>
								<option value="">Choose one</option>
								{categories !== undefined &&
									categories.map(category => (
										<option key={category.name} value={category.name}>
											{capitalize(category.name)}
										</option>
									))}
							</select>
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

const mapStateToProps = ({ categories, post }) => ({ categories, post });

export default connect(
	mapStateToProps,
	{ retrieveCategories, editPost, retrievePost }
)(EditPost);
