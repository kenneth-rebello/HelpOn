import React from 'react';
import { List, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CropFreeIcon from '@material-ui/icons/CropFree';

const styles={
    container:{
        backgroundColor:'white',
        height:'100vh',
        width:'17vw',
        position:'fixed',
        border:'1px whitesmoke outset'
    },
    opt:{
        padding:'1%',
        fontWeight:'bold',
        fontSize:'1.2rem'
    }
}

const Sidenav = () => {
    return (
        <div style={styles.container}>
            <List>
                <ListItem>
                    <Link to="/" style={{color:'dodgerblue',...styles.opt}}>
                        <HomeIcon/>{` `}Home
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="/dashboard" style={{color:'#f94f53',...styles.opt}}>
                        <DashboardIcon/>{` `}Dashboard
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="/donate" style={{color:'#228b22',...styles.opt}}>
                        <CropFreeIcon/>{` `}Donate
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="/new-member" style={{color:'goldenrod',...styles.opt}}>
                        <CropFreeIcon/>{` `}New Member
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="/codes" style={{color:'black',...styles.opt}}>
                        <CropFreeIcon/>{` `}QR Codes
                    </Link>
                </ListItem>
            </List>
        </div>
    )
}

export default Sidenav