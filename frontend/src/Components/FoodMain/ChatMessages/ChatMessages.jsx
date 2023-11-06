import { Avatar, Button, IconButton } from '@mui/material';
import { TypeAnimation } from 'react-type-animation';
import { Typewriter, useTypewriter } from 'react-simple-typewriter'
import AIWriter from "react-aiwriter";
import './ChatMessages.css'
import ChatImage from './ChatImage';
import ItemCard from './ItemCard';
import { useEffect } from 'react';
const ChatMessages = ({message, items, repeat, speed, onDone, bottomRef, icon, chat_id}) => {

      const [messageText] = useTypewriter({
        loop: repeat,
        words: [message],
        typeSpeed: speed,
        cursor:false,
        deleteSpeed:0,
        delaySpeed:0,
        onLoopDone: bottomRef ? ()=> onDone(bottomRef) : null

      })
      
    useEffect(()=>{
        console.log(message);
    },[])
    return (
        <div className="chat-message-container"> 
            <span className="chat-message"> 
            <IconButton sx={{ p: '4px', m: 0, alignItems: 'start', height: '40px', width: '40px'}}>
                    <Avatar sx = {{height:'100%', width: '100%'}} 
                            src={icon} />
            </IconButton>
                <p>
                    {message}
                </p>
            
            </span>
            <div className='chat-message-img-and-button-container'>
                {   
                    items && items.map(itemId=>{
                        return <ItemCard item_id={itemId}
                                            chat_id={chat_id} />
                    })
                }
            </div>
        </div>
    )

}

export default ChatMessages;
