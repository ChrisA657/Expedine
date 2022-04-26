import axios from "axios"
import apiURL from "./APIURL"

const apiEndpoint = apiURL + "cart"
const apiConfig = {
    headers: {
        Authorization: "me"
    }

}
export const createNewOrder = (order) => {
        return axios.post(`${apiEndpoint}/checkout`, order, apiConfig);
    }
    //get the orders associated with a user, used for dashboard
export const getOrders = (user_id) => {
    return axios.get(`${apiURL}dashboard/transactions/customer/${user_id}`, apiConfig);
}

// should check authorization to make sure farmer id is the same on the order
export const markOrderAsCompleted = (orderId) => {
    return axios.patch(`${apiEndpoint}/${orderId}`, { fulfilled: true }, apiConfig);
}