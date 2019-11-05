import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import MonacoEditor from 'react-monaco-editor';
import './classic.css';




const propTypes = {
  contents: PropTypes.string,
  dimensions: PropTypes.object,
  onEnterPressed: PropTypes.func.isRequired,
  ext: PropTypes.string,
  fileKey: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  darkTheme: PropTypes.bool
};


const modeMap = {
  css: 'css',
  html: 'html',
  js: 'javascript',
  jsx: 'javascript'
};

var monacoThemesDefined = false;


const defineMonacoThemes = monaco => {
  if (monacoThemesDefined) {
    return;
  }
  monacoThemesDefined = true;
  const yellowCollor = 'FFFF00';
  const lightBlueColor = '9CDCFE';
  const darkBlueColor = '00107E';
  monaco.editor.defineTheme('vs-dark-custom', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'delimiter.js', foreground: lightBlueColor },
      { token: 'delimiter.parenthesis.js', foreground: yellowCollor },
      { token: 'delimiter.array.js', foreground: yellowCollor },
      { token: 'delimiter.bracket.js', foreground: yellowCollor }
    ]
  });
  monaco.editor.defineTheme('vs-custom', {
    base: 'vs',
    inherit: true,
    rules: [{ token: 'identifier.js', foreground: darkBlueColor }]
  });
};

class Editor extends PureComponent {
  constructor(...props) {
    super(...props);

    this.options = {
      minimap: {
        enabled: false
      },
      automaticLayout: true,
      selectOnLineNumbers: true,
      wordWrap: 'on',
      scrollbar: {
        horizontal: 'hidden',
        vertical: 'visible',
        verticalHasArrows: true
      }
    };

    this._editor = null;
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.focusEditor);
  }

  editorWillMount = monaco => {
    defineMonacoThemes(monaco);
  };

  editorDidMount = (editor, monaco) => {
    this._editor = editor;
    this._editor.focus();

    document.addEventListener('keyup', this.focusEditor);

    if (this.props.onEnterPressed) {
      this._editor.addAction({
        id: 'execute-stage',
        label: 'Run tests',
        keybindings: [
          /* eslint-disable no-bitwise */
          monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter)
        ],
        run: this.props.onEnterPressed
      });
    }

  };

  focusEditor = e => {
    // e key to focus editor
    if (e.keyCode === 69) {
      this._editor.focus();
    }
  };

  onChange = editorValue => {
    const { onChange, fileKey } = this.props;
    onChange({ key: fileKey, editorValue });
  };

  componentDidUpdate(prevProps) {
    if (this.props.dimensions !== prevProps.dimensions && this._editor) {
      this._editor.layout();
    }
  }

  render() {
    const { contents, ext, fileKey, darkTheme } = this.props;

    const editorTheme = darkTheme ? 'vs-dark' : 'vs-custom'
    return (
      <div className='classic-editor editor'>
        <base href='/' />
        <MonacoEditor
          editorDidMount={this.editorDidMount}
          editorWillMount={this.editorWillMount}
          key={`${editorTheme}-${fileKey}`}
          language={modeMap[ext]}
          onChange={this.onChange}
          options={this.options}
          theme={editorTheme}
          value={contents}
          height="45vh"

        />
      </div>
    );
  }
}

Editor.displayName = 'Editor';
Editor.propTypes = propTypes;

export default Editor;