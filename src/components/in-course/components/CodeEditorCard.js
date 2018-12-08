import React from 'react';
import { first } from 'lodash'
import { CardContent, Divider, Button, CardHeader, Card, CardActions } from '@material-ui/core';
import Editor from './Editor';


export default function CodeEditorCard({ executeStage, updateFile, files }) {

    const stageFile = first(Object.keys(files).map(key => files[key]));

    return (<Card >
        <CardHeader title={`editor ${stageFile.path}`}></CardHeader>
        <CardContent >
            <Editor {...stageFile} fileKey={stageFile.key} onChange={updateFile} onEnterPressed={executeStage} />
        </CardContent>
        <Divider></Divider>
        <CardActions>
            <Button onClick={executeStage} color={"primary"} variant={"outlined"}>Run</Button>
            <Button color={"secondary"} variant={"outlined"}>Reset</Button>
        </CardActions>
    </Card>)
}
