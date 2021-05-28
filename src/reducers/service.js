import {
	SERVICE_SELECTED,
	SERVICE_UNSELECTED,
} from '../constants/actionTypes';

export default (state = {}, action) => {
	switch (action.type) {
		case SERVICE_SELECTED:
			return {
				...state,
				id: action.payload.id,
				fullName:action.payload.fullName,
				path:action.payload.path,
				fields:action.payload.fields,
				fileOutput:action.payload.fileOutput,
				desc:action.payload.desc
			};
		case SERVICE_UNSELECTED:
			return {};
		default:
			return state;
	}
};
