import { Avatar, IconButton } from '@mui/material';
import { TypeAnimation } from 'react-type-animation';
import './ChatMessages.css'
const ChatMessages = ({message, func}) => {

    return (
        <div className="chat-message-container"> 
            <IconButton sx={{ p: 0, m: 0, alignItems: 'start', height: '60px', width: '60px'}}>
                    <Avatar sx = {{height:'100%', width: '100%'}}src="https://smu.instructure.com/images/thumbnails/1257944/qzX5yC1AoRV9ybyzzkOq10a1SBuuKYDM3AiR8Uq8" />
                </IconButton>
            <div className="chat-message"> 
                <TypeAnimation 
                    sequence={[message]}
                    speed = {100}
                    cursor = {false}

                >

                </TypeAnimation>
            </div>
        </div>
    )

}

export default ChatMessages;
