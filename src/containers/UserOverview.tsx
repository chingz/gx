import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UI from 'semantic-ui-react';

import IApplicationState from '../redux/storage';
import { getUserByName } from '../redux/users/actions';
import { showUserStarred, showUserFollowers, showUserFollowing } from '../redux/routers/actions';
import User from '../models/User';
import UserInfo from '../components/UserInfo';
import UserStats from '../components/UserStats';
import slicers from '../redux/slicers';
import CurrentTab from '../models/CurrentTab';

const mapStateToProps = (state: IApplicationState) => ({
  user: slicers.getCurrentUser(state),
  currentTab: slicers.getCurrentTab(state),
  userLookupError: slicers.getErrorMessage(state),
  username: state.router.params && state.router.params.user ? state.router.params.user : '',
  userDetailsLoadInProgress: slicers.isUserLoadingInProgress(state),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUserByName,
    showUserStarred,
    showUserFollowing,
    showUserFollowers,
  }, dispatch);
};


interface UserOverviewPropsFromState {
  user: User,
  username: string,
  currentTab: CurrentTab,
  userLookupError?: string,
  userDetailsLoadInProgress: boolean,
}

interface UserOverviewPropsFromDispatch {
    getUserByName(username: string),
    showUserStarred(),
    showUserFollowing(),
    showUserFollowers(),
}

interface UserOverviewState {
  username: string,
}

interface UserOverviewProps extends UserOverviewPropsFromState, UserOverviewPropsFromDispatch {}

class UserOverview extends React.Component<UserOverviewProps, UserOverviewState> {
  constructor(props: UserOverviewProps) {
    super(props);
    this.state = { username: props.username };
  }

  componentWillReceiveProps(props: UserOverviewProps) {
    if (this.state.username !== props.username) {
      this.setState({ username: props.username });
    }
  }

  handleUserSearchInputChanged = (_, data: UI.InputOnChangeData) => {
    this.setState({ username: data.value });
  }

  loadUserDetails = () => {
    this.props.getUserByName(this.state.username);
  }

  renderUserDetails() {
    const user = this.props.user;
    if (!user) {
      return null;
    }
    return (
      <div>
        <UI.Divider />
        <UserInfo user={user} />
        <UserStats
          user={user}
          currentTab={this.props.currentTab}
          showUserStarred={this.props.showUserStarred}
          showUserFollowing={this.props.showUserFollowing}
          showUserFollowers={this.props.showUserFollowers}
        />
      </div>
    );
  }

  renderSearchAction() {
    return (
      <UI.Button
        color="teal"
        disabled={!this.state.username}
        loading={this.props.userDetailsLoadInProgress}
        content="Search"
        onClick={this.loadUserDetails}
      />
    );
  }

  render() {
    return (
      <UI.Segment basic vertical>
        <UI.Input
          fluid
          value={this.state.username}
          icon="users"
          iconPosition="left"
          placeholder="Type github username..."
          onChange={this.handleUserSearchInputChanged}
          action={this.renderSearchAction()}
        />
        { this.props.userLookupError &&
          <UI.Label as="a" basic color="red" pointing>{this.props.userLookupError}</UI.Label>
        }
        {this.renderUserDetails()}
      </UI.Segment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOverview);
