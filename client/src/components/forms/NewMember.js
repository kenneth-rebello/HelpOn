import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Grid, FormControl, TextField, Button, Divider } from '@material-ui/core';
import { getMembers, addMember } from '../../firebase/firebase.utils';
import QRCode from 'qrcode.react';

const styles = {
    container:{
        padding:'2%'
    },
    title:{
        color:'dodgerblue',
        fontFamily:'Open Sans',
        fontSize:'1.2rem',
        display:'block'
    },
    subtitle:{
        color:'dimgray',
        fontFamily:'Open Sans',
        fontSize:'0.9rem',
        display:'block'
    },
    formGroup:{
        padding:'1%'
    }
}

let members = []
const NewMember = () => {

    const [ formData, setFormData] = useState({
        name:''
    });
    const [QR, setQR] = useState('');
    const [id, setId] = useState('');
    const [done, setDone] = useState(false)

    useEffect(async()=>{
        members = await getMembers();

        return ()=>{
            setQR('')
            setId('')
            setFormData({name:''})
            setDone(false)
        }
    },[])

    const Changer = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const Submitter = async e => {
        const ID = await addMember(formData);
        setQR(ID)
        setId(ID)
        setDone(true)
    }

    const downloadQR = () => {
        const canvas  = document.getElementById('qrcode');
        const pngURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.getElementById('download-link');
        downloadLink.href = pngURL;
        downloadLink.download = `${name}.png`;
        downloadLink.click();
    }

    const { name } = formData;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Register A New Member to the HelpOn Community</h2>
            <p style={styles.subtitle}>We currently cater to {members.length} members</p>
            <Divider/>
            <Grid container>
                <Grid item sm={12} style={styles.formGroup}>
                    <FormControl fullWidth>
                        <TextField onChange={e=>Changer(e)} value={name} name="name" label="Enter Name"/>
                    </FormControl>
                </Grid>
                <Grid item sm={12} style={styles.formGroup}>
                    <Button onClick={e=>Submitter(e)} variant="outlined" color="primary">
                        Register New Member
                    </Button>
                </Grid>
                {done && <Fragment>
                    <Grid item sm={6} justifyContent={"center"}>
                        
                            <QRCode
                                id="qrcode"
                                value={QR}
                                size={300}
                                level={"H"}
                                includeMargin={true}
                            />
                        
                    </Grid>
                    <Grid item sm={6}>
                        <p>Member added with id: {id}</p>
                        <p>Please print the adjacent QR Code and provide to HelpOn member</p>
                        <Button onClick={downloadQR} >Download QR Code</Button>
                        <a id="download-link" style={{display:'none'}} href="/generator">Hidden Anchor</a>
                    </Grid>
                </Fragment>}
            </Grid>
        </div>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(NewMember);