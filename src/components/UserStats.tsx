import * as React from 'react';
import * as UI from 'semantic-ui-react';
import User from '../models/User';
import CurrentTab from '../models/CurrentTab';

interface UserStatsProps {
  user: User,
  currentTab: CurrentTab,
  showUserStarred(),
  showUserFollowing(),
  showUserFollowers(),
}

export default class UserStats extends React.Component<UserStatsProps> {
  render() {
    const { user, currentTab } = this.props;
    return (
      <UI.Step.Group size="small" fluid>
        <UI.Step link active={currentTab === CurrentTab.STARRED} onClick={this.props.showUserStarred}>
          <UI.Icon name="star" />
          <UI.Step.Content>
            <UI.Step.Title>{user.starredRepos.length}</UI.Step.Title>
            <UI.Step.Description>Starred Repositories</UI.Step.Description>
          </UI.Step.Content>
        </UI.Step>
        <UI.Step link active={currentTab === CurrentTab.FOLLOWING} onClick={this.props.showUserFollowing}>
          <UI.Icon name="add user" />
          <UI.Step.Content>
            <UI.Step.Title>{user.following}</UI.Step.Title>
            <UI.Step.Description>Following</UI.Step.Description>
          </UI.Step.Content>
        </UI.Step>
        <UI.Step link active={currentTab === CurrentTab.FOLLOWERS} onClick={this.props.showUserFollowers}>
          <UI.Icon name="users" />
          <UI.Step.Content>
            <UI.Step.Title>{user.followers}</UI.Step.Title>
            <UI.Step.Description>Followers</UI.Step.Description>
          </UI.Step.Content>
        </UI.Step>
      </UI.Step.Group>
    );
  }
}
