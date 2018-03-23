import * as rp from 'request-promise';
import User from '../models/User';
import Repository from '../models/Repository';
import IGithubService from './IGithubService';

class GithubService implements IGithubService {
  private baseUri = 'https://api.github.com';

  getUserByName(username): Promise<User> {
    return rp
      .get(`${this.baseUri}/users/${username}`)
      .then((response) => JSON.parse(response))
      .then((response) => User.map(response));
  }

  getUserStarred(username: string): Promise<Repository[]> {
    return rp
      .get(`${this.baseUri}/users/${username}/starred`)
      .then((response) => JSON.parse(response))
      .then((repos: any[]) => repos.map(Repository.map));
  }

  getUserFollowing(username: string): Promise<User[]> {
    return rp
      .get(`${this.baseUri}/users/${username}/following`)
      .then((response) => JSON.parse(response))
      .then((repos: any[]) => repos.map((u) => User.map(u)));
  }

  getUserFollowers(username: string): Promise<User[]> {
    return rp
      .get(`${this.baseUri}/users/${username}/followers`)
      .then((response) => JSON.parse(response))
      .then((repos: any[]) => repos.map((u) => User.map(u)));
  }
}

export default new GithubService();
