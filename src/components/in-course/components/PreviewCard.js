import { Card, CardContent, CardHeader } from '@material-ui/core';
import React from 'react';
import Preview from './Preview';


const PreviewCard = () => (
    <Card>
        <CardHeader title="preview"></CardHeader>
        <CardContent style={{ height: '60vh' }}>
            <Preview className='full-height' />
        </CardContent>
    </Card>
)

export default PreviewCard;