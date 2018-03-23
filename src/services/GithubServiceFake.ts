// tslint:disable:no-require-imports no-var-requires prefer-function-over-method
import User from '../models/User';
import Repository from '../models/Repository';
import IGithubService from './IGithubService';

const fakeUser = require('./user.fake.json');
const fakeStarred = require('./starred.fake.json');
const fakeFollowing = require('./user.following.fake.json');
const fakeFollowers = require('./user.followers.fake.json');

class GithubService implements IGithubService {
  getUserStarred(username: string): Promise<Repository[]> {
    const repos = fakeStarred.map(Repository.map);
    return Promise.resolve(repos);
  }
  getUserFollowing(username: string): Promise<User[]> {
    const users = fakeFollowing.map(User.map);
    return Promise.resolve([users]);
  }
  getUserFollowers(username: string): Promise<User[]> {
    const users = fakeFollowers.map(User.map);
    return Promise.resolve(users);
  }
  getUserByName = (username): Promise<User> => {
    if (username === 'unknown') {
      return Promise.reject(username);
    }
    const user = User.map(fakeUser);
    return Promise.resolve(user);
  }
}

export default new GithubService();
