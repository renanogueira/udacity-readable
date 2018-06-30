import React, { Component } from "react";
import { Link } from "react-router-dom";
import { retrieveCategories, createPost } from "../actions";
import { connect } from "react-redux";
import { capitalize } from "../utils/helpers";

class CreatePost extends Component {
	componentDidMount() {
		this.props.retrieveCategories();
	}

	_createPost = e => {
		e.preventDefault();
		let post = {
			id: Date.now(),
			timestamp: Date.now(),
			author: e.target.author.value,
			body: e.target.body.value,
			title: e.target.title.value,
			category: e.target.category.value
		};
		this.props.createPost(post);
		window.location = "/";
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
					<h3 className="post-form-title">Create Post</h3>
					<form className="post-form" onSubmit={this._createPost}>
						<div className="form-group">
							<label>Title:</label>
							<input name="title" type="text" placeholder="Title" required />
						</div>
						<div className="form-group">
							<label>Author:</label>
							<input name="author" type="text" placeholder="Author" required />
						</div>
						<div className="form-group">
							<label>Category:</label>
							<select name="category">
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
							<textarea name="body" />
						</div>
						<div className="form-group">
							<button className="new">Create</button>
						</div>
					</form>
				</section>
			</main>
		);
	}
}

const mapStateToProps = ({ categories }) => ({ categories });

export default connect(
	mapStateToProps,
	{ retrieveCategories, createPost }
)(CreatePost);
