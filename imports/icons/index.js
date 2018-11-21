/* eslint-disable max-len */
import React, {PureComponent} from 'react';

class Box extends PureComponent {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <svg version="1.1" id="Layer_1" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50">
        <rect x="2" y="4" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" width="46" height="10" />
        <path fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M4,14v33h42V14H4z   M32.502,25H17.498c-1.381,0-2.5-1.119-2.5-2.5s1.119-2.5,2.5-2.5h15.004c1.381,0,2.5,1.119,2.5,2.5S33.883,25,32.502,25z" />
      </svg>
    );
  }
}

export {Box};
