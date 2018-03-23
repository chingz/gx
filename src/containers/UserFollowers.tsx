import * as React from 'react';
import { List, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import slicers from '../redux/slicers';
import { getUserByName } from '../redux/users/actions';
import User from '../models/User';

const mapStateToProps = (state) => ({
  users: slicers.getCurrentUserFollowers(state),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUserByName }, dispatch);
};

interface UserFollowersProps {
    users: User[],
    getUserByName(username: string),
}

class UserFollowers extends React.Component<UserFollowersProps> {
    renderUser = (u: User) => {
        return (
            <List.Item key={u.loginName}>
                <Image src={u.avatarUrl} avatar />
                <List.Content>
                    <List.Header as="a" onClick={() => this.props.getUserByName(u.loginName)}>
                        {u.name || u.loginName}
                    </List.Header>
                </List.Content>
            </List.Item>
        );
    }

    render() {
        return (
            <List divided relaxed>
                {this.props.users.map(this.renderUser)}
            </List>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFollowers);
