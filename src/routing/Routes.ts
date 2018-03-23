import CurrentTab from '../models/CurrentTab';

const Routes = {
    Default: '/',
    User: '/user/:user',
    Starred: '/starred',
    Following: '/following',
    Followers: '/followers',
};

export const ReduxRoutesConfig = {
    [Routes.Default]: {
      title: 'Main',
      [Routes.User]: {
        title: 'User Info',
        [Routes.Starred]: {
          title: 'User Starred Repositories',
          tabName: CurrentTab.STARRED,
        },
        [Routes.Following]: {
          title: 'User Following',
          tabName: CurrentTab.FOLLOWING,
        },
        [Routes.Followers]: {
          title: 'User Followers',
          tabName: CurrentTab.FOLLOWERS,
        },
      },
    },
  };

export default Routes;
