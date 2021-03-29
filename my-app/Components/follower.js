/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import { graphql } from 'react-apollo';
import FollowerComponent from './follower_components';
import query from '../query_help';

const Follower = ({
  navigation: {
    state: {
      params: { username },
    },
    navigate,
  },
}) => <FollowerDetail username={username} navigate={navigate} />;

export const FollowerDetail = graphql(
  query.fetchUser,
  {
    options: ({ username }) => ({ variables: { login: username } }),
  },
)(FollowerComponent);

export default Follower;
