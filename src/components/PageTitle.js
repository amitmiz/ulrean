import React from 'react'
import { Typography, withStyles } from '@material-ui/core';


const styles = {
    header: {
        marginBottom: '40px'
    }
}

const PageTitle = ({ classes, children }) => (
    <Typography variant="h2" className={classes.header}>{children}</Typography>
)


export default withStyles(styles)(PageTitle)