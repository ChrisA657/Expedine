import './ChatImage.css'
const ChatImage = ({img, name, price}) => {

    
    return (
        <div class="chat-img-container">
            <img src={img} alt="Dish Image"/>
        </div>
        
    )

}

export default ChatImage;
