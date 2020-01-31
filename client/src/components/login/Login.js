import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { Box, TextField, Grid, Button, FormControl } from '@material-ui/core';
import firebase from '../../firebase/firebase.utils';

const styles = {
    box:{
        backgroundColor: 'ghostwhite',
        width:'80%',
        margin:'auto',
        marginTop:'6rem',
        display:'grid',
        justifyItems:'center',
        borderRadius:'25px'
    },
    title:{
        color:'dodgerblue',
        fontFamily:'Open Sans',
        fontSize:'1.5rem',
        fontWeight:'bold',
        padding:'1%'
    },
    formItem:{
        margin:'1rem'
    },
    note:{
        color:'dimgray',
        fontSize:'0.9rem'
    }
}

const Login = ({history, currentUser}) => {

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

    useEffect(()=>{
        if(currentUser){
            history.push('/dashboard')
        }
    },[currentUser])


    const RequestOTP = e => {
        const phoneNumber = formData.phone;
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                window.confirmationResult = confirmationResult;
            }).catch(function (error) {
                console.log(error)
            });
    }

    const Submitter = e => {

        const code = formData.otp

        const credential = firebase.auth.PhoneAuthProvider.credential(window.confirmationResult.verificationId, code);

        firebase.auth().signInWithCredential(credential);
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
                            <FormControl fullWidth>
                            <TextField label="Phone Number" required value={phone} onChange={e=>Changer(e)} name="phone"/>
                            <span style={styles.note}>*Use country code (Example - India: +91)</span>
                            </FormControl>
                        </Grid>
                        <Grid item sm={12} style={styles.formItem}>
                            <div id="recaptcha-container"></div>
                        </Grid>
                        <Grid item sm={12} style={styles.formItem}>
                            <Button variant="outlined" color="secondary" onClick={e=>RequestOTP()}>Request OTP</Button>
                        </Grid>
                        <Grid item sm={12} style={styles.formItem}>
                            <FormControl fullWidth>
                            <TextField name="otp" label="OTP" required value={otp} onChange={e=>Changer(e)}/>
                            </FormControl>
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

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Login);