import React, { useContext, useEffect, useRef, useState } from 'react';
import { Backdrop, CircularProgress, Grid, Input, InputAdornment, Typography } from '@mui/material';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import DialogTitle from '@mui/material/DialogTitle';
import Checkmark from '../../images/green-checkmark.png';
import { registerForEvent } from '../../api/userEvents';
import { UserContext } from '../userContext';


const RegisterToEventDialog = ({ open, setOpen, event_id, farmId, farmName, unregistering}) => {

    const [eventDetails, setEventDetails] = useState({
    })
    const [processing, setProcessing] = useState(false);
    const [confirmDeletion, setConfirmDeletion] = useState(false);
    const [dialogComplete, setDialogComplete] = useState(false);
    const [completionText, setCompletionText] = useState('')
    
    const userContext = useContext(UserContext);
    const handleChange = (delta) => {
        setEventDetails({ ...eventDetails, ...delta });
    }
    const handleSubmit = () => {
        setProcessing(true);
        if(unregistering){
            //TODO remove event from user events table
            // // .then(()=>{\
                   // setProcessing(false);
            //     setDialogComplete(true);
            //     setCompletionText("Successfully unregistered");
            // })
        } else {
            
            
            registerForEvent(userContext.userData.user_id, event_id).then(()=>{
                setProcessing(false);
                setDialogComplete(true);
                setCompletionText("Successfully registered");
            })
        }

    }
    const handleClose = () => {
        setOpen(false);
    };
    const today = new Date();
    
    if (processing) {
        return <Backdrop
            sx={{ flexDirection: "column", alignItems: "center", color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    }
    if (dialogComplete) {
        return <Dialog classes={{ root: { alignItems: "center", backgroundColor: "Blue" } }} open={open} onClose={handleClose}>
            <DialogTitle sx={{ textAlign: "center", fontWeight: "Bold" }}>{completionText}</DialogTitle>
            <img id="add-item-success-icon" src={Checkmark}></img>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    }
    if (unregistering) {
        return (
            <Backdrop
                sx={{ flexDirection: "column", alignItems: "center", color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}>

                <Dialog classes={{ root: { alignItems: "center", backgroundColor: "Blue" } }} open={true} onClose={handleClose}>
                    <DialogTitle sx={{ textAlign: "center", fontWeight: "Bold" }}>Confirm Unsubscription</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={() => handleSubmit()}>Confirm</Button>
                    </DialogActions>
                </Dialog>
            </Backdrop>
        )
    }

    
    
    return (
        <Backdrop
                sx={{ flexDirection: "column", alignItems: "center", color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}>

                <Dialog classes={{ root: { alignItems: "center", backgroundColor: "Blue" } }} open={true} onClose={handleClose}>
                    <DialogTitle sx={{ textAlign: "center", fontWeight: "Bold" }}>Confirm RSVP</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={() => handleSubmit()}>Confirm</Button>
                    </DialogActions>
                </Dialog>
            </Backdrop>
    );
};

export default RegisterToEventDialog;