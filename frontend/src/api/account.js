import axios from "axios";
import apiURL from "./APIURL"

const apiEndpoint = apiURL + "account";
const passwordEndpoint = apiURL;
const apiConfig = {
    headers: {
        Authorization: "me"
    }

}


export const login = (userdata) => new Promise((resolve, reject)=>{
            axios.post(`${apiEndpoint}/login`, userdata)
            .then(res => {
                resolve(res);
                console.log("sucess")
            })
            
        })    
    

export const register = (userdata) => new Promise((resolve,reject) =>{
            axios.post(apiURL + "register", userdata).then(res => {
                console.log(res);
                resolve(res);
            }).catch(err => {
                if (err.response) {
                    console.log(err);
                    reject(err.response)
                } else if (err.request){
                    reject("Server didn't respond");
                } else {
                    reject("Request failed");
                }

            })
})

export const getUserID = (user_email) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/${user_email}`)
    .then(res =>
        resolve(res.data)
    )
    .catch(err => {
        if (err.response) {
            console.log(err);
            reject(err.response)
        } else if (err.request){
            reject("Server didn't respond");
        } else {
            reject("Request failed");
        }

    })
});

export const resetPassword = (user, password) => new Promise((resolve, reject) => {
    const params = {'user_id' : user, 'newPassword': password};
    axios.put (`${passwordEndpoint}settings/password`, params)
    .then(res => {
        resolve(res);
    })
    .catch(err => {
        if (err.response) {
            console.log(err);
            reject(err.response)
        } else if (err.request){
            reject("Server didn't respond");
        } else {
            reject("Request failed");
        }

    })
})