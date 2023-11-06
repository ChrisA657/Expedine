
import { useEffect, useState } from 'react';
import './ItemCard.css'
import './ChatMessages.css'
import ChatImage from './ChatImage';
import { getItemById } from '../../../api/items';
import { Button } from '@mui/material';

const ItemCard = ({item_id, chat_id}) => {
    const [item, setItem] = useState();

     useEffect(()=> {
        const loadItem = async() => {
            const item = await getItemById(item_id);
            setItem(item.data[0]);
        }
        loadItem().catch(console.error);
    }, [])
      
      
    return (
        <div className='chat-message-img-and-button-container'>
            <div className='chat-message-img'>
                        <ChatImage
                            name={item?.Name}
                            price={item?.Price}
                            img={item?.Image}
                            item_id={item_id}
                            chat_id={chat_id}/>
            </div>
        </div>
    )

}

export default ItemCard;
