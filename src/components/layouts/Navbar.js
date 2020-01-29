import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Drawer, List, ListItem } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const styles = {
    navbar:{
        backgroundColor:'dodgerblue'
    },
    drawer:{
        minWidth: '300px',
    },
    brand:{
        color: 'whitesmoke',
        fontSize:'2rem',
        fontFamily: 'Roboto',
        textDecoration:'none',
        fontWeight:'bolder'
    },
    icon:{
        marginRight:'2rem',
        fontSize:'2.2rem',
        color: 'whitesmoke'
    }
}

const Navbar = () => {
    
    const [size, setSize] = useState(1000);
    const [drawer, toggleDrawer] = useState(false)

    useEffect(()=>{
        setSize(window.innerWidth);
        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize')
        }
    },[])

    const updateSize = () => {
        setSize(window.innerWidth)
    }

    return(
        <div>
            {size > 800 ? 
            
            <AppBar position="fixed" style={styles.navbar}>
                <Toolbar>
                    <Link to="/" style={styles.brand}>Help On</Link>
                </Toolbar>
            </AppBar> 
            
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

export default Navbar;