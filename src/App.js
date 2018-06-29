import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Categories from "./components/Categories";
import Posts from "./components/Posts";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import EditComment from "./components/EditComment";
import Post from "./components/Post";
import NotFound from "./components/NotFound";

import "./App.css";

class App extends Component {
	render() {
		return (
			<div className="App">
				<header>
					<h1>
						<Link to="/">Readable Project</Link>
					</h1>
				</header>
				<Route
					exact
					path="/"
					render={props => (
						<main>
							<Categories {...props} />
							<Posts {...props} />
						</main>
					)}
				/>
				<Switch>
					<Route exact path="/notFound" component={NotFound} />
					<Route
						exact
						path="/:category"
						render={props => (
							<main>
								<Categories {...props} />
								<Posts {...props} />
							</main>
						)}
					/>
					<Route exact path="/posts/create" component={CreatePost} />
					<Route exact path="/:category/:id" component={Post} />
					<Route exact path="/posts/:id/edit" component={EditPost} />
					<Route exact path="/comments/:id/edit" component={EditComment} />
				</Switch>
			</div>
		);
	}
}

export default App;
