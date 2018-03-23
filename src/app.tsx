import 'semantic-ui-css/semantic.min.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { initializeCurrentLocation } from 'redux-little-router';

import ErrorBoundary from './routing/ErrorBoundary';
import { storageInstance } from './redux/storage';

const initialLocation = storageInstance.getState().router;
if (initialLocation) {
  storageInstance.dispatch(initializeCurrentLocation(initialLocation));
}

const render = () => {
  // tslint:disable-next-line:no-require-imports
  const AppRouter = require('./routing/AppRouter').default;
  ReactDOM.render(
    <AppContainer>
      <ErrorBoundary>
        <Provider store={storageInstance}>
          <AppRouter />
        </Provider>
      </ErrorBoundary>
    </AppContainer>,
    document.getElementById('app'),
  );
};

if (module.hot) {
  module.hot.accept('./routing/AppRouter', render);
}

render();
