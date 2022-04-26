
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Backdrop, Button, Checkbox, CircularProgress, Container, Divider, FormControlLabel, Paper, Stack, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { getFarmById } from '../../api/farms';
import { UserContext } from '../userContext';
import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getCart } from '../../api/carts';
export const Checkout = () => {
    const steps = ['Shipping ', 'Payment', 'Review'];

    const [items, setItems] = useState([
        { product_name: "Farm", product_description: "Large variant aksk alskd aklskdk alsk", product_image_url: " ", product_price: 14.99, product_stock: 4, farmer_id: 1, },
        { product_name: "Pear", product_description: "Edible i hope", product_image_url: " ", product_price: 14.99, product_stock: 4, farmer_id: 2, },
        { product_name: "Tractor", product_description: "Large variant", product_image_url: " ", product_price: 14.99, product_stock: 4, farmer_id: 1, },
        { product_name: "Horse", product_description: "Pretty fast", product_image_url: " ", product_price: 14.99, product_stock: 2, farmer_id: 1, },
        { product_name: "Shovel", product_description: "Large variant", product_image_url: " ", product_price: 14.99, product_stock: 4, farmer_id: 1, },
        { product_name: "Banjo", product_description: "Large variant", product_image_url: " ", product_price: 14.99, product_stock: 4, farmer_id: 1, },
    ])
    const [orders, setOrders] = useState(null);
    const [total, setTotal] = useState(0);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExprDate, setCardExprDate] = useState('');


    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep((activeStep) => activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleSubmit = () => {
        handleNext();
        //createNewOrder({cartId,firstName,lastName,address,city,state,zip,cardName,cardNumber,cardExprDate}).then(()=>handleNext())
        setTimeout(() => handleNext(), 1000);

    }
    useEffect(() => {
        getCart(userContext.userData.user_id).then(res => setItems(res.data));
    }, []);
    useEffect(() => {
        const orders = []
        let total = 0;
        items.forEach(itemToSort => {
            let added = false;
            total += itemToSort.product_price * itemToSort.product_stock;
            orders.forEach(order => {
                if (order[0].farmer_id == itemToSort.farmer_id) {
                    added = true;
                    order.push(itemToSort);
                }

            })
            if (!added) {
                orders.push([itemToSort]);
            }
        });
        setOrders(orders);
        setTotal(total);
    }, [items])

    const getFarmName = (id) => {
        getFarmById(id).then(data => { return data.farmName })
    }
    const addressStep = () => {
        return <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        product_name="firstName"
                        label="First product_name"
                        fullWidth
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        autoComplete="given-product_name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        product_name="lastName"
                        label="Last product_name"
                        fullWidth
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        autoComplete="family-product_name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        product_name="address1"
                        label="Address line 1"
                        fullWidth
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        autoComplete="shipping address-line1"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        product_name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        product_name="city"
                        label="City"
                        fullWidth
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        autoComplete="shipping address-level2"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        product_name="state"
                        label="State/Province/Region"
                        fullWidth
                        value={state}
                        onChange={e => setState(e.target.value)}
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        product_name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        value={zip}
                        onChange={e => setZip(e.target.value)}
                        autoComplete="shipping postal-code"
                        variant="standard"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    }
    const paymentStep = () => {
        return <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cardName"
                        label="Name on card"
                        fullWidth
                        autoComplete="cc-product_name"
                        variant="standard"
                        value={cardName}
                        onChange={e => setCardName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cardNumber"
                        label="Card number"
                        fullWidth
                        autoComplete="cc-number"
                        variant="standard"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="expDate"
                        label="Expiry date"
                        fullWidth
                        autoComplete="cc-exp"
                        variant="standard"
                        value={cardExprDate}
                        onChange={e => setCardExprDate(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cvv"
                        label="CVV"
                        helperText="Last three digits on signature strip"
                        fullWidth
                        autoComplete="cc-csc"
                        variant="standard"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    }
    const reviewStep = () => {
        return <>

            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                Order Summary
            </Typography>
            {
                orders.length > 1 && <Typography color={"purple"} textAlign='center'>
                    You have items from more than one farm in your cart, checking out will create multiple orders.
                </Typography>
            }
            <Stack>
                {
                    orders.map((order, index) =>
                        <Typography key={index} sx={{ py: 1, px: 0 }}>
                            <Typography variant="h6" textAlign={['center']} sx={{ fontWeight: "bold", my: '8px' }}>{`Order: ${index + 1}`}</Typography>
                            <List >

                                {
                                    order.map((item, index) => <>
                                        <ListItem alignItems='center' key={index} sx={{ py: 1, px: 0 }}>
                                            <ListItemText primary={<Typography variant='h6'>{item.product_name}</Typography>} secondary={<><div>{item.product_description}</div>
                                                <Stack sx={{ textAlign: "start", alignItems: "start", my: 1.5 }}>
                                                    <Typography >Price: ${item.product_price}</Typography>
                                                    <Typography >Quantity: {item.product_stock}</Typography>

                                                </Stack>
                                            </>} />

                                            <Typography sx={{ fontWeight: "bold", }}>${item.product_price * item.product_stock}</Typography>
                                        </ListItem></>
                                    )
                                }
                            </List>
                        </Typography>

                    )
                }
                <Divider variant='middle' />
                <ListItem sx={{ py: 4, px: 0 }}>
                    <ListItemText primary={<Typography variant='h4'>Total</Typography>} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {`$${total}`}
                    </Typography>
                </ListItem>
            </Stack>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" fontWeight={'bold'} gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>{firstName}</Typography>
                    <Typography gutterBottom>{`${address}, ${city}, ${state}, ${zip}`}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" fontWeight={'bold'} gutterBottom sx={{ mt: 2 }}>
                        Payment details
                    </Typography>
                    <Grid container>

                        <Grid item xs={6}>
                            <Typography gutterBottom>Card Holder</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom>{cardName}</Typography>
                        </Grid>

                    </Grid>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography gutterBottom>Card number</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom>{cardNumber}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>

                        <Grid item xs={6}>
                            <Typography gutterBottom>Expiry date</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom>{cardExprDate}</Typography>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>

        </>
    }
    const submitting = () => {
        return <>
            <Backdrop
                sx={{ flexDirection: "column", alignItems: "center", color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    }
    function getStepContent(step) {
        switch (step) {
            case 0:
                return addressStep();
            case 1:
                return paymentStep();
            case 2:
                return reviewStep();
            case 3:
                return submitting();
            default:
                throw new Error('Unknown step');
        }
    }
    if (!orders) {
        return <></>
    }
    return <Container component="main" maxWidth={'sm'} sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
                Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <React.Fragment>
                {activeStep === steps.length + 1 ? (
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                            Your order number is #2001539. We have notified the farmer of your purchase
                            and he will work to fulfill your order as soon as possible. You can view the
                            status of your order on your <Link to='/dashboard'>dashboard</Link>
                        </Typography>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {getStepContent(activeStep)}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                    Back
                                </Button>
                            )}

                            <Button
                                variant="contained"
                                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </React.Fragment>
        </Paper>

    </Container>

}