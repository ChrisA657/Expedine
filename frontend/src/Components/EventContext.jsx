import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getEventsByUserId } from "../api/events";
import { event } from "../models/event";
import { UserContext } from "./userContext";

//Events the user is RSVP'd to
export const EventContext = createContext();

export const EventProvider = ({children}) =>{

    const userContext = useContext(UserContext);
    const [events, setEvents] = useState(null);

    const context = useMemo(() => ({events, setEvents}), [events]);
    useEffect(()=> {
        //TODO get user's events subscribed to
        console.log(userContext?.userData?.userId)
        getEventsByUserId(userContext?.userData?.userId).then(res => setEvents(res.data));
        // setEvents([
        //     new event("Horse backriding party", "Bring your whole family !", 3,"Yellow Mountain Farm", 2, 1, "https://upload.wikimedia.org/wikipedia/commons/4/48/GGF_Race5.jpg" ),
        //     new event("BIG BANG BOOM BASS = ", "Big ol bag lala palozaoza im just making up words here to test stuff with variable length",6,"Yellow Mountain Farm", 4, 3, "https://i.cbc.ca/1.6165805.1630877196!/fileImage/httpImage/lawn-tractor-races.jpg"),
        //     new event("Horse backriding party forever and ever", "Loreeat cupiditate ut, minus necessit cupiditate ut, minus necessit cupiditate ut, minus necessit cupiditate ut, minus necessita quod vel eaque mollitia iste itaque ipsam? Rem?",3, 1,"Yellow Mountain Farm", 2, "https://i.cbc.ca/1.6165805.1630877196!/fileImage/httpImage/lawn-tractor-races.jpg"),
            
        // ]);
    },[userContext])

    return <EventContext.Provider value={context}>
            {children}
        </EventContext.Provider>
}