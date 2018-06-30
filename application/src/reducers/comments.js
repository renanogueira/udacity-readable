import { FETCH_COMMENTS, VOTE_COMMENT } from "../actions";
export function comments(state = { comments: [] }, action) {
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

export default comments;
