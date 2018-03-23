import * as React from 'react';
import { List, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import slicers from '../redux/slicers';
import { getUserByName } from '../redux/users/actions';
import User from '../models/User';

const mapStateToProps = (state) => ({
  users: slicers.getCurrentUserFollowing(state),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUserByName }, dispatch);
};

interface UserFollowingProps {
    users: User[],
    getUserByName(username: string),
}

class UserFollowing extends React.Component<UserFollowingProps> {
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

export default connect(mapStateToProps, mapDispatchToProps)(UserFollowing);
