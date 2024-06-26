import React, { useState, useContext } from 'react';
import { Button, IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import { AppContext } from '../context/CreateContext';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';


const ShowData = () => {

    const { hndleDeleteAPi, open, setOpen, setCardId } = useContext(AppContext)
    const handleClose = () => {
        setOpen((prev) => ({
            ...prev, active: false, name: "", address: "", start:
                "", end: "", nbr: "", img: "", id: ""
        }));
    };

    return (
        <div>
            <Modal
                open={open.active}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <div className='modalsShow'>
                    <div className='w-fit absolute right-0 top-0'>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    {open.img === null ? <Stack direction="row" spacing={2}  style={{width:'fit-content',margin:'auto'}}>
                        <Avatar sx={{ bgcolor: deepOrange[500]}}>{open.name.slice(0,1)}</Avatar>
                    </Stack> : <img src={open.img} alt="profile"
                        className='w-[80px] rounded-full object-cover h-[80px] m-auto' />}

                    <div className="flex justify-between gap-5 my-5">
                        <div>
                            <div>
                                <label className='labels '>name</label>
                                <p className='capitalize'>{open.name}</p>
                            </div>
                            <div>
                                <label className='labels'>Address</label>
                                <p className='capitalize'>{open.address}</p>
                            </div>
                        </div>
                        <div>
                            <div className='flex  gap-3'>
                                <div>
                                    <p>start time</p>
                                    <div className='bg-green-300 rounded p-1  h-fit' >{open.start}</div>
                                </div>
                                <div>
                                    <p>End time</p>
                                    <div className='bg-red-300 p-1 rounded cursor-pointer h-fit'>{open.end}</div>
                                </div>
                            </div>
                            <div className='flex gap-1 justify-between'>
                                <Button variant="outlined" className='btn_Add w-fit' onClick={() => setCardId(open)}>Edit</Button>
                                <Button variant="outlined" className='btn_Add w-fit'
                                    onClick={() => {
                                        handleClose()
                                        hndleDeleteAPi(open.id)
                                    }}>Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ShowData;