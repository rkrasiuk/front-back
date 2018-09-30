import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

class Input extends Component {
  static propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  };

  static defaultProps = {
    type: 'text',
    className: '',
    onChange: () => null,
    placeholder: '',
    value: '',
  };

  render() {
    const {onChange, className, ...rest} = this.props;

    return (
      <div className={classnames('input', className)}>
        <input
          onChange={({target: {value}}) => onChange(value)}
          {...rest}
        />
      </div>
    );
  }
}

export default Input;
