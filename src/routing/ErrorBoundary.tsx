// tslint:disable:prefer-function-over-method
import * as React from 'react';

export default class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    // tslint:disable-next-line:no-console
    console.error(error, info);
  }

  render() {
    return this.props.children;
  }
}
