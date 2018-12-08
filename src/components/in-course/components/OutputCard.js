import { Card } from '@material-ui/core';
import React from 'react';
import Output from './Output';
import decodeHTMLEntities from '../../../utils/decodeHTMLEntities';


const OutputCard = ({ output }) => (
    <Card>
        <Output height={200}
            defaultOutput={`/** \n* Your test output will go here.\n*/`} output={decodeHTMLEntities(output)} />
    </Card>
)

export default OutputCard;