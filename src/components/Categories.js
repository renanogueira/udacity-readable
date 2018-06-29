import React, { Component } from "react";
import { Link } from "react-router-dom";
import { capitalize } from "../utils/helpers";
import { retrieveCategories, selectCategory } from "../actions";
import { connect } from "react-redux";

class Categories extends Component {
	componentDidMount() {
		this.props.retrieveCategories();
	}

	_selectCategory = e => {
		e.preventDefault();
		let category = e.target.attributes.getNamedItem("category").value;
		this.props.selectCategory(category);
		window.location = "/" + category;
	};

	render() {
		let { categories } = this.props.categories;
		return (
			<section className="categories-wrapper">
				<h3>Categories: </h3>
				<ul className="categories-list">
					<li>
						<Link to="/">All</Link>
					</li>
					{categories !== undefined &&
						categories.map(category => (
							<li key={category.name}>
								<Link
									to="#"
									onClick={this._selectCategory}
									category={category.name}>
									{capitalize(category.name)}
								</Link>
							</li>
						))}
				</ul>
			</section>
		);
	}
}

const mapStateToProps = ({ category, categories }) => ({
	category,
	categories
});

export default connect(
	mapStateToProps,
	{ retrieveCategories, selectCategory }
)(Categories);
