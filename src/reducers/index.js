import { combineReducers } from "redux";
import {
	FETCH_CATEGORIES,
	SELECT_CATEGORY,
	SELECT_ORDER,
	FETCH_POSTS,
	FETCH_CATEGORY_POSTS,
	DELETE_POST,
	VOTE_POST,
	FETCH_POST,
	VOTE_INTO_POST,
	FETCH_COMMENTS,
	VOTE_COMMENT,
	FETCH_COMMENT,
	DELETE_COMMENT
} from "../actions";

function categories(state = {}, action) {
	switch (action.type) {
		case FETCH_CATEGORIES:
			return { ...state, categories: action.categories };
		case SELECT_CATEGORY:
			return { ...state, category: action.category };
		default:
			return state;
	}
}

function order(state = { order: "id" }, action) {
	switch (action.type) {
		case SELECT_ORDER:
			return { ...state, order: action.order };
		default:
			return state;
	}
}

function posts(state = { posts: [] }, action) {
	switch (action.type) {
		case FETCH_POSTS:
			return { ...state, posts: action.posts };
		case FETCH_CATEGORY_POSTS:
			return { ...state, category: action.category, posts: action.posts };
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post.id !== action.id)
			};
		case VOTE_POST:
			return {
				...state,
				posts: state.posts.map(post => {
					if (post.id === action.id) post.voteScore = post.voteScore + action.vote;
					return post;
				})
			};
		default:
			return state;
	}
}

function post(state = { posts: [], post: {} }, action) {
	switch (action.type) {
		case FETCH_POST:
			return { ...state, post: action.post };
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post.id !== action.id)
			};
		case VOTE_INTO_POST:
			return {
				...state,
				post: { ...state.post, voteScore: state.post.voteScore + action.vote }
			};
		default:
			return state;
	}
}

function comments(state = { comments: [] }, action) {
	switch (action.type) {
		case FETCH_COMMENTS:
			return { ...state, comments: action.comments };
		case VOTE_COMMENT:
			return {
				...state,
				comments: state.comments.map(comment => {
					if (comment.id === action.id)
						comment.voteScore = comment.voteScore + action.vote;
					return comment;
				})
			};
		default:
			return state;
	}
}

function comment(state = { comments: [], comment: {} }, action) {
	switch (action.type) {
		case FETCH_COMMENT:
			return {
				...state,
				comments: state.comments.concat(action.comment),
				comment: action.comment
			};
		case DELETE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(comment => comment.id !== action.id)
			};
		default:
			return state;
	}
}

export default combineReducers({
	categories,
	order,
	posts,
	post,
	comments,
	comment
});
