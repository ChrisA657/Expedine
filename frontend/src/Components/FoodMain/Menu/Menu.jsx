
import { useState } from 'react';
import ItemCard from '../ChatMessages/ItemCard';
import './Menu.css'
const Menu = ({chat_id}) => {
    const [itemCount, setItemCount] = useState(35);

    const getItemCount = () => {
        //const menuData = await getMenuData();
        //setItemCount(menuData.length);
    }

    return(
        <div className='menu-container'>
           {
            [...Array(37)].map((j,i)=> {
                    return <ItemCard 
                        item_id={i+1}
                        chat_id={chat_id}/>
                    }
                )
                
            } 
        </div>
    )
}

export default Menu;