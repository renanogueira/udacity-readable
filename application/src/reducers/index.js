import { combineReducers } from "redux";
import categories from "./categories";
import order from "./order";
import posts from "./posts";
import post from "./post";
import comments from "./comments";
import comment from "./comment";

export default combineReducers({
	categories,
	order,
	posts,
	post,
	comments,
	comment
});
