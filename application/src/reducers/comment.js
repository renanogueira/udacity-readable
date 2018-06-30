import { FETCH_COMMENT, DELETE_COMMENT } from "../actions";
export function comment(state = { comments: [], comment: {} }, action) {
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

export default comment;
