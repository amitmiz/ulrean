import React from 'react';
import { first } from 'lodash'
import { CardContent, Divider, Button, CardHeader, Card, CardActions } from '@material-ui/core';
import Editor from './Editor';





export default class CodeEditorCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = { stageFile: null };

    }

    componentDidMount() {
        const { files } = this.props;


        this.setState(
            {
                stageFile: first(Object.keys(files).map(key => files[key]))
            }
        );
    }

    OCR(image) {
        const { updateFile } = this.props;
        const { stageFile } = this.state;
        // eslint-disable-next-line no-undef
        Tesseract.recognize(image)
            .then(job => {
                alert(job.text);
                updateFile({ key: stageFile.key, editorValue: job.text })

            })
            .catch(e => {

                console.log(e)
            })
            .progress(e => {
                console.log(e)
            })
    }

    render() {


        const { executeStage, updateFile, files } = this.props;
        const stageFile = first(Object.keys(files).map(key => files[key]))
        // const { stageFile } = this.state;

        return stageFile ?

            (<Card >
                <CardHeader title={`editor ${stageFile.path}`}></CardHeader>
                <CardContent >
                    <Editor {...stageFile} fileKey={stageFile.key} onChange={updateFile} onEnterPressed={executeStage} />
                </CardContent>
                <Divider variant="middle"></Divider>
                <CardActions>
                    <Button onClick={executeStage} color={"primary"} variant={"outlined"}>Run</Button>
                    <Button color={"secondary"} variant={"outlined"}>Reset</Button>

                    <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={e => this.OCR(e.target.files[0])}
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant={"outlined"} component="span" >
                            OCR
                    </Button>
                    </label>

                </CardActions>
            </Card>) : <span>Loading</span>
    }
}


