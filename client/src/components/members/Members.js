import React, { useEffect, useState } from 'react'
import { getMembers } from '../../firebase/firebase.utils'
import { Grid, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import QRCode from 'qrcode.react';

const styles = {
    container:{
        padding:'1rem'
    }
}

const Members = () => {

    useEffect(async()=>{
        const members = await getMembers();
        console.log(members)
        setOptions(members)
    },[])

    const [member, setMember] = useState('');
    const [options, setOptions] = useState([]);

    const Changer = e => {
        setMember(e.target.value)
    }

    return (
        <div style={styles.container}>
            <Grid container>
                <Grid item sm={12}>
                    <FormControl fullWidth>
                        <InputLabel id="Member">Select Member</InputLabel>
                        <Select onChange={e=>Changer(e)} value={member} labelId="Member">
                            {options.map(opt => <MenuItem key={opt.id} value={opt.id}>{opt.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={12}>
                    <QRCode
                        id="qrcode"
                        value={member}
                        size={300}
                        level={"H"}
                        includeMargin={true}
                    />
                </Grid>
            </Grid>
        </div>
    )
}
 export default Members;