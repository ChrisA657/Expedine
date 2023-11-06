import axios from "axios"
import apiURL from "./APIURL"

const apiEndpoint = apiURL;


export const createNewChat = async (user_id) => {
    console.log(user_id);
  try {
    const response = await axios.post(`${apiEndpoint}chat`, {
      user_id: user_id
    });
    console.log(response.data['chat-data']);
    return response.data['chat-data'].insertId;
  } catch (error){
  console.log(error);
}
}


export const getMessagesOfChat = async (chat_id)=> {
    try {
        const messages = await axios.get(`${apiEndpoint}chat/${chat_id}`);
        console.log(messages);
        return messages.data;
    } catch (error){
      console.log(error);
    }
   
   }