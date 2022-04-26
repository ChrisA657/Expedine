import { Button, Divider, Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import FarmImg from '../../images/farm.jpg';
import { order } from '../../models/order';
import { item } from '../../models/item';
import './Dashboard.css';
import OrderExpandable from '../OrderExpandable/OrderExpandable';
import { event } from '../../models/event';
import EventCard from '../eventCard/EventCard';
import { EventContext } from '../EventContext';
import { UserContext } from '../userContext';
import { getFarmOwnerID } from '../../api/farms';
import EditFarmDialog from '../EditFarmDialog/EditFarmDialog';
import { getOrders } from '../../api/orders';
const Dashboard = () => {
    const userContext = useContext(UserContext);
    const [farmId, setfarmId] = useState(null);
    const [showCreateFarm, setShowCreateFarm] = useState(false);
    const [orders, setOrders] = useState([

    ])

    const eventContext = useContext(EventContext);

    useEffect(()=>{
        if(userContext.userData?.isFarmer) {
        getFarmOwnerID(userContext.userData.user_id).then((res)=>{
            setfarmId(res.data[0]?.farmer_id);
        })

        getOrders(userContext.userData?.user_id).then(res=> {
            let _orders = [];
            res.data.forEach(order=> {
                console.log(order)
                let items = order.result2;
                let info = order.result1;
                let obj = {info: info[0], itemsPurchased:items}
               _orders.push(obj);
            })
             setOrders(_orders);
        })
    }
    },[])

    const openCreateFarm = () =>{
        setShowCreateFarm(true);
    }
    return (
        
        <div className='dashboard'>
            {
                !farmId && userContext.userData.isFarmer == 1 &&  <>
                    <Typography variant='h4' color='error' mb={2}>You have no farm as a farmer, create one now!</Typography>
                    <Button variant={'contained'} onClick={openCreateFarm}>Create your farm</Button></>
            }
            <Typography variant='h4' mb={2}>Orders</Typography>
            <Divider />
            <div className="dashboard-orders">
                
                {
                    orders.length !=0 && orders.map((order)=>{
                        return <OrderExpandable key={order?.transaction_id}
                                                {...order?.info}
                                               {...order}/>
                    })
                }
            </div>
            <Divider />
            <Typography variant='h4' mt={4} mb={4}>My RSVP'D Events</Typography>
            <Grid container spacing={3} sx={{width:["100%"]}}>
                {
                    eventContext.events && eventContext.events.map((event)=>{
                        return <Grid item sm={6} md={4} lg={3} width="100%">
                            <EventCard key={event.eventId} setEvents={eventContext.setEvents} {...event}/>
                        </Grid>
                    })
                }
            </Grid>

            {
                showCreateFarm && <EditFarmDialog open={showCreateFarm}
                    setOpen={setShowCreateFarm}
                    owner_id={userContext.userData.user_id}
                    creating
                    />
            }
        </div>
    );
};

export default Dashboard;