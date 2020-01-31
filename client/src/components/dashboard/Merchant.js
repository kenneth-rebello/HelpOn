import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Moment from 'react-moment';
import { Grid, Card, CardContent, Table, TableHead, Toolbar, TableCell, TableBody, TableRow } from '@material-ui/core'
import NumberFormat from 'react-number-format';

import ReceiptIcon from '../../icons/money.svg';
import UserIcon from '../../icons/user.svg';
import HelpIcon from '../../icons/value.svg';
import { Link } from 'react-router-dom';
import { mockProducts } from '../../mock/Mock';

const styles = {
    dashboard:{
        margin:0,
        padding:0,
        background: 'linear-gradient(to bottom, dodgerblue 0%,darkturquoise 30%,#000000 30%,white 30%,white 100%)'
    },
    icon:{
        height:'2.5rem',
        width:'2.5rem'
    },
    card:{
        margin:'3%',
        backgroundColor:'ghostwhite'
    },
    cardTitle:{
        margin:'5%',
        padding:0,
        fontFamily:'Open Sans',
        fontSize:'1.5rem',
        fontWeight:'bold'
    },
    cardData:{
        fontSize:'1.2rem',
        fontFamily:'Open Sans'
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
    'MEMBER', 'PRODUCT', 'AMOUNT', 'DATE'
]

const Merchant = ({history, currentUser}) => {

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
            test[idx].push(mockProducts[parseInt(Math.random()*mockProducts.length)])
            test[idx].push((Math.random()*100).toFixed(2))
            test[idx].push(randomDate(new Date(2012, 0, 1), new Date()))
        })
        setDummy(test)
    }

    useEffect(()=>{
        getDummy()
    },[])

    useEffect(()=>{
        if(currentUser && currentUser.type==="Merchant"){
            history.push('/merchant-dashboard')
        }
    },[currentUser])

    return (
        <div style={styles.dashboard}>
            <Grid container>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Card style={{color:'crimson',...styles.card}} variant="outlined">
                        <h2 style={styles.cardTitle}>
                            Members Registered <img style={styles.icon} src={HelpIcon}/>
                        </h2>
                        <CardContent>
                            <p style={styles.cardData}>
                                47
                            </p>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Card style={{color:'green', ...styles.card}} variant="outlined">
                        <h2 style={styles.cardTitle}>
                            Total Transactions <img style={styles.icon} src={ReceiptIcon}/>
                        </h2>
                        <CardContent>
                            <p style={styles.cardData}>
                                285
                            </p>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Card style={{color:'dodgerblue', ...styles.card}} variant="outlined">
                        <h2 style={styles.cardTitle}>
                            Account Type <img style={styles.icon} src={UserIcon}/>
                        </h2>
                        <CardContent>
                            <p style={styles.cardData}>
                                { currentUser && currentUser.type ? currentUser.type : <Link to="/register">
                                    Register Now
                                </Link>}
                            </p>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={8} style={styles.tableContainer}>
                    <Toolbar style={styles.tableToolbar} variant="dense">
                        <span style={styles.tableTitle}>Transaction History</span>
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
                                    {idx===3 ? <Moment format="DD/MM/YYYY">
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

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Merchant);