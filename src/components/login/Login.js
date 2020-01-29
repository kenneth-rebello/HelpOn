import React, { useEffect, useState } from 'react'
import { Box, TextField, Grid, Button } from '@material-ui/core'
import firebase from '../../firebase/firebase.utils'

const styles = {
    box:{
        backgroundColor: 'whitesmoke',
        width:'80%',
        margin:'auto',
        marginTop:'6rem',
        display:'grid',
        justifyItems:'center'
    },
    title:{
        color:'dodgerblue',
        fontFamily:'Open Sans',
        fontSize:'1.5rem'
    },
    formItem:{
        margin:'1rem'
    }
}

const Login = () => {

    const [formData, setFormData] = useState({
        phone:'',
        otp:''
    })

    useEffect(()=>{
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container",
        {
            'size': 'normal',
            'callback': function(response) {
                //
            }
        });
        window.recaptchaVerifier.render().then(function (widgetId) {
            window.recaptchaWidgetId = widgetId;
        });
        
    },[])


    const RequestOTP = e => {
        const phoneNumber = formData.phone;
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                console.log(confirmationResult)
            window.confirmationResult = confirmationResult;
            }).catch(function (error) {
                console.log(error)
            });
    }

    const Submitter = e => {

    }

    const Changer = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const {phone, otp} = formData;

    return (
        <div>
             <Box style={styles.box}>
                <form>
                    <Grid container justify="center">
                        <h2 style={styles.title}>Login using mobile number</h2>
                        <Grid item sm={12} style={styles.formItem}>
                            <TextField id="number" label="Phone Number" required value={phone} onChange={e=>Changer(e)} name="phone"/>
                        </Grid>
                        <Grid item sm={12} style={styles.formItem}>
                            <Button variant="outlined" color="secondary" onClick={e=>RequestOTP()}>Request OTP</Button>
                        </Grid>
                        <Grid item sm={12} style={styles.formItem}>
                            <TextField name="opt" label="OTP" required value={otp} onChange={e=>Changer(e)}/>
                        </Grid>
                        <Grid item sm={12} style={styles.formItem}>
                            <div id="recaptcha-container"></div>
                        </Grid>
                        <Grid item sm={12} style={styles.formItem}>
                            <Button variant="outlined" color="primary" onClick={e=>Submitter(e)}>Submit</Button>
                        </Grid>
                    </Grid>
                </form>
             </Box>
        </div>
    )
}

export default Login