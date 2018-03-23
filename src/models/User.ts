import Repository from './Repository';

export default class User {
    public static map(values: any): User {
        return new User(
            values.login,
            values.name,
            values.email,
            values.bio,
            values.html_url,
            values.avatar_url,
            values.followers,
            values.following,
        );
    }

    public static clone(user: User): User {
        return new User(
            user.loginName,
            user.name,
            user.email,
            user.biography,
            user.uri,
            user.avatarUrl,
            user.followers,
            user.following,
            user.starredRepos,
            user.followingUsers,
            user.followersUsers,
        );
    }

    constructor(
        public loginName: string,
        public name: string,
        public email: string,
        public biography: string,
        public uri: string,
        public avatarUrl: string,
        public followers: number,
        public following: number,
        public starredRepos: Repository[] = [],
        public followingUsers: User[] = [],
        public followersUsers: User[] = [],
    ) { }

    public assignStarredRepos(starredRepos: Repository[]) {
        this.starredRepos = starredRepos;
        return this;
    }

    public assignFollowing(users: User[]) {
        this.followingUsers = users;
        return this;
    }

    public assignFollowers(users: User[]) {
        this.followersUsers = users;
        return this;
    }
}
