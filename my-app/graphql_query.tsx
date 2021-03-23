import gql from 'graphql-tag'

const query = {
    fetchRepo: gql`
    query fetchUser($login: String!){
        user(login: $login) {
            login
            repositories(first: 50, isFork: false, orderBy: {field: STARGAZERS, direction: DESC}) {
                totalCount
                nodes {
                    owner{
                        login
                    }
                    nameWithOwner
                    name
                    description
                }
            }
        }
    }`,
    fetchUsers: gql`
    query fetchUsers($login: String!){
        search(type: USER, query: $login, first: 100) {
            edges {
                node {
                    ... on User{
                        login
                        name
                        bio
                        email
                        websiteUrl
                        createdAt
                        avatarUrl
                        following{
                            totalCount
                        }
                        followers {
                            totalCount
                        }
                        repositories(first: 50, isFork: false, orderBy: {field: STARGAZERS, direction: DESC}) {
                            totalCount
                            nodes {
                                owner{
                                    login
                                }
                                nameWithOwner
                                name
                                description
                            }
                        }
                    }
                }
            }
        }
    }` 
}

export default query