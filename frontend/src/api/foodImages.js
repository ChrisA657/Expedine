import axios from "axios"
import apiURL from "./APIURL"
const apiKey = "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";
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';


const client = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });

  


//expected return, list of items user has added to their cart
export const getImageById = async (id) => {
    try {
     const result = await client.post("https://api.openai.com/v1/chat/completions", {
      "model": "gpt-3.5-turbo",
      "messages": [
        {"role": "system", "content": "Return a 0 if the prompt is asking a general for non-specific information, return a 1 if the prompt is asking for information on a specific food menu item. "},
        {"role": "user", "content": message}],
      
      "temperature": 0.0
     });
     const responseText = result.data.choices[0].message.content;

     return responseText;
  } catch (err) {
    console.log(err);
  }
}

