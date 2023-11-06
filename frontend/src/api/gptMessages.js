import axios from "axios"
import apiURL from "./APIURL"

const apiEndpoint = apiURL;


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


