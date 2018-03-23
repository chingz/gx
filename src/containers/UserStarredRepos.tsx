import * as React from 'react';
import { List } from 'semantic-ui-react';
import { connect } from 'react-redux';
import slicers from '../redux/slicers';
import Repository from '../models/Repository';

const mapStateToProps = (state) => ({
  repos: slicers.getCurrentUserRepos(state),
});

class UserStarredRepos extends React.Component<{ repos: Array<Repository> }> {
    renderRepository = (r: Repository) => {
        return (
            <List.Item key={r.fullName}>
                <List.Icon name="github" size="large" verticalAlign="middle" />
                <List.Content>
                    <List.Header as="a">{r.fullName}</List.Header>
                    <List.Description as="a">Updated {r.getLastUpdate()}</List.Description>
                </List.Content>
            </List.Item>
        );
    }

    render() {
        return (
            <List divided relaxed>
                {this.props.repos.map(this.renderRepository)}
            </List>
        );
    }
}

export default connect(mapStateToProps)(UserStarredRepos);
