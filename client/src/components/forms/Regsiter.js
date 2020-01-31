import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import { updateUserProfile } from '../../firebase/firebase.utils';
import { setCurrentUser } from '../../actions/user.action';

const styles = {
    container:{
        padding:'1rem',
        background:'ghostwhite'
    },
    formGroup:{
        margin:'1rem'
    }
}

const Register = ({history, currentUser, setCurrentUser}) => {

    const [formData, setFormData] = useState({
        name:'',
        address:'',
        type:''
    });

    useEffect(()=>{
        if(currentUser) setFormData({
            name: currentUser.name ? currentUser.name : formData.name,
            address: currentUser.address ? currentUser.address : formData.address,
            type: currentUser.type ? currentUser.type : formData.type,
        })
    },[currentUser])

    const Changer = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const Submitter = async() => {
        const userRef = await updateUserProfile(formData, currentUser);
        userRef.onSnapshot(snapShot => {
            setCurrentUser({
                id: snapShot.id,
                ...snapShot.data()
            })
        });
        history.push('/')
    }

    const { name, address, type } = formData;

    return (
        <div style={styles.container}>
            <form>
                <Grid container>
                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <TextField label="Name" required value={name} onChange={e=>Changer(e)} style={styles.formGroup} name="name"/>
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl fullWidth> 
                            <TextField label="Address" required value={address} onChange={e=>Changer(e)} style={styles.formGroup} name="address"/>
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl fullWidth style={styles.formGroup}>
                            <InputLabel id="Type">Account Type</InputLabel>
                            <Select
                                name="type"
                                value={type}
                                onChange={e=>Changer(e)}
                                labelId="Type"
                            >
                                <MenuItem value={"Helper"}>Helper</MenuItem>
                                <MenuItem value={"Merchant"}>Merchant</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <Button variant="outlined" color="primary" onClick={()=>Submitter()} style={styles.formGroup}>Register</Button>                        
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps, { setCurrentUser })(Register);