import React from 'react'
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo';
import Router from './Components/router'
import { GITHUB_ACCESS_TOKEN } from './config'


export default function App() {
  function createClient() {
    const httpLink = createHttpLink({ uri: 'https://api.github.com/graphql'})

    // apply widdleware to add access token to request
    let middlewareLink =  new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
        authorization : `Bearer ${GITHUB_ACCESS_TOKEN}`
        }
      })
      return forward(operation)
    })
    const link = middlewareLink.concat(httpLink)
    

    // Initialize Apollo Client with URL to our server
    return new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
    })
  }


  return (
    <ApolloProvider client={createClient()}>
      <Router />
    </ApolloProvider>
  )
}

