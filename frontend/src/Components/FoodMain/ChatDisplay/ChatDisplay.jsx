import { useEffect, useRef, useState } from "react";
import ChatMessages from "../ChatMessages/ChatMessages";
import './ChatDisplay.css'
import { TextField } from "@mui/material";
import ChatField from "./ChatField";
import { getResponse } from "../../../api/gptMessages";
//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
const ChatDisplay = () => {
    const [messages, setMessages] = useState([{icon:'', message:"Hello Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum", func:'none'}, {icon:'', message:'Bye', func:'none'}])
    const [chatText, setChatText] = useState('');
    const endOfMessages = useRef();

    const sendMessage = (e) => {
        e.preventDefault();
        const response = getResponse('hey');
        console.log(response);
        const messageObj = {
            icon:'',
            message: e.target[0].value,
            func:'none'
        }
        setMessages(messages => ([...messages, messageObj]));
        if(endOfMessages.current.scrollIntoView){
            setTimeout(() => {
                endOfMessages.current.scrollIntoView({ behavior: "smooth" });
              }, 500);
       }
    }


    useEffect(()=> {
       if(endOfMessages.current.scrollIntoView) {
            console.log(endOfMessages)
            endOfMessages.current.scrollIntoView({ behavior: "smooth" });
       }
    }, [])
    
    return (
        <div className="chat-container">
            <div className="messages-container">
                {
                    messages.map(message => { return (
                        <ChatMessages 
                            message = {message?.message} 
                            func = {message?.func}> 
                        </ChatMessages>
                    )})
                }
            
                <ChatField
                    onSubmit={sendMessage}/>
            </div>
            <div 
                style = {{ float:"left", clear: "both" }}
                ref = {endOfMessages}>
            </div>
       </div>
        
    )

}

export default ChatDisplay;
