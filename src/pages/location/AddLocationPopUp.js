import React, { useState } from 'react'
import { Modal, Input, } from "antd"
import { useAuthContext } from '../../hooks/useAuthContext';
import LocationScheme from '../scheme/location';
import { createLocation } from '../../function';

export default function AddLocationPopUp({setShowAddPopUp}) {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [sendText, setSendText] = useState("Create");
    const {user: {uid, email}, dispatch} = useAuthContext();

    const handleClose = ()=> setShowAddPopUp(false);

    const handleCreate = async ()=>{
        let payload = {
            ...LocationScheme,
            locationName: name,
            locationDesc: desc,
            uid
        };

        // handle upload
        setSendText("creating, please wait")
        const {status, error} = await createLocation(payload)
        if(!status){
            alert('an error occurred');
            console.log(error)
            return 
        }

        handleClose();

    }

    return (
        <div>
            <Modal okText={sendText} title="Add Location" open={true} onOk={()=>handleCreate()} onCancel={()=>{handleClose()}}>
                <Input value={name} onChange={e=> setName(e.target.value)} placeholder='Enter Location Name' />
                <p />
                <Input value={desc} onChange={e=> setDesc(e.target.value)} placeholder='Enter Location Description' multiple />
        </Modal>
        </div>
    )
}