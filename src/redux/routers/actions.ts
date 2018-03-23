import { PUSH } from 'redux-little-router';
import Routes from '../../routing/Routes';

export const gotoDetails = (path: string) => {
    return (dispatch, getState) => {
        const loginName = getState().users.user.loginName;
        dispatch({
            type: PUSH,
            payload: {
                pathname: path.replace(':user', loginName),
                params: { user: loginName },
            },
        });
    };
};

export const gotoUser = (loginName: string) => ({
    type: PUSH,
    payload: {
        pathname: `${Routes.User}`.replace(':user', loginName),
        params: { user: loginName },
    },
});

export const gotoDefault = () => ({
    type: PUSH,
    payload: {
        pathname: Routes.Default,
        params: { user: null },
    },
});

export const showUserStarred = () => gotoDetails(`${Routes.User}${Routes.Starred}`);

export const showUserFollowing = () => gotoDetails(`${Routes.User}${Routes.Following}`);

export const showUserFollowers = () => gotoDetails(`${Routes.User}${Routes.Followers}`);
