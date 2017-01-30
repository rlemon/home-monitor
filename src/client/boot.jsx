import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Router, Route, browserHistory } from 'react-router';
import getPageRoutes from './pages';

let reactContainer = document.createElement('div');
reactContainer.id = 'app-react-container';
document.body.appendChild(reactContainer);

function saveAppInstance(appComponentInstance) {
	window.app = appComponentInstance; //useful for debugging.
}

let routeConfig = <Route path="/" component={App}>
	{getPageRoutes()}
</Route>;

//<App ref={saveAppInstance} user={user} />

//App.getUserInfo().then(user => {
	ReactDOM.render(<Router history={browserHistory}>{routeConfig}</Router>, reactContainer);
//});
