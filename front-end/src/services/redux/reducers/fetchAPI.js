const initialState = { 1: [], 2: [], 3: [] };

export default function (state = initialState, action) {
    switch (action.type) {
        case "FETCH_ITEMS":
            return action.payload;
        default:
            return state;
    }
}