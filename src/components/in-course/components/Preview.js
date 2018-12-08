import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './preview.css';

const mainId = 'fcc-main-frame';

const propTypes = {
  className: PropTypes.string,
  disableIframe: PropTypes.bool
};

class Preview extends PureComponent {
  constructor(...props) {
    super(...props);

    this.state = {
      iframeStatus: props.disableIframe
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.disableIframe !== prevProps.disableIframe) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ iframeStatus: !this.state.iframeStatus });
    }
  }

  render() {
    const iframeToggle = this.state.iframeStatus ? 'disable' : 'enable';
    return (
      <div className={`stage-preview ${iframeToggle}-iframe`}>
        <iframe className={'stage-preview-frame'} id={mainId} title='Stage Preview'/>
      </div>
    );
  }
}

Preview.displayName = 'Preview';
Preview.propTypes = propTypes;

export default Preview;
