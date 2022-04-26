
import React, { useEffect, useRef, useState } from 'react';
import { Backdrop, CircularProgress, FormControl, Grid, Input, InputAdornment, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkmark from '../../images/green-checkmark.png';
import './AddItemToFarmDialog.css';
import { Box } from '@mui/material';
import { addItemToFarm, deleteItemFromFarm, editFarmItem } from '../../api/items';
import { useNavigate, useParams } from 'react-router-dom';

const categories = ["Fruit", "Machinery", 'Livestock'];
// TODO Add fail logic and style to adding item
// If we are passed an item Id, we are editing
const AddItemToFarmDialog = ({ open, setOpen, product_name, product_description, product_price, product_category, product_stock, product_image_url, farmer_id, product_id, custom, returnToFarm, }) => {

    const [itemDetails, setItemDetails] = useState({
    });
    const [processing, setProcessing] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [completionText, setCompletionText] = useState('');
    const params = useParams();
    const timer = useRef();
    const timer2 = useRef();
    useEffect(() => {
        console.log("here" + farmer_id)
        if (!custom){
            setItemDetails({
                product_name: product_name,
                product_description: product_description,
                product_category: product_category,
                product_image_url: product_image_url,
                product_price: product_price ? product_price : 1,
                product_stock: product_stock ? product_stock : 1,
                farmer_id: params.farmId,
                product_id: product_id,
            })
        } else {
            setItemDetails({
                product_price:  1,
                product_stock: 1,
                farmer_id: params.farmId,
                product_id: product_id,
            })
        }

        return () => {
            clearTimeout(timer.current)
            clearTimeout(timer2.current);
        }


    }, [])
    const handleChange = (delta) => {
        setItemDetails({ ...itemDetails, ...delta });
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (option) => {
        console.log(itemDetails);
        setProcessing(true);
        if (option == 1) {
            deleteItemFromFarm(product_id).then(() => {
                setCompletionText('Item Deleted');
                setCompleted(true);
            })
        } else if (!product_id) {
            addItemToFarm(itemDetails).then(() => {
                setCompletionText('Item Added');
                setCompleted(true);
            })
        } else {
            editFarmItem(itemDetails).then(() => {
                setCompletionText('Item Edited');
                setCompleted(true);
            })
        }

        timer.current = setTimeout(() => {
            setCompleted(true);
        }, 2000)


    }
    if (processing) {
        return <Backdrop
            sx={{ flexDirection: "column", color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}>
            {
                completed ? <Dialog classes={{ root: { alignItems: "center", backgroundColor: "Blue" } }} open={open} onClose={handleClose}>
                    <DialogTitle sx={{ textAlign: "center", fontWeight: "Bold" }}>{completionText}</DialogTitle>
                    <img id="add-item-success-icon" src={Checkmark}></img>
                    <DialogActions>
                        <Button variant="outlined" onClick={returnToFarm || handleClose}>Return to farm</Button>
                        {returnToFarm && <Button variant="outlined" onClick={handleClose}>Add more items</Button>}
                    </DialogActions>
                </Dialog>
                    : <CircularProgress color="inherit" />

            }
        </Backdrop>
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: "center", fontWeight: "Bold" }}>{product_id ? "Edit your item" : "Add Item To Your Farm"}</DialogTitle>

                <DialogContent>
                    <DialogContent sx={{ display: "flex", justifyContent: "center", padding: 0, margin: ["24px 0", "24px"] }}>
                        <img src={itemDetails.product_image_url} id="add-item-img" />
                    </DialogContent>
                    {custom && <TextField
                        sx={{ marginBottom: '18px' }}
                        required
                        id="product_imageUrl"
                        label="Image"
                        fullWidth
                        value={itemDetails.product_image_url}
                        onChange={e => handleChange({ product_image_url: e.target.value })}

                    /> }
                    <TextField

                        required
                        id="product_name"
                        label="Name"
                        fullWidth
                        value={itemDetails.product_name}
                        onChange={e => handleChange({ product_name: e.target.value })}

                    />
                    <TextField
                        sx={{ marginTop: '18px' }}
                        required
                        id="product_description"
                        label="Description"
                        multiline
                        fullWidth
                        rows={2}
                        value={itemDetails.product_description}
                        onChange={e => handleChange({ product_description: e.target.value })}

                    />
                    <TextField
                        sx={{ alignSelf: "flex-start", mt: 2 }}
                        InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                        inputProps={{ pattern: "[0-9]*", type: "number", inputMode: "numeric" }}
                        id="product_price"
                        label="Price"
                        pattern={"[0-9]*"}
                        inputMode={"numeric"}
                        value={itemDetails.product_price}
                        onChange={e => handleChange({ product_price: e.target.value })}


                    />
                    <Box sx={{ display: "flex", flexDirection: ["column", "row", "row"], justifyContent: "space-between", marginTop: "18px", gap: "20px" }}>
                        <FormControl>
                            <InputLabel >Category</InputLabel>
                            <Select
                                labelId="Category"
                                id="category"
                                value={itemDetails.product_category || categories[0]}
                                label="Category"
                                onChange={e => handleChange({ product_category: e.target.value })}
                            >
                                {
                                    categories.map((category, i) => {
                                        return <MenuItem value={category}>{category}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                        <TextField
                            sx={{ maxWidth: "125px" }}
                            id="quantity"
                            label="Quantity"
                            type="number"
                            inputProps={{
                                step: 1,
                                min: 0,
                                max: 9999,

                            }}
                            value={itemDetails.product_stock}
                            onChange={e => handleChange({ product_stock: e.target.value })}
                        />
                    </Box>

                </DialogContent>
                <DialogActions sx={{ pl: 3 }}>
                    {
                        product_id && <div style={{ display: 'flex', flexGrow: 1 }}>
                            <Button
                                variant='outlined'
                                color='error'
                                sx={{ alignSelf: 'flex-start' }}
                                onClick={() => handleSubmit(1)}>Delete</Button>
                        </div>
                    }
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>{product_id ? 'Edit' : 'Add'}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddItemToFarmDialog;