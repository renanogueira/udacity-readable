import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
	<div className="notFound-wrapper">
		<h3>404 page not found</h3>
		<p>The page you are looking for does not exist.</p>
		<Link to="/">Go back home</Link>
	</div>
);

export default NotFound;
