import React, { ReactNode } from 'react';
import RepoComponent from './repo_components';
import { graphql } from 'react-apollo';
import query from '../graphql_query';

// interface PrivateRouteProps {
// 	navigation: any;
// 	// any other props that come into the component
// }

const Repo = ({
	navigation: {
		state: {
			params: { username },
		},
	},
}) => {
	return <RepoDetail username={username} />; // pass route prarams as props to be used in graphql HoC wrapper
};

const RepoDetail = graphql(query.fetchRepo, {
	options: ({ username }) => ({ variables: { login: username } }),
})(RepoComponent);

export default Repo;
