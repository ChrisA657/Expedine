import { useEffect, useRef, useState } from "react";
import ChatMessages from "../ChatMessages/ChatMessages";
import './ChatDisplay.css'
import { TextField } from "@mui/material";
import ChatField from "./ChatField";
import { getResponse } from "../../../api/gptMessages";
//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
const ChatDisplay = () => {
    const [messages, setMessages] = useState([{icon:'', message:"Hello Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum", func:'none'}, {icon:'', message:'Bye', func:'none'}])
    const [items, setItems] = useState([
        {id: 1, name: "The Classic Combo", description: ""},
        {id: 2, name: "HALF RACK DOUBLE-GLAZED BABY BACK RIBS", description: "Half rack of ribs slow-cooked to fall-off-the-bone tenderness. Slathered with your choice of Honey BBQ sauce or Sweet Asian chile sauce."},
        {id: 3, name: "8 OZ. TOP SIRLOIN", description: "Lightly seasoned USDA Select top sirloin* cooked to perfection and served hot off the grill. Served with your choice of two sides."},
        {id: 4, name: "BOURBON STREET STEAK*", description: "Big flavor from New Orleans. A grilled 8 oz. USDA Select Top Sirloin* is jazzed up with Cajun spices and garlic butter served sizzling on a cast iron platter with sautéed mushrooms and onions. Served with your choice of two sides."},
        {id: 5, name: "SHRIMP 'N PARMESAN SIRLOIN*", description: "A popular take on surf 'n turf, this dish starts with a tender grilled 8 oz. USDA Select Top Sirloin* and is topped with sautéed blackened shrimp and our creamy lemon butter Parmesan sauce. Served with your choice of two sides."},
        {id: 6, name: "CHICKEN TENDERS PLATTER", description: "Crispy breaded chicken tenders are a grill and bar classic. Served with choice of side. Pictured with signature coleslaw and classic fries."},
        {id: 7, name: "FIESTA LIME CHICKEN", description: "A celebration of flavor, this dish delivers on every level. Grilled chicken glazed with zesty lime sauce and drizzled with tangy Mexi-ranch is smothered with a rich blend of Cheddar cheeses on a bed of crispy tortilla strips. Served with Spanish rice and house-made pico de gallo."},
        {id: 8, name: "GRILLED CHICKEN BREAST", description: "Juicy chicken breast seasoned and grilled over an open flame. Served with garlic mashed potatoes & broccoli."},
        {id: 9, name: "BOURBON STREET CHICKEN & SHRIMP", description: "Cajun-seasoned chicken and blackened shrimp jazzed up in buttery garlic and parsley, served sizzling with sautéed mushrooms & onions and garlic mashed potatoes."},
        {id: 10, name: "DOUBLE CRUNCH SHRIMP", description: "Crispy battered shrimp are fried golden brown. Served with cocktail sauce. Pictured with signature coleslaw and fries."},
        {id: 11, name: "BLACKENED CAJUN SALMON", description: "6 oz. blackened salmon fillet grilled to perfection. Served with garlic mashed potatoes & broccoli."},
        {id: 12, name: "HAND-BATTERED FISH & CHIPS", description: "Golden, crispy battered fish with fries. Comes with tartar sauce & a lemon wedge. Pictured with signature coleslaw and classic fries."},
        {id: 13, name: "CLASSIC BROCCOLI CHICKEN ALFREDO", description: "Juicy grilled chicken is served warm on a bed of fettuccine pasta tossed with broccoli and rich Alfredo sauce topped with Parmesan cheese. Served with a golden brown signature breadstick brushed with a buttery blend of garlic and parsley."},
        {id: 14, name: "CLASSIC BLACKENED SHRIMP ALFREDO", description: "Blackened Shrimp is served warm on a bed of fettucine pasta tossed with broccoli and rich Alfredo sauce topped with Parmesan cheese. Served with a golden brown signature breadstick brushed with a buttery blend of garlic and parsley."},
        {id: 15, name: "THREE-CHEESE CHICKEN PENNE", description: "Asiago, Parmesan and white Cheddar cheeses are mixed with penne pasta in a rich Parmesan cream sauce then topped with grilled chicken breast and bruschetta tomatoes."},
        {id: 16, name: "FOUR CHEESE MAC & CHEESE WITH HONEY PEPPER CHICKEN TENDERS", description: "A sweet and savory take on comfort food, four-cheese penne mac & cheese is topped with Applewood-smoked bacon and crispy chicken tenders tossed in honey pepper sauce. (Note: sauce contains bacon and cannot be removed.)"},
        {id: 17, name: "HAND-BATTERED FISH & CHIPS", description: "Golden, crispy battered fish with fries. Comes with tartar sauce & a lemon wedge. Pictured with signature coleslaw and classic fries."},
]);
    const endOfMessages = useRef();
    const [blockChatInput, setBlockChatInput]= useState(false);

    const scrollToBottom = (ref) => {
        if(ref?.current?.scrollIntoView) {
            ref.current.scrollIntoView({ behavior: "smooth" });
       }
    }

    const sendMessage = async(e) => {
        e.preventDefault();
        setBlockChatInput(true);

        const userInputObj = {
            icon:'',
            message: e.target[0].value,
            func:'none'
        }

        setMessages(messages => ([...messages, userInputObj]));
        //scrollToBottom(endOfMessages);

        const response = await getResponse(e.target[0].value);
        const apiResponseObj = {
            icon:'',
            message: response,
            func:'none'
        }

        setMessages(messages => ([...messages, apiResponseObj]));
        setBlockChatInput(false);
        //scrollToBottom(endOfMessages);
    }


    useEffect(()=> {
       
    }, [])

    useEffect(()=> {
     }, [messages])
    
    return (
        <div className="chat-container">
            <div className="messages-container">
                {
                    messages.map(message => { return (
                        <ChatMessages 
                            message = {message?.message} 
                            func = {message?.func}
                            repeat= {1}
                            speed = {2}
                            onDone={scrollToBottom}
                            bottomRef={endOfMessages} >
                            
                        </ChatMessages>
                    )})
                }
                {
                blockChatInput && <ChatMessages 
                            message = {'.......'} 
                            func = {''}
                            repeat={Infinity}
                            speed={70}> 
                </ChatMessages>
                }
                
                <ChatField
                    onSubmit={sendMessage}
                    disable={blockChatInput}/>
            </div>
            <div 
                style = {{ float:"left", clear: "both" }}
                ref = {endOfMessages}>
            </div>
       </div>
        
    )

}

export default ChatDisplay;
