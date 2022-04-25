import apiURL from "./APIURL"
import axios from "axios";
const apiEndpoint = apiURL + "userEvents"
const apiConfig = {
    headers: {
        Authorization: "me"
    }

}

export const getEventsByUserId = (userId) =>{
    return axios.get(`${apiURL}userEvents/${userId}`, apiConfig)
}

export const registerForEvent = (customer_id, event_id) =>{
    console.log({customer_id, event_id})
    return axios.post(apiEndpoint,{customer_id, event_id})
}

export const unRegisterForEvent = (customer_id, event_id) =>{
    return axios.delete(apiEndpoint, {customer_id, event_id})
}