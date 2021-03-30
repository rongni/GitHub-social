import { graphql } from 'react-apollo';
import query from '../query_help';
import UserComponent from './search_components';

const User = graphql(query.fetchUsers, {
  options: ({ searchQuery }) => ({ variables: { login: searchQuery } }),
})(UserComponent);

export default User;
