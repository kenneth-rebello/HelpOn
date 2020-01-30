import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { Grid, Card, CardContent, Table, TableHead, Toolbar, TableCell, TableBody, TableRow } from '@material-ui/core'

const styles = {
    dashboard:{
        margin:0,
        padding:0,
        background: 'linear-gradient(to bottom, dodgerblue 0%,darkturquoise 30%,#000000 30%,white 30%,white 100%)'
    },
    card:{
        margin:'3%',
        backgroundColor:'ghostwhite'
    },
    cardTitle:{
        margin:'5%',
        fontFamily:'Open Sans',
        fontSize:'1.5rem',
        color:'lightslategray'
    },
    tableContainer:{
        margin:'1rem'
    },
    tableToolbar:{
        border:'1px gainsboro solid',
        backgroundColor:'white',
        borderRadius:'20px 20px 0px 0px'
    },
    tableTitle:{
        fontFamily:'Open Sans',
        color:'dimgray',
        fontSize:'1.2rem',
        fontWeight:700
    },
    headCell:{
        fontFamily:'Open Sans',
        fontSize:'1rem',
        fontWeight:'bold',
        backgroundColor:'ghostwhite',
        color:'darkgray'
    },
    bodyCell:{
        backgroundColor:'white',
        color:'dimgray'
    }
}

const headers = [
    'HELPED', 'AMOUNT', 'DATE'
]

const Dashboard = () => {

    const [dummy, setDummy] = useState([])

    const randomDate = (start, end) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
      
    const getDummy = async() => {
        let test = []
        const res = await axios.get('https://uinames.com/api/?amount=25');
        res.data.forEach((user,idx) => {
            test.push([])
            test[idx].push(user.name)
            test[idx].push((Math.random()*1000).toFixed(2))
            test[idx].push(randomDate(new Date(2012, 0, 1), new Date()))
        })
        setDummy(test)
    }

    useEffect(()=>{
        getDummy()
    },[])

    useEffect(()=>{
        // console.log(dummy)
    },[dummy])

    return (
        <div style={styles.dashboard}>
            <Grid container>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Card style={styles.card} variant="outlined">
                        <h2 style={styles.cardTitle}>Total Donation</h2>
                        <CardContent>
                            <p>Content</p>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Card style={styles.card} variant="outlined">
                        <h2 style={styles.cardTitle}>Donated Amount</h2>
                        <CardContent>
                            <p>Content</p>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Card style={styles.card} variant="outlined">
                        <h2 style={styles.cardTitle}>User Type</h2>
                        <CardContent>
                            <p>Content</p>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={8} style={styles.tableContainer}>
                    <Toolbar style={styles.tableToolbar} variant="dense">
                        <span style={styles.tableTitle}>Donation History</span>
                    </Toolbar>
                    <Table>
                        <TableHead>
                            {headers.map(head => <TableCell style={styles.headCell}>
                                {head}
                            </TableCell>)}
                        </TableHead>
                        <TableBody>
                            {dummy.map(data => <TableRow>
                                {data.map((user,idx)=> <TableCell style={styles.bodyCell}>
                                    {idx===2 ? <Moment format="DD/MM/YYYY">
                                        {user}
                                    </Moment> : user}
                                </TableCell>)}
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard;