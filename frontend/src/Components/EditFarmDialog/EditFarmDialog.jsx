
import React, { useEffect, useRef, useState } from 'react';
import { Backdrop, CircularProgress, Grid, Input, InputAdornment, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import Checkmark from '../../images/green-checkmark.png';
import { createFarm, updateFarmByID } from '../../api/farms'
import { useNavigate } from 'react-router-dom';
const EditFarmDialog = ({ open, setOpen, farm_name, farm_description, farm_image_url, date_founded, farmId, owner_id, creating }) => {
    console.log(farmId);
    const [farmDetails, setFarmDetails] = useState({});
    const [processing, setProcessing] = useState(false);
    const [dialogComplete, setDialogComplete] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setFarmDetails({
            farm_name, farm_description, farm_image_url, date_founded,
        })
    }, [])

    const handleChange = (delta) => {
        setFarmDetails({ ...farmDetails, ...delta });
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        setProcessing(true);
        if (creating) {
            createFarm({...farmDetails, owner_id}).then(res=>{
                navigate('/farms/' + res.data);
            });
        } else {
            updateFarmByID(farmDetails, farmId).then()
            {
                setProcessing(false);
                setDialogComplete(true);
            }
        }

    }
    if (processing) {
        return <Backdrop
            sx={{ flexDirection: "column", alignItems: "center", color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    }
    if (dialogComplete) {
        return <Dialog classes={{ root: { alignItems: "center", backgroundColor: "Blue" } }} open={open} onClose={handleClose}>
            <DialogTitle sx={{ textAlign: "center", fontWeight: "Bold" }}>Farm Edited</DialogTitle>
            <img id="add-item-success-icon" src={Checkmark}></img>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <>
                    <DialogTitle sx={{ textAlign: "center", fontWeight: "Bold" }}>{creating ? 'Provide details of your farm' : 'Edit the details of your farm'}</DialogTitle>
                    <DialogContent>
                        <img src={farmDetails.farm_image_url} style={{ minWidth: '200px', maxWidth: '60%', display: 'block', margin: '0 auto' }} />
                        <TextField
                            sx={{ margin: "1rem 0" }}
                            required
                            id="farm_name"
                            label="Farm Name"

                            fullWidth
                            rows={4}
                            value={farmDetails.farm_name}
                            onChange={e => handleChange({ farm_name: e.target.value })}

                        />
                        <TextField

                            required
                            id="farm_image_url"
                            label="Image"
                            sx={{ marginBottom: "1rem" }}
                            fullWidth

                            value={farmDetails.farm_image_url}
                            onChange={e => handleChange({ farm_image_url: e.target.value })}

                        />
                        <TextField
                            sx={{ marginBottom: "1rem" }}
                            required
                            id="farm_description"
                            label="Description"
                            multiline
                            fullWidth
                            rows={4}
                            value={farmDetails.farm_description}
                            onChange={e => handleChange({ farm_description: e.target.value })}

                        />
                        <TextField
                            sx={{ margin: ".1rem 0" }}
                            required
                            id="date_founded"
                            label="Year established"

                            fullWidth
                            rows={4}
                            value={farmDetails.date_founded}
                            onChange={e => handleChange({ date_founded: e.target.value })}

                        />
                    </DialogContent>
                    <DialogActions>

                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => handleSubmit()}>Submit</Button>
                    </DialogActions>
                </>
            </Dialog>

        </div>
    );
};

export default EditFarmDialog;