jest.useFakeTimers();
import React from 'react';
import renderer from 'react-test-renderer';
import Home from './Components/home';
import User from './Components/search.js';
import Repo from './Components/repo';
import {FollowingDetail} from './Components/following';
import {FollowerDetail} from './Components/follower';
import{ProfileDetail} from './Components/profile';
import ProfileComponent from './Components/profile_components';
import RepoComponent from './Components/repo_components';
import { rerender, fireEvent,waitFor } from 'react-native-testing-library';
import fetch from 'node-fetch';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import FollowerComponent from './Components/follower_components'
import FollowingComponent from './Components/following_components'
// import Router from './Components/router';
import { GITHUB_ACCESS_TOKEN } from './config';
import { withNavigation } from 'react-navigation';
jest.mock('react-navigation', () => ({ withNavigation: (component) => component }));
const navigation = { navigate: jest.fn() };
const navigation_two = {
	state: {
		params: { username: 'rongni' },
	},
};
const navigation_param = {
	username : 'Gregg',
	navigation: { 
		navigate: jest.fn() },

};
const navigation_param_two = {
	data:{error:{message:'NetworkError'}},
	navigation: { 
		navigate: jest.fn() },

};
function createClient() {
	const httpLink = createHttpLink({
		uri: 'https://api.github.com/graphql',
		fetch,
	});

	// apply widdleware to add access token to request
	let middlewareLink = new ApolloLink((operation, forward) => {
		operation.setContext({
			headers: {
				authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
			},
		});
		return forward(operation);
	});
	const link = middlewareLink.concat(httpLink);

	// Initialize Apollo Client with URL to our server
	return new ApolloClient({
		link: link,
		cache: new InMemoryCache(),
	});
}
it('renders correctly', () => {
	const componenttwo = renderer.create(
	  <ApolloProvider client={createClient()}>
		<FollowerDetail {...navigation_param} />
	  </ApolloProvider>,
	);
  
	const rendered = componenttwo.toJSON();
	expect(rendered).toMatchSnapshot();
  });
it('renders correctly', () => {
	const componenttwo = renderer.create(
	  <ApolloProvider client={createClient()}>
		<FollowingDetail {...navigation_param} />
	  </ApolloProvider>,
	);
  
	const rendered = componenttwo.toJSON();
	expect(rendered).toMatchSnapshot();
  });
  it('renders correctly', () => {
	const componenttwo = renderer.create(
	  <ApolloProvider client={createClient()}>
		<ProfileDetail {...navigation_param} />
	  </ApolloProvider>,
	);
  
	const rendered = componenttwo.toJSON();
	expect(rendered).toMatchSnapshot();
  });

it('renders correctly', () => {
	const component = renderer.create(
		<ApolloProvider client={createClient()}>
			<Repo navigation={navigation_two} />
		</ApolloProvider>
	);

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
it('renders correctly', () => {
	const component = renderer.create(
		<ApolloProvider client={createClient()}>
			<User searchQuery='rongni' navigation={navigation} />
		</ApolloProvider>
	);

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

it('renders correctly', () => {
	const rendered = renderer.create(<Home navigation={navigation} />).toJSON();
	expect(rendered).toMatchSnapshot();
});


describe('<Home />', () => {
	it('has 2 child', () => {
		const tree = renderer.create(<Home navigation={navigation} />).toJSON();
		expect(tree.children.length).toBe(2);
	});
});

describe('<User />', () => {
	it('has 1 child', () => {
		const tree = renderer
			.create(
				<ApolloProvider client={createClient()}>
					<User searchQuery='rongni' navigation={navigation} />
				</ApolloProvider>
			)
			.toJSON();
		expect(tree.children.length).toBe(1);
	});
});
describe('<Repo />', () => {
	it('has 1 child', () => {
		const tree = renderer
			.create(
				<ApolloProvider client={createClient()}>
					<Repo navigation={navigation_two} />
				</ApolloProvider>
			)
			.toJSON();
		expect(tree.children.length).toBe(1);
	});
});

describe('<User />', () => {
	it('loading', () => {
		const tree = renderer
			.create(
				<ApolloProvider client={createClient()}>
					<User searchQuery='rongni' navigation={navigation} />
				</ApolloProvider>
			)
			.toJSON();
		expect(tree.children).toStrictEqual(['fetching posts... ']);
	});
});

describe('<Repository />', () => {
	it('loading ', () => {
		const tree = renderer
			.create(
				<ApolloProvider client={createClient()}>
					<Repo navigation={navigation_two} />
				</ApolloProvider>
			)
			.toJSON();
		expect(tree.children).toStrictEqual(['fetching posts... ']);
	});
});
// test('should verify two questions',async () => {
// 	const {getByTestId} = rerender(
// 	<ApolloProvider client={createClient()}>
// 	<FollowerDetail {...navigation_param} />
//   </ApolloProvider>,)

// 	const onPressMock = jest.fn();
// 	// await waitFor(() => getByTestId("test"));
// 	fireEvent.press(getByTestId("test"));
   
// 	expect(navigation_param).toHaveBeenCalledWith('ProfileDetail');
//   });
describe('<FollowerError />', () => {
	it('error', () => {
		const tree = renderer
			.create(
				
					<FollowerComponent {...navigation_param_two} />
				
			)
			.toJSON();
		expect(tree.children).toStrictEqual(['NetworkError']);
	});
});
describe('<FollowingError />', () => {
	it('error', () => {
		const tree = renderer
			.create(
				
					<FollowingComponent {...navigation_param_two} />
				
			)
			.toJSON();
		expect(tree.children).toStrictEqual(['NetworkError']);
	});
});
describe('<ProfileError />', () => {
	it('error', () => {
		const tree = renderer
			.create(
				
					<ProfileComponent {...navigation_param_two} />
				
			)
			.toJSON();
		expect(tree.children).toStrictEqual(['NetworkError']);
	});
});
describe('<RepoError />', () => {
	it('error', () => {
		const tree = renderer
			.create(
				
					<RepoComponent {...navigation_param_two} />
				
			)
			.toJSON();
		expect(tree.children).toStrictEqual(['NetworkError']);
	});
});
