const knex = require('../database/knex');

const EVENT_TABLE = 'event';

//create new event
const createEvent = async (event_name, date, description) => {
    const query = knex('event').insert({ event_name, date, description });
    console.log('Raw query for createEvent:', query.toString());
    const result = await query;
    return result;
};
//find event by name
const findEventByName = async (event_name) => {
    const query = knex('event').where({ event_name });
    const result = await query;
    return result;
}
//delete event
const deleteEvent = async (event_name) => {
    const query = knex('event').where({event_name}).del();
    console.log('Raw query for delete event:', query.toString());
    const result = await query;
    return result;
};





const FARM_TABLE = 'farm';

//create new farm
const createFarm = async (farm_id,farm_name, farmer_id, farm_picture, farm_description, farm_rating, farm_established) => {
    //add farm to table
    const query = knex('event').insert({farm_id,farm_name, farmer_id, farm_picture, farm_description, farm_rating, farm_established});
    console.log('Raw query for createFarm:', query.toString());
    const result = await query;
    return result;
};
//find farm by name
const findFarmByName = async (farm_name) => {
    const query = knex('farm').where({ farm_name });
    const result = await query;
    return result;
}
//find farm by ID
const findFarmByID = async (farm_id) => {
    const query = knex('farm').where({ farm_id });
    const result = await query;
    return result;
}
// find farm rating by farm ID
const findFarmRatingByFarmID = async(farm_id) => {
    const result = knex(FARM_TABLE).select(farm_rating).where('farmer_id', farmer_id);
    return result;
}
// find farm establish year by farm ID
const findFarmEstablishedByFarmID = async(farm_id) => {
    const result = knex(FARM_TABLE).select(farm_established).where('farmer_id', farmer_id);
    return result;
}

//delete farm
const deleteFarm = async (farm_name) => {
    const query = knex('event').where({farm_name}).del();
    console.log('Raw query for delete farm:', query.toString());
    const result = await query;
    return result;
};

const getFarmInformation = async(farm_id) =>{
    const query = knex('farmer').select().where('farmer_id', farm_id);
    return query;
};



module.exports = {

    createEvent,
    findEventByName,
    deleteEvent,
    getFarmInformation,
    createFarm,
    findFarmByName,
    findFarmByID,
    findFarmRatingByFarmID,
    findFarmEstablishedByFarmID,
    deleteFarm
};