import Routes from '../routing/Routes';
import CurrentTab from '../models/CurrentTab';
import User from '../models/User';
import Repository from '../models/Repository';
import IApp from './storage';

const getCurrentUser = (s: IApp): User => (s.users.user as User);
const isUserLoadingInProgress = (s: IApp) => s.users.userDetailsLoadInProgress;
const getErrorMessage = (s: IApp) => s.users.error;

const getCurrentUserRepos = (s: IApp): Repository[] => {
    const user = getCurrentUser(s);
    return user ? user.starredRepos : [];
};

const getCurrentUserFollowing = (s: IApp): User[] => {
    const user = getCurrentUser(s);
    return user ? user.followingUsers : [];
};

const getCurrentUserFollowers = (s: IApp): User[] => {
    const user = getCurrentUser(s);
    return user ? user.followersUsers : [];
};

const getCurrentTab = (s: IApp): CurrentTab => {
    if (s.router.result) {
        return (s.router.result as any).tabName;
    }
    return CurrentTab.NONE;
};

const slicers = {
    getCurrentUser,
    getErrorMessage,
    isUserLoadingInProgress,
    getCurrentUserRepos,
    getCurrentUserFollowing,
    getCurrentUserFollowers,
    getCurrentTab,
};

export default slicers;
