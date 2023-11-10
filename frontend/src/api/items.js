
import axios from "axios"

const apiEndpoint = apiURL;

export const getItemById = async (item_id)=> {
    try {
        const item = await axios.get(`${apiEndpoint}item/${item_id}`);
        return item.data;
    } catch (error){
      console.log(error);
    }
}