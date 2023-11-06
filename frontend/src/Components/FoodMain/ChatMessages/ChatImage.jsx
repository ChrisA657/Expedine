import { Button } from '@mui/material';
import './ChatImage.css'
import {addItemToCart} from "../../../api/carts";
const ChatImage = ({img, name, price, item_id, chat_id}) => {

    const handleAdd = async()=> {
        await addItemToCart(chat_id, item_id);
        alert('Item added');
    }
    return (
        <div class="chat-img-container">
            <div> {name} </div>
            <img src={img} alt="Dish Image"/>
            <div className='price-label'> ${price} </div>
            <Button variant="contained"
                sx={{width:'200px',height:'60px', alignSelf:'end'}}
                onClick={() => {
                    handleAdd();
                }}
                >Add to List</Button>
        </div>
        
    )

}

export default ChatImage;
