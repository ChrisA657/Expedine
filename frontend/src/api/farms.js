import apiURL from "./APIURL"
import axios from "axios"
const apiEndpoint = apiURL + "farms"
const apiConfig = {
    headers: {
        Authorization: "me"
    }

}

//get farm by params(id,item collection, name)
export const getFarm = (params) => {
    let _apiConfig = apiConfig;
    if(params) {
        _apiConfig.params = params;
    }
    return axios.get(`${apiEndpoint}/`, _apiConfig)
                
}
export const searchFarms = (searchData) => {
    console.log(searchData);
    return axios.post(apiURL+"search", {farmName: searchData.farmName,   
                                        itemName: searchData.itemName,
                                        filters: searchData.filters} );
}
// get a specific farm information, used for viewing specfic farms
export const getFarmById = (id) => axios.get(`${apiEndpoint}/${id}`, apiConfig);  

// update farm info, should update stuff only on the farm table like image, name, description, and not items
export const updateFarmByID = (farmInfo, id) => axios.put(`${apiEndpoint}/${id}`, farmInfo, apiConfig)

// create a new farm
export const createFarm = (farm) => {
    return axios.post(`${apiEndpoint}/`, farm, apiConfig)

}
export const deleteFarmByID = (farm,id) => {
    return axios.delete(`${apiEndpoint}/${id}`, apiConfig).catch(function (error) {
        console.log(error.toJSON());
      })
    
}

export const getFarmOwnerID = (id) =>{
    return axios.get(`${apiEndpoint}/farmByOwner/${id}`, apiConfig).catch(function (error) {
        console.log(error.toJSON());
      })
}
 