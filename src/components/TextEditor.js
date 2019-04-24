import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React from 'react';

class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };
        this.setEditor = (editor) => {
            this.editor = editor;
        };
        this.focusEditor = () => {
            if (this.editor) {
                this.editor.focus();
            }
        };

        this.state = { editorState: EditorState.createEmpty() };
        this.onChange = (editorState) => {
            this.setState({ editorState })
            this.props.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        }


    }


    componentDidMount() {
        this.focusEditor();
    }

    render() {
        return (
            <div style={styles.editor} onClick={this.focusEditor}>
                <Editor
                    editorRef={this.setEditor}
                    editorState={this.state.editorState}
                    onEditorStateChange={this.onChange}
                    wrapperStyle={{
                        maxHeight: '45vh',
                        overflow: 'auto',
                    }}
                />
            </div>
        );
    }
}

const styles = {
    editor: {
        border: '1px solid gray',
        borderRadius: '8px',
        minHeight: '6em'
    }
};

export default TextEditor;