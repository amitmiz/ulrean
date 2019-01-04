import React from 'react'
import { Typography } from '@material-ui/core';

export function Logo() {
    return (
        <Typography
            variant="h5"
            color="inherit"
            style={{
                fontStyle: 'italic',
                fontWeight: '100',
            }} >
            ULEARN
        </Typography>
    )
}