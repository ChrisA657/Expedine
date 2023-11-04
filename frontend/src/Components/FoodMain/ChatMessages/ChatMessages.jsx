import { Avatar, Button, IconButton } from '@mui/material';
import { TypeAnimation } from 'react-type-animation';
import { Typewriter, useTypewriter } from 'react-simple-typewriter'
import './ChatMessages.css'
import ItemCard from '../../common/ItemCard/ItemCard';
import ChatImage from './ChatImage';
const ChatMessages = ({message, func, repeat, speed, onDone, bottomRef}) => {

      const [messageText] = useTypewriter({
        loop: repeat,
        words: [message],
        typeSpeed: speed,
        cursor:false,
        deleteSpeed:0,
        delaySpeed:0,
        onLoopDone: bottomRef ? ()=>onDone(bottomRef) : null

      })
      
      
    return (
        <div className="chat-message-container"> 
            
            <span className="chat-message"> 
            <IconButton sx={{ p: 0, m: 0, alignItems: 'start', height: '40px', width: '40px'}}>
                    <Avatar sx = {{height:'100%', width: '100%'}} 
                            src="https://smu.instructure.com/images/thumbnails/1257944/qzX5yC1AoRV9ybyzzkOq10a1SBuuKYDM3AiR8Uq8" />
            </IconButton>
                {messageText}
            </span>
            <div className='chat-message-img-and-button-container'>
                <div className='chat-message-img'>
                    <ChatImage 
                        name={'Friend Chicken'}
                        price={'19.99'}
                        img={'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D'}/>
                </div>

                <Button variant="contained"
                sx={{width:'200px',height:'60px', alignSelf:'end'}}
                onClick={() => {
                    alert('clicked');
                }}
                >Add to List</Button>
            </div>
        </div>
    )

}

export default ChatMessages;
