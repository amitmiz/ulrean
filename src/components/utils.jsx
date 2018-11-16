import { Grid } from '@material-ui/core';
import React from 'react';


export const Container = (props) => {
    let { children, ...rest } = props;

    return <Grid  container {...rest} >{children} </Grid>
}

export const Item = (props) => {
    let { children, ...rest } = props;

    return <Grid item {...rest} >{children}</Grid>
}


export const Loading = (props) => "Loading.."