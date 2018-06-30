import { FETCH_CATEGORIES, SELECT_CATEGORY } from "../actions";
export function categories(state = {}, action) {
	switch (action.type) {
		case FETCH_CATEGORIES:
			return { ...state, categories: action.categories };
		case SELECT_CATEGORY:
			return { ...state, category: action.category };
		default:
			return state;
	}
}

export default categories;
