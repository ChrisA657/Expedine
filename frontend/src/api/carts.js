// calls to add items to user carts

import axios from "axios"
import apiURL from "./APIURL"

const apiEndpoint = apiURL;


export const getCart = async (chat_id) => {
  try {
    const response = await axios.get(`${apiEndpoint}cart/${chat_id}`)
    console.log(response.data);
    return response.data;
     } catch (error){
  console.log(error);
    }
}

export const addItemToCart = async(chat_id, item_id) => {
    console.log('Cart_id: ' +chat_id+'item_id'+item_id);
    try {
        const response = await axios.post(`${apiEndpoint}cart/${chat_id}`, {
          item_id: item_id
        });
        console.log(response.data);
        return response.data;
         } catch (error){
      console.log(error);
        }
}

export const deleteItemFromCart = async(chat_id, item_id) => {
    try {
        console.log('Cart_id: ' +chat_id+'item_id'+item_id);
        const response = await axios.delete(`${apiEndpoint}cart/${chat_id}`, {
            data: {
                item_id: item_id
            }
        });
        console.log(response.data);
        return response.data;
         } catch (error){
      console.log(error);
        }
}
