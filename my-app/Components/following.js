/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import { graphql } from 'react-apollo';
import FollowingComponent from './following_components';
import query from '../query_help';

const Following = ({
  navigation: {
    state: {
      params: { username },
    },
    navigate,
  },
}) => <FollowingDetail username={username} navigate={navigate} />;

export const FollowingDetail = graphql(
  query.fetchUser,
  {
    options: ({ username }) => ({ variables: { login: username } }),
  },
)(FollowingComponent);

export default Following;
