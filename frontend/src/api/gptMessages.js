import axios from "axios"
import apiURL from "./APIURL"
import OpenAI from 'openai';
const apiKey = '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';
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
const apiConfig = {
    headers: {
        Authorization: "me"
    }

}
const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // This is also the default, can be omitted
  });


const client = axios.create({
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey,
    },
  });

  const params = {
    prompt: "How are you?",
    model: "text-davinci-003",
    max_tokens: 10,
    temperature: 0,
  };
  


//expected return, list of items user has added to their cart
export const getResponse = (user_id) => {
    console.log('response attempt');
    return client.post("https://api.openai.com/v1/chat/completions", params)
    .then((result) => {
      console.log(result.data.choices[0].text);
    })
    .catch((err) => {
      console.log(err);
    });
}

export const addItemToCart = (item) =>{
    console.log(item);
    return axios.post(`${apiEndpoint}/`, item);
}


