import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import React from 'react';
import {history, store} from './store';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {ThemeProvider } from '@material-ui/core/styles';
import App from './components/App';
import {theme} from "./theme";

ReactDOM.render((
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<ConnectedRouter history={history}>
				<BrowserRouter>
				<Switch>
					<Route path="/" component={App}/>
				</Switch>
				</BrowserRouter>
			</ConnectedRouter>
		</ThemeProvider>
	</Provider>

), document.getElementById('root'));
