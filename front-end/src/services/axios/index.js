import { getItems } from '../redux/actions';
import axios from 'axios';

export const DOMAIN = "http://localhost:3001";
// export const DOMAIN = "https://twentythree-aloha.herokuapp.com";

export function itemSearch() {
    return (dispatch) => {
        axios.get(DOMAIN + '/api/items?group=fabric_type')
            .then(response => {
                dispatch(getItems(response.data));
            })
            .catch(error => {
                throw (error);
            })
    }
}

export function upload(data) {
    return (
        axios.post(DOMAIN + '/api/items/upload', data)
            .then(response => {
                console.log(response.statusText)
            })
            .catch(error => {
                throw (error);
            })
    )
}

export function update(id, data) {
    return (
        axios.put(DOMAIN + `/api/items/update/${id}`, data)
            .then(response => {
                console.log(response.statusText)
            })
            .catch(error => {
                throw (error);
            })
    )
}