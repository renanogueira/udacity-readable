import { FETCH_POST, DELETE_POST, VOTE_INTO_POST } from "../actions";
export function post(state = { posts: [], post: {} }, action) {
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

export default post;
