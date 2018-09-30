import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.scss';

class Button extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    type: 'button',
    children: null,
    onClick: () => null,
  };

  render() {
    const {className, children, ...rest} = this.props;

    return (
      <button className={classnames('button', className)} {...rest}>
        {children}
      </button>
    );
  }
}

export default Button;
