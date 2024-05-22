import React, { useState, useContext } from 'react';
import { Button, IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import { AppContext } from '../context/CreateContext';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import {TimeFormate,TimeFormateEnd} from './TimeFormate';
import { IMAGE_URL } from '../Config';


const ShowData = () => {

    const { hndleDeleteAPi, open, handleClose, setCardId } = useContext(AppContext)
 
 
    
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
                    {open.img.length <= 3 ? <Stack direction="row" spacing={2}  style={{width:'fit-content',margin:'auto'}}>
                        <Avatar sx={{ bgcolor: deepOrange[500]}}>{open.name.slice(0,1)}</Avatar>
                    </Stack> : <img src={`${IMAGE_URL}/${open.img}`}  alt={`${open.name}`}
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
                                    <p>Start Time</p>
                                    <TimeFormate times={open.start} monthS={open?.monthS} />
                                   
                                </div>
                                <div>
                                    <p>End Time</p>
                                    <TimeFormateEnd times={open.end} monthE={open?.monthE}/>
                                  
                                </div>
                            </div>
                            <div className='flex gap-1 justify-between'>
                                <Button variant="outlined" className='btn_Add w-fit' onClick={() => setCardId(open)}>Edit</Button>
                                <Button variant="outlined" className='btn_Add w-fit'
                                    onClick={() => {hndleDeleteAPi(open)}}>Delete
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