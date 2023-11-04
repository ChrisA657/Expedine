import './ItemCard.css'
const ItemCard = ({img, name, price}) => {

    
    return (
        <div class="item-card">
            <img src={img} alt="Item Image"/>
            <div class="item-details">
                <p class="item-price">{price}</p>
                <p class="item-description">{name}</p>
            </div>
        </div>
        
    )

}

export default ItemCard;
