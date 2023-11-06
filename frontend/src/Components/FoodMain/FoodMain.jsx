import { useState } from "react";
import Cart from "../Cart/Cart";
import ChatDisplay from "./ChatDisplay/ChatDisplay";
import './FoodMain.css';
import { Button } from "@mui/material";
import { createNewChat } from "../../api/chats";

const FoodMain = () => {
    const [activeTab, setActiveTab] = useState('chat');
    const [chat_id, setChatID] = useState(26);
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleNewChat = async() => {
        const newChatID = await createNewChat(3);
        console.log('new chat id:'+ newChatID)
        setChatID(newChatID);
    }

    return (
        <div className="food-main">
            <div className="food-tabs">
                <button
                    className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
                    onClick={() => handleTabClick('chat')}
                >
                    Chat
                </button>
                <button
                    className={`tab-button ${activeTab === 'cart' ? 'active' : ''}`}
                    onClick={() => handleTabClick('cart')}
                >
                    Cart
                </button>
                
            </div>
            <Button variant="contained"
                    sx={{width:'200px',height:'60px',m:'4px', position:'absolute', top:0,right:0}}
                onClick={() => {
                    handleNewChat();
                }}
                >New Chat</Button>
            {activeTab === 'chat' && <ChatDisplay chat_id={chat_id} />}
            {activeTab === 'cart' && <Cart chat_id={chat_id} />}
        </div>
    );
};


export default FoodMain;
