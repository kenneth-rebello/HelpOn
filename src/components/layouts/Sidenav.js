import React from 'react'
import { List, ListItem } from '@material-ui/core'
import { Link } from 'react-router-dom'

const styles={
    container:{
        backgroundColor:'white',
        height:'100vh',
        width:'17vw',
        position:'fixed',
        border:'1px whitesmoke outset'
    }
}

const Sidenav = () => {
    return (
        <div style={styles.container}>
            <List>
                <ListItem>
                    <Link to="/">Home</Link>
                </ListItem>
                <ListItem>
                    <Link to="/dashboard">Dashboard</Link>
                </ListItem>
            </List>
        </div>
    )
}

export default Sidenav