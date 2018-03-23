import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerForBrowser, State as RouterState } from 'redux-little-router';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import Routes, { ReduxRoutesConfig } from '../routing/Routes';
import usersReducer, { IUsersState } from './users/reducer';

const reduxStoreConfigurator = () => {
  const reduxRouteConfig = routerForBrowser({ routes: ReduxRoutesConfig });

  const middlewares = [reduxRouteConfig.middleware, thunkMiddleware, promiseMiddleware()];
  const appReducers = combineReducers({
    router: reduxRouteConfig.reducer,
    users: usersReducer,
  });

  const enhancer = composeWithDevTools(reduxRouteConfig.enhancer, applyMiddleware(...middlewares));
  return createStore(appReducers, {}, enhancer);
};

export const storageInstance: any = reduxStoreConfigurator();

export default interface IApp extends RouterState {
    users: IUsersState,
}
