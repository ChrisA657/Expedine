
import { useEffect, useState } from 'react';
import './ItemCard.css'
import './ChatMessages.css'
import { getItemById } from '../../../api/items';
import { Button } from '@mui/material';
import {addItemToCart} from "../../../api/carts";

const ItemCard = ({item_id, chat_id}) => {
    const [item, setItem] = useState();

     useEffect(()=> {
        const loadItem = async() => {
            const item = await getItemById(item_id);
            setItem(item.data[0]);
        }
        loadItem().catch(console.error);
    }, [])
      
    const handleAdd = async()=> {
        await addItemToCart(chat_id, item_id);
        alert('Item added');
    }
    return (
        <div className='chat-message-img-and-button-container'>
            <div className='chat-message-img'>
                <div class="chat-img-container">
                    <div> {item?.Name} </div>
                    <img src={item?.Image} alt="Dish Image"/>
                    <div className='price-label'> ${item?.Price} </div>
                    <Button variant="contained"
                        sx={{width:'200px',height:'60px', alignSelf:'end'}}
                        onClick={() => {
                            handleAdd();
                        }}
                        >Add to List</Button>
                </div>
            </div>
        </div>
    )

}

export default ItemCard;
