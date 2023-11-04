import { useEffect, useRef, useState } from "react";
import ChatMessages from "../ChatMessages/ChatMessages";
import './ChatField.css'
import { TextField } from "@mui/material";
const ChatField = ({chatText, onSubmit, disable}) => {
    const [currentChatText, setCurrentChatText] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();
        if(disable) {
            return;
        }
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
