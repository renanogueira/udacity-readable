import { SELECT_ORDER } from "../actions";
export function order(state = { order: "id" }, action) {
	switch (action.type) {
		case SELECT_ORDER:
			return { ...state, order: action.order };
		default:
			return state;
	}
}

export default order;
