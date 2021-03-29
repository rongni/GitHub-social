/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import { graphql } from 'react-apollo';
import ProfileComponent from './profile_components';
import query from '../query_help';

const Profile = ({
  navigation: {
    state: {
      params: { username },
    },
    navigate,
  },
}) => <ProfileDetail username={username} navigate={navigate} />;
// pass route prarams as props to be used in graphql HoC wrapper

export const ProfileDetail = graphql(query.fetchUser, {
  options: ({ username }) => ({ variables: { login: username } }),
})(ProfileComponent);

export default Profile;
