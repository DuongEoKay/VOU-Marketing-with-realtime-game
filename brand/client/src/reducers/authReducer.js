export const authReducer = (state, action) => {
	const { type, payload: { allbrand, isAuthenticated, brand }} = action

	switch (type) {
		case 'SET_AUTH':
			return {
				...state,
				authLoading: false,
				isAuthenticated,
				brand
			}
		case 'ALL_BRAND':
			return {
				...state,
				allbrand
			}
		default:
			return state
	}
}