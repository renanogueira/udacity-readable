import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
	<div className="notFound-wrapper">
		<p>This content has been removed.</p>
		<Link to="/">Go back home</Link>
	</div>
);

export default NotFound;
