import User from '../models/User';
import Repository from '../models/Repository';

export default interface IGithubService {
    getUserByName(username: string): Promise<User>,
    getUserStarred(username: string): Promise<Repository[]>,
    getUserFollowing(username: string): Promise<User[]>,
    getUserFollowers(username: string): Promise<User[]>,
}
