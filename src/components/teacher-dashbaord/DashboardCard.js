import { Card, CardContent, CardHeader, Divider, withStyles } from '@material-ui/core';
import React from 'react';


const styles = {
    dashboardCard: {
        textAlign: 'center'
    }
}



const DashboardCard = ({ classes, title, children }) => (

    <div className={classes.dashboardCard}>
        <Card >
            <CardHeader title={title} titleTypographyProps={{ variant: "button" }} />
            <Divider />

            <CardContent>
                {children}
            </CardContent>

        </Card>
    </div>
)

export default withStyles(styles)(DashboardCard)