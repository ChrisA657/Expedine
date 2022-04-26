import apiURL from "./APIURL"
import axios from "axios";
const apiEndpoint = apiURL + "userEvents"
const apiConfig = {
    headers: {
        Authorization: "me"
    }

}

export const getEventsByuser_id = (user_id) => {
    return axios.get(`${apiURL}userEvents/${user_id}`, apiConfig)
}

export const registerForEvent = (customer_id, event_id) => {
    console.log({ customer_id, event_id })
    return axios.post(apiEndpoint, { user_id: customer_id, event_id })
}

export const unRegisterForEvent = (customer_id, event_id) => {
    return axios.delete(`${apiEndpoint}/${customer_id}/${event_id}`);
}