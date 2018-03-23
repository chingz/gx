import * as React from 'react';
import * as UI from 'semantic-ui-react';
import { initializeCurrentLocation, Fragment } from 'redux-little-router';

import UserOverview from '../containers/UserOverview';
import UserStarredRepos from '../containers/UserStarredRepos';
import UserFollowers from '../containers/UserFollowers';
import UserFollowing from '../containers/UserFollowing';
import Routes from './Routes';

const checkRoute = (location) =>
  Object.values(Routes).every((route) => location.route !== route);

const renderUserOverviewRoutes = () => {
  return (
    <div>
      <UserOverview />
      <Fragment forRoute={Routes.Starred}>
        <UserStarredRepos />
      </Fragment>
      <Fragment forRoute={Routes.Following}>
        <UserFollowing />
      </Fragment>
      <Fragment forRoute={Routes.Followers}>
        <UserFollowers />
      </Fragment>
    </div>
  );
};

export default () => (
  <Fragment forRoute={Routes.Default}>
    <UI.Container text>
      <Fragment forRoute={Routes.Default}>
        {renderUserOverviewRoutes()}
      </Fragment>
      <Fragment forRoute={Routes.User}>
        {renderUserOverviewRoutes()}
      </Fragment>
    </UI.Container>
  </Fragment>
);

