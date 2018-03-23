import User from '../../models/User';
import Repository from '../../models/Repository';
import { actionTypes } from './actions';

// tslint:disable-next-line:interface-over-type-literal
export type UsersMap = {
  [key: string]: User;
};

export interface IUsersState {
    users: UsersMap,
    user?: User,
    userDetailsLoadInProgress: boolean,
    error?: string,
}

const initialState: IUsersState = {
    users: {},
    user: undefined,
    error: undefined,
    userDetailsLoadInProgress: false,
};

const handleUserDetailsReady = (state: IUsersState, user: User): IUsersState => {
    return {
        ...state,
        user,
        error: undefined,
        userDetailsLoadInProgress: false,
        users: {
            ...state.users,
            [user.loginName]: user,
        },
    };
};

const handleUserStarredReady = (
    state: IUsersState,
    { username, repos }: { username: string, repos: Repository[] }): IUsersState => {
    if (state.users[username]) {
        const user = User.clone(state.users[username]);
        user.assignStarredRepos(repos);
        return {
            ...state,
            user,
            users: {
                ...state.users,
                [username]: user,
            },
        };
    }
    return state;
};

const handleUserFollowingReady = (
    state: IUsersState,
    { username, users }: { username: string, users: User[] }): IUsersState => {
    if (state.users[username]) {
        const user = User.clone(state.users[username]);
        user.assignFollowing(users);
        return {
            ...state,
            user,
            users: {
                ...state.users,
                [username]: user,
            },
        };
    }
    return state;
};

const handleUserFollowersReady = (
    state: IUsersState,
    { username, users }: { username: string, users: User[] }): IUsersState => {
    if (state.users[username]) {
        const user = User.clone(state.users[username]);
        user.assignFollowers(users);
        return {
            ...state,
            user,
            users: {
                ...state.users,
                [username]: user,
            },
        };
    }
    return state;
};

export default (state: IUsersState = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_BY_NAME_PENDING:
            return { ...state, userDetailsLoadInProgress: true };
        case actionTypes.GET_BY_NAME_REJECTED:
            return { ...state, userDetailsLoadInProgress: false, user: null, error: 'Uknown user' };
        case actionTypes.GET_BY_NAME_FULFILLED:
            return handleUserDetailsReady(state, action.payload);
        case actionTypes.FETCH_USER_STARRED_FULFILLED:
            return handleUserStarredReady(state, action.payload);
        case actionTypes.FETCH_USER_FOLLOWING_FULFILLED:
            return handleUserFollowingReady(state, action.payload);
        case actionTypes.FETCH_USER_FOLLOWERS_FULFILLED:
            return handleUserFollowersReady(state, action.payload);
        default:
            return state;
    }
};
