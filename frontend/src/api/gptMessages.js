import axios from "axios"
import apiURL from "./APIURL"
import OpenAI from 'openai';

const apiEndpoint = 'http://localhost:8000/';

 export const getMessagesOfChat = async (chat_id)=> {
  try {
      const messages = await axios.get(`${apiEndpoint}chat/${chat_id}`);
      console.log(messages);
      return messages.data;
  } catch (error){
    console.log(error);
  }
 
 }
// "message": {"chat_id": 26, "user_id":3, "sender_role": "user", "message_content":"Recommend me a 1 more entree randomly", "function_call": false}
export const sendNewMessage = async (message) => {
  try {
    const response = await axios.post(`${apiEndpoint}message`, {
      data: message
    });
    return response;
  } catch (error){
  console.log(error);
}
}


