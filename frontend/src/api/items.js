// these are used to change the database of generic items a farmer can add to their farm
import apiURL from "./APIURL"
import axios from "axios"
// This is used to edit the items belonging to farms
const apiEndpoint = 'http://localhost:8000/';

export const getItemById = async (item_id)=> {
    try {
        const item = await axios.get(`${apiEndpoint}item/${item_id}`);
        console.log(item);
        return item.data;
    } catch (error){
      console.log(error);
    }
}