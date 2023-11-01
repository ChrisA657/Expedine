import { useEffect, useRef, useState } from "react";
import ChatMessages from "../ChatMessages/ChatMessages";
import './ChatField.css'
import { TextField } from "@mui/material";
const ChatField = ({chatText, onSubmit}) => {
    const [currentChatText, setCurrentChatText] = useState(0)


    const handleSubmit = (e) =>{
        onSubmit(e);
        setCurrentChatText('');
    }

    const handleUserChatChange = (e) =>{
        setCurrentChatText(e.target.value)
    }

    useEffect(()=> {
       
    }, [])
    
    return (
        <div className="chat-field">
            <form onSubmit={e => handleSubmit(e)}>
                    <input 
                        type='text'
                        name='UserChat'
                        placeholder="Send A Message"
                        onChange={handleUserChatChange}
                        value={currentChatText} 
                        />
            </form>
       </div>
        
    )

}

export default ChatField;
