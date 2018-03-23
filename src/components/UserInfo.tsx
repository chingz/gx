import * as React from 'react';
import * as UI from 'semantic-ui-react';
import User from '../models/User';

export default class UserInfo extends React.Component<{ user: User }> {
  render() {
    const user = this.props.user;
    return (
      <UI.Item.Group>
        <UI.Item>
          <UI.Item.Image size="tiny" src={user.avatarUrl} />
          <UI.Item.Content>
            <UI.Item.Header>
              {user.loginName}
              {user.name && <span>&nbsp;({user.name})</span>}
            </UI.Item.Header>
            {user.email && <UI.Item.Meta>{user.email}</UI.Item.Meta>}
            {user.biography && <UI.Item.Extra>{user.biography}</UI.Item.Extra>}
          </UI.Item.Content>
        </UI.Item>
      </UI.Item.Group>
    );
  }
}
