import { Card, CardContent, CardHeader, Divider, withStyles } from '@material-ui/core';
import React from 'react';


const styles = theme => ({
    dashboardCard: {
        // textAlign: 'center'
    },

    cardHead: {
        backgroundColor: theme.palette.primary.dark,
        color: 'white!important'
    },
    cardRoot : {
        backgroundColor:  theme.palette.grey['300'],
        minHeight: '100px'
    }
})



const DashboardCard = ({ classes, title, children }) => (

    <div className={classes.dashboardCard}>
        <Card >
            <CardHeader classes={{ title: classes.cardHead }} className={classes.cardHead} title={title} titleTypographyProps={{ variant: "button" }} />
            <Divider />

            <CardContent classes={{root:classes.cardRoot}} style={{textAlign: "center"}}>
                {children}
            </CardContent>

        </Card>
    </div>
)

export default withStyles(styles, { withTheme: true })(DashboardCard)