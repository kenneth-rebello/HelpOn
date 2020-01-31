import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Button, Drawer, List, ListItem, Grid, MenuItem, Menu } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import { unsetCurrentUser } from '../../actions/user.action';
import Logo from '../../icons/help.svg'

const styles = {
    navbar:{
        backgroundColor:'dodgerblue'
    },
    drawer:{
        minWidth: '300px',
    },
    sidenav:{
        height:'100%',
        width:'30%'
    },
    brand:{
        color: 'whitesmoke',
        fontSize:'2rem',
        fontFamily: 'Roboto',
        textDecoration:'none',
        fontWeight:'bolder',
        padding:'1rem'
    },
    logo:{
        height:'3rem',
        width:'3rem'
    },
    username:{
        padding:'1rem',
        fontSize:'1.1rem',
        color:'ghostwhite'
    },
    icon:{
        marginRight:'2rem',
        fontSize:'2.2rem',
        color: 'whitesmoke'
    }
}

const Navbar = ({currentUser, registered, unsetCurrentUser}) => {
    
    const [menu, toggleMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [size, setSize] = useState(1000);
    const [drawer, toggleDrawer] = useState(false)

    useEffect(()=>{
        setSize(window.innerWidth);
        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
        }
    },[])

    const updateSize = () => {
        setSize(window.innerWidth)
    }

    const handleClose = () => {
        toggleMenu(false);
        setAnchorEl(null);
    }

    const handleClick = (event) => {
        toggleMenu(true);
        setAnchorEl(event.currentTarget);
    }

    const handleLogout = () => {
        auth.signOut();
        unsetCurrentUser();
        toggleMenu(false);
        setAnchorEl(null);
    }

    return(
        <div>
            {size > 800 ? 
            <div>
                <AppBar position="fixed" style={styles.navbar}>
                    <Toolbar>
                        <Grid container>
                            <Grid item sm={9}>
                                <Link to="/" style={styles.brand}>
                                    <img style={styles.logo} src={Logo}/> Help On
                                </Link>
                            </Grid>
                            <Grid item sm={3}>
                                {currentUser ?
                                <Fragment>
                                    <Button style={styles.username} 
                                    aria-controls="simple-menu" aria-haspopup="true" 
                                    onClick={handleClick}>
                                        {currentUser.name ? currentUser.name : currentUser.phoneNumber}
                                    </Button>
                                    <Menu
                                        id="simple-menu"
                                        keepMounted
                                        anchorEl={anchorEl}
                                        open={menu}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <Link to={`/account/${currentUser.id}`}>
                                                Account
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link to={`/register`}>
                                                {registered ? "Edit Details" : "Register"}
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </Fragment>: <span></span>}
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar> 
            </div>
            
            :

            <div>
                <AppBar position="fixed" style={styles.navbar}>
                    <Toolbar>
                        <Button onClick={()=>toggleDrawer(true)}>
                            <span><Menu style={styles.icon}/></span>
                            <Link to="/" style={styles.brand}>Help On</Link>
                        </Button>    
                    </Toolbar>    
                </AppBar>    
                <Drawer open={drawer} onClose={()=>toggleDrawer(false)}>
                    <List style={styles.drawer}>
                        <ListItem>
                            Home
                        </ListItem>
                    </List>
                </Drawer>
            </div>}
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    registered: state.user.registered
})

export default connect(mapStateToProps, { unsetCurrentUser })(Navbar);