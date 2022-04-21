const knex = require('../database/knex');
const bcrypt = require('bcrypt');

//Get all transactions by farmer
const fetchTransactionsByFarmer = async (email) => {
    const query = knex('transactions').where({farmer_id: email});
    const result = await query;
    return result;
}
//Get all transactions by customer
const fetchTransactionsByCustomer = async (email) => {
    const query = knex('transactions').where({customer_id: email});
    const result = await query;
    return result;
}
//get transaction by ID
const fetchTransactionByID = async (transaction_id) => {
    //return transaction
    const query = knex('transactions').where({transaction_id});
    console.log('Raw query for getTransaction:', query.toString());
    const result = await query;
    return result;
};
//Get all interested events by customer
const fetchInterestedEvents = async (email) => {
    const query = knex('customer_event_interests').where({customer_id: email});
    const result = await query;
    return result;
}
//delete interested events
const deleteInterestedEvent = async (customer_event_interests_id) => {
    const query = knex('customer_event_interests').where({customer_event_interests_id}).del();
    console.log('Raw query for delete interested event:', query.toString());
    const result = await query;

    return result;
};
//delete interested events
const deleteAllInterestedEvents = async (customer_id) => {
    const query = knex('customer_event_interests').where({customer_id}).del();
    console.log('Raw query for delete all interested events:', query.toString());
    const result = await query;

    return result;
};

module.exports = {
    fetchTransactionsByFarmer,
    fetchTransactionsByCustomer,
    fetchTransactionByID,
    fetchInterestedEvents,
    deleteInterestedEvent,
    deleteAllInterestedEvents
};