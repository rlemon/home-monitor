import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from '../app';
import Home from './home';
import AddGist from './add-gist';
import Login from './login';
import Logout from './logout';
import UserProfile from './user-profile';
import NotFound from './not-found';

export default function Pages(props) {
	return [
		<IndexRoute component={Home} key='route-home'/>,
		<Route path="/browse" component={Home} key='route-browse'>,
			<Route path="/browse/:page" component={Home} key='route-browse-page' />,
		</Route>,
		<Route path="/gist" component={Home} key='route-gist' >
			<Route path="/gist/view/:id" component={AddGist} key='route-gist-view' />
			<Route path="/gist/edit/:id" component={AddGist} key='route-gist-edit' />
			<Route path="/gist/add" component={AddGist} key='route-gist-add' />
		</Route>,
		<Route path="/profile" component={UserProfile} key='route-profile' />,
		<Route path="/login" component={Login} key='route-login' />,
		<Route path="/logout" component={Logout} key='route-logout' />,
		<Route path="*" component={NotFound} key='route-notfound' />,
	];
}
