import { useEffect, useRef, useState } from "react";
import ChatMessages from "../ChatMessages/ChatMessages";
import './ChatDisplay.css'
import ChatField from "./ChatField";
import {sendNewMessage } from "../../../api/gptMessages";
import { createNewChat, getMessagesOfChat } from "../../../api/chats";
//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
const ChatDisplay = ({chat_id}) => {
    const [messages, setMessages] = useState([{icon:'', message:'Bye', func:'none'}])
    const [displayMessages, setDisplayMessages] = useState([]);
    const endOfMessages = useRef();
    const [blockChatInput, setBlockChatInput]= useState(false);
    const [user_id, setUserID] = useState(3);

    const scrollToBottom = (ref) => {
        if(ref?.current?.scrollIntoView) {
            ref.current.scrollIntoView({ behavior: "smooth" });
       } 
    }

    const processMessages = (messages) => {
        console.log(messages);
        let processedmessages = [];
        let currentFunctions = [];
        messages.map(message => {
            if(message.sender_role !== 'system' || message.function_call === 1 ) {
                if(message.function_call === 1 ){
                    currentFunctions.push(message.function_arg);
                } else if(message.sender_role === 'assistant') {
                    processedmessages.push({message_content:message.message_content, functions: currentFunctions,icon:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBF1HrYtrApdY8-sWskGBZZELwvE4OqTCVED4jSuw&s'});
                    currentFunctions = [];
                } else if(message.sender_role === 'user' ){
                    processedmessages.push({message_content:message.message_content, functions: currentFunctions, icon:'https://media.licdn.com/dms/image/D5603AQFUySTf2lVv4A/profile-displayphoto-shrink_800_800/0/1674093575107?e=2147483647&v=beta&t=UJHsZRknCs4OrKojUolbC6PLDiJhpi103F8lHVSUEiw'});
                    currentFunctions = [];
                }
            }
        })
        console.log(processedmessages);
        return processedmessages;
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
        const newMessageText = e.target[0].value;
        const newMessage = {
            chat_id: chat_id,
            user_id: user_id,
            sender_role: "user",
            message_content:newMessageText,
            function_call: false
        }
        //If this line is finished, we have created new entrees in our chat based on the given prompt, we should update our messages list
        const response = await sendNewMessage(newMessage);

    
        const updatedMessages = await getMessages(chat_id);
        setMessages(updatedMessages);
        setBlockChatInput(false);
    }

    const getMessages = async(chat_id)=> {
        const messages = await getMessagesOfChat(chat_id);
        return messages.data;
    }
    useEffect(()=> {
        const loadMessages = async() => {
            const messages = await getMessages(chat_id);
            let pMessages = processMessages(messages);
            setDisplayMessages(pMessages);
            setMessages(messages);
        }
        loadMessages().catch(console.error);
    }, [])

    useEffect(()=> {
        const loadMessages = async() => {
            const messages = await getMessages(chat_id);
            setMessages(messages);
        }
        loadMessages().catch(console.error);
    }, [chat_id])

    useEffect(()=> {
        let pMessages = processMessages(messages);
        setDisplayMessages(pMessages);
     }, [messages])
    
    return (
        <div className="chat-container">

            <div className="messages-container">
                {
                    displayMessages?.map(message => { return (
                        <ChatMessages 
                            message = {message?.message_content} 
                            items = {message.functions}
                            repeat= {1}
                            speed = {25}
                            onDone={scrollToBottom}
                            bottomRef={endOfMessages} icon ={message.icon}
                            chat_id={chat_id}>
                            
                        </ChatMessages>
                    )})
                }
                {
                blockChatInput && <ChatMessages 
                            message = {'.......'} 
                            func = {''}
                            repeat={Infinity}
                            speed={25}> 
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
