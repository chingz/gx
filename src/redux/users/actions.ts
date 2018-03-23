import { Dispatch } from 'redux';

import { gotoUser, showUserStarred } from '../routers/actions';
import githubService from '../../services/GithubService';

export const actionTypes = {
    GET_BY_NAME: '[USERS] GET_BY_NAME',
    GET_BY_NAME_PENDING: '[USERS] GET_BY_NAME_PENDING',
    GET_BY_NAME_FULFILLED: '[USERS] GET_BY_NAME_FULFILLED',
    GET_BY_NAME_REJECTED: '[USERS] GET_BY_NAME_REJECTED',

    FETCH_USER_STARRED: '[USERS] FETCH_USER_STARRED',
    FETCH_USER_STARRED_PENDING: '[USERS] FETCH_USER_STARRED_PENDING',
    FETCH_USER_STARRED_FULFILLED: '[USERS] FETCH_USER_STARRED_FULFILLED',
    FETCH_USER_STARRED_REJECTED: '[USERS] FETCH_USER_STARRED_REJECTED',

    FETCH_USER_FOLLOWING: '[USERS] FETCH_USER_FOLLOWING',
    FETCH_USER_FOLLOWING_PENDING: '[USERS] FETCH_USER_FOLLOWING_PENDING',
    FETCH_USER_FOLLOWING_FULFILLED: '[USERS] FETCH_USER_FOLLOWING_FULFILLED',
    FETCH_USER_FOLLOWING_REJECTED: '[USERS] FETCH_USER_FOLLOWING_REJECTED',

    FETCH_USER_FOLLOWERS: '[USERS] FETCH_USER_FOLLOWERS',
    FETCH_USER_FOLLOWERS_PENDING: '[USERS] FETCH_USER_FOLLOWERS_PENDING',
    FETCH_USER_FOLLOWERS_FULFILLED: '[USERS] FETCH_USER_FOLLOWERS_FULFILLED',
    FETCH_USER_FOLLOWERS_REJECTED: '[USERS] FETCH_USER_FOLLOWERS_REJECTED',
};

export const getUserByName = (username) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.GET_BY_NAME_PENDING });
        githubService.getUserByName(username)
            .then((user) => Promise.all([
                dispatch({ type: actionTypes.GET_BY_NAME_FULFILLED, payload: user }),
                dispatch(gotoUser(user.loginName)),
                dispatch(showUserStarred()),
                dispatch(fetchUserStarred(user.loginName)),
                dispatch(fetchUserFollowing(user.loginName)),
                dispatch(fetchUserFollowers(user.loginName)),
            ]))
            .catch((err) => Promise.all([
                dispatch({ type: actionTypes.GET_BY_NAME_REJECTED }),
            ]));
    };
};

export const fetchUserStarred = (username) => {
    return {
        type: actionTypes.FETCH_USER_STARRED,
        payload: githubService.getUserStarred(username)
            .then((repos) => ({ username, repos })),
    };
};

export const fetchUserFollowing = (username) => {
    return {
        type: actionTypes.FETCH_USER_FOLLOWING,
        payload: githubService.getUserFollowing(username)
            .then((users) => ({ username, users })),
    };
};

export const fetchUserFollowers = (username) => {
    return {
        type: actionTypes.FETCH_USER_FOLLOWERS,
        payload: githubService.getUserFollowers(username)
            .then((users) => ({ username, users })),
    };
};
