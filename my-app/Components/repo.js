/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import { graphql } from 'react-apollo';
import RepoComponent from './repo_components';
import query from '../query_help';

const Repo = ({
  navigation: {
    state: {
      params: { username },
    },
  },
}) => <RepoDetail username={username} />;
// pass route prarams as props to be used in graphql HoC wrapper

const RepoDetail = graphql(query.fetchRepo, {
  options: ({ username }) => ({ variables: { login: username } }),
})(RepoComponent);

export default Repo;
