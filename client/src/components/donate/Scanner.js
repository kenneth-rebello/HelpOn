import React, { useState } from 'react'
import QrReader from 'react-qr-reader';
import { FormControl, Select, TextField, Button } from '@material-ui/core';
import { getMemberName } from '../../firebase/firebase.utils';
import StripeButton from './StripeButton';

const styles={
    scanner:{
        display:'grid',
        justifyContent:'center',
        alignContent:'center',
        margin:'1rem'
    },
    container:{
        height:'360px',
        width:'360px'
    },
    formGroup:{
        padding:'1rem'
    },
    line:{
        color:'dodgerblue',
        fontWeight:'bold',
        fontSize:'1rem',
        padding:'0.3rem',
        fontFamily:'Open Sans'
    }
}

const Scanner = () => {

    const [formData, setFormData] = useState({
        user:'No QR detected yet',
        amount:''
    })
    const [done, setDone]  = useState(false);
    const [dataID, setData] = useState(null)

    const handleScan = async data => {
        if (data && !done) {
            setData(data)
            const name = await getMemberName(data);
            setFormData({
                ...formData,
                user: name
            })
            setDone(true)
        }
    }

    const Changer = e => {
        setFormData({
            ...formData,
            amount: e.target.value
        })
    }

    const handleError = err => {
        alert(err)
    }

    const Donate = () => {

    }

    return (
        <div style={styles.scanner}>
            <div style={styles.container}>
                <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                />
            </div>
            <p style={styles.line}>Donating to: {formData.user}</p>
            <FormControl fullWidth style={styles.formGroup}>
                <TextField onChange={e=>Changer(e)} value={formData.amount} label="Amount To Donate"/>
            </FormControl>
            <StripeButton price={formData.amount} user={dataID}/>
        </div>
    )
}

export default Scanner;