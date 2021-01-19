export function getItems(data) {
    return {
        type: "FETCH_ITEMS",
        payload: data
    }
}