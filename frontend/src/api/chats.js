import axios from "axios"
import apiURL from "./APIURL"
import OpenAI from 'openai';

const apiEndpoint = 'http://localhost:8000/';


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


