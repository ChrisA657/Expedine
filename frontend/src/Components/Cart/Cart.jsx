
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Button, Container, Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { deleteItemFromCart, getCart } from '../../api/carts';

const Cart = ({chat_id}) => {
    const [items, setItems] = useState([
         
    ])
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const redirectToCheckout = () => {
        navigate("/checkout");
    }
    useEffect(() => {
        const fetchCart = async() =>{
            console.log('chat_id'+chat_id);
            let cartItems = await getCart(chat_id);
            console.log(cartItems.data);
            setItems(cartItems.data);
        }
       
       fetchCart();
    }, []);
    
    useEffect(() => {
        const orders = []
        let total = 0;
        items.map(item => {
            total += item.Price * item.quantity;
        });

        setTotal(total);
        console.log(items);
    }, [items])


    const deleteItem = (item_id) => {
        console.log(item_id);
        deleteItemFromCart(chat_id, item_id).then(() => {
            getCart(chat_id).then(res => setItems(res.data));
        });
    }

    if (items.length === 0) {
        return <> 
        <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>
            Empty Cart
        </Typography>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
                           No items in cart.
                        </Typography>
        </>
    }

    return (
        <div>
            <Container component="main" sx={{ mb: 4, maxWidth: ["900px"] }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                        Cart Summary
                    </Typography>

                    <Stack>
                        {
                                <Typography  sx={{ py: 1, px: 0 }}>
                                    <List>
                                        {
                                            items.map((item, index) => {
                                                return <>
                                                    <ListItem alignItems='flex-start' key={index} sx={{ py: 1, px: 0, display: ["none", "flex"] }}>
                                                        <ListItemText primary={<Typography variant='h6'>{item.Name}</Typography>} secondary={<><div style={{ marginLeft: "6px" }}>{item.product_description}</div>
                                                            <Stack sx={{ textAlign: "start", alignItems: "start", my: 1.5 }}>
                                                                <Typography >Price: ${item.Price}</Typography>
                                                                <Typography >Quantity: {item.quantity}</Typography>
                                                                <Typography sx={{ fontWeight: "bold", }}>Total: ${item.Price * item.quantity}</Typography>
                                                            </Stack>
                                                            <Button variant='outlined' color='error' sx={{ mt: 1 }} onClick={() => deleteItem(item.ID)}>Remove</Button></>} />
                                                        <img src={item.Image} style={{ width: '35%', maxHeight: "200px", maxWidth: "320px", }} />
                                                    </ListItem>
                                                    <Container component="li" sx={{ display: ["flex", "none"], flexDirection: 'column' }}>
                                                        <Typography sx={{ textAlign: "center" }}>{item.Name}</Typography>
                                                        <Typography variant='subtitle2' color={"text.secondary"} sx={{ textAlign: "center" }}>{item.product_description}</Typography>
                                                        <img src={item.Image} style={{ width: '100%', maxHeight: "200px", maxWidth: "320px", margin: "0 auto", display: "block" }} />
                                                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} sx={{ my: 2 }}>
                                                            <Stack sx={{ textAlign: "start", alignItems: "start" }}>
                                                                <Typography sx={{}}>Price: ${item.Price}</Typography>
                                                                <Typography sx={{}}>Quantity: {item.quantity}</Typography>
                                                                <Typography sx={{ fontWeight: "bold", }}>Total: ${item.Price * item.quantity}</Typography>
                                                            </Stack>

                                                            <Button variant='outlined' color='error' onClick={() => deleteItem(item.ID)}>Remove</Button>
                                                        </Box>

                                                    </Container>

                                                </>
                                            })
                                        }
                                    </List>
                                    <Divider variant='middle'></Divider>
                                </Typography>

                           
                        }
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={<div style={{ fontWeight: 'bold', fontSize: '24px' }}>Total</div>} />
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                {`$${total}`}
                            </Typography>
                        </ListItem>
                    </Stack>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                        <Button variant="contained" onClick={redirectToCheckout}>Checkout</Button>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
}
export default Cart;