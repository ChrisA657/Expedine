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
const Dashboard = () => {
    const userContext = useContext(UserContext);
    const [farmId, setfarmId] = useState(null);
    const [showCreateFarm, setShowCreateFarm] = useState(false);
    const [orders, setOrders] = useState([
        new order(1, 1, "Zach", "Greenville Farms", 2, new Date(), 242, [new item("Horse", "Big horse", "https://media.gq.com/photos/56e71c0b14cbe0637b261d7f/16:9/w_2560%2Cc_limit/horseinsuit2.jpg", 20, 1, 2), new item("Broom", "Dust destroyer", "https://images.thdstatic.com/productImages/6aa74e47-b7ba-48c8-bea8-258298b0ee8e/svn/hdx-corn-brooms-750-64_600.jpg", 20, 2, 2)],"Dan", "The man","323 really real street","Dallas","Texas",75115, false),
        new order(1, 1, "Texas", "Greenville Farms", 2, new Date(), 242, [new item("Horse", "Big horse", "https://media.gq.com/photos/56e71c0b14cbe0637b261d7f/16:9/w_2560%2Cc_limit/horseinsuit2.jpg", 20, 1, 2)], true),
        new order(1, 1, "Mom", "Greenville Farms", 2, new Date(), 242, [new item("Horse", "Big horse", "horse.jpg", 20, 1, 2)], false),
    ])

    const eventContext = useContext(EventContext);

    useEffect(()=>{
        if(userContext.userData?.isFarmer) {
        getFarmOwnerID(userContext.userData.user_id).then((res)=>{
            setfarmId(res.data[0].farmer_id);
        })
    }
    },[])

    const openCreateFarm = () =>{
        setShowCreateFarm(true);
    }
    return (
        
        <div className='dashboard'>
            {
                userContext.userData.isFarmer && !farmId && <>
                    <Typography variant='h4' color='error' mb={2}>You have no farm as a farmer, create one now!</Typography>
                    <Button variant={'contained'} onClick={openCreateFarm}>Create your farm</Button></>
            }
            <Typography variant='h4' mb={2}>Orders</Typography>
            <Divider />
            <div className="dashboard-orders">
                
                {
                    orders && orders.map((order)=>{
                        return <OrderExpandable key={order.orderId}
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