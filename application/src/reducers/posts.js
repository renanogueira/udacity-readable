import {
	FETCH_POSTS,
	FETCH_CATEGORY_POSTS,
	DELETE_POST,
	VOTE_POST
} from "../actions";
export function posts(state = { posts: [] }, action) {
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
					if (post.id === action.id)
						post.voteScore = post.voteScore + action.vote;
					return post;
				})
			};
		default:
			return state;
	}
}

export default posts;
