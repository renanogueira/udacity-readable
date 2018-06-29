import * as API from "../utils/api";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const SELECT_CATEGORY = "SELECT_CATEGORY";
export const SELECT_ORDER = "SELECT_ORDER";
export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_CATEGORY_POSTS = "FETCH_CATEGORY_POSTS";
export const DELETE_POST = "DELETE_POST";
export const VOTE_POST = "VOTE_POST";
export const FETCH_POST = "FETCH_POST";
export const VOTE_INTO_POST = "VOTE_INTO_POST";
export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const VOTE_COMMENT = "VOTE_COMMENT";
export const FETCH_COMMENT = "FETCH_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export function fetchCategories(categories) {
	return { type: FETCH_CATEGORIES, categories };
}
export function selectCategory(category) {
	return { type: SELECT_CATEGORY, category };
}
export function retrieveCategories() {
	return dispatch => {
		API.getCategories().then(response => dispatch(fetchCategories(response)));
	};
}

export function selectOrder(order) {
	return { type: SELECT_ORDER, order };
}

export function fetchPosts(posts) {
	return { type: FETCH_POSTS, posts };
}
export function fetchCategoryPosts(category, posts) {
	return { type: FETCH_CATEGORY_POSTS, category, posts };
}
export function retrievePosts() {
	return dispatch => {
		API.getPosts().then(response => dispatch(fetchPosts(response)));
	};
}
export function retrieveCategoryPosts(category) {
	return dispatch => {
		API.getCategoryPosts(category).then(response =>
			dispatch(fetchCategoryPosts(category, response))
		);
	};
}

export function fetchPost(post) {
	return { type: FETCH_POST, post };
}
export function deletePost(id) {
	return { type: DELETE_POST, id };
}
export function retrievePost(id) {
	return dispatch => {
		API.getPost(id).then(response => dispatch(fetchPost(response)));
	};
}
export function createPost(post) {
	return dispatch => {
		API.createPost(post).then(response => dispatch(fetchPost(response)));
	};
}
export function editPost(post) {
	return dispatch => {
		API.editPost(post).then(response => dispatch(fetchPost(response)));
	};
}
export function deltPost(id) {
	return dispatch => {
		API.deletePost(id).then(() => dispatch(deletePost(id)));
	};
}

export function fetchComments(id, comments) {
	return { type: FETCH_COMMENTS, id, comments };
}
export function retrieveComments(id) {
	return dispatch => {
		API.getComments(id).then(response => dispatch(fetchComments(id, response)));
	};
}

export function fetchComment(id, comment) {
	return { type: FETCH_COMMENT, id, comment };
}
export function deleteComment(id) {
	return {
		type: DELETE_COMMENT
	};
}
export function retrieveComment(id) {
	return dispatch => {
		API.getComment(id).then(response => dispatch(fetchComment(id, response)));
	};
}
export function createComment(id) {
	return dispatch => {
		API.createComment(id).then(response =>
			dispatch(fetchComment(id, response))
		);
	};
}
export function editComment(comment) {
	return dispatch => {
		API.editComment(comment).then(response =>
			dispatch(fetchComment(comment.id, response))
		);
	};
}
export function deltComment(id) {
	return dispatch => {
		API.deleteComment(id).then(() => dispatch(deleteComment(id)));
	};
}

export function vote(id, vote, path, post) {
	console.warn(id, vote, path, post);
	let actionType = post
		? VOTE_INTO_POST
		: path === "posts"
			? VOTE_POST
			: VOTE_COMMENT;
	return { type: actionType, id, vote };
}
export function postVote(id, data, path, post) {
	return dispatch => {
		API.postVote(id, data, path).then(() =>
			dispatch(vote(id, data.option === "upVote" ? 1 : -1, path, post))
		);
	};
}
